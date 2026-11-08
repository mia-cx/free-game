<script lang="ts">
	/**
	 * What one action on X is worth, counted in likes. Weights are @ryangrowthh's reading of
	 * X's open-source ranking code (October 2026), as taught in "Optimise for shares and replies".
	 */
	const LIKE = 0.66;

	const actions = [
		{ label: 'Share by copied link', weight: 20 },
		{ label: 'Reply', weight: 5 },
		{ label: 'Quote', weight: 5 },
		{ label: 'Follow', weight: 4 },
		{ label: 'Repost', weight: 1 },
		{ label: 'Profile click', weight: 0 },
		{ label: 'Block', weight: -31.2 },
		{ label: 'Mute', weight: -58.8 },
		{ label: 'Report', weight: -234 }
	];

	let label = $state(actions[0].label);
	const selected = $derived(actions.find((a) => a.label === label) ?? actions[0]);

	const likes = $derived(Math.round(Math.abs(selected.weight) / LIKE));
	const negative = $derived(selected.weight < 0);
	const sentence = $derived(
		likes === 0
			? `A ${selected.label.toLowerCase()} is worth nothing to the ranking.`
			: negative
				? `One ${selected.label.toLowerCase()} cancels about ${likes} likes.`
				: `One ${selected.label.toLowerCase()} is worth about ${likes} likes.`
	);
</script>

<figure class="diagram">
	<div class="diagram-chips" role="group" aria-label="Action on X">
		{#each actions as action (action.label)}
			<button
				type="button"
				class="diagram-chip"
				aria-pressed={label === action.label}
				onclick={() => (label = action.label)}
			>
				{action.label}
			</button>
		{/each}
	</div>

	<p class="diagram-output mt-5" aria-live="polite">{sentence}</p>
	<p class="text-sm text-muted">Weight {selected.weight} · a like is {LIKE}</p>

	{#key selected}
		<div class="likes mt-4" class:negative aria-hidden="true">
			{#each { length: likes }, i}
				<span style="--i: {i}"></span>
			{/each}
		</div>
	{/key}

	<figcaption>
		Each dot is one like. Weights from @ryangrowthh's reading of X's ranking code, October 2026. They change without
		notice.
	</figcaption>
</figure>

<style>
	.likes {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		min-height: 1.5rem;
		& span {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: var(--accent);
			animation: pop var(--duration-fast) var(--ease-bounce) both;
			animation-delay: calc(min(var(--i), 120) * 4ms);
		}
		&.negative span {
			background: var(--risk-edge);
		}
	}

	@keyframes pop {
		from {
			opacity: 0;
			scale: 0.4;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.likes span {
			animation: none;
		}
	}
</style>
