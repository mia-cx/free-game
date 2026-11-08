import { error } from '@sveltejs/kit';
import { course } from '#lib/server/course.ts';

export const entries = () => course.modules.map((m) => ({ module: m.slug }));

export const load = ({ params }) => {
	const module = course.modules.find((m) => m.slug === params.module);
	if (!module) error(404, 'No module here');
	return { slug: module.slug, tricks: module.lessons.reduce((n, l) => n + l.tricks.length, 0) };
};
