export const prerender = true;

/**
 * Lets every crawler in, search and AI answer bots included, and names the sitemap. Staging stays
 * crawlable on purpose: it answers every request with `X-Robots-Tag: noindex` (deploy.yml), which
 * crawlers can only obey when they're allowed to fetch the page.
 */
export const GET = ({ url }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', url.origin).href}\n`, {
		headers: { 'content-type': 'text/plain' }
	});
