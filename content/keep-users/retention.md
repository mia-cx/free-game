---
title: Keep the users you get
order: 1
description: Define your onboarded event, find what brings users back, and message on behaviour.
---

> [!TLDR]
> - Getting users is the easy part. Plan onboarding, engagement, retention and pricing just as carefully.
> - Define "onboarded" as one event, and build the first moment of value into the product.
> - Trigger email and SMS on what people do, and hold 10% back to prove the messages add revenue.
> - Check-ins say what happens next and by when. They don't wait for approval nobody needs to give.

## Define onboarded as one event

*Map the whole funnel* named the stages. This lesson works through the ones after acquisition, starting with onboarding.

Decide what "onboarded" means as **one event**: the first action that delivers value. In @kunalvg's crypto examples it's "wallet connected" or "first transaction". For a writing app it might be "first document shared". Then design the flow with whoever builds the product, and engineer the first "aha" moment inside it, so a new user feels the value before they leave.

Kunal argues that smoother onboarding alone puts you ahead of 90% of projects. That's his read of crypto, but the logic carries: most teams spend their effort on getting people in, not on what happens next.

## Know why people stay and why they leave

Retention is harder than acquisition, so answer these questions early:

- **Hero features:** which features bring people back?
- **Levelling up:** how does a casual user become a power user?
- **Segments:** split users by the usage numbers that matter for your product.
- **Churn:** track why people leave, and plan campaigns to win them back.
- **Analytics:** Google Analytics for the website, plus a product analytics tool for what happens inside the product. Kunal uses Redash and Dune for on-chain data.

Pricing belongs here too. Write down why, how and what you'll charge on day one. Free with no revenue model doesn't last. *Read your pricing from your numbers* covers the signals that tell you the price is wrong.

> [!DIAGRAM] funnel

## Message people on what they did

Selling again to someone who already bought costs a fraction of finding a new customer, so send messages based on what each person did. The holdout is what makes them measurable: without a group that gets nothing, you can't tell what the messages added.

> [!TRICK] Build five behaviour flows with a holdout
> 1. Use Klaviyo (or your email tool). Send it product events: viewed, added to cart, bought, went quiet.
> 2. Build five flows, each fired by one behaviour.
> 3. Hold out 10% of customers who receive nothing.
> 4. Compare revenue between the two groups.

The source, @korzhov_dm, writes for online stores and says most have one abandoned-cart email and nothing else (his claim). Swap in your own product's events, such as signed up, reached the aha moment, went quiet.

> [!DIAGRAM] holdout

## Make check-ins state the next step

If you sell a service or a membership, weekly check-ins are part of retention. **End each one with what happens next and by when**, not a request for feedback.

@huntkyle read the Slack messages of an agency with 35 clients and chronically late delivery. Every message ended "let me know what you think", and the team waited 1 to 3 days for approvals clients never asked to give. Hunt sells agency consulting, and this is his anecdote.

> [!TRICK] Check-ins bot prompt
> Fill in the brackets, run it weekly, and send nothing without reading it first.
>
> ```
> Role: you are my Check-ins bot.
> Read first: each active [client / member]'s goals in [Notion], the last two check-ins, and any message they've sent me since.
> When you run: every Monday at 9am.
> Done looks like: one draft per person covering what moved last week, what's blocked, and a single question that gets them replying.
> Never end on "let me know what you think". Say what happens next and by when. Only ask for sign-off when they really have to decide.
> Flag anyone who skipped their last 2 check-ins, and anyone in their first 4 months, because churn before month 4 loses you money.
> Ask me first before you: send any message, move a deadline, cut a deliverable or touch a price.
> ```

> [!DO] Write your onboarded event
> Write one sentence naming the single action that means a new user got value. Then check your analytics: how many of last month's sign-ups did it? Write both down at the top of your roadmap.

> [!CHECK] In retention, how do you define "onboarded"?
> As one event: the first action that delivers value, such as "first document shared" in a writing app.

> [!CHECK] You send emails triggered by what customers do. How do you prove they add revenue?
> Hold out 10% of customers who receive nothing, then compare revenue between the two groups.

> [!CHECK] Why should a client check-in end with what happens next and by when, instead of "let me know what you think"?
> Asking for feedback leaves the team waiting days for approvals the client never needed to give. Stating the next step keeps delivery moving.

## Sources

- [@kunalvg: product marketing basics, from acquisition to monetisation](https://x.com/kunalvg/status/1951276376251617737)
- [@kunalvg: the funnel and smoother onboarding](https://x.com/kunalvg/status/1685889947461402624)
- [@kunalvg: think in funnels from day one](https://x.com/kunalvg/status/2042111501608391080)
- [@korzhov_dm: email and SMS triggered on behaviour, with a holdout](https://x.com/korzhov_dm/status/2118984106335756532)
- [@huntkyle: a check-ins bot that states next steps](https://x.com/huntkyle/status/2118086670918750341)
