// Fetches every linked X post via the fxtwitter API (threads, articles, quoted posts)
// and renders each to sources/<id>.md for analysis.
// Usage: node research/tools/scrape.mjs [id...]   (no ids: every post in links.txt)
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url).pathname;
const API = 'https://api.fxtwitter.com/2/thread/';

const fetchThread = async (id) => {
	const res = await fetch(API + id);
	if (!res.ok) return null;
	return res.json();
};

/** Replaces t.co links with their targets using the raw_text facets. */
const expand = (s) => {
	let text = s.raw_text?.text ?? s.text ?? '';
	for (const f of s.raw_text?.facets ?? []) {
		if (f.type === 'url' && f.original) text = text.replace(f.original, f.replacement);
	}
	return text;
};

/** Applies LINK entities as markdown links inside a draft.js block. */
const linkify = (block, entities) => {
	const ranges = [...block.entityRanges].sort((a, b) => b.offset - a.offset);
	let text = block.text;
	for (const r of ranges) {
		const url = entities.get(String(r.key))?.data?.url;
		if (!url) continue;
		const label = text.slice(r.offset, r.offset + r.length);
		text = `${text.slice(0, r.offset)}[${label}](${url})${text.slice(r.offset + r.length)}`;
	}
	return text;
};

const renderArticle = (a) => {
	const entities = new Map((a.content?.entityMap ?? []).map((e) => [e.key, e.value]));
	const out = [`## Article: ${a.title}`, ''];
	let n = 0;
	for (const b of a.content?.blocks ?? []) {
		const t = linkify(b, entities);
		if (b.type !== 'ordered-list-item') n = 0;
		switch (b.type) {
			case 'header-one':
				out.push(`\n## ${t}\n`);
				break;
			case 'header-two':
				out.push(`\n### ${t}\n`);
				break;
			case 'header-three':
				out.push(`\n#### ${t}\n`);
				break;
			case 'unordered-list-item':
				out.push(`- ${t}`);
				break;
			case 'ordered-list-item':
				out.push(`${++n}. ${t}`);
				break;
			case 'blockquote':
				out.push(`> ${t}\n`);
				break;
			case 'code-block':
				out.push(`\`\`\`\n${t}\n\`\`\`\n`);
				break;
			case 'atomic': {
				const e = entities.get(String(b.entityRanges[0]?.key));
				if (e?.type === 'MARKDOWN' || e?.data?.markdown) out.push(e.data.markdown);
				else if (e?.type === 'TWEET') out.push(`[embedded post ${e.data.tweetId}]`);
				break;
			}
			default:
				out.push(t ? `${t}\n` : '');
		}
	}
	return out.join('\n');
};

const renderStatus = (s, heading) => {
	const parts = [
		`${heading} @${s.author?.screen_name} (${s.created_at}, ${s.likes} likes, ${s.bookmarks} bookmarks)`,
		'',
		expand(s)
	];
	if (s.article) parts.push('', renderArticle(s.article));
	return parts.join('\n');
};

const render = async (id, meta, depth = 0) => {
	const j = await fetchThread(id);
	const root = j?.status;
	if (!root) return `# ${id}\n\nUnavailable (fxtwitter ${j?.code ?? 'error'}).`;
	const chain = (j.thread ?? [root]).filter((s) => s.author?.screen_name === root.author.screen_name);
	const out = [
		`# @${root.author.screen_name}: ${meta ?? ''}`,
		`Source: ${root.url}`,
		`Author bio: ${root.author.description} (${root.author.followers} followers)`,
		''
	];
	for (const [i, s] of chain.entries()) out.push(renderStatus(s, i === 0 ? '### Post' : `### Thread ${i}`), '');
	if (root.quote && depth === 0) {
		out.push('---', '## Quoted post', '', (await render(root.quote.id, 'quoted', depth + 1)).replace(/^# /m, '### '));
	}
	return out.join('\n');
};

const only = process.argv.slice(2);
const lines = (await readFile(`${ROOT}tools/links.txt`, 'utf8'))
	.trim()
	.split('\n')
	.filter((line) => !only.length || only.includes(line.split('\t')[2]));
await mkdir(`${ROOT}sources`, { recursive: true });
await Promise.all(
	lines.map(async (line) => {
		const [group, , id, label] = line.split('\t');
		const md = await render(id, `${label || ''} [${group}]`);
		await writeFile(`${ROOT}sources/${id}.md`, md);
		console.log(id, md.length);
	})
);
