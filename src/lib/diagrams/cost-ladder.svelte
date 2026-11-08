<script lang="ts">
	/**
	 * Where an AI video error gets caught decides how much work it takes to fix. Stages and rules
	 * are @EianLu's workflow, as taught in "Plan an AI video before you pay for it".
	 */
	const stages = [
		{ name: 'Text', cost: 'Free', chip: 'Caught in text', fix: 'Edit the prompt. Nothing else is redone.' },
		{ name: 'Image', cost: 'Cheap', chip: 'Caught in an image', fix: 'Fix the prompt, then draw the frames again.' },
		{
			name: 'Video',
			cost: 'Billed per second',
			chip: 'Caught in video',
			fix: 'Try a fix in code first. If that fails, fix the prompt, redraw the frames and pay for every second again.'
		}
	];

	const rules = [
		'No images until you approve the story.',
		'No final shots until you approve the style.',
		'A separate reviewer passes every prompt and frame before any video is paid for.'
	];

	let caught = $state(0);
	const selected = $derived(stages[caught]);
</script>

<figure class="diagram">
	<div class="diagram-chips" role="group" aria-label="Where the error is caught">
		{#each stages as stage, i (stage.name)}
			<button type="button" class="diagram-chip" aria-pressed={caught === i} onclick={() => (caught = i)}>
				{stage.chip}
			</button>
		{/each}
	</div>

	<ol class="ladder mt-5">
		{#each stages as stage, i (stage.name)}
			<li class:redo={i <= caught} style="--step: {i}">
				<span class="name">{stage.name}</span>
				<span class="cost">{stage.cost}</span>
				<span class="tag" aria-hidden={i > caught}>Redo</span>
			</li>
		{/each}
	</ol>

	<p class="diagram-output mt-4" aria-live="polite">{selected.fix}</p>

	<p class="mt-5 text-sm font-[700]">Three rules keep errors early:</p>
	<ol class="rules mt-2 text-sm">
		{#each rules as rule (rule)}
			<li>{rule}</li>
		{/each}
	</ol>

	<figcaption>
		Each stage costs more to redo than the one before. Workflow from @EianLu, who credits these rules for his low reroll
		rate.
	</figcaption>
</figure>

<style>
	.ladder {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: end;
		gap: 0.4rem;

		& li {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			gap: 0.15rem;
			min-height: calc(4.25rem + var(--step) * 2.25rem);
			padding: 0.6rem 0.65rem;
			border: 1.5px solid var(--accent-line);
			border-radius: 10px;
			background: var(--paper);
			transition:
				background-color var(--duration-fast) var(--ease-out),
				border-color var(--duration-fast) var(--ease-out),
				color var(--duration-fast) var(--ease-out);
		}
		& .name {
			font-weight: 750;
		}
		& .cost {
			font-size: 0.8rem;
			line-height: 1.3;
			color: var(--muted);
			transition: color var(--duration-fast) var(--ease-out);
		}
		& .tag {
			order: -1;
			align-self: flex-start;
			margin-bottom: auto;
			font-size: 0.75rem;
			font-weight: 750;
			opacity: 0;
			translate: 0 var(--distance-micro);
			transition:
				opacity var(--duration-fast) var(--ease-out),
				translate var(--duration-fast) var(--ease-smooth-out);
		}
		& li.redo {
			background: var(--accent);
			border-color: var(--accent);
			color: var(--accent-ink);
			& .cost {
				color: var(--accent-ink);
			}
			& .tag {
				opacity: 1;
				translate: 0 0;
			}
		}
	}

	.rules {
		list-style: decimal;
		padding-left: 1.25rem;
		& li + li {
			margin-top: 0.25rem;
		}
		& li::marker {
			color: var(--muted);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ladder li,
		.ladder .cost,
		.ladder .tag {
			transition: none;
		}
	}
</style>
