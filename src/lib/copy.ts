const COPIED_FOR_MS = 1500;

/**
 * Click handler for a container of rendered lesson HTML: copies the code block
 * next to any `[data-copy]` button the course renderer adds to `<pre>` blocks.
 */
export const copyCode = async (event: MouseEvent) => {
	if (!(event.target instanceof Element)) return;
	const button = event.target.closest<HTMLButtonElement>('[data-copy]');
	const code = button?.parentElement?.querySelector('code');
	if (!button || !code) return;
	try {
		await navigator.clipboard.writeText(code.textContent ?? '');
		button.textContent = 'Copied';
	} catch {
		button.textContent = 'Select and copy';
	}
	setTimeout(() => (button.textContent = 'Copy'), COPIED_FOR_MS);
};
