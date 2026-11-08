import type { Component } from 'svelte';

/**
 * Every interactive diagram, keyed by file name: `x-score.svelte` is `x-score`.
 * Lessons place one with `> [!DIAGRAM] x-score`; modules pick a signature one with `diagram: x-score`.
 */
export const diagrams: Record<string, Component> = Object.fromEntries(
	Object.entries(import.meta.glob<Component>('./*.svelte', { eager: true, import: 'default' })).map(
		([path, component]) => [path.slice(2, -'.svelte'.length), component]
	)
);
