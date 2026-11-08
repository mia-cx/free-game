---
title: Optimise for shares and replies
summary: Use X's action weights to write posts people pass on and answer, not just like.
---

> [!TLDR]
> - On X, a share by copied link counts about as much as 30 likes, and a reply about 7.5.
> - One mute cancels roughly 89 likes, one report about 355.
> - The weights change without notice, so aim at what they serve: sharing, conversation, time on platform.
> - Shareable posts are original, specific, easy to scan and built on what only you know.

## Shares and replies beat likes

When X scores your post for a viewer, each predicted action has a weight. A like is one of the weakest positives. **A share by copied link is worth about 30 likes**, and a reply or quote about 7.5.

The negatives are far heavier. One mute cancels roughly 89 likes; one report cancels about 355. A post that makes a handful of people mute you can cancel hundreds of likes.

These numbers are Ryan's (@ryangrowthh) reading of X's open-source ranking code. Nobody at X confirmed them.

> [!TRICK] Know the published action weights
> Production defaults as quoted by Ryan, dated October 30, 2026:
>
> ```
> Positive actions
> Share via copy link     20.0
> Reply                   5.0
> Quote                   5.0
> Share via DM            5.0
> Follow author           4.0
> Share                   2.0
> Repost                  1.0
> Like                    0.66
> Click into post         0.3
> Open link               0.2
> Dwell                   0.05
> Photo expand            0.05
> Profile click           0.0
> Video quality view      0.0
>
> Negative actions
> Not dwelled (scrolled past)    -0.02
> Block author                   -31.2
> Not interested                 -52.3
> Mute author                    -58.8
> Report                         -234.0
> ```
>
> Profile clicks count for 0, so posts built to send people to your profile earn nothing for it.

## Aim at the goal, not the numbers

The weights move silently. Ryan noticed the like weight went from 0.5 in August to 0.66 by October 2026, with no announcement. Strategy built on one exact number breaks the next time it changes.

The goal behind the weights is stable: keep people on X, sharing and talking. The model mostly reads a viewer's last ~1,000 actions to guess what they want, and personalisation also uses signals like installed apps, inferred gender and IP location. You can't game that per viewer. You can make posts people want to pass on.

> [!RISK] The table will drift
> If you build a tactic on an exact weight, it can stop working overnight. Re-check X's open-source ranking code before relying on a specific number, and treat this table as a snapshot.

## Write posts people pass on

Because shares, replies and quotes dominate the score, the posts that win are original, specific and easy to scan. Ryan's list:

- Draw on your experience, your network and your job. That's insight nobody else can copy.
- Make the format easy to scan and easy to forward.
- Never copy someone one-for-one. Credit others, and use X's native image and video features.
- Test every format X is currently pushing: threads, articles, media.
- If you make video, invest in camera, mic and lighting.

*Make the first line earn the second* covers the hook that gets someone to read far enough to share.

> [!DO] Find the share reason
> For each of your last 5 posts, write one line: why would someone send this to a friend or reply? Rewrite the post with the weakest answer as a new draft.

## Sources

- [@ryangrowthh: X's action weights and what they reward](https://x.com/ryangrowthh/status/2117684231983800732)
