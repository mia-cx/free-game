import { course } from '#lib/server/course.ts';

export const load = () => ({
	tricks: course.lessons.flatMap((lesson) =>
		lesson.tricks.map((trick, i) => ({
			...trick,
			key: `${lesson.id}#${i}`,
			module: lesson.module,
			lesson: { title: lesson.title, href: lesson.href }
		}))
	)
});
