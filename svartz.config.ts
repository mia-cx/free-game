import { defineConfig } from '@svartz/config';

/**
 * The course content is one Svartz vault mounted at the site root. Svartz is the index only: it
 * publishes every note with its body as resolved Markdown and writes a Markdown copy of each page
 * for agents. The app renders and styles every page itself (src/lib/server/course.ts).
 */
export default defineConfig({
	version: '1.0.0',
	vaults: [
		{
			id: 'course',
			path: './content',
			mountPath: '/',
			target: { type: 'host' },
			index: { markdown: true },
			site: { title: 'Free Game', url: process.env.SITE_URL },
			// The app owns the sitemap, llms.txt, favicon and share image; lessons carry no dates for a feed.
			// Svartz still writes a Markdown copy of every lesson beside its page.
			discovery: {
				dateSources: ['frontmatter'],
				feed: { enabled: false },
				sitemap: { enabled: false },
				socialImages: { enabled: false },
				favicon: { enabled: false }
			}
		}
	]
});
