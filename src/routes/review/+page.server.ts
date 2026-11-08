import { course } from '#lib/server/course.ts';

/** Every check card in the course, with the lesson it came from. The browser decides which are due. */
export const load = () => ({
	cards: Object.fromEntries(
		course.modules.flatMap((module) =>
			module.lessons.flatMap((lesson) =>
				lesson.checks.map((check) => [
					check.id,
					{ ...check, hue: module.hue, lesson: { title: lesson.title, href: lesson.href } }
				])
			)
		)
	)
});
