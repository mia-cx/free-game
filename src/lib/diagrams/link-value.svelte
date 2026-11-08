<script lang="ts">
	/**
	 * Link types placed by relevance to your buyers and by real readers who could click.
	 * Placements and reasons come from the Backlinks module; risky ones can count as link spam.
	 */
	type Link = { label: string; why: string; risky?: boolean };

	/** In reading order: top row is many readers, right column is relevant to your buyers. */
	const quadrants: { name: string; links: Link[] }[] = [
		{
			name: 'Not your buyers, many readers',
			links: [
				{
					label: 'High DR, wrong crowd',
					why: 'Plenty of visitors, none of them your buyers. Domain Rating is a tiebreaker, not the reason to chase a link.'
				}
			]
		},
		{
			name: 'Your buyers, many readers',
			links: [
				{
					label: 'Editorial mention',
					why: 'A writer chose to send their readers to you. One of these outweighs a hundred placeholder pages.'
				},
				{
					label: 'Useful listing',
					why: 'A listing where your buyers already look. Open the live page and check the link is there and clickable before you count it.'
				},
				{
					label: 'Tool people reference',
					why: 'Guides keep pointing their readers to it as a shortcut. A free calculator your buyers need can earn these.'
				},
				{
					label: 'Paid roundup spot',
					risky: true,
					why: 'The roundup reaches buyers and gets cited by AI. Unmarked, a paid link is link spam, so ask for the sponsored label and pay for the readers, not ranking credit.'
				}
			]
		},
		{
			name: 'Not your buyers, few readers',
			links: [
				{
					label: 'Placeholder profile',
					why: 'A page that exists only to hold your URL. Nobody reads it, so it adds nothing.'
				},
				{
					label: 'Mass submissions',
					risky: true,
					why: "Submitting to directories in bulk is link spam: Google's spam policies name low-quality directory links and automated link creation as link spam."
				},
				{
					label: 'Press-release site',
					risky: true,
					why: "It hosts your announcement but isn't news coverage, and carries little SEO value. Use one only for real news."
				}
			]
		},
		{
			name: 'Your buyers, few readers',
			links: [
				{
					label: 'Unlinked mention',
					why: 'The right people read it, but there is nothing to click. Ask for the link and it moves to the top right.'
				},
				{
					label: 'Listing with no link',
					why: 'You were accepted, but the page shows no clickable link, or only on a paid plan. Check a live listing before you submit.'
				}
			]
		}
	];

	const links = quadrants.flatMap((q) => q.links);
	let label = $state('Editorial mention');
	const selected = $derived(links.find((l) => l.label === label) ?? links[0]);
</script>

{#snippet risk()}
	<svg class="risk" viewBox="0 0 16 16" aria-hidden="true">
		<path d="M8 1.5 15 14H1z" />
		<path class="mark" d="M8 6v3.5M8 11.6v.1" />
	</svg>
	<span class="sr-only">, can count as link spam</span>
{/snippet}

<figure class="diagram matrix">
	<div class="plot">
		<p class="axis y" aria-hidden="true">Real readers who could click →</p>
		<div class="quadrants">
			{#each quadrants as q, i (q.name)}
				<ul class="quadrant" class:best={i === 1} class:worst={i === 2} aria-label={q.name}>
					{#each q.links as link (link.label)}
						<li>
							<button
								type="button"
								class="diagram-chip"
								aria-pressed={label === link.label}
								onclick={() => (label = link.label)}
							>
								{link.label}{#if link.risky}{@render risk()}{/if}
							</button>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
		<p class="axis x" aria-hidden="true">Relevance to your buyers →</p>
	</div>

	<div class="reason mt-4" class:risky={selected.risky} aria-live="polite">
		<p class="font-bold">{selected.label}</p>
		<p>{selected.why}</p>
	</div>

	<figcaption>
		A link is worth chasing when your buyers read the page and could click it. Links marked with a triangle can count as
		link spam under Google's policies.
	</figcaption>
</figure>

<style>
	.matrix {
		container-type: inline-size;
	}

	.plot {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 0.4rem;
	}

	.axis {
		font-size: 0.8rem;
		font-weight: 650;
		color: var(--muted);
		&.y {
			writing-mode: vertical-rl;
			rotate: 180deg;
			text-align: center;
		}
		&.x {
			grid-column: 2;
			text-align: center;
		}
	}

	.quadrants {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border-left: 2px solid var(--muted);
		border-bottom: 2px solid var(--muted);
		gap: 2px;
		background: var(--accent-line);
	}

	.quadrant {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 0.35rem;
		min-height: 6.5rem;
		padding: 0.6rem;
		background: var(--paper);

		&.best {
			background: color-mix(in oklch, var(--accent-soft) 70%, var(--paper));
		}
		&.worst {
			background: var(--surface);
		}
	}

	.diagram-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		max-width: 100%;
		border-radius: 10px;
		text-align: left;
	}

	/* Narrow: tighter quadrants so each label keeps a few words per line. */
	@container (width < 26rem) {
		.quadrant {
			padding: 0.4rem;
		}
		.diagram-chip {
			padding-inline: 0.5rem;
			font-size: 0.8rem;
		}
	}

	.risk {
		flex: none;
		width: 0.95rem;
		height: 0.95rem;
		fill: var(--risk-edge);
		stroke: var(--paper);
		stroke-width: 1;
		stroke-linejoin: round;
		& .mark {
			fill: none;
			stroke-width: 1.75;
			stroke-linecap: round;
		}
	}

	.reason {
		border-left: 4px solid var(--accent);
		border-radius: 10px;
		padding: 0.7rem 0.9rem;
		background: var(--paper);
		transition:
			background-color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out);
		&.risky {
			border-color: var(--risk-edge);
			background: var(--risk-bg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reason {
			transition: none;
		}
	}
</style>
