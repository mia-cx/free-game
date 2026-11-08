<script lang="ts">
	/**
	 * A page's click rate against Borja Fat's typical CTR for its Google position, as taught in
	 * "Test titles for quick wins". A page 40% or more below its benchmark is a title-test target.
	 */
	const benchmarks = [
		{ position: 3, ctr: 9 },
		{ position: 4, ctr: 6 },
		{ position: 5, ctr: 4 }
	];
	/** CTR at the right end of every track, in percent. */
	const SCALE = 12;
	/** Share of the benchmark at or below which a page is an underperformer: 40% or more below. */
	const UNDERPERFORMER = 0.6;

	const id = $props.id();
	let position = $state(4);
	let ctr = $state(2);

	const bench = $derived(benchmarks.find((b) => b.position === position)?.ctr ?? benchmarks[1].ctr);
	const line = $derived(Math.round(bench * UNDERPERFORMER * 10) / 10);
	const gap = $derived(Math.round((1 - ctr / bench) * 100));
	const under = $derived(ctr <= line);

	const percent = (value: number) => `${Number(value.toFixed(1))}%`;
	const along = (value: number) => `${(Math.min(value, SCALE) / SCALE) * 100}%`;

	const verdict = $derived(under ? 'CTR underperformer' : 'Not an underperformer');
	const detail = $derived(
		under
			? `${percent(ctr)} is ${gap}% below the ${bench}% benchmark for position ${position}. Test a new title.`
			: ctr < bench
				? `${percent(ctr)} is ${gap}% below the ${bench}% benchmark. Underperformers sit at ${percent(line)} or less.`
				: `${percent(ctr)} is at or above the ${bench}% benchmark for position ${position}.`
	);
</script>

<figure class="diagram">
	<div class="chart" role="group" aria-label="Google position">
		{#each benchmarks as b (b.position)}
			<button type="button" class="row" aria-pressed={position === b.position} onclick={() => (position = b.position)}>
				<span class="label">Position {b.position}</span>
				<span class="track"><span class="bar" style="width: {along(b.ctr)}"></span></span>
				<span class="value">{b.ctr}%</span>
			</button>
		{/each}

		<div class="row yours" class:under>
			<label class="label" for="{id}-ctr">Your page</label>
			<span class="track">
				<span class="zone" style="width: {along(line)}"></span>
				<span class="bar" style="width: {along(ctr)}"></span>
				<span class="tick" style="left: {along(bench)}"></span>
				<input id="{id}-ctr" type="range" min="0" max={SCALE} step="0.1" bind:value={ctr} aria-valuetext={percent(ctr)} />
			</span>
			<output class="value" for="{id}-ctr">{percent(ctr)}</output>
		</div>
	</div>

	<div class="mt-5" aria-live="polite">
		<p class="diagram-output">{verdict}</p>
		<p class="text-sm text-muted">{detail}</p>
	</div>

	<figcaption>
		Typical click rates by position from Borja Fat's own sites, not an industry standard. The shaded stretch is 40% or
		more below the benchmark: a CTR underperformer.
	</figcaption>
</figure>

<style>
	.chart {
		display: grid;
		grid-template-columns: max-content minmax(0, 1fr) 2.75rem;
		gap: 0.3rem 0.6rem;
	}

	.row {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		align-items: center;
		border: 1.5px solid transparent;
		border-radius: 10px;
		padding: 0.4rem 0.6rem;
		text-align: left;
		transition:
			background-color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out);
	}

	button.row:hover {
		border-color: var(--accent-line);
	}

	button.row[aria-pressed='true'] {
		background: var(--paper);
		border-color: var(--accent);
		& .label {
			font-weight: 750;
		}
		& .bar {
			background: var(--accent);
		}
	}

	.label {
		font-size: 0.85rem;
		font-weight: 600;
	}

	.value {
		font-variant-numeric: tabular-nums;
		font-weight: 700;
		text-align: right;
	}

	.track {
		position: relative;
		height: 1.5rem;
		display: flex;
		align-items: center;
	}

	.bar {
		height: 0.75rem;
		border-radius: 0 4px 4px 0;
		background: var(--accent-line);
		transition: background-color var(--duration-quick) var(--ease-out);
	}

	.yours {
		margin-top: 0.5rem;
		border-top: 1px solid var(--accent-line);
		border-radius: 0;
		padding-top: 0.85rem;

		& .bar {
			background: var(--accent);
		}
		&.under .bar {
			background: var(--risk-edge);
		}
		& .label {
			font-weight: 750;
		}
	}

	.zone {
		position: absolute;
		inset-block: 0;
		left: 0;
		background: var(--risk-bg);
		border-right: 2px dashed var(--risk-edge);
		transition: width var(--duration-fast) var(--ease-smooth-out);
	}

	.zone + .bar {
		position: relative;
	}

	.tick {
		position: absolute;
		inset-block: -0.2rem;
		width: 2px;
		margin-left: -1px;
		background: var(--ink);
		transition: left var(--duration-fast) var(--ease-smooth-out);
	}

	input[type='range'] {
		position: absolute;
		inset: 0;
		width: 100%;
		margin: 0;
		appearance: none;
		background: transparent;
		cursor: pointer;

		&::-webkit-slider-runnable-track {
			height: 100%;
			background: transparent;
		}
		&::-moz-range-track {
			background: transparent;
		}
		&::-webkit-slider-thumb {
			appearance: none;
			width: 0.5rem;
			height: 1.5rem;
			border: 2px solid var(--paper);
			border-radius: 4px;
			background: var(--ink);
		}
		&::-moz-range-thumb {
			width: 0.5rem;
			height: 1.5rem;
			border: 2px solid var(--paper);
			border-radius: 4px;
			background: var(--ink);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.row,
		.bar,
		.zone,
		.tick {
			transition: none;
		}
	}
</style>
