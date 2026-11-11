<script lang="ts">
	import type { Outline } from '#lib/course.ts';
	import { progress } from '#lib/progress.svelte.ts';

	/**
	 * The course as a route: one station per module on a trail that changes colour as it goes.
	 * Shows the reader's progress; the module holding their next lesson is marked "here".
	 */
	let { outline }: { outline: Outline } = $props();

	const next = $derived(outline.flatMap((m) => m.lessons).find((l) => !progress.done.has(l.id)));

	const doneIn = (module: Outline[number]) => module.lessons.filter((l) => progress.done.has(l.id)).length;
</script>

<ol class="route">
	{#each outline as module, i (module.slug)}
		{@const done = doneIn(module)}
		{@const state = done === module.lessons.length ? 'done' : module.slug === next?.module ? 'here' : 'ahead'}
		<li
			id={module.slug}
			class="station"
			data-hue
			data-state={state}
			data-side={i % 2 ? 'right' : 'left'}
			style="--hue: {module.hue}; --next-hue: {outline[i + 1]?.hue ?? module.hue}"
		>
			{#if i < outline.length - 1}<span class="trail" aria-hidden="true"></span>{/if}
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
								aria-current={lesson.id === next?.id ? 'step' : undefined}
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
		/* A round cap on a zero-length stroke still draws a dot. */
		& .fill[style*='stroke-dasharray: 0 '] {
			visibility: hidden;
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
		text-wrap: pretty;
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
