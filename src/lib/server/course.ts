/**
 * Builds the course from markdown in `src/content/`.
 *
 * Layout: `src/content/<NN-module>/_module.md` holds the module's frontmatter,
 * `src/content/<NN-module>/<NN-lesson>.md` holds one lesson. The `NN-` prefix sets
 * the order and is dropped from the URL.
 *
 * Lessons use GitHub-style callouts, which render as `<aside class="callout">`:
 * `> [!TLDR]`, `> [!TRICK] Title`, `> [!RISK] Title`, `> [!DO] Title`.
 */
import { Marked, type Tokens } from 'marked';
import type { Callout, CalloutKind, Course, Lesson, Trick } from '#lib/course.ts';

const files = import.meta.glob<string>('/src/content/*/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

const CALLOUT = /^\[!(TLDR|TRICK|RISK|DO)\][ \t]*(.*)(?:\n|$)/;
const ORDER_PREFIX = /^\d+-/;

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
			const title = callout.title ? `<p class="callout-title">${marked.parseInline(callout.title)}</p>` : '';
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

const escapeHtml = (text: string) =>
	text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

const plain = (markdown: string) => markdown.replace(/[`*_]|\[|\]\([^)]*\)/g, '');
const slugify = (markdown: string) =>
	plain(markdown)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

/** Pulls the `##` sections and `> [!TRICK]` callouts out of a lesson body. */
const outline = (body: string) => {
	const tokens = marked.lexer(body);
	return {
		sections: tokens
			.filter((t): t is Tokens.Heading => t.type === 'heading' && t.depth === 2)
			.map((t) => ({ id: slugify(t.text), title: plain(t.text) })),
		tricks: tokens
			.filter((t): t is Tokens.Blockquote => t.type === 'blockquote')
			.map((t) => readCallout(t.text))
			.filter((c): c is Callout => c?.kind === 'trick')
			.map((c): Trick => ({ title: c.title, html: render(c.body) }))
	};
};

const build = (): Course => {
	const byModule = Object.groupBy(
		Object.entries(files).sort(([a], [b]) => a.localeCompare(b)),
		([path]) => path.split('/').at(-2) ?? ''
	);

	const modules = Object.entries(byModule).map(([dir, entries = []], index) => {
		const slug = dir.replace(ORDER_PREFIX, '');
		const intro = entries.find(([path]) => path.endsWith('/_module.md'));
		const meta = parseFrontmatter(intro?.[1] ?? '').data;
		const lessons = entries
			.filter(([path]) => !path.endsWith('/_module.md'))
			.map(([path, raw]): Lesson => {
				const lessonSlug = (path.split('/').at(-1) ?? '').replace(/\.md$/, '').replace(ORDER_PREFIX, '');
				const { data, body } = parseFrontmatter(raw);
				return {
					id: `${slug}/${lessonSlug}`,
					href: `/${slug}/${lessonSlug}`,
					module: slug,
					title: data.title ?? lessonSlug,
					summary: data.summary ?? '',
					html: render(body),
					...outline(body)
				};
			});
		return { slug, number: index + 1, title: meta.title ?? slug, summary: meta.summary ?? '', lessons };
	});

	return { modules, lessons: modules.flatMap((m) => m.lessons) };
};

/** The whole course, parsed once per server process (prerendered at build). */
export const course = build();
