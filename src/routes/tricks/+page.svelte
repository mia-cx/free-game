<script lang="ts">
	import { tick } from 'svelte';

	let { data } = $props();

	let filter = $state<string | null>(null);
	let picked = $state<string | null>(null);

	const shown = $derived(filter ? data.tricks.filter((t) => t.module === filter) : data.tricks);
	const counts = $derived(Object.groupBy(data.tricks, (t) => t.module));

	/** Picks a random trick from the current filter and moves focus to it. */
	const pick = async () => {
		const trick = shown[Math.floor(Math.random() * shown.length)];
		picked = trick.key;
		await tick();
		const card = document.getElementById(trick.key);
		card?.focus({ preventScroll: true });
		card?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
	};
</script>

<svelte:head>
	<title>Tricks · Free Game</title>
</svelte:head>

<div class="flex flex-wrap items-end gap-4">
	<h1 class="mr-auto text-4xl font-[800] tracking-tight">Tricks</h1>
	<button
		type="button"
		onclick={pick}
		class="rounded-full bg-go px-5 py-2.5 font-bold text-go-ink hover:brightness-110"
	>
		Pick one for me
	</button>
</div>

<div class="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by module">
	<button type="button" class="chip" aria-pressed={filter === null} onclick={() => (filter = null)}>
		All <span class="tabular-nums opacity-70">{data.tricks.length}</span>
	</button>
	{#each data.outline.filter((m) => counts[m.slug]) as module (module.slug)}
		<button
			type="button"
			class="chip"
			aria-pressed={filter === module.slug}
			onclick={() => (filter = filter === module.slug ? null : module.slug)}
		>
			{module.title} <span class="tabular-nums opacity-70">{counts[module.slug]?.length}</span>
		</button>
	{/each}
</div>

<ul class="mt-8 columns-1 gap-5 md:columns-2">
	{#each shown as trick (trick.key)}
		<li
			id={trick.key}
			tabindex="-1"
			class="callout mb-5 break-inside-avoid {picked === trick.key ? 'ring-4 ring-ink' : ''}"
			data-kind="trick"
		>
			<p class="callout-title">{trick.title}</p>
			<div class="lesson text-[0.95rem]">{@html trick.html}</div>
			<a href={trick.lesson.href} class="mt-3 block text-sm font-semibold underline underline-offset-4">
				From: {trick.lesson.title}
			</a>
		</li>
	{/each}
</ul>

<style>
	.chip {
		border: 2px solid var(--line);
		border-radius: 999px;
		padding: 0.3rem 0.85rem;
		font-weight: 600;
		font-size: 0.9rem;
		&:hover {
			border-color: var(--muted);
		}
		&[aria-pressed='true'] {
			background: var(--ink);
			border-color: var(--ink);
			color: var(--paper);
		}
	}
	.callout {
		margin-top: 0;
	}
</style>
