import type { Outline } from '#lib/course.ts';
import { course } from '#lib/server/course.ts';

export const prerender = true;

export const load = () => ({
	outline: course.modules.map(({ lessons, ...module }) => ({
		...module,
		lessons: lessons.map(({ id, href, module, title, summary }) => ({ id, href, module, title, summary }))
	})) satisfies Outline
});
