<script lang="ts">
	/**
	 * The AI visibility experiment loop from "Fix why AI skips you": save prompts once, then
	 * check, diagnose, act and rerun. The cause picked at Diagnose decides what Act asks for.
	 */
	const steps = ['Save buyer prompts', 'Check each AI', 'Diagnose', 'Act', 'Rerun'];
	/** Rerun feeds straight back into the check: the prompts are saved once. */
	const LOOP_START = 1;

	const causes = [
		{ label: 'Missing page', sign: 'No page of yours answers the question.', fix: 'Create one page that answers it.' },
		{
			label: 'Weak page',
			sign: 'A page exists but answers only part of the question.',
			fix: "Improve that page. Don't publish a second one on the same question."
		},
		{
			label: 'Crawl or index problem',
			sign: "The page exists, but AI and Google can't reach it.",
			fix: 'Fix it technically.'
		},
		{
			label: 'Third-party sources',
			sign: 'AI draws on Reddit threads, review sites, articles and directories that barely mention you.',
			fix: 'Label each source AI cites by who controls it, and work each one.'
		}
	];

	const sources = [
		{ label: 'Own', what: 'Pages you control', action: 'improve them' },
		{ label: 'Claim', what: 'Profiles and listings', action: 'claim and complete them' },
		{ label: 'Earn', what: 'Mentions, reviews, threads', action: 'deserve them' },
		{ label: 'Contest', what: 'Wrong or outdated info', action: 'get it corrected' }
	];

	let step = $state(0);
	let causeLabel = $state(causes[0].label);
	const cause = $derived(causes.find((c) => c.label === causeLabel) ?? causes[0]);
	const next = $derived(step === steps.length - 1 ? LOOP_START : step + 1);
</script>

<figure class="diagram loop">
	<div class="layout">
		<ol class="steps" aria-label="Loop step">
			{#each steps as label, i (label)}
				<li>
					<button type="button" class="step" aria-pressed={step === i} onclick={() => (step = i)}>
						<span class="num" aria-hidden="true">{i + 1}</span>
						{label}
					</button>
				</li>
			{/each}
		</ol>

		<div class="panel" aria-live="polite">
			{#if step === 0}
				<p>Save the real questions buyers ask AI. Keep the set fixed, so every check is comparable.</p>
			{:else if step === 1}
				<p>
					Run the saved prompts in ChatGPT, Google's AI answers and the rest, one at a time. Record brands recommended and
					sources cited, and flag the prompts that name competitors but not you.
				</p>
			{:else if step === 2}
				<p>Why does a flagged prompt name competitors but not you?</p>
				<div class="diagram-chips mt-3" role="group" aria-label="Cause">
					{#each causes as c (c.label)}
						<button
							type="button"
							class="diagram-chip"
							aria-pressed={causeLabel === c.label}
							onclick={() => (causeLabel = c.label)}>{c.label}</button
						>
					{/each}
				</div>
				<p class="mt-3 text-muted">{cause.sign}</p>
				<p class="mt-1 font-bold">{cause.fix}</p>
			{:else if step === 3}
				<p>Make one change, for the cause you found: {cause.label.toLowerCase()}.</p>
				<p class="mt-2 font-bold">{cause.fix}</p>
				{#if cause.label === 'Third-party sources'}
					<ul class="sources mt-3">
						{#each sources as s (s.label)}
							<li><strong>{s.label}</strong> <span class="text-muted">{s.what}:</span> {s.action}</li>
						{/each}
					</ul>
				{/if}
			{:else}
				<p>Rerun the same prompts. Track visibility and activated users, and double down on what moved.</p>
			{/if}

			<button type="button" class="next mt-4" onclick={() => (step = next)}>
				Next: {steps[next][0].toLowerCase() + steps[next].slice(1)}
			</button>
		</div>
	</div>

	<figcaption>
		AI visibility as an experiment: the same saved prompts, one change per round. Causes and fixes from Granola's
		diagnose-then-fix process, as shared by an AI-search vendor.
	</figcaption>
</figure>

<style>
	.loop {
		container-type: inline-size;
	}

	.layout {
		display: grid;
		gap: 1rem;
	}

	@container (width >= 34rem) {
		.layout {
			grid-template-columns: max-content minmax(0, 1fr);
			align-items: start;
		}
	}

	.steps {
		--row: 2.5rem;
		--gap: 0.4rem;
		--rail: 1.1rem;
		position: relative;
		display: grid;
		gap: var(--gap);
		padding-left: var(--rail);

		/* The way back: from Rerun up into Check each AI. */
		&::before {
			content: '';
			position: absolute;
			left: 0.2rem;
			top: calc(var(--row) + var(--gap) + var(--row) / 2);
			height: calc(3 * (var(--row) + var(--gap)));
			width: calc(var(--rail) - 0.2rem);
			border: 2px solid var(--accent);
			border-right: none;
			border-radius: 10px 0 0 10px;
		}
		&::after {
			content: '';
			position: absolute;
			left: calc(var(--rail) - 0.45rem);
			top: calc(var(--row) + var(--gap) + var(--row) / 2 - 0.3rem + 1px);
			border: 0.3rem solid transparent;
			border-left: 0.4rem solid var(--accent);
		}
	}

	.steps li {
		position: relative;
		/* Forward connector between neighbouring steps. */
		& + li::before {
			content: '';
			position: absolute;
			left: calc(0.35rem + 0.75rem - 1px);
			bottom: 100%;
			height: var(--gap);
			width: 2px;
			background: var(--accent-line);
		}
	}

	.step {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		width: 100%;
		height: var(--row);
		padding: 0 0.85rem 0 0.35rem;
		border: 1.5px solid var(--accent-line);
		border-radius: 999px;
		background: var(--paper);
		font-size: 0.9rem;
		font-weight: 650;
		white-space: nowrap;
		transition:
			background-color var(--duration-quick) var(--ease-out),
			color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out);
		&:hover {
			border-color: var(--accent);
		}
		&[aria-pressed='true'] {
			background: var(--accent);
			border-color: var(--accent);
			color: var(--accent-ink);
			& .num {
				background: var(--accent-ink);
				color: var(--accent);
			}
		}
	}

	.num {
		display: grid;
		place-items: center;
		flex: none;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: var(--accent-soft);
		font-size: 0.8rem;
		font-weight: 750;
		font-variant-numeric: tabular-nums;
	}

	.panel {
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--paper);
		padding: 0.9rem 1rem;
	}

	.sources {
		display: grid;
		gap: 0.3rem;
		font-size: 0.9rem;
	}

	.next {
		border: 1.5px solid var(--accent);
		border-radius: 999px;
		padding: 0.3rem 0.85rem;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--ink);
		transition: background-color var(--duration-quick) var(--ease-out);
		&:hover {
			background: var(--accent-soft);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.step,
		.next {
			transition: none;
		}
	}
</style>
