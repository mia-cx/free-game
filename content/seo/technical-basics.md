---
title: Get your site found at all
order: 2
description: Make your site crawlable and indexable with one checklist your coding agent runs.
---

> [!TLDR]
> - Most technical SEO is a mechanical checklist. A coding agent can apply almost all of it.
> - The last two items, human writing and earned links, are yours.
> - Let the AI search bots in, and set up Bing Webmaster Tools. Block a search bot and you vanish from that assistant's answers.
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
- Open `www.yoursite.com`: it should redirect to your main address.
- Keep structured data matching the facts visible on the page. Test it with Google's Rich Results Test.
- Compress images, remove scripts you don't need, and fix anything broken on mobile.
- Optionally add an `llms.txt` file as an index for AI agents that read it.

## Let the AI search bots in

AI companies run two kinds of bot. **Training bots collect pages to train models. Search bots fetch pages so assistants can cite them in answers.** Block a training bot and you opt out of training. Block a search bot and you disappear from that assistant's answers.

| Company | Training | Search and live answers |
| --- | --- | --- |
| OpenAI | GPTBot | OAI-SearchBot (ChatGPT search) |
| Anthropic | ClaudeBot | Claude-SearchBot, Claude-User |
| Perplexity | none | PerplexityBot |
| Google | Google-Extended | Googlebot |
| Microsoft | none listed | Bingbot (feeds Copilot) |

Each setting is separate: you can block GPTBot and still show up in ChatGPT search. Google-Extended is only a word you use in robots.txt, not a bot that visits. It controls Gemini training and doesn't affect Google Search.

> [!TRICK] Test what the search bots get
> 1. Open your **live** robots.txt in a browser (`https://yoursite.com/robots.txt`), not the copy in your project. Your CDN can add rules you never wrote.
> 2. Ask for your homepage as each search bot:
>
> ```
> curl -A "OAI-SearchBot" -s -o /dev/null -w "%{http_code}" https://yoursite.com/
> ```
>
> 3. Repeat with `Claude-SearchBot`, `PerplexityBot` and `bingbot`. Anything but 200 is a problem.
>
> Your curl doesn't come from the bot's real addresses, so a firewall that checks them may block it even when the real bot gets through. Your firewall's event log tells the two apart. OpenAI says a robots.txt change takes about 24 hours to reach ChatGPT search.

> [!RISK] Cloudflare can block bots for you
> If your site runs behind Cloudflare, three settings change what bots see:
> - **AI Crawler and Agent access policies** (Security → Settings → Bot traffic) have separate Search, Agent and Training settings. Search set to Block shuts out AI search bots. Training rules also hit bots that do both search and training.
> - **Managed robots.txt**: when training is disallowed, Cloudflare adds its own block of rules at the top of your robots.txt.
> - **Bot Fight Mode** challenges traffic that looks automated, and firewall rules can't make exceptions to it. One reading list (i365dev/awesome-seo) warns it can challenge legitimate crawlers. After launch, open Security → Analytics → Events and look for requests labelled Bot Fight Mode.

## Set up Bing too

**Bing's index feeds Microsoft Copilot, and Bing shows you where AI answers cited you.** Google doesn't. Setup takes about ten minutes.

> [!TRICK] Bing Webmaster Tools in ten minutes
> 1. Sign in to Bing Webmaster Tools, open My Sites → Import, and import your site from Google Search Console. That verifies the site and brings your sitemaps along.
> 2. Check the sitemap is listed. Submit it if not.
> 3. Turn on IndexNow, which tells Bing (and other engines that use it, not Google) the moment a page changes. Many site builders have it built in or as a plugin. On Cloudflare, switch on Crawler Hints.
> 4. Open **AI Performance**: how often Copilot, Bing's AI summaries and some partners cited each of your pages, plus a sample of "grounding queries", the searches the AI ran to find you. It counts citations, not clicks, and it's the closest thing to free citation data you'll get.

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
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
