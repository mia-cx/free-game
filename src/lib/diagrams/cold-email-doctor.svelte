<script lang="ts">
	/**
	 * A cold email campaign's failure pattern, traced to its cause and fix. Rules and benchmark
	 * from @coldemailchris's cheat sheet, as taught in "Fix cold email by its symptoms".
	 */
	const branches = [
		{
			symptom: '0 replies, 0 bounces',
			cause: "You're landing in spam",
			fix: 'Fix the sending setup before touching copy, and turn off open-rate tracking.'
		},
		{ symptom: 'Replies, but no interest', cause: 'The offer', fix: "Change what you're offering." },
		{ symptom: 'Bounces over 2%', cause: 'The list', fix: 'Clean or replace the list.' }
	];

	let symptom = $state(branches[0].symptom);
	const picked = $derived(branches.find((b) => b.symptom === symptom) ?? branches[0]);
</script>

<figure class="diagram doctor">
	<ul class="tree" role="group" aria-label="Symptom">
		{#each branches as b (b.symptom)}
			{@const lit = symptom === b.symptom}
			<li class="branch" class:lit>
				<button type="button" class="diagram-chip" aria-pressed={lit} onclick={() => (symptom = b.symptom)}>
					{b.symptom}
				</button>
				<p class="node"><span class="key">Cause</span> {b.cause}</p>
				<p class="node"><span class="key">Fix</span> {b.fix}</p>
			</li>
		{/each}
	</ul>
	<p class="sr-only" aria-live="polite">Cause: {picked.cause}. Fix: {picked.fix}</p>

	<p class="benchmark mt-5">
		<strong>What good looks like:</strong> 1 lead per 300 contacts is a great campaign. 1 per 500 is still solid.
	</p>

	<figcaption>
		Each failure pattern points at one part of the campaign, so fix only that part. Rules and benchmark from
		@coldemailchris's cold email cheat sheet, with no data shown behind them.
	</figcaption>
</figure>

<style>
	.doctor {
		container-type: inline-size;
	}

	.tree {
		display: grid;
		gap: 0.6rem;
	}

	.branch {
		display: grid;
		gap: 0.4rem;
		justify-items: start;
	}

	.diagram-chip {
		text-align: left;
	}

	.node {
		--edge: var(--line);
		--elbow: 1rem;
		position: relative;
		margin-left: calc(var(--elbow) + 0.25rem);
		border: 1.5px solid var(--edge);
		border-radius: 10px;
		padding: 0.4rem 0.7rem;
		background: var(--paper);
		color: var(--muted);
		transition:
			color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out),
			background-color var(--duration-quick) var(--ease-out);

		/* Elbow joining the node to the one above it. */
		&::before {
			content: '';
			position: absolute;
			left: calc(-1 * var(--elbow) - 1.5px);
			bottom: 50%;
			width: var(--elbow);
			height: calc(50% + 0.4rem + 1.5px);
			border-left: 2px solid var(--edge);
			border-bottom: 2px solid var(--edge);
			border-bottom-left-radius: 8px;
			transition: border-color var(--duration-quick) var(--ease-out);
		}
		& + .node {
			margin-left: calc(2 * var(--elbow) + 0.5rem);
		}
	}

	.key {
		font-weight: 700;
	}

	.lit .node {
		--edge: var(--accent);
		color: var(--ink);
		& + .node {
			background: var(--accent-soft);
		}
	}

	/* Narrow: only the picked branch grows its cause and fix. */
	@container (width < 34rem) {
		.branch:not(.lit) .node {
			display: none;
		}
	}

	/* Wide: the whole tree, one branch per row, the picked one lit. */
	@container (width >= 34rem) {
		.tree {
			grid-template-columns: max-content minmax(0, 1fr) minmax(0, 1.4fr);
			column-gap: 1.25rem;
		}
		.branch {
			grid-column: 1 / -1;
			grid-template-columns: subgrid;
			align-items: center;
			justify-items: stretch;
		}
		.node,
		.node + .node {
			margin-left: 0;
			&::before {
				left: calc(-1.25rem - 1.5px);
				bottom: auto;
				top: calc(50% - 1px);
				width: 1.25rem;
				height: 0;
				border-left: none;
				border-bottom-left-radius: 0;
			}
		}
		.branch:not(.lit) .node {
			border-style: dashed;
		}
	}

	.benchmark {
		border-top: 1px solid var(--accent-line);
		padding-top: 0.85rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.node,
		.node::before {
			transition: none;
		}
	}
</style>
