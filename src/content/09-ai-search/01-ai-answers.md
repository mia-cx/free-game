---
title: Track the questions buyers ask AI
summary: Build a list of buyer questions and log who AI recommends for each one.
---

> [!TLDR]
> - Buyers ask AI before they search. Measure visibility per buyer question, not per keyword.
> - Map the decisions buyers make before paying, and turn each into a Google keyword and an AI prompt.
> - Track Google and AI separately: they move independently.
> - Log which brands and URLs each AI cites, every week, and judge success by customers.

## Start from buying decisions

**Your unit of measurement is a question a buyer asks before choosing.** "What's the best meeting notes app for a sales team?" tells you more than the keyword "meeting notes app", because it carries the decision.

List the decisions people make before buying something like yours. Take the wording from your inbox, sales calls and reviews, not your imagination. Turn each one into two things: a Google keyword and an AI prompt. Then check where you show up for both.

For each question, ask:

- Who gets recommended today?
- Which pages are being cited?
- Do we have a page that fully answers the question?

## Track Google and AI separately

A page can climb in Google and barely move in ChatGPT. AI mentions can rise while organic traffic stays flat. If you assume good SEO means good AI visibility, you'll miss both kinds of gap, so keep two sets of numbers.

The two public examples in this module come from Granola (meeting notes) and Ramp (finance software). Both are relayed by an AI-search tool vendor that sells audits, crediting other vendors' work, so treat their numbers as directional.

## Count customers, not mentions

Visibility is a signal. The test is whether qualified visitors and customers arrive, so track new active users from AI search next to your citation counts.

Analytics undercounts AI. **Add "How did you hear about us?" to your signup form.** One founder compared the answers with analytics: the referrer credited Google with 3.4 times more signups than the customers themselves did.

> [!TRICK] Measure AI search for free
> Skip paid visibility trackers at first. From TheoAGI's playbook:
> 1. Write 15 to 30 real buyer questions.
> 2. Run each one at least twice per engine, logged out: ChatGPT, Claude, Perplexity, Gemini.
> 3. Log brands named and URLs cited in separate columns. Being cited and being recommended are two different numbers.
> 4. Under about 100 AI visits a month, report counts, not percentages.
> 5. Add Bing's AI Performance report for Copilot citations (setup in *Get your site found at all*).
>
> The free stack: Google Search Console, Bing Webmaster Tools, Ahrefs Webmaster Tools, Screaming Frog (free up to 500 URLs).

> [!RISK] One run proves nothing
> Answers move. One study the articles quote says ChatGPT swaps most of its sources from one week to the next. Judge a change on repeated runs over weeks, never on a single answer.

> [!TRICK] A weekly citation log
> One marketing engineer's routine:
> 1. Write a script that asks ChatGPT, Claude and Perplexity 100 real buyer questions every Monday and saves the answers.
> 2. Log which brands and which URLs each answer cites.
> 3. Read the cited pages. The author observes they share three traits: a direct answer in the first paragraph, original numbers, and a clear author.
> 4. Rewrite your 10 most important pages to match.
> 5. Add `llms.txt` (a file that tells AI what your site is about) and schema markup (hidden labels that help AI read your pages).
>
> `llms.txt` has no confirmed effect on AI citations. It's cheap, so treat it as optional. For the first-paragraph rule, see *Improve the pages that already rank*.

You don't need the script on day one. A spreadsheet and ten questions asked by hand gives you a baseline; automate once the list stops changing.

> [!DO] Start your question sheet
> Write 10 real buyer questions in a spreadsheet. Ask each one in ChatGPT and fill two columns: brands named, URLs cited.

> [!CHECK] When you track AI search, what is your unit of measurement?
> A question a buyer asks before choosing, such as "What's the best meeting notes app for a sales team?" It carries the decision, which a bare keyword doesn't.

> [!CHECK] Your page climbs in Google. Can you assume your AI visibility rose too?
> No. Keep separate numbers for Google and AI, because a page can climb in one and barely move in the other.

> [!CHECK] Why track new users from AI search next to your AI citation counts?
> Citations are only a signal. The real test is whether qualified visitors and customers arrive.

## Sources

- [@wespreadjam: Granola's buyer-decision workflow for AI search](https://x.com/wespreadjam/status/2115568290307469548)
- [@wespreadjam: Ramp's questions for finding AI gaps](https://x.com/wespreadjam/status/2117333079106932897)
- [@borjafat: saving real buying questions for repeatable checks](https://x.com/borjafat/status/2116164330014007296)
- [@korzhov_dm: asking three AIs 100 buyer questions every Monday](https://x.com/korzhov_dm/status/2118984106335756532)
- [@TheoAGI: the one SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
