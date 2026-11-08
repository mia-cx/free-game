const KEY = 'free-game:review';
const DAY_MS = 86_400_000;
/** Days a card waits before it comes back, by the Leitner box it sits in (index 0 is unused). */
const INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];
const LAST_BOX = INTERVAL_DAYS.length - 1;

type Card = { box: number; due: number };

/**
 * Spaced review of the check cards from finished lessons, kept in this browser.
 * A card starts in box 1, due a day after its lesson is finished. "Got it" moves it up a box
 * and further out; "Not yet" sends it back to box 1, due tomorrow.
 */
class Review {
	cards = $state<Record<string, Card>>({});
	/** True once saved cards have been read in the browser. */
	restored = $state(false);

	/** Reads saved cards. Call once in the browser. */
	restore() {
		try {
			this.cards = JSON.parse(localStorage.getItem(KEY) ?? '{}');
		} catch {
			this.cards = {};
		}
		this.restored = true;
	}

	/** Card ids due now, oldest first. */
	due(now = Date.now()) {
		return Object.entries(this.cards)
			.filter(([, card]) => card.due <= now)
			.sort(([, a], [, b]) => a.due - b.due)
			.map(([id]) => id);
	}

	/** When the next card comes due, or null when there are none. */
	nextDue() {
		const dues = Object.values(this.cards).map((c) => c.due);
		return dues.length ? Math.min(...dues) : null;
	}

	/** Adds a finished lesson's cards to the deck. Cards already in it keep their schedule. */
	enroll(ids: string[], now = Date.now()) {
		for (const id of ids) this.cards[id] ??= { box: 1, due: now + DAY_MS };
		this.#save();
	}

	answer(id: string, recalled: boolean, now = Date.now()) {
		const box = recalled ? Math.min((this.cards[id]?.box ?? 1) + 1, LAST_BOX) : 1;
		this.cards[id] = { box, due: now + INTERVAL_DAYS[box] * DAY_MS };
		this.#save();
	}

	#save() {
		try {
			localStorage.setItem(KEY, JSON.stringify(this.cards));
		} catch {
			// Storage blocked: the deck lasts for this visit.
		}
	}
}

export const review = new Review();

/** The check card ids for a lesson with `count` checks. Matches the ids the course builder assigns. */
export const checkIds = (lessonId: string, count: number) =>
	Array.from({ length: count }, (_, i) => `${lessonId}#${i}`);
