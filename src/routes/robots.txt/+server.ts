export const prerender = true;

/** Lets every crawler in, search and AI answer bots included, and names the sitemap. */
export const GET = ({ url }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', url.origin).href}\n`, {
		headers: { 'content-type': 'text/plain' }
	});
