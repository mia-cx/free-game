// Measures how much of the course would be read aloud: characters and words per module,
// with and without the pasted prompts (code blocks), and the review cards on their own.
// Usage: node research/tools/count-speech.mjs
import { readdir, readFile } from 'node:fs/promises';

const CONTENT = new URL('../../src/content/', import.meta.url).pathname;

/** Turns lesson markdown into the text a narrator would say. */
const speakable = (markdown, { prompts }) =>
	markdown
		.replace(/^---\n[\s\S]*?\n---\n/, '')
		.replace(/\n## Sources[\s\S]*$/, '')
		.replace(/```[\s\S]*?```/g, (block) => (prompts ? block.replace(/```/g, '') : ''))
		.replace(/^> ?/gm, '')
		.replace(/\[!(TLDR|TRICK|RISK|DO|CHECK|DIAGRAM)\][^\n]*/g, (m) =>
			m.startsWith('[!DIAGRAM]') ? '' : m.replace(/\[![A-Z]+\]\s*/, '')
		)
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/https?:\/\/\S+/g, '')
		.replace(/^\|?[\s:|-]+\|?$/gm, '')
		.replace(/[*_`#|>]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const checksOnly = (markdown) =>
	[...markdown.matchAll(/^> \[!CHECK\][^\n]*(?:\n>[^\n]*)*/gm)]
		.map((m) => speakable(m[0], { prompts: false }))
		.join(' ');

const rows = [];
for (const dir of (await readdir(CONTENT)).sort()) {
	const files = (await readdir(CONTENT + dir)).filter((f) => f.endsWith('.md') && f !== '_module.md');
	const texts = await Promise.all(files.map((f) => readFile(`${CONTENT}${dir}/${f}`, 'utf8')));
	const titles = texts.map((t) => t.match(/^title: (.*)$/m)?.[1] ?? '').join(' ');
	const prose = `${titles} ${texts.map((t) => speakable(t, { prompts: false })).join(' ')}`;
	const withPrompts = `${titles} ${texts.map((t) => speakable(t, { prompts: true })).join(' ')}`;
	rows.push({
		module: dir,
		lessons: files.length,
		chars: prose.length,
		words: prose.split(' ').length,
		charsWithPrompts: withPrompts.length,
		checkChars: texts.map(checksOnly).join(' ').length
	});
}

const total = (key) => rows.reduce((n, r) => n + r[key], 0);
console.table(rows);
console.log(
	JSON.stringify({
		lessons: total('lessons'),
		chars: total('chars'),
		words: total('words'),
		charsWithPrompts: total('charsWithPrompts'),
		checkChars: total('checkChars')
	})
);
