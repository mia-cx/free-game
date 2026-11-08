import { error } from '@sveltejs/kit';
import { course } from '#lib/server/course.ts';

export const entries = () => course.lessons.map((l) => ({ module: l.module, lesson: l.id.split('/')[1] }));

export const load = ({ params }) => {
	const index = course.lessons.findIndex((l) => l.id === `${params.module}/${params.lesson}`);
	if (index === -1) error(404, 'No lesson here');
	const { html, title, summary, id, module, sections } = course.lessons[index];
	return { lesson: { html, title, summary, id, module, sections } };
};
