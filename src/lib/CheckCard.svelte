<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A retrieval-practice card: the reader answers in their head, then reveals the answer.
	 * `after` renders under the revealed answer (the review page puts its grading buttons there).
	 */
	let {
		question,
		answer,
		revealed = $bindable(false),
		after
	}: { question: string; answer: string; revealed?: boolean; after?: Snippet } = $props();

	const id = $props.id();
</script>

<div class="card" data-revealed={revealed || undefined}>
	<p class="question">{@html question}</p>
	{#if !revealed}
		<button type="button" class="reveal" aria-expanded="false" aria-controls={id} onclick={() => (revealed = true)}>
			Show answer
		</button>
	{/if}
	<div class="answer" {id} inert={!revealed}>
		<div class="inner">
			<div class="lesson">{@html answer}</div>
			{@render after?.()}
		</div>
	</div>
</div>

<style>
	.card {
		padding: 1.1rem 1.25rem;
		border-radius: 14px;
		background: var(--paper);
		border: 1.5px solid var(--accent-line);
	}

	.question {
		font-size: 1.1rem;
		font-weight: 700;
		line-height: 1.4;
	}

	.reveal {
		margin-top: 0.75rem;
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.9rem;
		background: var(--accent-soft);
		color: var(--ink);
		&:hover {
			background: var(--accent-line);
		}
	}

	/* Accordion: grid rows grow from 0fr to 1fr so the answer opens to its natural height. */
	.answer {
		display: grid;
		grid-template-rows: 0fr;
		opacity: 0;
		transition:
			grid-template-rows var(--duration-slow) var(--ease-smooth-out),
			opacity var(--duration-fast) var(--ease-in-out);
	}

	.inner {
		min-height: 0;
		overflow: hidden;
	}

	[data-revealed] .answer {
		grid-template-rows: 1fr;
		opacity: 1;
		& .inner {
			padding-top: 0.6rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.answer {
			transition: none;
		}
	}
</style>
