<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { progress } from '#lib/progress.svelte.ts';
	import { review } from '#lib/review.svelte.ts';
	import { copyCode } from '#lib/copy.ts';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const total = $derived(data.outline.reduce((n, m) => n + m.lessons.length, 0));
	const due = $derived(review.due().length);
	const current = (path: string) => (page.url.pathname === path ? 'page' : undefined);

	$effect(() => {
		progress.restore();
		review.restore();
	});
</script>

<svelte:document onclick={copyCode} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:p-2">
	Skip to content
</a>

<header class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
	<a href="/" class="mr-auto text-lg font-[800] tracking-tight whitespace-nowrap">Free Game</a>
	<nav class="flex items-center gap-4 text-[0.95rem] sm:gap-5">
		<a href="/" aria-current={current('/')} class="nav-link">Map</a>
		<a href="/review" aria-current={current('/review')} class="nav-link">
			Review{#if due}<span class="badge"><span class="sr-only">,</span> {due}<span class="sr-only"> due</span></span>{/if}
		</a>
		<a href="/tricks" aria-current={current('/tricks')} class="nav-link">Tricks</a>
		<span class="text-muted tabular-nums max-sm:hidden">{progress.done.size}/{total} done</span>
	</nav>
</header>

<main id="main" class="mx-auto max-w-6xl px-4 pt-4 pb-24 sm:px-6">
	{@render children()}
</main>

<style>
	.nav-link {
		font-weight: 600;
		white-space: nowrap;
		text-underline-offset: 6px;
		&:hover,
		&[aria-current='page'] {
			text-decoration: underline;
			text-decoration-thickness: 2px;
		}
	}
	.badge {
		display: inline-grid;
		place-items: center;
		min-width: 1.3rem;
		height: 1.3rem;
		margin-left: 0.3rem;
		padding-inline: 0.3rem;
		border-radius: 999px;
		background: var(--accent);
		color: var(--accent-ink);
		font-size: 0.75rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		vertical-align: 0.1em;
	}
</style>
