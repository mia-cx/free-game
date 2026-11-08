<script lang="ts">
	/**
	 * The five funnel stages from "Map the whole funnel", with the course modules that cover each.
	 * Retention carries the most time, in @kunalvg's view.
	 */
	const keepAndConvert = [{ title: 'Keep and convert', href: '/keep-users' }];

	const stages = [
		{
			name: 'Acquisition',
			question: 'How do the right people find you?',
			done: 'A written ideal-user profile, chosen channels, content loops, partners and a referral program.',
			modules: [
				{ title: 'Content that builds a brand', href: '/content' },
				{ title: 'Growing on X', href: '/x' },
				{ title: 'Launching', href: '/launch' },
				{ title: 'Outreach', href: '/outreach' },
				{ title: 'Search engines', href: '/seo' },
				{ title: 'Backlinks', href: '/backlinks' },
				{ title: 'AI search', href: '/ai-search' },
				{ title: 'Video', href: '/video' }
			]
		},
		{
			name: 'Onboarding',
			question: 'Do new users reach value fast?',
			done: 'One event defines “onboarded”, and a first “aha” moment is built into the product.',
			modules: keepAndConvert
		},
		{
			name: 'Engagement',
			question: 'What brings them back?',
			done: 'You know your hero features and how a casual user becomes a power user.',
			modules: keepAndConvert
		},
		{
			name: 'Retention',
			question: 'Why do they stay or leave?',
			done: 'Users segmented by usage, churn reasons tracked, win-back campaigns planned.',
			modules: keepAndConvert,
			mostTime: true
		},
		{
			name: 'Monetisation',
			question: 'How does this pay?',
			done: 'Why, how and what you’ll charge, written down on day one.',
			modules: keepAndConvert
		}
	];

	let index = $state(3);
	const stage = $derived(stages[index]);
</script>

<figure class="diagram">
	<div class="funnel" role="group" aria-label="Funnel stage">
		{#each stages as s, i (s.name)}
			<button
				type="button"
				class="stage"
				class:most={s.mostTime}
				style="--width: {100 - i * 12}%"
				aria-pressed={index === i}
				onclick={() => (index = i)}
			>
				{s.name}
				{#if s.mostTime}<span class="note">most of your time</span>{/if}
			</button>
		{/each}
	</div>

	<div class="mt-5" aria-live="polite">
		<p class="diagram-output">{stage.question}</p>
		<p class="mt-1"><strong>Done looks like:</strong> {stage.done}</p>
		<p class="mt-2 text-sm">
			Covered in
			{#each stage.modules as m, i (m.href)}{#if i > 0}{i === stage.modules.length - 1 ? ' and ' : ', '}{/if}<a
					href={m.href}>{m.title}</a
				>{/each}.
		</p>
	</div>

	<figcaption>
		Getting users is the easy part. Keeping them is hard, so @kunalvg puts most of a marketer’s time into retention.
	</figcaption>
</figure>

<style>
	.funnel {
		display: grid;
		justify-items: center;
		gap: 0.3rem;
	}

	.stage {
		width: var(--width);
		min-height: 2.5rem;
		padding: 0.35rem 0.75rem;
		border: 1.5px solid var(--accent-line);
		border-radius: 10px;
		background: var(--paper);
		font-size: 0.85rem;
		font-weight: 650;
		line-height: 1.25;
		transition:
			background-color var(--duration-quick) var(--ease-out),
			color var(--duration-quick) var(--ease-out),
			border-color var(--duration-quick) var(--ease-out);

		&:hover {
			border-color: var(--accent);
		}
		&.most {
			border-width: 2.5px;
			border-color: var(--accent);
		}
		&[aria-pressed='true'] {
			background: var(--accent);
			border-color: var(--accent);
			color: var(--accent-ink);
		}
	}

	.note {
		display: block;
		font-size: 0.75rem;
		font-weight: 500;
	}

	a {
		color: var(--accent);
		font-weight: 650;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.stage {
			transition: none;
		}
	}
</style>
