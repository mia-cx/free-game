---
title: How X picks what people see
order: 1
description: Know the three stages every post passes and where reach beyond followers comes from.
---

> [!TLDR]
> - Every post passes three stages: X finds candidates, scores them per viewer, then filters some out.
> - Your followers see you first. Reach beyond them comes from interest matching, not follows.
> - X shows one post per conversation, so a launch must live in one self-contained post.

## Every post passes three stages

The For You feed is built in three steps, and your post has to survive all of them. Ryan (@ryangrowthh), who read X's open-source ranking code, nicknames them Scouts, Judge and Bouncer.

1. Find (Scouts): several retrieval systems pull roughly 2,000+ candidate posts each time a feed refreshes.
2. Score (Judge): for each post and each viewer, a model predicts the chance of a like, reply, share, read-through, follow, mute and so on, multiplies each by a weight, and adds them up.
3. Filter (Bouncer): stale, already seen, blocked or muted, spam and low-reputation posts are dropped.

Every rule follows from one goal: **keep people on the platform**. When you're unsure what X rewards, ask what keeps a viewer scrolling and talking.

Ryan isn't on the X team and some parts of the system are closed, so treat this as a well-informed reading, not a spec.

> [!DIAGRAM] x-feed

## Four places X finds posts

Reach beyond your followers comes from the two sources that don't depend on follows.

| Source | What it pulls |
| --- | --- |
| Thunder | Recent posts from accounts the viewer follows and interacts with |
| Phoenix | Posts from accounts the viewer doesn't follow, matched to an interest profile built from their history |
| SimClusters | Posts liked by the interest community the viewer belongs to, grouped by who engages with what |
| Popular Posts | A small shared list of popular recent posts, first seeded from the most-followed active accounts |

Phoenix is where broad virality comes from. SimClusters explains niche virality: a post can blow up inside one community, such as tech startups, without going platform-wide. That's also why one idea per post matters (see *Write for one reader and one action*): mixed topics confuse which community to show it to.

## Your followers are round one

Matt Epstein, whose company Shown Media runs tech launches on X, points out that the first audience for any post is your own follower circle via Thunder. That's why big accounts get bigger launches, and it's the part you control most.

In Epstein's words, your followers feed Thunder for your account, "and that's where it stops". Getting further takes a strong score from the ranking model, or other people quoting you to their own followers (see *Line up your launch-day voices*).

## Keep a launch in one post

X keeps one post per conversation in the feed. Epstein's example: spread a launch across 5 tweets and 4 of them flop, and non-followers never see them recommended.

The main post has to stand alone: everything a stranger needs, with nothing left for the replies to explain. *Give strangers a reason to care* covers what goes in it.

> [!DO] Name your cluster
> Write one line naming the interest community you want X to put you in. Then tick each of your last 10 posts that stays inside it, and count the ticks.

> [!CHECK] What three stages does every post pass through in X's For You feed?
> X finds candidate posts, scores each one per viewer, then filters some out.

> [!CHECK] You plan to announce a launch on X across five tweets. What do you change?
> Put the whole launch in one self-contained post. X shows one post per conversation, so the other tweets never reach non-followers.

> [!CHECK] On X, why do the rules for what gets reach all point the same way?
> They serve one goal: keep people on the platform. When unsure what X rewards, ask what keeps a viewer scrolling and talking.

## Sources

- [@ryangrowthh: how the X algorithm finds, scores and filters posts](https://x.com/ryangrowthh/status/2117684231983800732)
- [@mattepstein: candidate sources and one post per conversation](https://x.com/mattepstein/status/2117351855856779486)
