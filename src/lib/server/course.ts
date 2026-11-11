/**
 * Builds the course from markdown in `src/content/`.
 *
 * Layout: `src/content/<NN-module>/_module.md` holds the module's frontmatter
 * (`title`, `summary`, optional `diagram`), `src/content/<NN-module>/<NN-lesson>.md`
 * holds one lesson. The `NN-` prefix sets the order and is dropped from the URL.
 *
 * Lessons use GitHub-style callouts:
 * - `> [!TLDR]`, `> [!TRICK] Title`, `> [!RISK] Title`, `> [!DO] Title` render as `<aside class="callout">`.
 * - `> [!CHECK] Question?` with the answer as its body becomes a review card, kept out of the lesson body.
 * - `> [!DIAGRAM] name` places the component `src/lib/diagrams/<name>.svelte` at that point.
 */
import { Marked, type Tokens } from 'marked';
import type { Block, Callout, CalloutKind, Check, Course, Lesson, Module, Trick } from '#lib/course.ts';

const files = import.meta.glob<string>('/src/content/*/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

const CALLOUT = /^\[!(TLDR|TRICK|RISK|DO|CHECK|DIAGRAM)\][ \t]*(.*)(?:\n|$)/;
const ORDER_PREFIX = /^\d+-/;
const DIAGRAM_MARKER = /<!--diagram:([\w-]+)-->/;
const SOURCES_HEADING = '<h2 id="sources">Sources</h2>';
const WORDS_PER_MINUTE = 200;
/** Module hues in course order: a walk round the colour wheel that skips the olive yellows, which turn muddy at text contrast. */
const MODULE_HUES = [25, 50, 72, 145, 168, 190, 215, 240, 265, 290, 315, 340, 5];

/** Splits `---` frontmatter of flat `key: value` lines from the body. */
export const parseFrontmatter = (raw: string) => {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!match) return { data: {} as Record<string, string>, body: raw };
	const data = Object.fromEntries(
		match[1]
			.split('\n')
			.map((line) => line.match(/^(\w+):\s*(.*)$/))
			.filter((m) => m !== null)
			.map(([, key, value]) => [key, value.replace(/^(['"])(.*)\1$/, '$2')])
	);
	return { data, body: raw.slice(match[0].length) };
};

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

/** Pulls the `##` sections and the TLDR, task, trick and check callouts out of a lesson body. */
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
		checks: callouts
			.filter((c) => c.kind === 'check')
			.map((c, i): Check => ({ id: `${lessonId}#${i}`, question: inline(c.title), answer: render(c.body) }))
	};
};

/** Splits rendered HTML at diagram markers into alternating HTML and diagram blocks. */
const toBlocks = (html: string): Block[] =>
	html
		.split(DIAGRAM_MARKER)
		.map((part, i): Block => (i % 2 ? { kind: 'diagram', name: part } : { kind: 'html', html: part }))
		.filter((b) => b.kind === 'diagram' || b.html.trim() !== '');

/** Separates the closing `## Sources` list so the page can place the review cards before it. */
const splitSources = (html: string) => {
	const [body, sources = ''] = html.split(SOURCES_HEADING);
	return { blocks: toBlocks(body), sources: sources.trim() };
};

const build = (): Course => {
	const byModule = Object.groupBy(
		Object.entries(files).sort(([a], [b]) => a.localeCompare(b)),
		([path]) => path.split('/').at(-2) ?? ''
	);

	const drafts = Object.entries(byModule).map(([dir, entries = []], index) => {
		const slug = dir.replace(ORDER_PREFIX, '');
		const meta = parseFrontmatter(entries.find(([path]) => path.endsWith('/_module.md'))?.[1] ?? '').data;
		const lessons = entries
			.filter(([path]) => !path.endsWith('/_module.md'))
			.map(([path, raw], lessonIndex) => {
				const lessonSlug = (path.split('/').at(-1) ?? '').replace(/\.md$/, '').replace(ORDER_PREFIX, '');
				const id = `${slug}/${lessonSlug}`;
				const { data, body } = parseFrontmatter(raw);
				return {
					lesson: {
						id,
						href: `/${slug}/${lessonSlug}`,
						module: slug,
						number: lessonIndex + 1,
						title: data.title ?? lessonSlug,
						summary: data.summary ?? '',
						minutes: minutesToRead(body),
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
			title: meta.title ?? slug,
			summary: meta.summary ?? '',
			diagram: meta.diagram || undefined
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
				({ lesson, html }): Lesson => ({
					...lesson,
					...splitSources(link(html)),
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

/** The whole course, parsed once per server process (prerendered at build). */
export const course = build();
