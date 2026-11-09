---
title: Run a whole campaign with agents
summary: Plan, ticket and review a multi-channel campaign that agents build and you approve.
---

> [!TLDR]
> - Plan out loud first, then let an agent question you until the offer and the goal are agreed.
> - Give every finding a source and a date, and keep approved decisions apart from ideas.
> - Break the campaign into tickets that say what they depend on and when they're ready for review.
> - Review the campaign as a whole: every asset can pass its own checks and still contradict the others.

## Plan out loud, then get questioned

Shann Holmberg does about 70% of his marketing work inside an agent workspace, including work that goes live. He starts a campaign by talking for 5 to 10 minutes into a transcription tool: the goal, the context, what he's tried, what he's unsure about. It doesn't need to be neat.

Then an agent questions the plan (he uses Matt Pocock's planning skills), and he answers. If the agent asks what makes a lead qualified, the answer decides which results it should use. **If the offer isn't agreed, you're not ready to make creative around it.**

> [!TRICK] Give the first run a goal that says when to stop
> Once the plan and context files exist, Holmberg's first prompt is short, because the files hold the context:
> ```
> /goal prepare a creative brief for the next round of paid ads.
>
> use audience.md, approved-claims.md, campaign-book/
> and previous-test-results.md as context.
>
> research and propose 3 angles. explain who each angle is for,
> what informed it and how it differs from previous tests.
> link the supporting sources and flag assumptions.
>
> check each angle against the audience and approved claims.
> save the brief to creative-brief.md in the campaign folder.
>
> stop when the brief is ready for my review.
> do not produce or publish ads. ask if required context is missing.
> ```

## Label what you know

A campaign needs both what the business knows and what's happening outside it.

| Internal | External |
| --- | --- |
| product, offer and positioning | competitors' products, offers and campaigns |
| customer calls, CRM notes, support conversations | public discussions, reviews, customer questions |
| previous campaigns and their results | search demand and keyword research |

Agents can't tell a decision from a suggestion unless the files do.

- Save every research finding with its source and date, and label claims nobody has checked.
- Keep approved decisions apart from ideas someone floated in a meeting.
- When you reject a draft, save the reason. "This promises a result our product doesn't deliver" gives the next run something specific to check.
- Keep research in its campaign folder. Move a finding into shared knowledge only after you've reviewed it and it matters beyond this campaign.

> [!TRICK] One folder per campaign
> ```
> campaign/
> ├── brief.md              ← audience, offer, goal
> ├── campaign-book/        ← approved visual direction
> ├── research/             ← shared across channels
> ├── tickets/              ← tasks and dependencies
> ├── landing-page/
> ├── paid/
> ├── email/
> └── results/              ← informs the next campaign
> ```
> - Each channel gets its own brief that points back to `brief.md`.
> - Research several channels need, like customer objections, is saved once and referenced, not copied.
> - The campaign book holds the approved look (Holmberg builds it in Paper or Figma) with examples for ads, pages, posts and email, so every channel's assets match.

## Run the campaign on tickets

During planning, break the campaign into tickets. Each one names the deliverable, the context to read, the checks before review, what it depends on and who (or which agent) has it. A coordinator agent hands out the tickets that are ready (see *Put a coordinator over your bots*). When one is blocked on you, it records the exact question, and other work carries on.

**Dependencies set the order.** Competitor research, a review of past campaigns and prospect research can run at the same time. Final copy needs an agreed offer, ads need a page to point to, and follow-up emails must match what someone signed up for.

| Ticket | Depends on | Status |
| --- | --- | --- |
| approve campaign offer | customer and competitor research | needs my input |
| build landing page | approved offer and campaign book | waiting |
| produce paid creative | approved offer and campaign book | waiting |
| check ad-to-page consistency | landing page and paid creative | waiting |

> [!TRICK] A ticket an agent can finish
> ```
> # produce the paid creative set
>
> assigned to: paid creative agent
> status: waiting for approval of the offer and campaign book
>
> ## before starting
> confirm the offer and campaign book are approved.
> use creative-brief.md for the angles, formats and deliverables.
> use approved-claims.md for what the ads can promise.
>
> ## produce
> - editable designs following the campaign book
> - exports in each format specified in the brief
> - a review report linking each ad to its angle and checks
>
> ## ready for my review when
> - [ ] every deliverable in the brief is accounted for
> - [ ] claims match approved-claims.md
> - [ ] formats and dimensions match the brief
> - [ ] exported images have readable text and accurate product details
> - [ ] designs, exports and review report are linked in this ticket
>
> ## update this ticket
> if blocked, name the missing input or decision.
> otherwise, mark ready for review. do not publish.
> ```

Don't add agents for their own sake. Holmberg's first content system used four agents for three production steps and a feedback loop. Better context for the writer helped more than more agents.

## Check the campaign as a whole

**Assets can pass their own checks and still disagree with each other.** Before launch, ask:

- Does the ad promise what the landing page delivers?
- Does the email use the same offer?
- Are dates, links and claims the same everywhere?

If you change the offer during review, every asset that mentions it goes back for revision.

Inside a ticket, an agent can loop: make, check, fix, check again (see *Check the work before it ships*). Give the loop a retry limit and a time or token budget, and have it ask you when it keeps failing the same check. It may need a missing product photo, a different tool or a decision from you. Passing the checks doesn't make the creative good: you still judge the direction.

## Learn from results and from your fixes

Start the review from one question, such as "which creative angles brought qualified leads last month, and what should we test next?" Answering it takes spend, lead outcomes and the angle each ad tested, which usually live in three tools: the ad platform, analytics and the CRM. Campaign and ad IDs say what ran. Tracking parameters on links (UTM tags) say where visits came from. Where they carry through to the CRM, you can tie a sale back to an ad (see *Run paid ads you can measure*).

> [!RISK] Confident reports from missing data
> Tracking is never complete, and a scheduled data update can fail without anyone noticing. Tell the workflow to flag missing tracking instead of crediting every sale to an ad, and to flag a failed update instead of writing a confident report from last week's numbers.

Then add what the numbers can't show: sales followed up late, the offer changed halfway, one ad attracted the wrong buyers. Save it next to the results.

Each time you step in to fix the agent's work, the fix points to the cause:

| What happened | What to fix |
| --- | --- |
| research covered irrelevant companies | the selection criteria and research instructions |
| recommendations missed a key customer objection | the customer context the agent could read |
| the report used old numbers | data updates and freshness checks |
| the output looked right but wasn't useful | the brief and your definition of a good result |

Then run the workflow on the next campaign. If it gets worse, it was relying on instructions buried in the last conversation. Move them into its files.

> [!DO] Write one ticket
> Pick one deliverable from your next campaign: a landing page, an ad set or an email. Copy the ticket template above, fill in what it depends on and three "ready for my review when" checks, and save it as `tickets/<deliverable>.md`.

> [!CHECK] What does a campaign ticket for an agent record?
> The deliverable, the context to read, the checks before review, what it depends on and who has it. When it's blocked, it records the exact question for you.

> [!CHECK] Every asset in your launch passed its own checks. What do you still review before it goes live?
> Whether they agree: the ad promises what the landing page delivers, the email uses the same offer, and dates, links and claims match everywhere.

> [!CHECK] Why run a new agent workflow again on the next campaign before you trust it?
> To see whether it works from its files or was relying on instructions buried in the previous conversation.

## Sources

- [@shannholmberg: how to become a marketing engineer](https://x.com/shannholmberg/status/2098004743536750869)
