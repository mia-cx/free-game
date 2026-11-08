<script lang="ts">
	import { diagrams } from '#lib/diagrams/index.ts';

	/** Every diagram at lesson width, under each module's colour. For building and checking diagrams. */
	let { data } = $props();

	let hue = $state(25);
	const names = Object.keys(diagrams).sort();
</script>

<svelte:head>
	<title>Diagram lab · Free Game</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<h1 class="text-3xl font-[800]">Diagram lab</h1>
<div class="diagram-chips mt-4" role="group" aria-label="Module colour">
	{#each data.outline as module (module.slug)}
		<button
			type="button"
			class="diagram-chip"
			data-hue
			style="--hue: {module.hue}"
			aria-pressed={hue === module.hue}
			onclick={() => (hue = module.hue)}>{module.number}</button
		>
	{/each}
</div>

<div class="mt-8 max-w-[40rem]" data-hue style="--hue: {hue}">
	{#each names as name (name)}
		{@const Component = diagrams[name]}
		<section id={name} class="mb-16">
			<h2 class="font-mono text-sm text-muted">{name}</h2>
			<Component />
		</section>
	{/each}
</div>
