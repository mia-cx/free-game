# Free Game

A marketing and growth course for builders, learned from zero. Rewritten from the best posts people shared for free on X, with credit and links on every lesson.

Built for ADHD brains: every lesson starts with the short version, keeps sections short, marks cheap tricks and risks, and ends with one thing to do now. Your progress stays in your browser.

## Run it

```sh
pnpm install
pnpm dev
```

`pnpm build` writes a static site to `build/`. `pnpm test` checks every lesson has the parts the reader relies on. `pnpm lint` runs Biome and svelte-check.

## Write a lesson

Lessons live in `src/content/<NN-module>/<NN-lesson>.md`. The number prefix sets the order and is left out of the URL. Each module has a `_module.md` with its title and summary.

```md
---
title: Say what you are, for whom, against what
summary: Write a positioning doc you can test today.
---

> [!TLDR]
> - The whole lesson in a few bullets.

## A short section

> [!TRICK] A specific tactic
> The numbers, tools and prompt.

> [!RISK] What can go wrong
> The downside and how to avoid it.

> [!DO] One small action
> Something you can finish in 20 minutes.

## Sources

- [@handle: topic](https://x.com/handle/status/123)
```

How the course was researched and assembled is in [DIRECTION.md](DIRECTION.md). Visual decisions are in [DESIGN.md](DESIGN.md).
