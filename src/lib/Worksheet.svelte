<script lang="ts">
	import type { Form } from './course.ts';

	/**
	 * A lesson's `[!FORM]` worksheet: one answer field per question. Answers save in this browser as
	 * the reader types, and download as Markdown or print to PDF with the lesson they came from.
	 */
	let { form, lesson }: { form: Form; lesson: { id: string; title: string } } = $props();

	const key = $derived(`free-game:answers:${lesson.id}#${form.id}`);
	let answers = $state<string[]>([]);

	/** Restores saved answers in the browser; storage can be blocked, and answers then last for the visit. */
	$effect(() => {
		try {
			answers = JSON.parse(localStorage.getItem(key) ?? '[]');
		} catch {
			answers = [];
		}
	});

	const save = () => {
		try {
			localStorage.setItem(key, JSON.stringify(answers));
		} catch {
			// Storage blocked: answers stay on the page for this visit.
		}
	};

	const answer = (i: number) => answers[i]?.trim() ?? '';
	const source = () => `${location.origin}/${lesson.id}`;

	const markdown = () =>
		[
			`# ${form.title}`,
			`From [${lesson.title}](${source()}) in Free Game.`,
			...form.questions.flatMap((q, i) => [`## ${i + 1}. ${q.text}`, answer(i) || '_No answer yet._'])
		].join('\n\n') + '\n';

	const download = () => {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(new Blob([markdown()], { type: 'text/markdown' }));
		link.download = `${form.id}.md`;
		link.click();
		URL.revokeObjectURL(link.href);
	};

	const escape = (text: string) =>
		text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c);

	/** The answers as a standalone page, printed from a hidden frame so the PDF holds only the worksheet. */
	const printable = () => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escape(form.title)}</title>
<style>
	body { font: 12pt/1.55 system-ui, sans-serif; color: #1d1b18; max-width: 40rem; margin: 2rem auto; }
	h1 { font-size: 20pt; margin: 0; }
	.from { color: #6b655c; margin: 0.25rem 0 2rem; }
	section { break-inside: avoid; margin-top: 1.5rem; }
	h2 { font-size: 12pt; margin: 0; }
	p { white-space: pre-wrap; margin: 0.4rem 0 0; }
	.blank { color: #6b655c; font-style: italic; }
	a { color: inherit; }
</style></head><body>
<h1>${escape(form.title)}</h1>
<p class="from">From ${escape(lesson.title)} in Free Game · ${escape(source())}</p>
${form.questions
	.map(
		(q, i) =>
			`<section><h2>${i + 1}. ${q.html}</h2>${answer(i) ? `<p>${escape(answer(i))}</p>` : '<p class="blank">No answer yet.</p>'}</section>`
	)
	.join('\n')}
</body></html>`;

	const print = () => {
		const frame = document.createElement('iframe');
		frame.style.cssText = 'position: fixed; width: 0; height: 0; border: 0;';
		frame.srcdoc = printable();
		frame.onload = () => {
			const view = frame.contentWindow;
			if (!view) return;
			view.addEventListener('afterprint', () => frame.remove());
			view.print();
		};
		document.body.append(frame);
	};
</script>

<form class="worksheet" aria-labelledby="{form.id}-title" onsubmit={(e) => e.preventDefault()}>
	<p class="worksheet-kind">Fill it in</p>
	<h3 id="{form.id}-title" class="worksheet-title">{form.title}</h3>
	<ol>
		{#each form.questions as question, i (i)}
			<li>
				<label for="{form.id}-{i}">{@html question.html}</label>
				<textarea id="{form.id}-{i}" rows="2" bind:value={answers[i]} oninput={save}></textarea>
			</li>
		{/each}
	</ol>
	<div class="worksheet-actions">
		<button type="button" onclick={download}>Download Markdown</button>
		<button type="button" onclick={print}>Save as PDF</button>
		<span>Saved in this browser as you type.</span>
	</div>
</form>

<style>
	.worksheet {
		padding: 1.25rem 1.4rem 1.4rem;
		border: 1px solid var(--accent-line);
		border-radius: 14px;
		background: color-mix(in oklch, var(--accent-soft) 45%, var(--paper));
	}

	.worksheet-kind {
		font-size: 0.75rem;
		font-weight: 750;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.worksheet-title {
		margin-top: 0.35rem;
		font-size: 1.2rem;
		font-weight: 800;
	}

	ol {
		display: grid;
		gap: 1.5rem;
		margin-top: 1.25rem;
		padding: 0;
		list-style: none;
		counter-reset: question;
	}

	li {
		counter-increment: question;
		margin: 0;
	}

	label {
		display: block;
		font-weight: 650;
		line-height: 1.45;
		&::before {
			content: counter(question) '. ';
			color: var(--accent);
			font-weight: 800;
		}
	}

	textarea {
		display: block;
		width: 100%;
		min-height: 3.2lh;
		margin-top: 0.5rem;
		padding: 0.6rem 0.75rem;
		field-sizing: content;
		resize: vertical;
		font: inherit;
		line-height: 1.5;
		color: var(--ink);
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: 10px;
		&:focus-visible {
			outline-offset: 0;
			border-color: var(--accent);
		}
	}

	.worksheet-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1.5rem;
		& button {
			padding: 0.55rem 1.1rem;
			border-radius: 999px;
			font-weight: 700;
			background: var(--accent);
			color: var(--accent-ink);
			&:hover {
				filter: brightness(1.1);
			}
		}
		& button + button {
			background: var(--paper);
			color: var(--ink);
			border: 1px solid var(--line);
		}
		& span {
			font-size: 0.85rem;
			color: var(--muted);
		}
	}
</style>
