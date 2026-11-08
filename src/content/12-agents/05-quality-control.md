---
title: Check the work before it ships
summary: Catch bot mistakes with a finish line, a fresh reviewer and spot checks.
---

> [!TLDR]
> - When a draft is wrong, fix the charter, not the draft. Most bad output traces to missing input.
> - Decide what "verified" means before the agent starts, and ask what each passing check didn't prove.
> - Review with a fresh agent that sees only the finished work, and open the sources behind any summary.
> - Start every bot at full review and drop to spot checks only after 9 of 10, then 18 of 20, clean runs.

## Fix the brief, not the draft

When a bot's output is wrong, correct the charter or shared config, not the single draft. **Most bad output traces to missing input**, and recording why something failed is how your taste compounds into the system.

Kyle Hunt saw 50%+ client revision rates as an agency COO; he traces 80% of them to bad briefing, incomplete onboarding information and no client-specific do's-and-don'ts list. Addy Osmani says the same from the engineering side: when output misses your standard, write down why in shared config, a hook or a test. If a second round of corrections hasn't got there, stop tweaking and rewrite the prompt.

> [!TRICK] Run a revision diagnostic
> Pull your last ~500 revision comments (or as many as you have) and run:
> ```
> Help me understand the distribution of the top revision reasons based on these comments.
> Then for the top 3 reasons, tell me what was missing from the brief, and write each one as a check I can add to my charter.
> ```
> Add your most common reason to the charter as a pass/fail line. Hunt's example: a creative agency at a 70% average revision rate (one editor at 115%) found 40% of revisions came from incomplete briefs and 30% from onboarding gaps.

## Define "verified" before the agent starts

Set a tangible finish line up front: a passing test, a screenshot, a log. Decide it after the fact and you'll call any outcome done.

- Give the agent a way to check its own work, so it can loop change, check, retry before you look.
- When it reports done, read the command it ran and its output before you read its summary.
- At the end, ask "Did I miss anything?" Osmani says it routinely surfaces two or three more items.

A green check proves one thing. Cheap generated tests produce lots of green that can miss broken features, especially when the test shares the feature's mistake. The rule from the Claude Code team's review write-up: "If you can't say what the checks would miss, ask for a real review rather than a quick approval."

## Review with a fresh agent

The agent you've been working with fills gaps from context it shares with you. A new agent that sees only the output reads like a first-time viewer, so it finds what is actually unclear or wrong.

> [!TRICK] Fresh-eyes review
> - Tell your agent "open a new agent to review this". Hand it only the artefact (the draft, the prompt plus images, the final cut), none of your conclusions.
> - The reviewer is read-only: it lists problems and ends with "pass" or "fail". It marks uncertain findings "maybe".
> - Gate any paid step, such as a video generation, on a written "pass".
>
> EianLu says this caught a 13% size mismatch on a cup between two frames, a hat brim present in one frame and missing in the next, and left/right reversals. Osmani bakes the same fresh-context critique into every run, not just when he remembers.

## Open the sources behind any summary

When an agent summarises customer calls, research or data, open a couple of the original documents and recompute any number your recommendation depends on. After a synthesis of fifty customer calls, read two of the calls yourself. For an audit, trace every number back to the client's own file.

## Step review down as the bot earns it

Hunt puts the AI error rate at 1 to 5% (his estimate), which clients won't accept. So every new bot starts at full review, and review only drops as a measured clean-run rate earns it.

> [!TRICK] The review ladder
> 1. 100% review on every new bot.
> 2. Once 9 of the last 10 pass without revision, drop to 50%.
> 3. Once 18 of the last 20 pass clean, drop to 10% spot checks.
>
> If you're fixing the same thing two weeks running, go back up a stage. Anything a client sees stays a draft you send yourself.

> [!RISK] You can't automate a process you haven't built
> Hunt's examples: a $1.4M agency with AI at every stage still misspelled client names (the fix was one checklist line), and a $2.1M agency wanted AI QA without a checklist at all. Write the checklist first, then let a bot run it.

> [!DO] Turn your top revision reason into a check
> Paste your recent revision comments (from email, Slack or doc comments) into the diagnostic prompt above. Copy the top reason it finds into your bot's charter as one pass/fail line.

## Sources

- [@huntkyle: revision diagnostic and the review ladder](https://x.com/huntkyle/status/2118086670918750341)
- [@addyosmani: defining verified, green checks and spot checks](https://x.com/addyosmani/status/2117512471930167377)
- [@EianLu: fresh-agent review before paid generation](https://x.com/EianLu/status/2118317430665613741)
