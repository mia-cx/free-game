<script lang="ts">
	import { progress } from '#lib/progress.svelte.ts';
	import { review } from '#lib/review.svelte.ts';

	let { data } = $props();

	const lessons = $derived(data.outline.flatMap((m) => m.lessons));
	const next = $derived(lessons.find((l) => !progress.done.has(l.id)));
	const nextModule = $derived(data.outline.find((m) => m.slug === next?.module));
	const percent = $derived(Math.round((progress.done.size / lessons.length) * 100));
	const due = $derived(review.due().length);

	const doneIn = (module: (typeof data.outline)[number]) =>
		module.lessons.filter((l) => progress.done.has(l.id)).length;
</script>

<svelte:head>
	<title>Free Game</title>
	<meta name="description" content="Marketing and growth from zero, rewritten from the best free posts on X." />
</svelte:head>

<section
	class="next grid items-center gap-6 rounded-3xl bg-ink p-6 text-paper sm:grid-cols-[1fr_auto] sm:p-10"
	data-hue
	style="--hue: {nextModule?.hue ?? 155}"
>
	<div>
		{#if next && nextModule}
			<a href={nextModule.href} class="font-semibold text-accent-line hover:underline">
				Module {nextModule.number} · {nextModule.title}
			</a>
			<h1 class="mt-2 text-3xl leading-tight font-[800] tracking-tight sm:text-5xl">{next.title}</h1>
			<p class="mt-3 max-w-2xl text-lg opacity-80">{next.summary}</p>
			<div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
				<a
					href={next.href}
					class="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-lg font-bold text-accent-ink hover:brightness-110"
				>
					{progress.done.size ? 'Continue' : 'Start the course'} <span aria-hidden="true">→</span>
				</a>
				{#if due}
					<a href="/review" class="font-semibold underline underline-offset-4 opacity-90 hover:opacity-100">
						Review {due} {due === 1 ? 'card' : 'cards'} first
					</a>
				{/if}
				<span class="text-sm opacity-70 tabular-nums">{next.minutes} min</span>
			</div>
		{:else}
			<h1 class="text-3xl font-[800] tracking-tight sm:text-5xl">You finished every lesson.</h1>
			<a
				href="/review"
				class="mt-7 inline-flex rounded-full bg-accent px-7 py-3.5 text-lg font-bold text-accent-ink"
			>
				Keep it fresh in review <span aria-hidden="true">→</span>
			</a>
		{/if}
	</div>
	<div class="overall max-sm:hidden" role="img" aria-label="{percent}% of the course done">
		<svg viewBox="0 0 120 120" aria-hidden="true">
			<circle cx="60" cy="60" r="52" pathLength="100" class="track" />
			<circle cx="60" cy="60" r="52" pathLength="100" class="fill" style="stroke-dasharray: {percent} 100" />
		</svg>
		<span class="tabular-nums"><strong>{percent}%</strong>{progress.done.size}/{lessons.length}</span>
	</div>
</section>

<h2 class="sr-only">Modules</h2>
<ol class="route mt-14">
	{#each data.outline as module, i (module.slug)}
		{@const done = doneIn(module)}
		{@const state = done === module.lessons.length ? 'done' : module === nextModule ? 'here' : 'ahead'}
		<li
			id={module.slug}
			class="station"
			data-hue
			data-state={state}
			data-side={i % 2 ? 'right' : 'left'}
			style="--hue: {module.hue}; --next-hue: {data.outline[i + 1]?.hue ?? module.hue}"
		>
			{#if i < data.outline.length - 1}<span class="trail" aria-hidden="true"></span>{/if}
			<a href={module.href} class="node" tabindex="-1" aria-hidden="true">
				<svg viewBox="0 0 64 64">
					<circle cx="32" cy="32" r="28" pathLength="100" class="track" />
					<circle
						cx="32"
						cy="32"
						r="28"
						pathLength="100"
						class="fill"
						style="stroke-dasharray: {(done / module.lessons.length) * 100} 100"
					/>
				</svg>
				<span>{module.number}</span>
			</a>
			<div class="card">
				<h3 class="text-xl font-[800] tracking-tight">
					<a href={module.href} class="hover:underline">
						<span class="sr-only">Module {module.number}: </span>{module.title}
					</a>
				</h3>
				<p class="mt-1 text-muted">{module.summary}</p>
				<ol class="pips mt-3" aria-label="Lessons in {module.title}">
					{#each module.lessons as lesson (lesson.id)}
						<li>
							<a
								href={lesson.href}
								title={lesson.title}
								aria-label="{lesson.title}{progress.done.has(lesson.id) ? ', done' : ''}"
								data-done={progress.done.has(lesson.id) || undefined}
								aria-current={lesson === next ? 'step' : undefined}
							></a>
						</li>
					{/each}
				</ol>
				<p class="mt-2 text-sm text-muted tabular-nums">
					{done}/{module.lessons.length} done · {module.lessons.reduce((n, l) => n + l.minutes, 0)} min
				</p>
			</div>
		</li>
	{/each}
</ol>

<style>
	.overall {
		position: relative;
		width: 9rem;
		justify-self: center;
		& svg {
			rotate: -90deg;
		}
		& circle {
			fill: none;
			stroke-width: 9;
		}
		& .track {
			stroke: color-mix(in oklch, var(--paper) 18%, transparent);
		}
		& .fill {
			stroke: var(--accent);
			stroke-linecap: round;
			transition: stroke-dasharray var(--duration-very-slow) var(--ease-smooth-out);
		}
		& span {
			position: absolute;
			inset: 0;
			display: grid;
			place-content: center;
			text-align: center;
			font-size: 0.8rem;
			opacity: 0.85;
		}
		& strong {
			display: block;
			font-size: 1.6rem;
			line-height: 1.1;
		}
	}

	/* The route: one station per module on a trail that changes colour as it goes. */
	.route {
		--node: 4rem;
		--gap: 2.5rem;
		display: grid;
		gap: var(--gap);
	}

	.station {
		position: relative;
		display: grid;
		grid-template-columns: var(--node) minmax(0, 1fr);
		column-gap: 1.25rem;
		align-items: start;
		scroll-margin-top: 1.5rem;
	}

	.trail {
		position: absolute;
		left: calc(var(--node) / 2 - 3px);
		top: var(--node);
		bottom: calc(-1 * var(--gap));
		width: 6px;
		border-radius: 3px;
		background: linear-gradient(oklch(0.62 0.13 var(--hue)), oklch(0.62 0.13 var(--next-hue)));
		transform-origin: top;
		animation: draw linear both;
		animation-timeline: view();
		animation-range: entry 10% cover 45%;
	}

	.station[data-state='ahead'] .trail,
	.station[data-state='here'] .trail {
		opacity: 0.35;
		mask: repeating-linear-gradient(#000 0 8px, transparent 8px 16px);
	}

	@keyframes draw {
		from {
			scale: 1 0;
		}
	}

	.node {
		position: relative;
		display: grid;
		place-items: center;
		width: var(--node);
		height: var(--node);
		border-radius: 50%;
		background: var(--paper);
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		color: var(--accent);
		& svg {
			position: absolute;
			inset: 0;
			rotate: -90deg;
		}
		& circle {
			fill: var(--accent-soft);
			stroke-width: 5;
		}
		& .track {
			stroke: var(--accent-line);
		}
		& .fill {
			fill: none;
			stroke: var(--accent);
			stroke-linecap: round;
		}
		& span {
			position: relative;
		}
	}

	.station[data-state='here'] .node {
		box-shadow:
			0 0 0 4px var(--paper),
			0 0 0 7px var(--accent);
	}

	.station[data-state='done'] .node {
		color: var(--accent-ink);
		& circle {
			fill: var(--accent);
		}
	}

	.card {
		padding-top: 0.6rem;
	}

	.pips {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		& a {
			display: block;
			width: 1.6rem;
			height: 0.6rem;
			border-radius: 999px;
			background: var(--accent-line);
			transition: background-color var(--duration-quick) var(--ease-out);
			&:hover {
				background: var(--accent);
			}
			&[data-done] {
				background: var(--accent);
			}
			&[aria-current='step'] {
				background: var(--paper);
				box-shadow: inset 0 0 0 2px var(--accent);
			}
		}
	}

	/* Wide screens: the trail runs down the middle and stations alternate sides. */
	@media (min-width: 52rem) {
		.route {
			--node: 4.5rem;
			--gap: 1rem;
		}
		.station {
			grid-template-columns: minmax(0, 1fr) var(--node) minmax(0, 1fr);
			column-gap: 2rem;
		}
		.node {
			grid-column: 2;
			grid-row: 1;
		}
		.trail {
			left: calc(50% - 3px);
		}
		.station[data-side='left'] .card {
			grid-column: 1;
			grid-row: 1;
			text-align: right;
			& .pips {
				justify-content: flex-end;
			}
		}
		.station[data-side='right'] .card {
			grid-column: 3;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.trail {
			animation: none;
		}
	}
</style>
