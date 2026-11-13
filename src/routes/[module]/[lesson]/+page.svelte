<script lang="ts">
	import { goto } from '$app/navigation';
	import CheckCard from '#lib/CheckCard.svelte';
	import Diagram from '#lib/Diagram.svelte';
	import ListenBar from '#lib/ListenBar.svelte';
	import { progress } from '#lib/progress.svelte.ts';
	import { checkIds, review } from '#lib/review.svelte.ts';
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();

	/** How long the done animation plays before the next lesson opens. */
	const CELEBRATE_MS = 650;

	const lessons = $derived(data.outline.flatMap((m) => m.lessons));
	const index = $derived(lessons.findIndex((l) => l.id === data.lesson.id));
	const prev = $derived(lessons[index - 1]);
	const next = $derived(lessons[index + 1]);
	const module = $derived(data.outline.find((m) => m.slug === data.lesson.module)!);
	const done = $derived(progress.done.has(data.lesson.id));
	const outline = $derived([
		...data.lesson.sections,
		...(data.lesson.checks.length ? [{ id: 'check-yourself', title: 'Check yourself' }] : []),
		{ id: 'sources', title: 'Sources' }
	]);

	let finishing = $state(false);
	let active = $state('');
	let panel = $state<HTMLElement>();

	const finish = async () => {
		const wasDone = done;
		progress.set(data.lesson.id, true);
		review.enroll(checkIds(data.lesson.id, data.lesson.checks.length));
		if (!wasDone && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
			finishing = true;
			await new Promise((r) => setTimeout(r, CELEBRATE_MS));
		}
		finishing = false;
		goto(next?.href ?? '/');
	};

	/** ← and → move between lessons, unless the reader is typing or using a modifier. */
	const onkeydown = (event: KeyboardEvent) => {
		if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
		if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable]')) return;
		const target = event.key === 'ArrowLeft' ? prev : event.key === 'ArrowRight' ? next : undefined;
		if (target) goto(target.href);
	};

	/** Marks the outline entry for the section being read. */
	$effect(() => {
		const headings = outline.map((s) => document.getElementById(s.id)).filter((h) => h !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target.id);
				if (visible.length) active = visible[0];
			},
			{ rootMargin: '0px 0px -70% 0px' }
		);
		for (const h of headings) observer.observe(h);
		return () => observer.disconnect();
	});
</script>

<svelte:window {onkeydown} />

<Seo
	title="{data.lesson.title} · Free Game"
	description={data.lesson.summary}
	markdown={data.lesson.markdownHref}
	crumbs={[
		{ name: module.title, href: module.href },
		{ name: data.lesson.title, href: data.lesson.href }
	]}
/>

{#snippet contents(onpick?: () => void)}
	<ol class="toc">
		{#each outline as section (section.id)}
			<li>
				<a href="#{section.id}" aria-current={active === section.id ? 'location' : undefined} onclick={onpick}>
					{section.title}
				</a>
			</li>
		{/each}
	</ol>
{/snippet}

<div data-hue style="--hue: {module.hue}" class="page">
	<div class="reading" aria-hidden="true"></div>

	<nav aria-label="Lessons in this module" class="flex flex-wrap items-center gap-x-4 gap-y-2">
		<a href={module.href} class="font-semibold hover:underline">
			<span class="font-[800] text-accent">{module.number}</span>
			{module.title}
		</a>
		<ol class="flex gap-1.5">
			{#each module.lessons as lesson (lesson.id)}
				<li>
					<a
						href={lesson.href}
						title={lesson.title}
						aria-label="Lesson {lesson.number}: {lesson.title}"
						aria-current={lesson.id === data.lesson.id ? 'page' : undefined}
						class="pip"
						data-done={progress.done.has(lesson.id) || undefined}
					></a>
				</li>
			{/each}
		</ol>
		<span class="text-sm text-muted tabular-nums">
			{data.lesson.number} of {module.lessons.length} · {data.lesson.minutes} min
		</span>
	</nav>

	<article class="mt-8 min-w-0">
		<h1 class="text-4xl leading-[1.08] font-[800] tracking-tight text-balance sm:text-5xl">{data.lesson.title}</h1>

		{#if data.audio}<div class="mt-6"><ListenBar src={data.audio} /></div>{/if}

		<div class="lesson mt-8">
			{#each data.lesson.blocks as block, i (i)}
				{#if block.kind === 'html'}{@html block.html}{:else}<Diagram name={block.name} />{/if}
			{/each}
		</div>

		{#if data.lesson.checks.length}
			<section class="topic" aria-labelledby="check-yourself">
				<h2 id="check-yourself" class="text-2xl font-[800] tracking-tight">Check yourself</h2>
				<p class="mt-1 text-muted">Answer in your head first, then reveal. These come back in Review.</p>
				<ol class="mt-5 grid gap-3">
					{#each data.lesson.checks as check (check.id)}
						<li><CheckCard question={check.question} answer={check.answer} /></li>
					{/each}
				</ol>
			</section>
		{/if}

		<section class="sources lesson topic" aria-labelledby="sources">
			<h2 id="sources">Sources</h2>
			{@html data.lesson.sources}
		</section>
	</article>

	<!-- Wide screens: the outline sits in the right gutter. -->
	<nav aria-label="In this lesson" class="gutter max-xl:hidden">
		{@render contents()}
	</nav>

	<!-- Narrower screens: the outline opens from its own button. -->
	<button type="button" popovertarget="contents" class="contents-toggle">
		<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h13" /></svg>
		Contents
	</button>
	<nav id="contents" popover aria-label="In this lesson" class="contents-panel" bind:this={panel}>
		{@render contents(() => panel?.hidePopover())}
	</nav>

	<footer class="topic flex flex-wrap items-center gap-4 border-t border-line pt-6">
		{#if prev}
			<a href={prev.href} class="mr-auto text-muted hover:text-ink">
				<span aria-hidden="true">←</span>
				{prev.title}
			</a>
		{:else}
			<span class="mr-auto"></span>
		{/if}
		{#if done}
			<button type="button" class="text-sm text-muted underline" onclick={() => progress.set(data.lesson.id, false)}>
				Mark as not done
			</button>
		{/if}
		<button type="button" onclick={finish} class="finish" data-finishing={finishing || undefined}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" /></svg>
			<span>
				{#if finishing}
					Done
				{:else if next}
					{done ? 'Next lesson' : 'Done, next lesson'} <span aria-hidden="true">→</span>
				{:else}
					{done ? 'Back to the map' : 'Done, finish the course'}
				{/if}
			</span>
		</button>
	</footer>
</div>

<style>
	/* One centred reading column; the outline gets the right gutter on wide screens. */
	.page {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 40rem) minmax(0, 1fr);
		& > * {
			grid-column: 2;
		}
		@media (width >= 80rem) {
			column-gap: 3rem;
		}
	}

	.gutter {
		grid-column: 3;
		grid-row: 2;
		align-self: start;
		position: sticky;
		top: 2rem;
		max-width: 15rem;
		margin-top: 2rem;
	}

	.topic {
		margin-top: var(--space-topic);
	}

	.contents-toggle {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		z-index: 30;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.1rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--paper);
		box-shadow: 0 4px 16px rgb(0 0 0 / 0.12);
		font-size: 0.95rem;
		font-weight: 700;
		@media (width >= 80rem) {
			display: none;
		}
		& svg {
			width: 1.1rem;
			height: 1.1rem;
			fill: none;
			stroke: currentColor;
			stroke-width: 2.5;
			stroke-linecap: round;
		}
	}

	.contents-panel {
		position: fixed;
		inset: auto 1rem 4.75rem auto;
		margin: 0;
		width: min(20rem, calc(100vw - 2rem));
		max-height: min(70vh, 32rem);
		overflow: auto;
		padding: 1rem 1rem 1rem 0.5rem;
		border: 1px solid var(--line);
		border-radius: 14px;
		background: var(--paper);
		color: var(--ink);
		box-shadow: 0 12px 40px rgb(0 0 0 / 0.18);
		transition:
			opacity var(--duration-fast) var(--ease-smooth-out),
			translate var(--duration-fast) var(--ease-smooth-out),
			overlay var(--duration-fast) allow-discrete,
			display var(--duration-fast) allow-discrete;
		&:not(:popover-open) {
			opacity: 0;
			translate: 0 var(--distance-base);
		}
		@starting-style {
			&:popover-open {
				opacity: 0;
				translate: 0 var(--distance-base);
			}
		}
		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
		&::backdrop {
			background: rgb(0 0 0 / 0.3);
		}
	}

	/* Reading progress, driven by page scroll with no JavaScript. */
	.reading {
		position: fixed;
		inset: 0 0 auto;
		z-index: 40;
		height: 4px;
		background: var(--accent);
		transform-origin: left;
		animation: read linear both;
		animation-timeline: scroll(root);
	}

	@keyframes read {
		from {
			scale: 0 1;
		}
	}

	.pip {
		display: block;
		width: 1.6rem;
		height: 0.6rem;
		border-radius: 999px;
		background: var(--accent-line);
		&:hover {
			background: var(--muted);
		}
		&[data-done] {
			background: var(--accent);
		}
		&[aria-current='page'] {
			background: var(--ink);
		}
	}

	.toc {
		display: grid;
		gap: 0.15rem;
		border-left: 2px solid var(--line);
		font-size: 0.9rem;
		& a {
			display: block;
			margin-left: -2px;
			padding: 0.3rem 0 0.3rem 1rem;
			border-left: 2px solid transparent;
			color: var(--muted);
			transition:
				color var(--duration-quick) var(--ease-out),
				border-color var(--duration-quick) var(--ease-out);
			&:hover {
				color: var(--ink);
			}
			&[aria-current='location'] {
				color: var(--ink);
				font-weight: 700;
				border-color: var(--accent);
			}
		}
	}

	.sources {
		font-size: 0.9rem;
		color: var(--muted);
		& :global(h2) {
			margin-top: 0;
			font-size: 1rem;
		}
	}

	.finish {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 999px;
		background: var(--accent);
		color: var(--accent-ink);
		font-size: 1.125rem;
		font-weight: 700;
		&:hover {
			filter: brightness(1.1);
		}
		& svg {
			width: 0;
			height: 1.4rem;
			fill: none;
			stroke: currentColor;
			stroke-width: 3;
			stroke-linecap: round;
			stroke-linejoin: round;
			transition: width var(--duration-fast) var(--ease-smooth-out);
		}
		& path {
			stroke-dasharray: 1;
			stroke-dashoffset: 1;
		}
		&[data-finishing] {
			& svg {
				width: 1.4rem;
			}
			& path {
				transition: stroke-dashoffset var(--duration-very-slow) var(--ease-smooth-out) var(--duration-micro);
				stroke-dashoffset: 0;
			}
		}
	}
</style>
