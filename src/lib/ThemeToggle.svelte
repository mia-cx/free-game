<script lang="ts">
	/**
	 * Switches between light and dark. The choice is saved in this browser and applied before
	 * first paint by the script in app.html; until the reader chooses, the page follows the system.
	 */
	const KEY = 'free-game:theme';

	let dark = $state(false);

	$effect(() => {
		const chosen = document.documentElement.dataset.theme;
		dark = chosen ? chosen === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
	});

	const toggle = () => {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem(KEY, theme);
		} catch {
			// Storage blocked: the theme lasts for this visit.
		}
	};
</script>

<button type="button" class="toggle" onclick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		{#if dark}
			<circle cx="12" cy="12" r="4.5" />
			<path
				d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
			/>
		{:else}
			<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
		{/if}
	</svg>
</button>

<style>
	.toggle {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		color: var(--ink);
		transition: background-color var(--duration-quick) var(--ease-out);
		&:hover {
			background: var(--surface);
		}
	}

	svg {
		width: 1.25rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
