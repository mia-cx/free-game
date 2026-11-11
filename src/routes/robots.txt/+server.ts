export const prerender = true;

/**
 * Lets every crawler in, search and AI answer bots included, and names the sitemap. A staging build
 * keeps every crawler out, so staging never competes with the live site in search.
 */
export const GET = ({ url }) =>
	new Response(
		url.hostname.startsWith('staging.')
			? 'User-agent: *\nDisallow: /\n'
			: `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', url.origin).href}\n`,
		{ headers: { 'content-type': 'text/plain' } }
	);
