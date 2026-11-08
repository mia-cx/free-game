<script lang="ts">
	/**
	 * X's For You pipeline (find, score, filter) as @ryangrowthh reads the open-source ranking code,
	 * from "How X picks what people see". Dot proportions are illustrative.
	 */
	const DOTS = 100;
	const POSTS_PER_DOT = 20;
	const FEED_TOP = 12;

	const sources = [
		{ name: 'Thunder', pulls: 'Recent posts from accounts you follow and interact with' },
		{ name: 'Phoenix', pulls: 'Posts from accounts you don’t follow, matched to your interests' },
		{ name: 'SimClusters', pulls: 'Posts liked by the interest community you belong to' },
		{ name: 'Popular Posts', pulls: 'A small shared list of popular recent posts' }
	];
	const dropped = ['Already seen', 'Stale', 'Blocked or muted', 'Spam', 'Low reputation'];

	const stages = [
		{ name: 'Find', result: `About ${(DOTS * POSTS_PER_DOT).toLocaleString('en')} candidates` },
		{ name: 'Score', result: 'Every candidate scored for one viewer' },
		{ name: 'Filter', result: 'Some dropped, the rest ranked into the feed' }
	];

	/** Stable pseudo-random numbers, so the picture is the same on every visit. */
	const noise = (i: number, salt: number) => {
		const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
		return x - Math.floor(x);
	};
	const posts = Array.from({ length: DOTS }, (_, i) => ({ score: noise(i, 1), dropped: noise(i, 2) < 0.3 }));
	const feed = new Set(
		posts
			.map((p, i) => ({ ...p, i }))
			.filter((p) => !p.dropped)
			.sort((a, b) => b.score - a.score)
			.slice(0, FEED_TOP)
			.map((p) => p.i)
	);

	let index = $state(0);
	const stage = $derived(stages[index]);
	const last = stages.length - 1;
</script>

<figure class="diagram">
	<div class="controls">
		<div class="diagram-chips" role="group" aria-label="Pipeline stage">
			{#each stages as s, i (s.name)}
				<button type="button" class="diagram-chip" aria-pressed={index === i} onclick={() => (index = i)}>
					{i + 1}. {s.name}
				</button>
			{/each}
		</div>
		<button type="button" class="diagram-chip next" onclick={() => (index = index === last ? 0 : index + 1)}>
			{index === last ? 'Start again' : 'Next stage'}
		</button>
	</div>

	<div class="dots mt-4" data-stage={index} aria-hidden="true">
		{#each posts as post, i (i)}
			<span class:dropped={post.dropped} class:top={feed.has(i)} style="--score: {post.score.toFixed(2)}"></span>
		{/each}
	</div>
	<p class="mt-2 text-sm text-muted">
		{#if index === 0}
			Each dot stands for about {POSTS_PER_DOT} posts.
		{:else if index === 1}
			Darker dot, higher score.
		{:else}
			Hollow dots are dropped. Large dots top the feed.
		{/if}
	</p>

	<div class="mt-4" aria-live="polite">
		<p class="diagram-output">{stage.result}</p>
		{#if index === 0}
			<dl class="list mt-2">
				{#each sources as s (s.name)}
					<div>
						<dt>{s.name}</dt>
						<dd>{s.pulls}</dd>
					</div>
				{/each}
			</dl>
		{:else if index === 1}
			<p class="mt-1">
				A model predicts the chance of a like, reply, share, read-through, follow, mute and more, multiplies each by a
				weight, and adds them up.
			</p>
		{:else}
			<ul class="reasons mt-2" aria-label="Dropped for">
				{#each dropped as reason (reason)}
					<li>{reason}</li>
				{/each}
			</ul>
		{/if}
	</div>

	<figcaption>
		Every feed refresh runs these three stages. Names and steps from @ryangrowthh’s reading of X’s open-source ranking
		code; parts of the system are closed.
	</figcaption>
</figure>

<style>
	.controls {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.4rem;
	}

	.next {
		background: var(--surface);
	}

	.dots {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;

		& span {
			width: 11px;
			height: 11px;
			border: 1.5px solid transparent;
			border-radius: 50%;
			background-color: var(--accent);
			opacity: 0.35;
			transition:
				opacity var(--duration-medium) var(--ease-smooth-out),
				scale var(--duration-medium) var(--ease-bounce),
				background-color var(--duration-medium) var(--ease-smooth-out),
				border-color var(--duration-medium) var(--ease-smooth-out);
			transition-delay: calc(var(--score) * 200ms);
		}
	}

	.dots[data-stage='1'] span {
		opacity: calc(0.12 + var(--score) * 0.88);
	}

	.dots[data-stage='2'] span {
		opacity: 0.2;
		&.dropped {
			opacity: 0.7;
			background-color: transparent;
			border-color: var(--muted);
			scale: 0.8;
		}
		&.top {
			opacity: 1;
			scale: 1.35;
		}
	}

	.list {
		display: grid;
		gap: 0.4rem;

		/* Name beside its description when there is room, above it when not. */
		& div {
			display: flex;
			flex-wrap: wrap;
			column-gap: 0.75rem;
		}
		& dt {
			flex: 0 0 7rem;
			font-weight: 700;
		}
		& dd {
			flex: 1 1 14rem;
			color: var(--muted);
		}
	}

	.reasons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;

		& li {
			padding: 0.2rem 0.65rem;
			border: 1.5px dashed var(--muted);
			border-radius: 999px;
			font-size: 0.85rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dots span {
			transition: none;
		}
	}
</style>
