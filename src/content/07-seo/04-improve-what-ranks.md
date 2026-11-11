---
title: Improve the pages that already rank
summary: Use Search Console data to add missing answers to pages Google already trusts.
---

> [!TLDR]
> - Your fastest SEO gains come from improving top pages, not writing new ones.
> - Search Console shows which queries a page gets seen for but doesn't answer. Add those answers.
> - Answer the main question in the first two paragraphs, and link pages where a reader wants to go next.
> - Give Claude your data and a playbook so it can run these checks every week.

## Start with pages Google already trusts

**A page that already ranks is closer to a win than a page that doesn't exist.** Google has decided it's relevant. If it ranks on page 2 or 3 (positions 10 to 30), Google thinks the page fits but is incomplete. Add what's missing and it can climb.

Search Console tells you what's missing. Every page has a Queries tab listing the searches it appeared for. Some of those queries the article never mentions. Those are your additions. Expect results over one to three months, not days.

> [!TRICK] Refresh a top page from its own query data
> From @asaio87, who runs an SEO agency.
>
> 1. Search Console → Performance → Pages. Sort by clicks, then impressions. Take the top 10.
> 2. Get the data into Claude: connect Search Console through an MCP connector, or click a page → Queries tab → Export, and upload the zip. Use the last 3 months, not 7 days.
> 3. Run this prompt:
>
> ```
> My site is [URL]. Here's my GSC data for the last 3 months: [pull via connector or attached export]
> Find my top 10 pages by clicks and impressions
>
> For page #1, list queries with impressions that the article doesn't directly answer or mention
> List queries ranking in positions 10–30
>
> For each one, tell me exactly where it belongs: new H2, new paragraph, FAQ entry, or a tweak to an existing sentence
> Rewrite only the sections that need to change, don't rewrite the whole article
>
> Current article: [paste or URL]
>
> Stop after page #1 and wait for me before moving to the next.
> ```
>
> 4. Search Console → URL Inspection → Request indexing for each updated page.
> 5. Wait 7 to 14 days, pull the queries again, repeat.

> [!TRICK] The Monday version
> Nicholas Dulait (who sells an SEO agent, ChatSEO) runs a lighter loop for one hour every Monday:
> 1. Search Console, last 28 days: list searches where your average position is 5 to 15, with clicks, impressions and the ranking page.
> 2. Group them by page.
> 3. For the 3 pages with the most impressions, decide what to add or change so the page answers those searches better.
> 4. Skip any page you edited in the last 60 days. Google hasn't re-read it yet.

## Other refreshes worth doing

- Find pages losing clicks. Compare against the same season last year so a recurring dip doesn't look like a new problem.
- Update old prices and screenshots.
- Merge pages that cover the same thing, and redirect the old URLs to the merged one.
- Rewrite weak titles (see *Test titles for quick wins*).

## Answer the question up front

**Put the answer in the first two paragraphs.** No "in today's digital world" intro, no 300-word story before the point. Then check the main keyword appears in the title, the meta description and the first paragraph. Many pages miss at least one. Keep the title matching the H1, and give the page a useful share image.

> [!TRICK] Check the intro and get title options
> From @asaio87:
>
> ```
> Here's my article: [paste]
> Main keyword: [keyword]
>
> Check if the main query is answered within the first 2 paragraphs. If not, rewrite the intro so it is
>
> Check that the main keyword appears in the title, meta description and first paragraph
> Give me 3 title options under 60 chars and 3 meta descriptions under 155 chars
>
> Keep my tone of voice, no fluff, no filler words
> ```

## Link where a reader wants to go next

Internal links tell Google which pages matter and help readers keep going. **Add 3 to 5 per article, only where a reader would actually click.**

- Link articles to the product pages they relate to.
- Link to orphan pages (pages nothing else links to).
- Link from established pages to pages close to page one.
- Put the link next to the question it answers, and describe the destination in the anchor text. Vary the wording.
- Put key guides and product pages in the footer.
- Measure clicks on internal links to see which ones work.

> [!TRICK] Get internal link suggestions
> From @asaio87:
>
> ```
> Here are my pages with their URLs and main keywords: [paste list]
>
> Suggest internal links between them. For each one give me the source page, target page, the exact sentence where it fits, and the anchor text. Only suggest links a reader would actually click. Max 3–5 per article.
> ```

## Make it a weekly job for Claude

These checks repeat, so hand them to an agent with a written playbook. Borja Fat describes this setup; note that he sells a Claude SEO connector (Distribb).

- Give Claude your website, product facts and Search Console data. Pick one tactic list and have it work through it.
- Connect Search Console (MCP connector) and your CMS so Claude can prepare page edits.
- Keep a playbook file: product facts, writing examples, instructions, finished examples. Add every correction you make.
- Schedule page and citation checks. Have it open each published URL to confirm the change went live. Log finished jobs and failures so nothing is done twice.
- Track starting metrics and edits, sales by landing page, UTM-tagged links, and profile calls and bookings.

*Give the bot your context, not clever prompts* goes deeper on playbooks.

## New domain? Save this for month three

Everything above runs on Search Console data. **A new domain doesn't have that data yet.** Striking-distance fixes, title tests and pruning all need months of queries and positions, so start them in month three, and wait 2 to 3 months before you judge any change.

> [!TRICK] The order for a new domain
> From TheoAGI's playbook, distilled from the articles they read:
> - **Week 0:** the checks in *Get your site found at all*, Bing Webmaster Tools, and a first run of your buyer questions (see *Track the questions buyers ask AI*).
> - **Launch:** Search Console, sitemap, directories.
> - **Month 1 on:** one decision page a week, with a video for each.
> - **Month 3:** open Search Console and start the refreshes in this lesson.

> [!DO] Refresh your top page
> Export the last 3 months of queries for your top page from Search Console, run the refresh prompt above, and add the first suggested section to the page.

> [!CHECK] In Search Console, where do you find what a ranking page is missing?
> The page's Queries tab. Searches the page appears for but never mentions are what to add.

> [!CHECK] Your article opens with a 300-word story before it gets to the point. What do you change?
> Answer the main question in the first two paragraphs. Then check the main keyword appears in the title, the meta description and the first paragraph.

> [!CHECK] Why improve a page ranking at positions 10 to 30 before writing a new one?
> Google already finds that page relevant but incomplete, so adding the missing answers can move it up. A brand-new page starts from nothing.

## Sources

- [@asaio87: query-gap refresh, intro check and internal link prompts](https://x.com/asaio87/status/2119171723849245031)
- [@borjafat: refresh moves, internal links and the Claude SEO playbook](https://x.com/borjafat/status/2116164330014007296)
- [@borjafat: running SEO with Claude and Search Console](https://x.com/borjafat/status/2119227612258054502)
- [@NicholasDulait: the weekly positions 5 to 15 loop](https://x.com/NicholasDulait/status/2120063043614716174)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
