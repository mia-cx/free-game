---
title: Run marketing as code
summary: Turn one weekly marketing chore into a scheduled agent that reports back to you.
---

> [!TLDR]
> - A coding agent with access to your data and channels can run one channel as a loop that learns from its own results.
> - Start with a weekly manual report: write every step, let an agent run it, approve the output yourself.
> - Bigger pipelines (research tools, pain-point-to-ad machines) are the same idea at more steps.
> - Most posts selling this setup also sell the product that does it. Copy the pattern, judge the claims.

## Pick one channel and close the loop

**Marketing as code** means an agent does the work through APIs and scripts, then reads the results and adjusts. Don't automate everything at once. Pick one channel and build a system that improves from that channel's own performance data.

Know the difference between the two words people mix up. An automation follows fixed steps. An agent gets a goal and works out the steps.

> [!TRICK] Give the agent the environment it needs
> Cody Schneider lists what a coding agent needs to run a brand's marketing:
> - a data pipeline and a data warehouse
> - a cloud runtime for hosting, object storage and cron jobs
> - API access to all ad channels, the CMS, and so on
> - a git remote so several people can ship to it
> - generation tools: an image model (he names "chatgpt image 2.5"), Seedance for video, word-by-word transcription
>
> He builds Graphed, which sells this setup. Treat the list as a checklist, not proof it pays off.

## Automate the Monday report first

The easiest first loop is the report someone builds by hand every week. One author claims about half a marketing team's hours go to building reports (unverified), and automating it is a fast way to get noticed inside a company.

> [!TRICK] Build the Monday report
> - Put the numbers in a dashboard: Looker Studio or Metabase.
> - The report compares last week with the week before, explains what changed and suggests the next test.
> - AI writes the summary. A Slack bot posts it before anyone logs in.

The same shape works for any weekly manual task, such as checking what competitors changed.

> [!TRICK] Turn a weekly task into a scheduled agent
> Example Monday schedule:
> - 8:00 check 10 competitors' sites and socials
> - 8:05 detect changes (prices, products, posts)
> - 8:10 compare with last week
> - 8:15 write a one-page report with 3 moves worth making
> - 8:20 the report lands in your inbox before the team sees it
>
> Steps:
> 1. Pick one weekly manual task.
> 2. Write every step, including the decisions a person makes.
> 3. Build the agent. The author names Claude Code, Grok Bot and Hermes Agent; any agent tool that can run on a schedule works.
> 4. Route results to yourself for approval first.
> 5. Run it 2 to 3 weeks, fix what breaks, count the hours saved.

Once one of these runs cleanly, other businesses with the same chore may pay for it. See *Turn the skill into income*.

## Research before you write

An agent can do the reading you skip. Matt Epstein's agency runs an internal tool, Script Studio, inside Claude Code before writing launch copy. It isn't public, but every step is something you can ask your own agent to do.

> [!TRICK] Copy the research tool's steps
> - Read every call transcript and doc the brand provided.
> - Search X and score every post against the median of its own search results, so you study outliers, not averages.
> - Pull Reddit threads, reviews and competitor material, and save each as a cited "receipt".
> - Build a page of objections with sources, so the script answers doubts people already have.
> - Write five hooks from different angles and test them against a library of past winning launches.

## Scale to a pain-point-to-ad pipeline

The same author behind the stack list describes a six-step pipeline that replaces a researcher, designer, editor, copywriter, media buyer and analyst. His headline is "1,000 on-brand ads for a couple hundred dollars". It's unverified, and he sells the product.

> [!TRICK] The six steps
> 1. An agent scrapes Reddit for customer pain points into one big markdown file.
> 2. Each pain point becomes a static ad via GPT Image 2 through kie (kie.ai, an API reseller).
> 3. Seedance generates avatar videos on the same angles.
> 4. fal transcribes every word; motion graphics are cut in (he names "tesseract"; it's unclear which tool he means).
> 5. Everything uploads to Meta and Google Ads through their APIs.
> 6. Each ad is tracked to revenue in the warehouse, and you make more of what works.

> [!RISK] Volume without review burns budget
> A thousand generated ads can spend real money on weak creative, and the brand fit is asserted, not shown. Review a sample before upload, cap spend per ad set, and only scale the angles that step 6 proves. See *Run paid ads you can measure* for the tracking that step 6 depends on.

## Publish a benchmark if you sell AI

If your product is an AI system, one reproducible benchmark is a credible marketing asset: compare your system with the naive approach on cost, speed and task success. DeepSeek's super-agent write-up is an example of the form, a small table (4 designs, 5 runs each, typical and worst-case times, token cost) with honest caveats. Nobody in these sources reports results from doing this as marketing, so treat it as an idea to test.

> [!DO] Write down your weekly report as steps
> Pick the one report or check you do by hand every week. In a doc, list every step in order, including each decision you make ("skip it if the price didn't change"). That doc is the agent's first brief.

## Sources

- [@codyschneider: the environment a coding agent needs for marketing](https://x.com/codyschneider/status/2119173056673309041)
- [@codyschneider: pain-point-to-ad pipeline](https://x.com/codyschneider/status/2119429831163027708)
- [@mattepstein: research tool for outliers, objections and hooks](https://x.com/mattepstein/status/2117351855856779486)
- [@korzhov_dm: automating the Monday report](https://x.com/korzhov_dm/status/2118984106335756532)
- [@kunalvg: building a marketing function](https://x.com/kunalvg/status/1697157671567470819)
- [@notkvtwts: scheduled agent for a weekly manual task](https://x.com/notkvtwts/status/2115810173830750575)
- [@notkvtwts: AI business guide](https://x.com/notkvtwts/status/2116886564802576703)
- [@suraj_sharma14: publishing a benchmark](https://x.com/suraj_sharma14/status/2118682313479573689)
- [@DeepSeekHarness: super-agent design and ablation table](https://x.com/DeepSeekHarness/status/2116857257245987236)
