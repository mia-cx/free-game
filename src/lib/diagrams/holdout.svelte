<script lang="ts">
	/**
	 * Why a holdout is the only honest measure of a flow (or of ads): it compares the revenue the
	 * flow is credited with against what it adds over a group that got nothing. As taught in
	 * "Keep the users you get" and "Run paid ads you can measure". All numbers are a made-up example.
	 */
	const CUSTOMERS = 1000;
	const FLOW_SPEND = 40;
	const DOTS = 100;

	let holdoutPct = $state(10);
	let lift = $state(4);

	const holdout = $derived(Math.round((CUSTOMERS * holdoutPct) / 100));
	const reached = $derived(CUSTOMERS - holdout);
	const credited = $derived(reached * FLOW_SPEND);
	const added = $derived(reached * lift);
	const given = $derived(holdout * lift);

	const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
	const width = (value: number) => `${(value / (CUSTOMERS * FLOW_SPEND)) * 100}%`;
</script>

<figure class="diagram">
	<div class="crowd" aria-hidden="true">
		{#each { length: DOTS }, i}
			<span class:held={i >= DOTS - holdoutPct}></span>
		{/each}
	</div>
	<p class="legend mt-2 text-sm text-muted">
		<span><i class="swatch"></i>{reached.toLocaleString('en-US')} get the flow</span>
		<span><i class="swatch held"></i>{holdout.toLocaleString('en-US')} get nothing</span>
	</p>

	<div class="controls mt-5">
		<label>
			<span class="row"><span>Held out</span><b>{holdoutPct}%</b></span>
			<input type="range" min="5" max="50" step="5" bind:value={holdoutPct} aria-valuetext="{holdoutPct}%" />
		</label>
		<label>
			<span class="row"><span>Extra spend per customer who got the flow</span><b>{money.format(lift)}</b></span>
			<input type="range" min="0" max="20" step="1" bind:value={lift} aria-valuetext={money.format(lift)} />
		</label>
	</div>

	<div class="bars mt-5">
		<div>
			<p class="row text-sm"><span>Credited without a holdout</span><b>{money.format(credited)}</b></p>
			<div class="track"><div class="bar credited" style="width: {width(credited)}"></div></div>
		</div>
		<div>
			<p class="row text-sm"><span>What the flow really added</span><b>{money.format(added)}</b></p>
			<div class="track"><div class="bar" style="width: {width(added)}"></div></div>
		</div>
	</div>
	<div class="mt-4" aria-live="polite">
		<p class="diagram-output">
			{added === 0
				? 'The flow added nothing. Everyone who got it would have bought anyway.'
				: `The flow earned ${money.format(added)}, not ${money.format(credited)}.`}
		</p>
		<p class="text-sm text-muted">
			{given === 0
				? 'Holding customers back cost nothing.'
				: `Holding ${holdout.toLocaleString('en-US')} customers back cost ${money.format(given)} in sales to learn that.`}
		</p>
	</div>

	<figcaption>
		An example with round numbers: {CUSTOMERS.toLocaleString('en-US')} customers, and people who get the flow spend
		{money.format(FLOW_SPEND)} each. The same test works for ads, with regions in place of customers.
	</figcaption>
</figure>

<style>
	.crowd {
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		gap: 3px;
		max-width: 22rem;
		& span {
			aspect-ratio: 1;
			border-radius: 50%;
			background: var(--accent);
			border: 1.5px solid var(--accent);
			transition: background-color var(--duration-quick) var(--ease-out);
		}
		& span.held {
			background: var(--paper);
			border-color: var(--muted);
		}
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
	}

	.swatch {
		display: inline-block;
		width: 0.65rem;
		height: 0.65rem;
		margin-right: 0.35rem;
		border-radius: 50%;
		background: var(--accent);
		border: 1.5px solid var(--accent);
		vertical-align: -0.05rem;
		&.held {
			background: var(--paper);
			border-color: var(--muted);
		}
	}

	.controls {
		display: grid;
		gap: 0.9rem;
		& label {
			display: grid;
			gap: 0.2rem;
			font-size: 0.875rem;
		}
		& input {
			width: 100%;
			accent-color: var(--accent);
		}
	}

	.row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		& b {
			font-variant-numeric: tabular-nums;
			white-space: nowrap;
		}
	}

	.bars {
		display: grid;
		gap: 0.75rem;
	}

	.track {
		height: 0.9rem;
		margin-top: 0.2rem;
		border-radius: 999px;
		background: var(--paper);
		border: 1px solid var(--accent-line);
		overflow: hidden;
	}

	.bar {
		height: 100%;
		background: var(--accent);
		transition: width var(--duration-medium) var(--ease-smooth-out);
		&.credited {
			background: var(--muted);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.crowd span,
		.bar {
			transition: none;
		}
	}
</style>
