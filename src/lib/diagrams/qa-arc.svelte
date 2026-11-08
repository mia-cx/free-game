<script lang="ts">
	/**
	 * The review ladder: a new bot starts at full review and earns less review with clean runs.
	 * Thresholds are @huntkyle's, as taught in "Check the work before it ships".
	 */
	const MAX_RUNS = 20;

	const levels = [
		{ review: 100, label: 'Review every run', earnedAt: 0 },
		{ review: 50, label: 'Review half', earnedAt: 9 },
		{ review: 10, label: 'Spot checks', earnedAt: 18 }
	];

	let clean = $state(0);
	/** The level a step back up left you on. Clean runs can only lower review from here. */
	let floor = $state(0);

	const earned = $derived(levels.findLastIndex((l) => clean >= l.earnedAt));
	const level = $derived(Math.max(floor, earned));

	const sentence = $derived(
		[
			'Review every run. Once 9 of the last 10 pass clean, review half.',
			'Review half the runs. Once 18 of the last 20 pass clean, switch to spot checks.',
			'Spot check 1 run in 10.'
		][level]
	);

	function stepBack() {
		floor = level - 1;
		clean = 0;
	}
</script>

<figure class="diagram">
	<ol class="levels" aria-hidden="true">
		{#each levels as l, i (l.review)}
			<li class:current={level === i}>
				<span class="bar" style="--review: {l.review}"></span>
				<b>{l.review}%</b>
				<span class="label">{l.label}</span>
			</li>
		{/each}
	</ol>

	<label class="mt-5 block text-sm">
		<span class="row"><span>Clean runs in a row</span><b>{clean}</b></span>
		<input type="range" min="0" max={MAX_RUNS} bind:value={clean} />
	</label>
	<div class="ticks" aria-hidden="true">
		{#each levels.slice(1) as l (l.earnedAt)}
			<span style="--at: {l.earnedAt / MAX_RUNS}">{l.earnedAt}</span>
		{/each}
	</div>

	<button type="button" class="diagram-chip mt-3" disabled={level === 0} onclick={stepBack}>
		Fixed the same thing two weeks running
	</button>

	<p class="diagram-output mt-4" aria-live="polite">{sentence}</p>

	<figcaption>
		Bar height is the share of runs you review. Fixing the same thing two weeks running sends the bot back up a stage,
		and the count starts again. Thresholds from @huntkyle.
	</figcaption>
</figure>

<style>
	.levels {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
		align-items: end;

		& li {
			display: grid;
			gap: 0.1rem;
			color: var(--muted);
			transition: color var(--duration-fast) var(--ease-out);
		}
		& .bar {
			height: calc(var(--review) * 0.07rem + 0.25rem);
			margin-bottom: 0.35rem;
			border-radius: 8px 8px 3px 3px;
			background: var(--paper);
			border: 1.5px solid var(--accent-line);
			transition:
				background-color var(--duration-fast) var(--ease-out),
				border-color var(--duration-fast) var(--ease-out);
		}
		& b {
			font-size: 1.15rem;
			font-variant-numeric: tabular-nums;
		}
		& .label {
			font-size: 0.8rem;
			line-height: 1.3;
		}
		& li.current {
			color: var(--ink);
			& .bar {
				background: var(--accent);
				border-color: var(--accent);
			}
		}
	}

	.row {
		display: flex;
		justify-content: space-between;
		& b {
			font-variant-numeric: tabular-nums;
		}
	}

	input[type='range'] {
		width: 100%;
		accent-color: var(--accent);
	}

	/* Tick under each threshold; 16px is the range thumb, whose centre stops 8px from each end. */
	.ticks {
		position: relative;
		height: 1.1rem;
		font-size: 0.75rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
		& span {
			position: absolute;
			left: calc(var(--at) * (100% - 16px) + 8px);
			translate: -50% 0;
			border-top: 1.5px solid var(--muted);
			padding-top: 0.1rem;
		}
	}

	.diagram-chip:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.levels li,
		.levels .bar {
			transition: none;
		}
	}
</style>
