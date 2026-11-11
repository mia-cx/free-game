/**
 * The agent skills this site serves from `static/.well-known/agent-skills/`, synced from
 * github.com/mia-cx/skills by `research/tools/sync-skills.mjs`. `npx skills add <site>` reads the
 * same index, and every file is a plain static URL.
 */
import index from '../../../static/.well-known/agent-skills/index.json' with { type: 'json' };

export const SKILLS_PATH = '/.well-known/agent-skills';

export type Skill = { name: string; description: string; href: string };

export const skills: Skill[] = index.skills.map(({ name, description }) => ({
	name,
	description,
	href: `${SKILLS_PATH}/${name}/SKILL.md`
}));

/** Each entry point (a skill named without a dash suffix of another) with the branches it routes to. */
export const skillGroups = skills
	.filter((s) => !skills.some((other) => other !== s && s.name.startsWith(`${other.name}-`)))
	.map((entry) => ({ entry, branches: skills.filter((s) => s.name.startsWith(`${entry.name}-`)) }));
