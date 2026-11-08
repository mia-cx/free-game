<script lang="ts">
	/**
	 * The slide from owning AI output to accepting it unchecked. Zones from Shaw and Nave's
	 * "cognitive surrender", as taught in "Use AI without surrendering your judgment".
	 */
	const zones = [
		{
			name: 'Offloading',
			reading: 'Read carefully',
			looks: 'The AI does the task. You read the answer carefully and still own the result.',
			test: 'Yes, line by line.'
		},
		{
			name: 'Deferral',
			reading: 'Skim',
			looks: "You skim the answer and build on it. It has stopped being a guess you might reject.",
			test: "With your agent's help, as long as you know which parts you no longer hold."
		},
		{
			name: 'Cognitive surrender',
			reading: 'Scan the outline',
			looks: 'You scan the outline and ship it. The output quietly became yours, and you felt no need to check it.',
			test: "No, not even with your agent's help. You've surrendered it."
		}
	];

	let position = $state(15);
	const index = $derived(Math.min(Math.floor(position / (100 / zones.length)), zones.length - 1));
	const zone = $derived(zones[index]);
</script>

<figure class="diagram">
	<ol class="zones" aria-hidden="true">
		{#each zones as z, i (z.name)}
			<li class:current={index === i} data-zone={i}>{z.name}</li>
		{/each}
	</ol>

	<label class="mt-3 block text-sm">
		<span class="row"><span>How you read the answer</span><b>{zone.reading}</b></span>
		<input type="range" min="0" max="100" bind:value={position} aria-valuetext="{zone.reading}: {zone.name}" />
	</label>

	<div class="mt-4" aria-live="polite">
		<p class="diagram-output">{zone.name}</p>
		<p class="mt-1">{zone.looks}</p>
		<div class="test mt-4" data-zone={index}>
			<p class="text-sm font-[700]">Can you explain the answer, even with your agent's help?</p>
			<p class="mt-1">{zone.test}</p>
		</div>
	</div>

	<figcaption>
		Nobody chooses to slide; it happens one skim at a time. "Cognitive surrender" is a term from Wharton researchers
		Steven Shaw and Gideon Nave.
	</figcaption>
</figure>

<style>
	.zones {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3px;
		& li {
			display: flex;
			align-items: center;
			min-height: 3rem;
			padding: 0.4rem 0.55rem;
			font-size: 0.8rem;
			font-weight: 650;
			line-height: 1.2;
			color: var(--ink);
			border: 1.5px solid transparent;
			transition: border-color var(--duration-quick) var(--ease-out);
		}
		& li:first-child {
			border-radius: 10px 3px 3px 10px;
		}
		& li:last-child {
			border-radius: 3px 10px 10px 3px;
		}
		& li.current {
			font-weight: 750;
		}
	}

	[data-zone='0'] {
		background: var(--do-bg);
		&.current {
			border-color: var(--do-edge);
		}
	}
	[data-zone='1'] {
		background: var(--trick-bg);
		&.current {
			border-color: var(--trick-edge);
		}
	}
	[data-zone='2'] {
		background: var(--risk-bg);
		&.current {
			border-color: var(--risk-edge);
		}
	}

	.row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		& b {
			white-space: nowrap;
		}
	}

	input[type='range'] {
		width: 100%;
		accent-color: var(--accent);
	}

	.test {
		padding: 0.75rem 0.9rem;
		border-radius: 10px;
		border-left: 5px solid;
		transition: background-color var(--duration-quick) var(--ease-out);
		&[data-zone='0'] {
			border-color: var(--do-edge);
		}
		&[data-zone='1'] {
			border-color: var(--trick-edge);
		}
		&[data-zone='2'] {
			border-color: var(--risk-edge);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.zones li,
		.test {
			transition: none;
		}
	}
</style>
