import type { Outline } from '#lib/course.ts';
import { course } from '#lib/server/course.ts';

export const prerender = true;

export const load = () => ({
	outline: course.modules.map(({ lessons, ...module }) => ({
		...module,
		lessons: lessons.map(({ id, href, module, number, title, summary, minutes, checks }) => ({
			id,
			href,
			module,
			number,
			title,
			summary,
			minutes,
			checks: checks.length
		}))
	})) satisfies Outline
});
