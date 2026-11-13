/**
 * Builds the course from notes shaped like the `course` vault's Svartz index (svartz.config.ts).
 * Svartz finds the notes, reads their frontmatter and hands over each body as Markdown; this module
 * renders them. `course.ts` feeds it the real index; the tests feed it the files on disk.
 *
 * Layout: `content/<module>/index.md` holds the module's frontmatter (`title`, `description`,
 * `order`, optional `diagram`), `content/<module>/<lesson>.md` holds one lesson (`title`,
 * `description`, `order`). `order` sets the sequence; the file and folder names are the URL.
 *
 * Lessons use GitHub-style callouts:
 * - `> [!TLDR]`, `> [!TRICK] Title`, `> [!RISK] Title`, `> [!DO] Title` render as `<aside class="callout">`.
 * - `> [!CHECK] Question?` with the answer as its body becomes a review card, kept out of the lesson body.
 * - `> [!DIAGRAM] name` places the component `src/lib/diagrams/<name>.svelte` at that point.
 * - `> [!FORM] Title` with a list of questions as its body places a worksheet at that point: an
 *   answer field per question, saved in the browser and downloadable as Markdown or PDF.
 */

import { Marked, type Tokens } from 'marked';
import type { Block, Callout, CalloutKind, Check, Course, Form, Lesson, Module, Trick } from '#lib/course.ts';

/** The fields of a Svartz index entry the course reads. */
export type Note = {
	/** Vault-relative path, such as `foundations/positioning.md`. */
	path: string;
	title: string;
	description?: string;
	properties: Readonly<Record<string, unknown>>;
	/** The body without frontmatter, from `index: { markdown: true }`. */
	markdown?: string;
	/** The Markdown copy Svartz writes beside the page, for agents. */
	markdownHref?: string;
};

const CALLOUT = /^\[!(TLDR|TRICK|RISK|DO|CHECK|DIAGRAM|FORM)\][ \t]*(.*)(?:\n|$)/;
const FOLDER_NOTE = 'index.md';
/** Where a diagram or form mounts in the rendered body: `<!--diagram:name-->` or `<!--form:id-->`. */
const MOUNT_MARKER = /<!--(diagram|form):([\w-]+)-->/;
const SOURCES_HEADING = '<h2 id="sources">Sources</h2>';
const WORDS_PER_MINUTE = 200;
/** Module hues in course order: a walk round the colour wheel that skips the olive yellows, which turn muddy at text contrast. */
const MODULE_HUES = [25, 50, 72, 145, 168, 190, 215, 240, 265, 290, 315, 340, 5];

/** Reads a callout marker from a blockquote, or null for a plain quote. */
export const readCallout = (quote: string): Callout | null => {
	const match = quote.match(CALLOUT);
	if (!match) return null;
	return {
		kind: match[1].toLowerCase() as CalloutKind,
		title: match[2].trim(),
		body: quote.slice(match[0].length)
	};
};

const marked: Marked = new Marked({
	renderer: {
		blockquote({ text, tokens }: Tokens.Blockquote): string {
			const callout = readCallout(text);
			if (!callout) return `<blockquote>${this.parser.parse(tokens)}</blockquote>`;
			if (callout.kind === 'check') return '';
			if (callout.kind === 'diagram') return `<!--diagram:${callout.title}-->`;
			if (callout.kind === 'form') return `<!--form:${slugify(callout.title)}-->`;
			const title = callout.title ? `<p class="callout-title">${inline(callout.title)}</p>` : '';
			return `<aside class="callout" data-kind="${callout.kind}">${title}${render(callout.body)}</aside>`;
		},
		code({ text }: Tokens.Code) {
			return `<pre><code>${escapeHtml(text)}</code><button type="button" class="copy" data-copy>Copy</button></pre>`;
		},
		heading({ tokens, depth, text }: Tokens.Heading): string {
			const id = depth === 2 ? ` id="${slugify(text)}"` : '';
			return `<h${depth}${id}>${this.parser.parseInline(tokens)}</h${depth}>`;
		},
		link({ href, text }: Tokens.Link) {
			const external = /^https?:/.test(href);
			return `<a href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
		}
	}
});

function render(markdown: string) {
	return marked.parse(markdown, { async: false });
}

function inline(markdown: string) {
	return marked.parseInline(markdown, { async: false });
}

const escapeHtml = (text: string) =>
	text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

const plain = (markdown: string) => markdown.replace(/[`*_]|\[|\]\([^)]*\)/g, '');
const slugify = (markdown: string) =>
	plain(markdown)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

/** Reading time for the prose, leaving out code blocks (prompts are pasted, not read). */
const minutesToRead = (body: string) => {
	const words = body
		.replace(/```[\s\S]*?```/g, '')
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

/** Reads a `[!FORM]` callout: its title, and each item of the list in its body as a question. */
const toForm = (callout: Callout): Form => {
	const list = marked.lexer(callout.body).find((t): t is Tokens.List => t.type === 'list');
	return {
		id: slugify(callout.title),
		title: plain(callout.title),
		questions: (list?.items ?? []).map((item) => ({ text: item.text.trim(), html: inline(item.text.trim()) }))
	};
};

/** Pulls the `##` sections and the TLDR, task, trick, form and check callouts out of a lesson body. */
const extract = (body: string, lessonId: string) => {
	const tokens = marked.lexer(body);
	const callouts = tokens
		.filter((t): t is Tokens.Blockquote => t.type === 'blockquote')
		.map((t) => readCallout(t.text))
		.filter((c) => c !== null);
	const tldr = callouts.find((c) => c.kind === 'tldr');
	const task = callouts.find((c) => c.kind === 'do');
	return {
		tldr: tldr ? render(tldr.body) : '',
		task: { title: task?.title ?? '', html: task ? render(task.body) : '' },
		sections: tokens
			.filter((t): t is Tokens.Heading => t.type === 'heading' && t.depth === 2)
			.map((t) => ({ id: slugify(t.text), title: plain(t.text) }))
			.filter((s) => s.id !== 'sources'),
		tricks: callouts.filter((c) => c.kind === 'trick').map((c): Trick => ({ title: c.title, html: render(c.body) })),
		forms: callouts.filter((c) => c.kind === 'form').map(toForm),
		checks: callouts
			.filter((c) => c.kind === 'check')
			.map((c, i): Check => ({ id: `${lessonId}#${i}`, question: inline(c.title), answer: render(c.body) }))
	};
};

/** Splits rendered HTML at mount markers into HTML, diagram and form blocks, in reading order. */
const toBlocks = (html: string, forms: Form[]): Block[] => {
	// Splitting on a regex with two groups yields [html, kind, name, html, kind, name, …, html].
	const parts = html.split(MOUNT_MARKER);
	return parts.flatMap((part, i): Block[] => {
		if (i % 3 === 0) return part.trim() ? [{ kind: 'html', html: part }] : [];
		if (i % 3 === 2) return [];
		const name = parts[i + 1];
		if (part === 'diagram') return [{ kind: 'diagram', name }];
		const form = forms.find((f) => f.id === name);
		if (!form) throw new Error(`No form with id ${name}`);
		return [{ kind: 'form', form }];
	});
};

/** Separates the closing `## Sources` list so the page can place the review cards before it. */
const splitSources = (html: string, forms: Form[]) => {
	const [body, sources = ''] = html.split(SOURCES_HEADING);
	return { blocks: toBlocks(body, forms), sources: sources.trim() };
};

const orderOf = (note: Note) => {
	const order = Number(note.properties.order);
	if (!Number.isFinite(order)) throw new Error(`content/${note.path} needs a numeric \`order\``);
	return order;
};
const byOrder = (a: Note, b: Note) => orderOf(a) - orderOf(b);

/** Builds the course from the vault's notes: each folder is a module, its `index.md` the module itself. */
export const buildCourse = (notes: readonly Note[]): Course => {
	const byModule = Object.groupBy(notes, (note) => note.path.split('/')[0]);
	const folderNote = (slug: string) => byModule[slug]?.find((n) => n.path === `${slug}/${FOLDER_NOTE}`);
	const slugs = Object.keys(byModule)
		.filter((slug) => folderNote(slug))
		.sort((a, b) => byOrder(folderNote(a) as Note, folderNote(b) as Note));

	const drafts = slugs.map((slug, index) => {
		const meta = folderNote(slug) as Note;
		const lessons = (byModule[slug] ?? [])
			.filter((note) => note !== meta)
			.sort(byOrder)
			.map((note, lessonIndex) => {
				const lessonSlug = note.path.split('/').at(-1)?.replace(/\.md$/, '') ?? '';
				const id = `${slug}/${lessonSlug}`;
				const body = note.markdown ?? '';
				return {
					lesson: {
						id,
						href: `/${id}`,
						module: slug,
						number: lessonIndex + 1,
						title: note.title,
						summary: note.description ?? '',
						minutes: minutesToRead(body),
						markdownHref: note.markdownHref,
						...extract(body, id)
					},
					html: render(body)
				};
			});
		const module = {
			slug,
			href: `/${slug}`,
			number: index + 1,
			hue: MODULE_HUES[index % MODULE_HUES.length],
			title: meta.title,
			summary: meta.description ?? '',
			diagram: typeof meta.properties.diagram === 'string' ? meta.properties.diagram : undefined,
			markdownHref: meta.markdownHref
		};
		return { module, lessons };
	});

	const link = linker([
		...drafts.map(({ module }) => [module.title, module.href] as const),
		...drafts.flatMap(({ lessons }) => lessons.map(({ lesson }) => [lesson.title, lesson.href] as const))
	]);

	const modules = drafts.map(
		({ module, lessons }): Module => ({
			...module,
			lessons: lessons.map(
				({ lesson: { forms, ...lesson }, html }): Lesson => ({
					...lesson,
					...splitSources(
						link(html),
						forms.map((f) => ({ ...f, questions: f.questions.map((q) => ({ ...q, html: link(q.html) })) }))
					),
					tldr: link(lesson.tldr),
					task: { ...lesson.task, html: link(lesson.task.html) },
					tricks: lesson.tricks.map((t) => ({ ...t, html: link(t.html) })),
					checks: lesson.checks.map((c) => ({ ...c, answer: link(c.answer) }))
				})
			)
		})
	);

	return { modules, lessons: modules.flatMap((m) => m.lessons) };
};

const unescapeHtml = (html: string) =>
	html
		.replace(/&#39;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

/** Returns a function that turns italic lesson or module titles, like `*Test titles for quick wins*`, into links. */
const linker = (targets: (readonly [title: string, href: string])[]) => {
	const hrefs = new Map(targets);
	return (html: string) =>
		html.replace(/<em>([^<]+)<\/em>/g, (match, title: string) => {
			const href = hrefs.get(unescapeHtml(title));
			return href ? `<a href="${href}"><em>${title}</em></a>` : match;
		});
};
