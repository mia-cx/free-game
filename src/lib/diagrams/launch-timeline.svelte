<script lang="ts">
	/**
	 * A launch on X in three phases, each a checklist the reader can tick. Items come from
	 * "Line up your launch-day voices" and "Work the conversation after launch".
	 */
	const phases = [
		{
			label: 'Before',
			items: [
				'Anchor the launch to the ecosystem you build on',
				'Rank your quote list and message the top 25 yourself',
				'Seed a different angle for each person who will quote',
				'Brief a few creators who fit, and let them write their own take',
				'Decide who answers questions and who follows up on leads'
			]
		},
		{
			label: 'Launch day',
			items: [
				'Keep the launch in one post, so every quote points there',
				'Everyone on the list posts at the same set time',
				'Answer in the thread, and DM only with a clear reason',
				'Log every question, objection and surprise use in one shared doc'
			]
		},
		{
			label: 'After',
			items: [
				'Turn repeated questions into the FAQ and confusing features into walkthroughs',
				'Tell people when you ship the fix they asked for',
				'Count trials, relevant DMs and sales calls, not views',
				'Rebook the creators who brought useful conversations within 1 to 2 weeks'
			]
		}
	];

	let label = $state(phases[0].label);
	const phase = $derived(phases.find((p) => p.label === label) ?? phases[0]);

	/** Ticked items, keyed by their text. Lives only as long as the page. */
	let ticked = $state<Record<string, boolean>>({});
	const doneIn = (items: string[]) => items.filter((item) => ticked[item]).length;
</script>

<figure class="diagram">
	<div class="line" role="group" aria-label="Launch phase">
		{#each phases as p (p.label)}
			{@const complete = doneIn(p.items) === p.items.length}
			<button type="button" class="phase" aria-pressed={label === p.label} onclick={() => (label = p.label)}>
				<span class="dot" class:complete aria-hidden="true">
					<svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg>
				</span>
				<span class="name">{p.label}{#if complete}<span class="sr-only">, done</span>{/if}</span>
			</button>
		{/each}
	</div>

	{#key label}
		<ul class="checklist mt-4" aria-label="{phase.label} checklist">
			{#each phase.items as item, i (item)}
				<li style="--i: {i}">
					<label>
						<input type="checkbox" bind:checked={ticked[item]} />
						<span>{item}</span>
					</label>
				</li>
			{/each}
		</ul>
	{/key}

	<p class="mt-3 text-sm text-muted" aria-live="polite">{doneIn(phase.items)} of {phase.items.length} done</p>

	<figcaption>
		One launch on X, from the quote list to the second wave. Practice from launch agencies and founders, not measured
		data.
	</figcaption>
</figure>

<style>
	.line {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));

		/* The timeline itself: runs from the first dot's centre to the last. */
		&::before {
			content: '';
			position: absolute;
			top: calc(0.25rem + 0.7rem - 1px);
			left: calc(100% / 6);
			right: calc(100% / 6);
			height: 2px;
			background: var(--accent-line);
		}
	}

	.phase {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		padding-block: 0.25rem;
	}

	.dot {
		display: grid;
		place-items: center;
		width: 1.4rem;
		height: 1.4rem;
		border: 2px solid var(--accent-line);
		border-radius: 50%;
		background: var(--paper);
		transition:
			background-color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out),
			box-shadow var(--duration-quick) var(--ease-out);

		& svg {
			width: 0.9rem;
			height: 0.9rem;
			fill: none;
			stroke: var(--accent-ink);
			stroke-width: 2.25;
			stroke-linecap: round;
			stroke-linejoin: round;
			opacity: 0;
			scale: 0.5;
			transition:
				opacity var(--duration-quick) var(--ease-out),
				scale var(--duration-fast) var(--ease-bounce);
		}
		&.complete {
			background: var(--accent);
			border-color: var(--accent);
			& svg {
				opacity: 1;
				scale: 1;
			}
		}
	}

	.name {
		border: 1.5px solid transparent;
		border-radius: 999px;
		padding: 0.15rem 0.7rem;
		font-size: 0.85rem;
		font-weight: 650;
		white-space: nowrap;
		transition:
			background-color var(--duration-quick) var(--ease-out),
			color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out);
	}

	.phase:hover .name {
		border-color: var(--accent-line);
	}

	.phase[aria-pressed='true'] {
		& .dot {
			border-color: var(--accent);
			box-shadow: 0 0 0 4px var(--accent-soft);
		}
		& .name {
			background: var(--accent);
			border-color: var(--accent);
			color: var(--accent-ink);
		}
	}

	.checklist {
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--paper);
		padding-inline: 0.85rem;

		& li + li {
			border-top: 1px solid var(--line);
		}
		& li {
			animation: item-in var(--duration-fast) var(--ease-smooth-out) both;
			animation-delay: calc(var(--i) * var(--duration-stagger));
		}
		& label {
			display: flex;
			align-items: flex-start;
			gap: 0.65rem;
			padding-block: 0.6rem;
			cursor: pointer;
		}
		& input {
			flex: none;
			width: 1.1rem;
			height: 1.1rem;
			margin-top: 0.2rem;
			accent-color: var(--accent);
			cursor: pointer;
		}
		& span {
			transition: color var(--duration-quick) var(--ease-out);
		}
		& input:checked + span {
			color: var(--muted);
		}
	}

	@keyframes item-in {
		from {
			opacity: 0;
			translate: 0 var(--distance-micro);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.checklist li,
		.dot,
		.dot svg {
			animation: none;
			transition: none;
		}
	}
</style>
