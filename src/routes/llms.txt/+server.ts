import { course } from '#lib/server/course.ts';
import { SKILLS_PATH, skills } from '#lib/server/skills.ts';

export const prerender = true;

/** The site for agents (llmstxt.org): what the course is, how to install its skills, and every lesson. */
export const GET = ({ url }) => {
	const at = (path: string) => new URL(path, url.origin).href;
	const body = [
		'# Free Game',
		'',
		`> A free marketing course for builders with ADHD: ${course.lessons.length} short lessons on positioning, writing, launches, SEO and marketing with AI agents, rewritten from free posts on X. Each lesson starts with the short version and ends with one task.`,
		'',
		'## Agent skills',
		'',
		`The course's methods as agent skills. Install all of them with \`npx skills add ${url.origin}\`, or read any SKILL.md directly. Index: ${at(`${SKILLS_PATH}/index.json`)}`,
		'',
		...skills.map((s) => `- [${s.name}](${at(s.href)}): ${s.description}`),
		'',
		...course.modules.flatMap((m) => [
			`## ${m.number}. ${m.title}`,
			'',
			...m.lessons.map((l) => `- [${l.title}](${at(l.href)}): ${l.summary}`),
			''
		])
	].join('\n');
	return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
