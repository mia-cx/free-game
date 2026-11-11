declare module 'virtual:course-index' {
	/** The course vault's Svartz index, aliased in vite.config.ts. */
	export const index: { entries: readonly import('#lib/server/build-course.ts').Note[] };
}
