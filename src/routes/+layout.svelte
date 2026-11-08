<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { progress } from '#lib/progress.svelte.ts';
	import { copyCode } from '#lib/copy.ts';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const total = $derived(data.outline.reduce((n, m) => n + m.lessons.length, 0));

	$effect(() => progress.restore());
</script>

<svelte:document onclick={copyCode} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-paper focus:p-2">
	Skip to content
</a>

<header class="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4 sm:px-6">
	<a href="/" class="mr-auto text-lg font-[800] tracking-tight">Free Game</a>
	<nav class="flex items-center gap-5 text-[0.95rem]">
		<a href="/" aria-current={page.url.pathname === '/' ? 'page' : undefined} class="nav-link">Map</a>
		<a href="/tricks" aria-current={page.url.pathname === '/tricks' ? 'page' : undefined} class="nav-link">Tricks</a>
		<span class="text-muted tabular-nums">{progress.done.size}/{total} done</span>
	</nav>
</header>

<main id="main" class="mx-auto max-w-5xl px-4 pt-4 pb-24 sm:px-6">
	{@render children()}
</main>

<style>
	.nav-link {
		font-weight: 600;
		text-underline-offset: 6px;
		&:hover,
		&[aria-current='page'] {
			text-decoration: underline;
			text-decoration-thickness: 2px;
		}
	}
</style>
