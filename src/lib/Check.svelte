<script lang="ts">
	/** Done marker for a lesson row. Decorative; the row's link carries the meaning. */
	let { done }: { done: boolean } = $props();
</script>

<span
	class="mt-[0.2em] grid size-5 shrink-0 place-items-center rounded-full border-2 {done
		? 'border-go bg-go text-go-ink'
		: 'border-line'}"
>
	{#if done}
		<svg viewBox="0 0 16 16" class="size-3" aria-hidden="true"
			><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="2.5" /></svg
		>
	{/if}
	<span class="sr-only">{done ? 'Done' : 'Not done'}</span>
</span>
