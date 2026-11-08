// Voices lessons with ElevenLabs.
// Usage: ELEVENLABS_KEY_FILE=<file> node research/tools/voice.mjs static/audio <lesson.md>...
//        Writes static/audio/<module>/<lesson>.mp3, the path the lesson page plays.
//        node research/tools/voice.mjs --text <lesson.md>   (prints the narration, spends nothing)
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname } from 'node:path';

const VOICE = 'sIsOVGs6S7nw2rF50cfY'; // Soph
const MODEL = 'eleven_v4';
const MAX_CHARS = 10_000;

const LABELS = {
	TLDR: 'The short version.',
	TRICK: 'Cheap trick:',
	RISK: 'Watch out:',
	DO: 'Do it now:',
	CHECK: 'Question:'
};

/** Turns a markdown table into one spoken sentence per row: "Header one: cell. Header two: cell." */
const speakTable = (table) => {
	const rows = table
		.trim()
		.split('\n')
		.filter((r) => !/^\|?[\s:|-]+\|?$/.test(r))
		.map((r) =>
			r
				.replace(/^\||\|$/g, '')
				.split('|')
				.map((c) => c.trim())
		);
	const [head, ...body] = rows;
	return body.map((cells) => cells.map((c, i) => `${head[i]}: ${c}`).join(', ')).join('. ') + '.';
};

/** Lesson markdown to narration: title, then the body in reading order, without code, links or sources. */
export const toNarration = (markdown) => {
	const title = markdown.match(/^title: (.*)$/m)?.[1] ?? '';
	let checkCount = 0;
	const body = markdown
		.replace(/^---\n[\s\S]*?\n---\n/, '')
		.replace(/\n## Sources[\s\S]*$/, '')
		.replace(/^> \[!DIAGRAM\].*\n?/gm, '')
		// Callouts: a spoken label, then the callout text.
		.replace(/^> \[!(TLDR|TRICK|RISK|DO|CHECK)\][ \t]*(.*)$/gm, (_, kind, rest) => {
			if (kind === 'CHECK') {
				checkCount += 1;
				return `${checkCount === 1 ? 'Check yourself.\n\n' : ''}${LABELS.CHECK} ${rest}\n\nAnswer:`;
			}
			return `${LABELS[kind]} ${rest}`.trim().replace(/([^.?:])$/, '$1.');
		})
		.replace(/^> ?/gm, '')
		.replace(/```[\s\S]*?```/g, 'The prompt is on the page.')
		.replace(/(^\|.*\|\n?)+/gm, (t) => `${speakTable(t)}\n`)
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/https?:\/\/\S+/g, '')
		.replace(/^#+ (.*)$/gm, '$1.')
		.replace(/^\s*(?:[-*]|\d+\.)\s+/gm, '')
		.replace(/_{2,}/g, 'blank')
		.replace(/[*_`]/g, '')
		.replace(/\.\.+/g, '.')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
	return `${title}.\n\n${body}`;
};

const speak = async (text, key) => {
	const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
		method: 'POST',
		headers: { 'xi-api-key': key, 'content-type': 'application/json' },
		body: JSON.stringify({ text, model_id: MODEL })
	});
	if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
	return Buffer.from(await res.arrayBuffer());
};

const args = process.argv.slice(2);
if (args[0] === '--text') {
	for (const file of args.slice(1)) console.log(toNarration(await readFile(file, 'utf8')));
} else {
	const [outDir, ...files] = args;
	const key = (await readFile(process.env.ELEVENLABS_KEY_FILE, 'utf8')).trim();
	for (const file of files) {
		const text = toNarration(await readFile(file, 'utf8'));
		if (text.length > MAX_CHARS) throw new Error(`${file}: ${text.length} characters, over the ${MAX_CHARS} limit`);
		const id = [basename(dirname(file)), basename(file, '.md')].map((part) => part.replace(/^\d+-/, ''));
		const out = `${outDir}/${id.join('/')}.mp3`;
		await mkdir(dirname(out), { recursive: true });
		await writeFile(out, await speak(text, key));
		console.log(out, text.length);
	}
}
