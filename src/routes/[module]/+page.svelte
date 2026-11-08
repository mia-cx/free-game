<script lang="ts">
	import Check from '#lib/Check.svelte';
	import Diagram from '#lib/Diagram.svelte';
	import { progress } from '#lib/progress.svelte.ts';

	let { data } = $props();

	const index = $derived(data.outline.findIndex((m) => m.slug === data.slug));
	const module = $derived(data.outline[index]);
	const prev = $derived(data.outline[index - 1]);
	const next = $derived(data.outline[index + 1]);
	const done = $derived(module.lessons.filter((l) => progress.done.has(l.id)).length);
	const minutes = $derived(module.lessons.reduce((n, l) => n + l.minutes, 0));
	const nextLesson = $derived(module.lessons.find((l) => !progress.done.has(l.id)));
</script>

<svelte:head>
	<title>{module.title} · Free Game</title>
	<meta name="description" content={module.summary} />
</svelte:head>

<div data-hue style="--hue: {module.hue}">
	<nav aria-label="Modules" class="flex items-center gap-4 text-sm font-semibold">
		<a href="/#{module.slug}" class="mr-auto text-muted hover:text-ink"><span aria-hidden="true">←</span> Map</a>
		{#if prev}<a href={prev.href} class="text-muted hover:text-ink" title={prev.title}>Module {prev.number}</a>{/if}
		{#if next}<a href={next.href} class="text-muted hover:text-ink" title={next.title}>Module {next.number}</a>{/if}
	</nav>

	<header class="hero mt-6 grid items-end gap-x-8 gap-y-2 sm:grid-cols-[auto_1fr]">
		<span class="numeral" aria-hidden="true">{module.number}</span>
		<div class="pb-2">
			<h1 class="text-4xl leading-[1.05] font-[800] tracking-tight sm:text-5xl">
				<span class="sr-only">Module {module.number}: </span>{module.title}
			</h1>
			<p class="mt-3 max-w-2xl text-lg text-muted">{module.summary}</p>
		</div>
	</header>

	<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
		{#if nextLesson}
			<a
				href={nextLesson.href}
				class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-lg font-bold text-accent-ink hover:brightness-110"
			>
				{done ? 'Continue' : 'Start the module'} <span aria-hidden="true">→</span>
			</a>
		{:else if next}
			<a
				href={next.href}
				class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-lg font-bold text-accent-ink hover:brightness-110"
			>
				Next module <span aria-hidden="true">→</span>
			</a>
		{/if}
		<p class="text-muted tabular-nums">
			{done} of {module.lessons.length} lessons done · {minutes} min · {data.tricks}
			{data.tricks === 1 ? 'trick' : 'tricks'}
		</p>
	</div>

	<div class="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)]">
		<ol class="steps">
			{#each module.lessons as lesson (lesson.id)}
				<li>
					<a href={lesson.href} class="step" aria-current={lesson === nextLesson ? 'step' : undefined}>
						<Check done={progress.done.has(lesson.id)} />
						<span class="min-w-0">
							<span class="block text-lg font-bold leading-snug">{lesson.title}</span>
							<span class="mt-1 block text-muted">{lesson.summary}</span>
							<span class="mt-1 block text-sm text-muted tabular-nums">{lesson.minutes} min</span>
						</span>
					</a>
				</li>
			{/each}
		</ol>

		{#if module.diagram}
			<div class="lg:sticky lg:top-6 [&_.diagram]:mt-0">
				<Diagram name={module.diagram} />
			</div>
		{/if}
	</div>
</div>

<style>
	.numeral {
		font-size: clamp(5rem, 16vw, 10rem);
		line-height: 0.8;
		font-weight: 800;
		letter-spacing: -0.06em;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}

	.steps {
		& li + li {
			margin-top: 0.25rem;
		}
	}

	.step {
		display: flex;
		gap: 1rem;
		padding: 0.9rem 1rem;
		margin-inline: -1rem;
		border-radius: 14px;
		transition: background-color var(--duration-quick) var(--ease-out);
		&:hover {
			background: var(--accent-soft);
		}
		&[aria-current='step'] {
			background: var(--accent-soft);
			box-shadow: inset 4px 0 0 var(--accent);
		}
	}
</style>
