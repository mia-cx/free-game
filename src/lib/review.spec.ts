import { expect, it } from 'vitest';
import { review } from './review.svelte.ts';

const DAY = 86_400_000;

// Proves the spacing schedule: a finished lesson's card is due after 1 day, each recall pushes it
// out to 3, 7, 16 and then 35 days, and a miss brings it back tomorrow.
it('spaces cards out as they are recalled and resets them when missed', () => {
	review.enroll(['a#0'], 0);
	expect(review.due(DAY - 1)).toEqual([]);
	expect(review.due(DAY)).toEqual(['a#0']);

	const waits = [3, 7, 16, 35, 35].map(() => {
		const before = review.cards['a#0'].due;
		review.answer('a#0', true, before);
		return (review.cards['a#0'].due - before) / DAY;
	});
	expect(waits).toEqual([3, 7, 16, 35, 35]);

	review.answer('a#0', false, 0);
	expect(review.cards['a#0'].due).toBe(DAY);
});
