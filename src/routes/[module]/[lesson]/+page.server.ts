import { existsSync } from 'node:fs';
import { error } from '@sveltejs/kit';
import { course } from '#lib/server/course.ts';

export const entries = () => course.lessons.map((l) => ({ module: l.module, lesson: l.id.split('/')[1] }));

export const load = ({ params }) => {
	const lesson = course.lessons.find((l) => l.id === `${params.module}/${params.lesson}`);
	if (!lesson) error(404, 'No lesson here');
	const { tricks, ...rest } = lesson;
	// Narration made by research/tools/voice.mjs, when it exists for this lesson.
	const audio = existsSync(`static/audio/${lesson.id}.mp3`) ? `/audio/${lesson.id}.mp3` : null;
	return { lesson: rest, audio };
};
