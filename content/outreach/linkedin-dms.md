---
title: Open DMs with a problem buyers already pay to solve
order: 2
description: Write LinkedIn DMs from your competitors' ads and test them before you scale.
---

> [!TLDR]
> - A problem several competitors pay to advertise this month is one your buyers already care about. Open your DM with it.
> - Find it free in the LinkedIn Ad Library, then have Claude turn the ads into three short DMs.
> - Send each DM to 50 people, keep the winner, write three new versions of it, then scale.
> - An agent can do the research and drafting. You read and approve every send.

## Start from a problem someone paid to advertise

Every LinkedIn ad is a message a company paid to show buyers. When **three competitors all pay to talk about the same problem**, that problem is on your buyers' minds right now. That makes it the best first line for a cold DM: you're not guessing what they care about.

The method comes from @DinScales26, who sells a done-for-you LinkedIn outreach service and a sending tool. It's written for agencies sending DMs on a client's behalf; the steps below are adapted for your own product. The post shows no results, so test it on a small slice first.

> [!TRICK] Mine the LinkedIn Ad Library
> 1. Go to linkedin.com/ad-library. No account needed.
> 2. List the 3 companies you lose deals to. Search each as the advertiser, with the date filter set to the last 30 days.
> 3. For each ad, note three things: the problem it opens with, the offer (a demo, a free audit, a report), and the job title it's written for ("for heads of sales").
> 4. Find the problem all 3 companies advertise. Copy the text of 5 to 10 ads about it into one doc.
> 5. Paste the doc into Claude. Tell it what you sell and one result you got for a customer. Ask for 3 DMs, 2 lines each, under 20 words. Tell it to keep the problem from the ads and drop the ad wording: a DM that reads like an ad gets ignored.
>
> Each DM comes out in this shape:
>
> ```
> we helped [company like theirs] fix [the problem from the ads] in [how long]. want the breakdown?
> ```

Read every DM before it goes out. Claude can't always tell when a line sounds robotic, and you only get one first message per person.

## Test small, then scale the winner

Don't send your best guess to your whole list. Split-test on a slice first.

> [!TRICK] Three DMs, 150 people, one week
> 1. In LinkedIn Sales Navigator, filter by your buyer's job title, industry and company headcount.
> 2. Send each of your 3 DMs to 50 people (150 total).
> 3. After a week, take the DM with the most replies and write 3 new versions of it.
> 4. Send those to the rest of your list (the author's example: the remaining 850 of 1,000).

> [!RISK] LinkedIn restricts accounts that look automated
> LinkedIn limits how many invitations and messages you can send each week, and restricts accounts that behave like automation. Stay inside the weekly limits and send at a human pace.

## Hand the research to an agent, keep the send

Once the method works by hand, an agent can repeat the research every week. It needs three tools, each connected through an MCP (the connector that lets an agent use a tool on its own).

> [!TRICK] A weekly DM research agent
> **Connections:**
> - **Apify:** searches the LinkedIn Ad Library and pulls every ad a company runs.
> - **Firecrawl:** reads your website and case studies, so the agent knows what you sell and your results.
> - **A sending tool with an MCP:** handles DMs, follow-ups and one inbox for replies. The author names their own, Eaglesend.
>
> Add them to an agent such as Claude Code and give it this job:
> 1. Pull new ads every week.
> 2. Find the problems that repeat.
> 3. Rewrite the ads as DMs.
> 4. Write new versions of the best DM.
> 5. Send you the drafts.
>
> You read each draft and say yes or no before anything goes out.

> [!RISK] Automated messaging breaks LinkedIn's terms
> LinkedIn's terms prohibit third-party automation of messaging. Keep a human approval step on every send, and let the agent do research and drafting only.

For how to keep an agent from doing damage on its own, see *Keep bots from doing damage*.

> [!DO] Pull your competitors' ads
> Open linkedin.com/ad-library, search the 3 companies you lose deals to (last 30 days), and paste the text of 5 ads into a doc with the problem each one opens with.

> [!CHECK] When an agent researches and drafts your LinkedIn DMs, which step stays yours?
> Approving every send. LinkedIn's terms prohibit third-party automation of messaging, so the agent only researches and drafts.

> [!CHECK] You have three LinkedIn DM drafts and 1,000 buyers on your list. How do you send them?
> Send each draft to 50 people. After a week, write three new versions of the one with the most replies and send those to the rest.

> [!CHECK] Why open a cold LinkedIn DM with a problem your competitors all pay to advertise?
> A problem several competitors pay to show buyers is on those buyers' minds right now, so you aren't guessing what they care about.

## Sources

- [@DinScales26: competitor ads into LinkedIn DMs, testing and automation](https://x.com/DinScales26/status/2119077318769385871)
