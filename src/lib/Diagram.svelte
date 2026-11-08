<script lang="ts">
	import { diagrams } from './diagrams/index.ts';

	/** Renders a diagram by name. Unknown names fail the content test, so none reach the page. */
	let { name }: { name: string } = $props();

	const Component = $derived(diagrams[name]);
</script>

{#if Component}
	<Component />
{/if}
