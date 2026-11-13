import { describe, expect, it } from 'vitest';
import { buildCourse, type Note } from './build-course.ts';

// The site reads the notes from Svartz's index; the tests read the same files from disk.

const files = import.meta.glob<string>('/content/*/*.md', { query: '?raw', import: 'default', eager: true });

/** A note as Svartz indexes it: flat `key: value` frontmatter as properties, the rest as the body. */
const toNote = ([file, raw]: [string, string]): Note => {
	const [, frontmatter = '', markdown = raw] = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? [];
	const properties = Object.fromEntries(
		frontmatter
			.split('\n')
			.map((line) => line.match(/^(\w+):\s*(.*)$/))
			.filter((m) => m !== null)
			.map(([, key, value]) => [key, value.replace(/^(['"])(.*)\1$/, '$2')])
	);
	return {
		path: file.slice('/content/'.length),
		title: String(properties.title ?? ''),
		description: properties.description,
		properties,
		markdown
	};
};

const course = buildCourse(Object.entries(files).map(toNote));

const diagramNames = new Set(
	Object.keys(import.meta.glob('/src/lib/diagrams/*.svelte')).map((path) => path.split('/').at(-1)?.slice(0, -7))
);

// Proves every module folder became a module, so a missing `index.md` or `order` can't drop one.
it('builds a module for every content folder', () => {
	const folders = new Set(Object.keys(files).map((file) => file.split('/')[2]));
	expect(course.modules.map((m) => m.slug).sort()).toEqual([...folders].sort());
});

// Proves every lesson ships the parts the reader relies on: a title and summary for the map,
// a short version up top, an action to take, three review cards, and titled tricks for the deck.
describe.each(course.lessons.map((l) => [l.id, l] as const))('%s', (_, lesson) => {
	const html = lesson.blocks.map((b) => (b.kind === 'html' ? b.html : '')).join('');

	it('has the parts the reader relies on', () => {
		expect(lesson.title).not.toBe('');
		expect(lesson.summary).not.toBe('');
		expect(html).toMatch(/^<aside class="callout" data-kind="tldr">/);
		expect(html).toContain('data-kind="do"');
		expect(lesson.checks).toHaveLength(3);
		for (const trick of lesson.tricks) expect(trick.title).not.toBe('');
	});

	// Proves a form placed in a lesson gives the reader a field per question, not an empty box.
	it('gives every form questions to answer', () => {
		const empty = lesson.blocks.flatMap((b) =>
			b.kind === 'form' && (b.form.questions.length === 0 || b.form.questions.some((q) => !q.text)) ? [b.form.id] : []
		);
		expect(empty).toEqual([]);
	});

	// Proves a diagram placed in a lesson actually renders instead of leaving a silent gap.
	it('only places diagrams that exist', () => {
		const missing = lesson.blocks.flatMap((b) => (b.kind === 'diagram' && !diagramNames.has(b.name) ? [b.name] : []));
		expect(missing).toEqual([]);
	});
});

// Proves every module page has a signature diagram that exists.
describe.each(course.modules.map((m) => [m.slug, m] as const))('module %s', (_, module) => {
	it('has a signature diagram', () => {
		expect(diagramNames).toContain(module.diagram);
	});
});
