import { course } from '#lib/server/course.ts';

export const prerender = true;

/** Every indexable page. `/map`, `/review` and `/lab` are noindex, so they stay out. */
export const GET = ({ url }) => {
	if (url.hostname === 'sveltekit-prerender') {
		throw new Error('Set SITE_URL to the public origin, e.g. SITE_URL=https://example.com pnpm build');
	}
	const paths = ['/', '/tricks', ...course.modules.map((m) => m.href), ...course.lessons.map((l) => l.href)];
	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...paths.map((path) => `<url><loc>${new URL(path, url.origin).href}</loc></url>`),
		'</urlset>'
	].join('\n');
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
};
