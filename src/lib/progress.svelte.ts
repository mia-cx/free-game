import { SvelteSet } from 'svelte/reactivity';

const KEY = 'free-game:done';

/**
 * Lessons the reader has finished, kept in this browser only.
 * Storage can be unavailable (private mode, blocked site data); progress then lasts for the visit.
 */
const load = () => {
	try {
		return JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[];
	} catch {
		return [];
	}
};

class Progress {
	done = new SvelteSet<string>();

	/** Reads saved progress. Call once in the browser. */
	restore() {
		for (const id of load()) this.done.add(id);
	}

	set(id: string, finished: boolean) {
		if (finished) this.done.add(id);
		else this.done.delete(id);
		try {
			localStorage.setItem(KEY, JSON.stringify([...this.done]));
		} catch {
			// Storage blocked: progress stays in memory for this visit.
		}
	}
}

export const progress = new Progress();
