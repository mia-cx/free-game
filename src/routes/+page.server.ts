import { error } from '@sveltejs/kit';
import { course } from '#lib/server/course.ts';
import { skillGroups } from '#lib/server/skills.ts';

/** The lesson the landing page takes apart: a short TLDR, an interactive diagram and small tricks. */
const SHOWCASE = 'outreach/cold-email';
const X_POST = /https:\/\/x\.com\/(\w+)\/status\/(\d+)/g;

export const load = () => {
	const lesson = course.lessons.find((l) => l.id === SHOWCASE);
	const module = course.modules.find((m) => m.slug === lesson?.module);
	if (!lesson || !module) error(500, `Showcase lesson ${SHOWCASE} is missing`);

	// Credits: every X post a lesson cites, and the people who wrote them.
	const posts = new Map<string, string>();
	for (const l of course.lessons) for (const [, handle, id] of l.sources.matchAll(X_POST)) posts.set(id, handle);
	const authors = [...new Map([...posts.values()].map((h) => [h.toLowerCase(), h])).values()].sort((a, b) =>
		a.localeCompare(b, 'en', { sensitivity: 'base' })
	);

	return {
		showcase: {
			title: lesson.title,
			href: lesson.href,
			hue: module.hue,
			tldr: lesson.tldr,
			diagram: lesson.blocks.find((b) => b.kind === 'diagram')?.name,
			trick: lesson.tricks[0],
			task: lesson.task,
			check: lesson.checks[0]
		},
		tricks: course.lessons.reduce((n, l) => n + l.tricks.length, 0),
		posts: posts.size,
		authors,
		skills: skillGroups
	};
};
