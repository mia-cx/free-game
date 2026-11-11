import { index } from 'virtual:course-index';
import { buildCourse } from './build-course.ts';

/** The whole course, built from the vault's Svartz index once per server process (prerendered at build). */
export const course = buildCourse(index.entries);
