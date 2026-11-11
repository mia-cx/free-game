// Copies the course's agent skills from github.com/mia-cx/skills into static/.well-known/agent-skills/,
// the layout `npx skills add <site>` discovers (index.json, then <name>/<file>). Every file is also a
// plain static URL, so an agent can read a SKILL.md without installing anything.
//
// Usage: node research/tools/sync-skills.mjs [ref]   (default: main)
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';

const REPO = 'mia-cx/skills';
/** The skills distilled from this course: three entry points and their branches. */
const INCLUDE = /^(gtm|seo|marketing-agents)(-[a-z0-9-]+)?$/;
/** Files that help maintain a skill but aren't part of using it. */
const SKIP = /(^|\/)(\.DS_Store|[^/]+\.test\.m?js)$/;
const OUT = 'static/.well-known/agent-skills';

const ref = process.argv[2] ?? 'main';
const sha = execFileSync('gh', ['api', `repos/${REPO}/commits/${ref}`, '--jq', '.sha'], { encoding: 'utf8' }).trim();
const work = mkdtempSync(join(tmpdir(), 'skills-'));
const tarball = join(work, 'skills.tgz');
writeFileSync(tarball, Buffer.from(await (await fetch(`https://codeload.github.com/${REPO}/tar.gz/${sha}`)).arrayBuffer()));
execFileSync('tar', ['-xzf', tarball, '-C', work, '--strip-components=1']);

const source = join(work, 'skills');
const names = readdirSync(source).filter((name) => INCLUDE.test(name) && statSync(join(source, name)).isDirectory());
const served = new Set(names);
const filesIn = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
		entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)]
	);

// A link to a skill this site doesn't serve points at its copy on GitHub instead.
const relink = (markdown) =>
	markdown.replace(/\]\((?:\.\.\/)+([a-z0-9-]+)\/SKILL\.md(#[^)]*)?\)/g, (link, name, anchor = '') =>
		served.has(name) ? link : `](https://github.com/${REPO}/blob/${sha}/skills/${name}/SKILL.md${anchor})`
	);

const description = (skill) => {
	const match = skill.match(/^---\n[\s\S]*?^description:\s*(.+)$/m);
	if (!match) throw new Error('SKILL.md has no description');
	return match[1].trim().replace(/^(['"])(.*)\1$/, '$2');
};

rmSync(OUT, { recursive: true, force: true });
const skills = names.sort().map((name) => {
	const files = filesIn(join(source, name))
		.map((file) => relative(join(source, name), file))
		.filter((file) => !SKIP.test(file))
		.sort((a, b) => (a === 'SKILL.md' ? -1 : b === 'SKILL.md' ? 1 : a.localeCompare(b)));
	for (const file of files) {
		const from = join(source, name, file);
		const to = join(OUT, name, file);
		cpSync(from, to);
		if (file.endsWith('.md')) writeFileSync(to, relink(readFileSync(from, 'utf8')));
	}
	return { name, description: description(readFileSync(join(source, name, 'SKILL.md'), 'utf8')), files };
});

writeFileSync(
	join(OUT, 'index.json'),
	`${JSON.stringify({ source: `https://github.com/${REPO}/tree/${sha}/skills`, skills }, null, '\t')}\n`
);
rmSync(work, { recursive: true, force: true });
console.log(`${skills.length} skills from ${REPO}@${sha.slice(0, 7)} into ${OUT}`);
