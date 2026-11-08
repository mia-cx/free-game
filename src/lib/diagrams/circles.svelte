<script lang="ts">
	/**
	 * Seth Godin's circles of marketing, as taught in "Attention is the job".
	 * Rings run from the centre outwards, in the order effort should go.
	 */
	const rings = [
		{
			label: 'Product',
			name: 'Product',
			why: 'Everything starts here. Make the product worth noticing before anything else.',
			size: 28
		},
		{
			label: 'Usability',
			name: 'Usability and support',
			why: 'If a user can’t figure out your product, no ad fixes that.',
			size: 52
		},
		{
			label: 'Story, price',
			name: 'Story, price, community and tribe',
			why: 'A community grows around a good product. It can’t replace one.',
			size: 76
		},
		{
			label: 'Ads, hype',
			name: 'Ads, spin, buzz, hype and clicks',
			why: 'The part most people call marketing, and the last place your effort goes.',
			size: 100
		}
	];

	let index = $state(0);
	const ring = $derived(rings[index]);
	// Largest first, so each smaller ring sits on top and takes the taps inside it.
	const outsideIn = rings.map((r, i) => ({ ...r, i })).reverse();
</script>

<figure class="diagram">
	<div class="layout">
		<div class="rings" role="group" aria-label="Circles of marketing">
			{#each outsideIn as r (r.i)}
				<button
					type="button"
					class="band"
					data-ring={r.i}
					style="--size: {r.size}%"
					aria-pressed={index === r.i}
					onclick={() => (index = r.i)}
				>
					{r.label}
				</button>
			{/each}
		</div>

		<div class="readout" aria-live="polite">
			<p class="text-sm text-muted">Ring {index + 1} of {rings.length}</p>
			<p class="diagram-output">{ring.name}</p>
			<p class="mt-1">{ring.why}</p>
		</div>
	</div>

	<figcaption>
		Seth Godin’s circles of marketing. Spend your effort from the centre outwards; the outer ring is worth least.
	</figcaption>
</figure>

<style>
	.layout {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem 1.5rem;
	}

	.rings {
		position: relative;
		flex: 1 1 15rem;
		max-width: 20rem;
		aspect-ratio: 1;
	}

	.readout {
		flex: 1 1 12rem;
	}

	.band {
		position: absolute;
		inset: calc((100% - var(--size)) / 2);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		/* Centre the label in the 12%-wide band each ring shows. */
		padding-top: calc(6% - 0.65em);
		border: 1.5px solid var(--accent-line);
		border-radius: 50%;
		font-size: 0.75rem;
		font-weight: 650;
		line-height: 1.3;
		color: var(--ink);
		transition:
			box-shadow var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out);

		&:hover {
			border-color: var(--accent);
		}
		&[aria-pressed='true'] {
			border-color: var(--ink);
			box-shadow: inset 0 0 0 2px var(--ink);
			font-weight: 800;
		}
		&:focus-visible {
			border-radius: 50%;
		}

		/* Value fades from the centre out; the outer ring is a dashed shell. */
		&[data-ring='0'] {
			align-items: center;
			padding-top: 0;
			background: var(--accent);
			border-color: var(--accent);
			color: var(--accent-ink);
			&[aria-pressed='true'] {
				box-shadow:
					inset 0 0 0 2px var(--accent),
					inset 0 0 0 4px var(--accent-ink);
			}
		}
		&[data-ring='1'] {
			background: color-mix(in oklch, var(--accent-line) 75%, var(--paper));
		}
		&[data-ring='2'] {
			background: color-mix(in oklch, var(--accent-soft) 80%, var(--paper));
		}
		&[data-ring='3'] {
			background: var(--paper);
			border-style: dashed;
			color: var(--muted);
			&[aria-pressed='true'] {
				border-style: solid;
				color: var(--ink);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.band {
			transition: none;
		}
	}
</style>
