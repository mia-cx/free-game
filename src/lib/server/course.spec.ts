import { describe, expect, it } from 'vitest';
import { course } from './course.ts';

// Proves every lesson ships the parts the reader relies on: a title and summary for the map,
// a short version up top, an action to take, and titled tricks for the deck.
describe.each(course.lessons.map((l) => [l.id, l] as const))('%s', (_, lesson) => {
	it('has the parts the reader relies on', () => {
		expect(lesson.title).not.toBe(lesson.id.split('/')[1]);
		expect(lesson.summary).not.toBe('');
		expect(lesson.html).toMatch(/^<aside class="callout" data-kind="tldr">/);
		expect(lesson.html).toContain('data-kind="do"');
		for (const trick of lesson.tricks) expect(trick.title).not.toBe('');
	});
});
