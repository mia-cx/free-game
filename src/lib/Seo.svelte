<script lang="ts">
	import { page } from '$app/state';

	/**
	 * A page's search and share metadata: title, description, canonical URL, Open Graph and
	 * structured data. The origin comes from `prerender.origin` in `vite.config.ts` (env `SITE_URL`).
	 * Pages readers use privately (`/review`, `/lab`) pass `noindex` and no description. Every page of
	 * a staging build is noindex, so staging never competes with the live site in search.
	 * `crumbs` mirrors the visible trail above the page (module, then lesson) as a BreadcrumbList.
	 */
	let {
		title,
		description,
		noindex = false,
		crumbs = [],
		schema = [],
		markdown
	}: {
		title: string;
		description?: string;
		noindex?: boolean;
		crumbs?: { name: string; href: string }[];
		schema?: object[];
		/** The page's Markdown copy, linked so an agent reading the page finds it. */
		markdown?: string;
	} = $props();

	const hidden = $derived(noindex || page.url.hostname.startsWith('staging.'));
	const absolute = (path: string) => new URL(path, page.url.origin).href;
	const canonical = $derived(absolute(page.url.pathname));
	const image = $derived(absolute('/og.png'));
	const all = $derived(
		crumbs.length
			? [
					...schema,
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: crumbs.map((c, i) => ({
							'@type': 'ListItem',
							position: i + 1,
							name: c.name,
							item: absolute(c.href)
						}))
					}
				]
			: schema
	);
	// `<` is escaped so content can never close the script tag early.
	const json = (data: object) =>
		`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}<\/script>`;
</script>

<svelte:head>
	<title>{title}</title>
	{#if hidden}
		<meta name="robots" content="noindex" />
	{:else}
		{#if description}<meta name="description" content={description} />{/if}
		<link rel="canonical" href={canonical} />
		{#if markdown}<link rel="alternate" type="text/markdown" href={markdown} />{/if}
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="Free Game" />
		<meta property="og:title" content={title} />
		{#if description}<meta property="og:description" content={description} />{/if}
		<meta property="og:url" content={canonical} />
		<meta property="og:image" content={image} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:card" content="summary_large_image" />
		{#each all as data, i (i)}
			{@html json(data)}
		{/each}
	{/if}
</svelte:head>
