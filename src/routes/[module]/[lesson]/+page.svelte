<script lang="ts">
	import { goto } from '$app/navigation';
	import { progress } from '#lib/progress.svelte.ts';

	let { data } = $props();

	const lessons = $derived(data.outline.flatMap((m) => m.lessons));
	const index = $derived(lessons.findIndex((l) => l.id === data.lesson.id));
	const prev = $derived(lessons[index - 1]);
	const next = $derived(lessons[index + 1]);
	const module = $derived(data.outline.find((m) => m.slug === data.lesson.module)!);
	const position = $derived(module.lessons.findIndex((l) => l.id === data.lesson.id));
	const done = $derived(progress.done.has(data.lesson.id));

	const finish = () => {
		progress.set(data.lesson.id, true);
		goto(next?.href ?? '/');
	};

	/** ← and → move between lessons, unless the reader is typing or using a modifier. */
	const onkeydown = (event: KeyboardEvent) => {
		if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
		if (event.target instanceof HTMLElement && event.target.closest('input, textarea, [contenteditable]')) return;
		const target = event.key === 'ArrowLeft' ? prev : event.key === 'ArrowRight' ? next : undefined;
		if (target) goto(target.href);
	};
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<title>{data.lesson.title} · Free Game</title>
	<meta name="description" content={data.lesson.summary} />
</svelte:head>

<nav aria-label="Lessons in this module" class="flex flex-wrap items-center gap-x-4 gap-y-2">
	<a href="/#{module.slug}" class="font-semibold hover:underline">
		<span class="font-mono text-muted">{String(module.number).padStart(2, '0')}</span>
		{module.title}
	</a>
	<ol class="flex gap-1.5">
		{#each module.lessons as lesson, i (lesson.id)}
			<li>
				<a
					href={lesson.href}
					title={lesson.title}
					aria-label="Lesson {i + 1}: {lesson.title}"
					aria-current={i === position ? 'page' : undefined}
					class="block h-2.5 w-6 rounded-full {i === position
						? 'bg-ink'
						: progress.done.has(lesson.id)
							? 'bg-go'
							: 'bg-line hover:bg-muted'}"
				></a>
			</li>
		{/each}
	</ol>
	<span class="text-sm text-muted tabular-nums">{position + 1} of {module.lessons.length}</span>
</nav>

<div class="mt-8 lg:grid lg:grid-cols-[minmax(0,40rem)_14rem] lg:justify-between lg:gap-12">
	<article>
		<h1 class="text-4xl leading-[1.1] font-[800] tracking-tight sm:text-5xl">{data.lesson.title}</h1>
		<div class="lesson mt-8">
			{@html data.lesson.html}
		</div>
	</article>
	{#if data.lesson.sections.length > 1}
		<nav aria-label="In this lesson" class="hidden lg:block">
			<ol class="sticky top-8 space-y-2 border-l-2 border-line pl-4 text-[0.9rem] text-muted">
				{#each data.lesson.sections as section (section.id)}
					<li><a href="#{section.id}" class="hover:text-ink">{section.title}</a></li>
				{/each}
			</ol>
		</nav>
	{/if}
</div>

<footer class="mt-14 flex max-w-[40rem] flex-wrap items-center gap-4 border-t border-line pt-6">
	{#if prev}
		<a href={prev.href} class="mr-auto text-muted hover:text-ink">
			<span aria-hidden="true">←</span> {prev.title}
		</a>
	{:else}
		<span class="mr-auto"></span>
	{/if}
	{#if done}
		<button type="button" class="text-sm text-muted underline" onclick={() => progress.set(data.lesson.id, false)}>
			Mark as not done
		</button>
	{/if}
	<button
		type="button"
		onclick={finish}
		class="inline-flex items-center gap-2 rounded-full bg-go px-6 py-3 text-lg font-bold text-go-ink hover:brightness-110"
	>
		{#if next}
			{done ? 'Next lesson' : 'Done, next lesson'} <span aria-hidden="true">→</span>
		{:else}
			{done ? 'Back to the map' : 'Done, finish the course'}
		{/if}
	</button>
</footer>
