---
title: Run paid ads you can measure
summary: Count each sale once, match pages to ads, and measure what ads really add.
---

> [!TLDR]
> - Fix tracking first: ad algorithms learn from your sale events, so each sale must count exactly once.
> - Make the landing page say what the clicked ad promised.
> - Switch ads off in a few regions to see what they really add.
> - Feed your ad account better inputs: competitors' long-running ads, many cheap creatives, and data no rival has.

## Count every sale exactly once

Everything below is one person's playbook: @korzhov_dm's eleven marketing-engineering workflows, written for Meta and Google ads on an online store. His numbers are unverified claims. If you don't spend on ads yet, skim this and come back when you do.

Ad platforms optimise on the conversion events you send them. If sales are duplicated or missing, **the algorithm learns from wrong data**. Korzhov claims most accounts send duplicates or miss about a quarter of orders.

> [!TRICK] Deduplicate the purchase event
> 1. Stack: Google Tag Manager, GA4, server-side tracking (Stape), Meta Conversions API.
> 2. Send the purchase event from both the browser and the server with the same event ID, so Meta merges them.
> 3. In Meta Events Manager, confirm each order counts once and event match quality is above 7.

## Match the page to the ad

The ad promises one thing, the page says another, and that gap is where most paid traffic leaves. Closing it costs less than any increase in spend.

> [!TRICK] Rewrite the page per ad
> - Build a landing page whose headline and first section change to match the ad the visitor clicked. AI writes the variants.
> - Measure with PostHog.
> - Calculate the A/B test sample size before you start, and don't call the test early.

## Measure what ads really add

Platforms take credit for more sales than they cause. Korzhov puts it at 2 to 5 times. The only way to know is to switch ads off somewhere and watch what happens.

> [!TRICK] Run a regional holdout
> - Turn Meta ads off in 5 matched regions for 4 weeks.
> - Compare the real sales drop with the sales Meta's attribution said it drove.
> - For an ongoing estimate per channel, try marketing mix modelling with the free tools Google Meridian or Meta Robyn.

> [!RISK] You lose sales in the test regions
> Four weeks without ads in five regions means four weeks of lost sales there. Pick regions small enough that you can afford the drop.

## Rebuild what already works, in volume

**Run time is the only public performance signal for ads.** Nobody keeps paying for an ad that loses money, so an ad live for two months is probably paying for itself.

> [!TRICK] Rebuild competitor ads that ran 60+ days
> 1. Have Claude Code write a scraper for the Meta Ad Library (free and public) covering 30 competitors.
> 2. Keep the ads that have run for more than 60 days.
> 3. Have AI rebuild each format for your product, with your own footage and claims.
> 4. Upload them paused, and review before switching them on.

> [!RISK] Copying creative invites IP complaints
> Copy the structure only. Never reuse a competitor's wording, footage or claims.

The account that tests more creatives usually wins on Meta. Korzhov compares a $20k shoot that gives 10 videos with the same budget in API calls giving 1,000 (his estimate).

> [!TRICK] Batch AI UGC-style ads
> - Tools: Veo, Seedance or Kling for video; ElevenLabs for voice; auto-captions; a script that runs them in batches.
> - Input: one product photo and a 30-second script.
> - Output: 100 phone-style ads with different hooks, voices and openings, exported in 9:16 and 4:5.

> [!RISK] Fake customers break the rules
> Ads that pose as real customers can breach the FTC's 2024 rule on fake testimonials and platform AI-disclosure rules. Label them as AI, and never imply a real customer said it.

## Let an agent run the account on hard rules

Competitors' ad accounts are increasingly run by agents bidding in the same auction with the same platform data. Two agents with the same rules tie. **The winner has inputs others lack**: your review data, a scrape of your competitors, and what a customer really costs you across all channels.

> [!TRICK] Build an hourly ad agent
> Connect Claude Code to your Meta and Google Ads accounts, run it on a schedule with spend limits, and give it these rules:
> - Check the account every hour.
> - Pause ads costing over 3x your target cost per customer, after 50 conversions.
> - Raise budget 20% on ads that won three days in a row.
> - Write three new versions of the best ad.
> - Post every action, with its reason, to Slack, and keep a log.
>
> Korzhov's Claude skills for all eleven workflows: https://github.com/irinabuht12-oss/marketing-skills

> [!RISK] An agent can burn your budget
> Rules inside the agent aren't enough. Set spend caps on the ad platform itself, so a bug can't spend past them. *Keep bots from doing damage* covers the rest.

> [!DO] List a competitor's long-running ads
> Open the Meta Ad Library, search your closest competitor, and list every ad that has been live for more than 60 days: its first line, its format (video, image, carousel) and its landing page. Save the list in a doc.

## Sources

- [@korzhov_dm: eleven marketing-engineering workflows, from ad agents to incrementality](https://x.com/korzhov_dm/status/2118984106335756532)
