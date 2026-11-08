<script lang="ts">
	import { progress } from '#lib/progress.svelte.ts';
	import Check from '#lib/Check.svelte';

	let { data } = $props();

	const lessons = $derived(data.outline.flatMap((m) => m.lessons));
	const next = $derived(lessons.find((l) => !progress.done.has(l.id)));
	const nextModule = $derived(data.outline.find((m) => m.slug === next?.module));
	const started = $derived(progress.done.size > 0);
</script>

<svelte:head>
	<title>Free Game</title>
	<meta name="description" content="Marketing and growth from zero, rewritten from the best free posts on X." />
</svelte:head>

<section class="rounded-2xl bg-ink p-6 text-paper sm:p-8">
	{#if next && nextModule}
		<p class="text-sm font-semibold opacity-70">Module {nextModule.number} · {nextModule.title}</p>
		<h1 class="mt-2 text-3xl leading-tight font-[800] tracking-tight sm:text-4xl">{next.title}</h1>
		<p class="mt-3 max-w-2xl text-lg opacity-85">{next.summary}</p>
		<a
			href={next.href}
			class="mt-6 inline-flex items-center gap-2 rounded-full bg-go px-6 py-3 text-lg font-bold text-go-ink hover:brightness-110"
		>
			{started ? 'Continue' : 'Start the course'} <span aria-hidden="true">→</span>
		</a>
	{:else}
		<h1 class="text-3xl font-[800] tracking-tight">You finished every lesson.</h1>
		<a href="/tricks" class="mt-6 inline-flex rounded-full bg-go px-6 py-3 text-lg font-bold text-go-ink">
			Browse the tricks <span aria-hidden="true">→</span>
		</a>
	{/if}
</section>

<ol class="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
	{#each data.outline as module (module.slug)}
		{@const done = module.lessons.filter((l) => progress.done.has(l.id)).length}
		<li id={module.slug} class="scroll-mt-6">
			<div class="flex items-baseline gap-3 border-b-2 border-ink pb-2">
				<span class="font-mono text-muted tabular-nums">{String(module.number).padStart(2, '0')}</span>
				<h2 class="mr-auto text-xl font-[800] tracking-tight">{module.title}</h2>
				<span class="text-sm text-muted tabular-nums">{done}/{module.lessons.length}</span>
			</div>
			<p class="mt-3 text-muted">{module.summary}</p>
			<ol class="mt-3">
				{#each module.lessons as lesson (lesson.id)}
					<li>
						<a
							href={lesson.href}
							class="group -mx-2 flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-surface"
							aria-current={lesson === next ? 'step' : undefined}
						>
							<Check done={progress.done.has(lesson.id)} />
							<span class="group-aria-[current=step]:font-bold">{lesson.title}</span>
						</a>
					</li>
				{/each}
			</ol>
		</li>
	{/each}
</ol>
