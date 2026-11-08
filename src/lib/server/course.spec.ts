import { describe, expect, it } from 'vitest';
import { course } from './course.ts';

const diagramNames = new Set(
	Object.keys(import.meta.glob('/src/lib/diagrams/*.svelte')).map((path) => path.split('/').at(-1)?.slice(0, -7))
);

// Proves every lesson ships the parts the reader relies on: a title and summary for the map,
// a short version up top, an action to take, three review cards, and titled tricks for the deck.
describe.each(course.lessons.map((l) => [l.id, l] as const))('%s', (_, lesson) => {
	const html = lesson.blocks.map((b) => (b.kind === 'html' ? b.html : '')).join('');

	it('has the parts the reader relies on', () => {
		expect(lesson.title).not.toBe(lesson.id.split('/')[1]);
		expect(lesson.summary).not.toBe('');
		expect(html).toMatch(/^<aside class="callout" data-kind="tldr">/);
		expect(html).toContain('data-kind="do"');
		expect(lesson.checks).toHaveLength(3);
		for (const trick of lesson.tricks) expect(trick.title).not.toBe('');
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
