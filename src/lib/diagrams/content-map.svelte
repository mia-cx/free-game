<script lang="ts">
	/**
	 * Dan Koe's content map as a tree, from "Plan six months of ideas in one sitting".
	 * The reader sizes each level within the lesson's ranges and opens one branch at a time.
	 */
	const levels = [
		{ label: 'Pillars', min: 3, max: 4 },
		{ label: 'Topics per pillar', min: 5, max: 7 },
		{ label: 'Ideas per topic', min: 5, max: 10 },
		{ label: 'Angles per idea', min: 4, max: 5 }
	];
	const POSTS_PER_WEEK = 5;

	let sizes = $state(levels.map((l) => l.min));
	let open = $state([0, 0, 0]);

	/** The open branch, kept inside the current sizes when a level shrinks. */
	const path = $derived(open.map((n, i) => Math.min(n, sizes[i] - 1)));
	const total = $derived(sizes.reduce((a, b) => a * b, 1));
	const weeks = $derived(Math.round(total / POSTS_PER_WEEK));

	/** "1.2.3" style id for item `n` at `depth`, under the open branch. */
	const id = (depth: number, n: number) => [...path.slice(0, depth), n].map((x) => x + 1).join('.');
	const parent = (depth: number) => (depth === 0 ? 'the map' : id(depth - 1, path[depth - 1]));
</script>

<figure class="diagram">
	<div class="tree">
		{#each levels as level, depth (level.label)}
			<div class="level" style="--depth: {depth}">
				<div class="size">
					<label for="content-map-{depth}">{level.label}</label>
					<input
						id="content-map-{depth}"
						type="range"
						min={level.min}
						max={level.max}
						bind:value={sizes[depth]}
					/>
					<span class="value" aria-hidden="true">{sizes[depth]}</span>
				</div>

				{#if depth < levels.length - 1}
					<div class="diagram-chips" role="group" aria-label="{level.label.split(' ')[0]} in {parent(depth)}">
						{#each { length: sizes[depth] }, n (n)}
							<button
								type="button"
								class="diagram-chip"
								aria-pressed={path[depth] === n}
								onclick={() => (open[depth] = n)}>{id(depth, n)}</button
							>
						{/each}
					</div>
				{:else}
					<ul class="angles" aria-label="Angles on idea {parent(depth)}">
						{#each { length: sizes[depth] }, n (n)}
							<li>{id(depth, n)}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-5" aria-live="polite">
		<p class="diagram-output">{total.toLocaleString('en')} posts, one per angle</p>
		<p class="text-sm text-muted">
			{sizes.join(' × ')} = {total.toLocaleString('en')}. About {weeks} weeks at {POSTS_PER_WEEK} posts a week.
		</p>
	</div>

	<figcaption>
		Each level branches into the next. Dan Koe says one map gives about six months of ideas; even the smallest map covers
		that.
	</figcaption>
</figure>

<style>
	.tree {
		display: grid;
		gap: 0.75rem;
	}

	.level {
		display: grid;
		gap: 0.4rem;
		margin-left: calc(var(--depth) * 0.75rem);
		padding-left: 0.75rem;
		border-left: 2px solid var(--accent-line);
	}

	.size {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 0.6rem;
		font-size: 0.85rem;
		font-weight: 700;

		& input {
			width: 7rem;
			accent-color: var(--accent);
		}
	}

	.value {
		min-width: 1.5ch;
		font-variant-numeric: tabular-nums;
	}

	.angles {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;

		& li {
			padding: 0.3rem 0.75rem;
			border: 1.5px dashed var(--accent-line);
			border-radius: 999px;
			font-size: 0.85rem;
			color: var(--muted);
			animation: grow var(--duration-fast) var(--ease-bounce) both;
		}
	}

	@keyframes grow {
		from {
			opacity: 0;
			scale: 0.85;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.angles li {
			animation: none;
		}
	}
</style>
