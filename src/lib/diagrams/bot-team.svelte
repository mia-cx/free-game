<script lang="ts">
	/**
	 * A coordinator over worker bots, each with one job and an ask-first gate to the outside world.
	 * Bots and their prompts are @huntkyle's, as taught in "Put a coordinator over your bots".
	 */
	const coordinator = {
		name: 'Chief of staff',
		makes: 'Makes nothing. Reads every bot.',
		job: 'Reads what the other bots made and sends you one page: decisions first, then drafts waiting, then anything off. It never does the work.',
		runs: 'every weekday at 7am',
		asks: ['Contact a client', "Edit another bot's instructions"]
	};

	const workers = [
		{
			name: 'Auditor',
			makes: 'Makes audit drafts',
			job: "Writes the first version of every audit, proposal or diagnostic you sell, with each finding tied to the client's own numbers.",
			runs: 'when you message it "start audit for [client]"',
			asks: ['Share anything with the client', 'Quote a price', 'Fill a gap with an assumption']
		},
		{
			name: 'Call Notes',
			makes: 'Makes post ideas',
			job: 'Turns each new call transcript into 5 post ideas and 3 things to fix on your next sales call.',
			runs: 'every weekday at 6pm',
			asks: ['Contact anyone from the call', 'Post any idea']
		},
		{
			name: 'Check-ins',
			makes: 'Makes check-in drafts',
			job: "Drafts one check-in per client or member: what moved, what's blocked, and what happens next.",
			runs: 'every Monday at 9am',
			asks: ['Send any message', 'Move a deadline', 'Cut a deliverable', 'Touch a price']
		},
		{
			name: 'Month-End',
			makes: 'Makes the month-end sheet',
			job: "Sets revenue, margin and churn beside last month's, and forecasts the next 13 weeks.",
			runs: 'on the 1st of every month at 8am',
			asks: ['Send an invoice', 'Chase a payment', 'Move money']
		}
	];

	let name = $state(coordinator.name);
	const selected = $derived(workers.find((w) => w.name === name) ?? coordinator);
</script>

{#snippet arrow(label: string)}
	<div class="link" aria-hidden="true">
		<svg viewBox="0 0 12 28" width="12" height="28">
			<path d="M6 27V2M1.5 6.5 6 2l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" />
		</svg>
		<span>{label}</span>
	</div>
{/snippet}

<figure class="diagram">
	<div class="you">You</div>
	{@render arrow('one page a day')}

	<button
		type="button"
		class="bot coordinator"
		aria-pressed={name === coordinator.name}
		onclick={() => (name = coordinator.name)}
	>
		<span class="bot-name">{coordinator.name}</span>
		<span class="makes">{coordinator.makes}</span>
	</button>
	{@render arrow('reads their work')}

	<div class="workers" role="group" aria-label="Worker bots">
		{#each workers as worker (worker.name)}
			<button type="button" class="bot" aria-pressed={name === worker.name} onclick={() => (name = worker.name)}>
				<span class="bot-name">{worker.name}</span>
				<span class="makes">{worker.makes}</span>
			</button>
		{/each}
	</div>

	<div aria-live="polite">
		<div class="gate mt-4">
			<p class="gate-label">{selected.name} asks you first before it can</p>
			<ul class="diagram-chips mt-2">
				{#each selected.asks as ask (ask)}
					<li class="ask">{ask}</li>
				{/each}
			</ul>
		</div>
		<p class="world">Clients, the public and your money</p>

		<p class="diagram-output mt-5">{selected.job}</p>
		<p class="text-sm text-muted">Runs {selected.runs}.</p>
	</div>

	<figcaption>
		One coordinator routes, workers each own one job, and nothing reaches the outside world without your yes. Bots from
		@huntkyle's prompts.
	</figcaption>
</figure>

<style>
	.you {
		width: fit-content;
		margin-inline: auto;
		padding: 0.3rem 1rem;
		border-radius: 999px;
		background: var(--ink);
		color: var(--paper);
		font-weight: 750;
	}

	.link {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding-block: 0.3rem;
		color: var(--muted);
		font-size: 0.8rem;
		& svg {
			flex: none;
			color: var(--accent);
		}
	}

	.bot {
		display: grid;
		align-content: start;
		gap: 0.1rem;
		width: 100%;
		padding: 0.6rem 0.75rem;
		border: 1.5px solid var(--accent-line);
		border-radius: 10px;
		background: var(--paper);
		text-align: left;
		transition:
			background-color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out),
			color var(--duration-quick) var(--ease-out);
		&:hover {
			border-color: var(--accent);
		}
		&[aria-pressed='true'] {
			background: var(--accent);
			border-color: var(--accent);
			color: var(--accent-ink);
			& .makes {
				color: var(--accent-ink);
			}
		}
	}

	.coordinator {
		max-width: 20rem;
		margin-inline: auto;
		text-align: center;
		border-style: dashed;
	}

	.bot-name {
		font-weight: 750;
	}

	.makes {
		font-size: 0.8rem;
		line-height: 1.3;
		color: var(--muted);
		transition: color var(--duration-quick) var(--ease-out);
	}

	.workers {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.4rem;
		@media (min-width: 560px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.gate {
		padding: 0.75rem;
		border: 2px dashed var(--risk-edge);
		border-radius: 10px;
		background: var(--risk-bg);
	}

	.gate-label {
		font-size: 0.875rem;
		font-weight: 700;
	}

	.ask {
		padding: 0.2rem 0.65rem;
		border: 1.5px solid var(--risk-edge);
		border-radius: 999px;
		background: var(--paper);
		font-size: 0.8rem;
		font-weight: 650;
		animation: ask-in var(--duration-fast) var(--ease-smooth-out) both;
	}

	.world {
		margin-top: 0.4rem;
		padding: 0.5rem;
		border-radius: 10px;
		background: var(--surface);
		border: 1px solid var(--line);
		text-align: center;
		font-size: 0.875rem;
		font-weight: 700;
	}

	@keyframes ask-in {
		from {
			opacity: 0;
			translate: 0 var(--distance-micro);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bot,
		.makes {
			transition: none;
		}
		.ask {
			animation: none;
		}
	}
</style>
