---
title: Be the page AI quotes
summary: Publish a page per buying decision, join the right threads, and list for agents.
---

> [!TLDR]
> - Where AI barely mentions you, write one page per buyer segment's version of the decision, plus supporting comparison pages.
> - Join only the Reddit threads your tracked buyer questions lead to, and contribute before you link.
> - Publish an agent skill for your API so AI assistants can find and use your product.

## Write one page per decision and buyer

**A small business and a large one ask the same question with different requirements, so each deserves its own answer.** Pick a category where your AI visibility is low, study what AI already cites there, and write dedicated pages for each buyer segment.

> [!TRICK] The Ramp pattern
> 1. Pick one category with a low baseline. Ramp had 3.2% AI visibility in accounts payable.
> 2. Study what AI already cites. For Ramp: automation, AI and software-comparison content. Only 6% of Ramp's citations came from automation content, which showed the gap.
> 3. Write one page per segment: "accounts payable software for small businesses" and "accounts payable software for large businesses".
> 4. Support them with related pages: accounts payable automation software comparisons, and AI in accounts payable.
>
> Reported result, relayed by an AI-search vendor and credited to Profound: the two pages earned 300+ citations in one month, visibility rose from 3.2% to 22.2%, and Ramp moved from 19th to 8th among fintech brands in the category. Secondhand.

The commercial pages themselves are covered in *Build the pages buyers check before paying*.

## Join only the threads your questions point to

Reddit threads are among the third-party sources AI cites. Your tracked buyer questions tell you which conversations matter: when a thread shows up as a cited source for a question you track, that is where to participate. Focus on communities close to your product and buyer instead of posting everywhere.

Post things the community would value even without your link, and participate before you promote. Answer on Reddit and Quora as yourself, and say you work on the product. Mention your company in at most one answer per subreddit per week. The wider community list lives in *Find your first 100 users*.

> [!RISK] Links without context are spam
> On Reddit and Hacker News, a link dropped without context gets treated as spam. Answer the question in full in the thread, and add your link only where it genuinely helps.

## Make your product usable by agents

AI assistants look for tools to use on a person's behalf. If your product has an API, give agents instructions for using it, and list them where assistants look.

> [!TRICK] List an agent skill on skills.sh
> 1. Write a `SKILL.md` that tells an agent how to use your API. Claude can write it for you.
> 2. Put it in a public GitHub repo.
> 3. Run this once:
>
> ```
> npx skills add your-org/your-repo
> ```
>
> You get a dedicated page on Vercel's skills.sh (the author cites it as DR 82) with your skill, its install command and an install counter.
>
> The author, a staff engineer with several SaaS products, says Claude now sends them "multiple customers a day" through integrations. One person's report.

> [!DO] Name your two segment pages
> Pick the category where AI names you least. Write the two buyer segments who decide differently in it, and the exact page title for each (for example, "X for small teams" and "X for enterprises").

> [!CHECK] How do you list your API as an agent skill on skills.sh?
> Write a `SKILL.md` that tells an agent how to use your API, put it in a public GitHub repo, and run `npx skills add your-org/your-repo` once.

> [!CHECK] AI rarely names you for "accounts payable software". What pages do you write?
> One page per buyer segment, such as "accounts payable software for small businesses" and "for large businesses", supported by related comparison pages.

> [!CHECK] On Reddit, why answer a question in full before you add your link?
> A link dropped without context gets treated as spam. The full answer is what the community values, and the link only helps where it adds something.

## Sources

- [@wespreadjam: Ramp's pages per buying decision](https://x.com/wespreadjam/status/2117333079106932897)
- [@wespreadjam: Granola's Reddit targeting from tracked questions](https://x.com/wespreadjam/status/2115568290307469548)
- [@2whazzuup: links without context on Reddit and Hacker News](https://x.com/2whazzuup/status/2119247229601062993)
- [@tarasshyn: listing an agent skill on skills.sh](https://x.com/tarasshyn/status/2119165493470974378)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
