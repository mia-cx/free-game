<script lang="ts">
	import { progress } from '#lib/progress.svelte.ts';
	import { review } from '#lib/review.svelte.ts';
	import Route from '#lib/Route.svelte';
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();

	const lessons = $derived(data.outline.flatMap((m) => m.lessons));
	const next = $derived(lessons.find((l) => !progress.done.has(l.id)));
	const nextModule = $derived(data.outline.find((m) => m.slug === next?.module));
	const percent = $derived(Math.round((progress.done.size / lessons.length) * 100));
	const due = $derived(review.due().length);
</script>

<!-- The reader's own progress view; the landing page carries the same route for search. -->
<Seo title="Your map · Free Game" noindex />

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
<div class="mt-14"><Route outline={data.outline} /></div>

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
</style>
