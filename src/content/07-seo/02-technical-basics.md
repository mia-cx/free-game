---
title: Get your site found at all
summary: Make your site crawlable and indexable with one checklist your coding agent runs.
---

> [!TLDR]
> - Most technical SEO is a mechanical checklist. A coding agent can apply almost all of it.
> - The last two items, human writing and earned links, are yours.
> - Fix pages tied to real buying questions first. Warnings on unimportant pages can wait.

## Technical SEO is a checklist

If Google can't fetch, render and index a page, nothing else in this module matters. **The fixes are mechanical**: server-side rendering, a sitemap, no stray noindex tags, unique titles, fast pages. That makes them a good job for a coding agent, especially on a site you built quickly with one.

The checklist below ends with two items no agent can do for you: writing that doesn't read like AI filler, and links from sites people trust. Those are covered in *How Google decides who ranks* and the *Backlinks* module.

> [!TRICK] Paste the full checklist into your coding agent
> This prompt from @suraj_sharma14 is written tongue in cheek ("Make no mistakes") but the list is complete. Paste it as is:
>
> ```
> My vibe-coded site doesn't show up on Google. Fix it.
> - Switch to server-side rendering.
> - Create an XML sitemap.
> - Submit it in Search Console.
> - Let Googlebot in through robots.txt.
> - Strip out every noindex tag.
> - Collapse the redirect chains.
> - Fix every broken link.
> - Set canonical URLs.
> - Give every page a unique title and meta description.
> - Use one H1 per page.
> - Add FAQ and Article schema.
> - Add breadcrumb navigation.
> - Internally link every orphan page.
> - Write alt text for every image.
> - Compress images to WebP.
> - Get CLS under 0.1.
> - Load every page in under 2 seconds.
> - Rewrite anything that sounds like AI slop.
> - Add a real author with a real bio.
> - Earn backlinks from sites people trust.
>
> Page one by Monday. Make no mistakes.
> ```
>
> The agent can't submit the sitemap in Search Console for you unless it's connected to it. Do that step yourself.

## Check the result, not the claim

An agent saying "done" is not the same as Google seeing the page. Confirm each fix from Google's side:

- Inspect key URLs in Search Console to confirm they can be indexed.
- Look for blocks or noindex tags you didn't mean to add.
- Make sure every page is in your navigation and sitemap, reached by normal crawlable links.
- After every publish, check the new page is in the sitemap. Sitemaps can stop updating without any warning: one founder found a live page missing from his the day after he published it.
- Check the rendered page actually shows the answer, not an empty shell waiting for JavaScript.
- Keep structured data matching the facts visible on the page. Test it with Google's Rich Results Test.
- Compress images, remove scripts you don't need, and fix anything broken on mobile.
- Optionally add an `llms.txt` file as an index for AI agents that read it.

## Fix buyer pages first

A site audit tool will hand you hundreds of warnings. **Start with the pages tied to real buying questions**: pricing, comparisons, the product pages people land on before they pay. Crawl, index and speed problems there cost you money. The same warning on an old blog tag page can wait.

This order comes from a case study of Granola's AI search work, relayed secondhand by a vendor who sells AI search audits, so treat it as a sensible rule rather than proven data. *Build the pages buyers check before paying* covers which pages those are.

> [!DO] Inspect your three money pages
> Open Google Search Console, run URL Inspection on your three most important pages (home, pricing, main product page), and write down for each one whether it is indexed and any problem it lists.

> [!CHECK] Which two items on the technical SEO checklist can't a coding agent do for you?
> Writing that doesn't read like AI filler, and earning links from sites people trust.

> [!CHECK] A site audit tool gives you 300 SEO warnings. Where do you start?
> On the pages tied to real buying questions: pricing, comparisons and the product pages people land on before they pay. The same warning on an old blog tag page can wait.

> [!CHECK] Why check SEO fixes in Search Console after your coding agent says they're done?
> An agent saying "done" is not Google seeing the page. URL Inspection shows whether Google can actually index it.

## Sources

- [@suraj_sharma14: technical SEO checklist prompt](https://x.com/suraj_sharma14/status/2116062550416871512)
- [@borjafat: indexability, rendering and structured data checks](https://x.com/borjafat/status/2116164330014007296)
- [@wespreadjam: Granola case study, fixing buyer pages first](https://x.com/wespreadjam/status/2115568290307469548)
- [@NicholasDulait: the sitemap that stopped updating](https://x.com/NicholasDulait/status/2120063043614716174)
