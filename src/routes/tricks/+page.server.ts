import { course } from '#lib/server/course.ts';

export const load = () => ({
	tricks: course.modules.flatMap((module) =>
		module.lessons.flatMap((lesson) =>
			lesson.tricks.map((trick, i) => ({
				...trick,
				key: `${lesson.id}#${i}`,
				module: module.slug,
				hue: module.hue,
				lesson: { title: lesson.title, href: lesson.href }
			}))
		)
	)
});
