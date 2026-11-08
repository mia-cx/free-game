<script lang="ts">
	/**
	 * One illustrative post, shown as a wall of text and formatted for phone skimmers,
	 * following "Shape posts for skimmers".
	 */
	const parts = [
		{ label: 'Hook', lines: ['Most people read your post on a phone, with one thumb.'] },
		{
			label: 'One idea per line',
			lines: ['They scan before they read.', 'Four lines look like an essay.', 'So they scroll past it.']
		},
		{ label: 'Proof', lines: ['You’re still reading, and every line so far holds one thought.'] },
		{ label: 'Close', lines: ['Short lines get read. Walls of text get skipped.'] },
		{ label: 'Call to action', lines: ['Open your last post and break it into lines before you write the next one.'] }
	];
	const wall = parts.flatMap((p) => p.lines).join(' ');

	const views = ['Wall of text', 'Formatted for skimmers'] as const;
	let view = $state<(typeof views)[number]>(views[0]);
</script>

<figure class="diagram">
	<div class="diagram-chips" role="group" aria-label="How the post is shown">
		{#each views as v (v)}
			<button type="button" class="diagram-chip" aria-pressed={view === v} onclick={() => (view = v)}>{v}</button>
		{/each}
	</div>

	<div class="post mt-4">
		{#key view}
			{#if view === 'Wall of text'}
				<p class="swap">{wall}</p>
			{:else}
				<dl class="swap">
					{#each parts as part (part.label)}
						<div class="part">
							<dt>{part.label}</dt>
							<dd>
								{#each part.lines as line (line)}<p>{line}</p>{/each}
							</dd>
						</div>
					{/each}
				</dl>
			{/if}
		{/key}
	</div>

	<figcaption>The same words, twice. Phone readers scan before they read, so give each thought its own line.</figcaption>
</figure>

<style>
	.post {
		container-type: inline-size;
		padding: 1rem;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--paper);
	}

	dl {
		display: grid;
		gap: 0.9rem;
	}

	.part {
		display: grid;
		gap: 0.15rem 1rem;
	}

	dt {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--accent);
	}

	dd {
		display: grid;
		gap: 0.15rem;
		padding-left: 0.75rem;
		border-left: 2px solid var(--accent-line);
	}

	@container (min-width: 30rem) {
		.part {
			grid-template-columns: 7.5rem 1fr;
			align-items: start;
		}
		dt {
			padding-top: 0.2rem;
			text-align: right;
		}
	}

	.swap {
		animation: swap-in var(--duration-fast) var(--ease-smooth-out) both;
	}

	@keyframes swap-in {
		from {
			opacity: 0;
			translate: 0 var(--distance-micro);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.swap {
			animation: none;
		}
	}
</style>
