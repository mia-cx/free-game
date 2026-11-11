# Free Game

A marketing and growth course for builders, learned from zero. Rewritten from the best posts people shared for free on X, with credit and links on every lesson.

Built for ADHD brains: every lesson starts with the short version, keeps sections short, marks cheap tricks and risks, and ends with one thing to do now. Your progress stays in your browser.

## Run it

```sh
pnpm install
pnpm dev
```

`pnpm test` checks every lesson has the parts the reader relies on. `pnpm lint` runs Biome and svelte-check.

## Agent skills

The course's methods ship as agent skills from [mia-cx/skills](https://github.com/mia-cx/skills): `gtm`, `seo` and `marketing-agents` with their branches. `pnpm skills:sync` copies them into `static/.well-known/agent-skills/` with an `index.json`, so `npx skills add <site>` installs them and every `SKILL.md` is a plain URL. Links to skills the site doesn't serve point at GitHub. `/llms.txt` lists the skills and every lesson for agents.

## Deploy to Cloudflare

The app runs on Cloudflare Workers through `@sveltejs/adapter-cloudflare`. Every page is prerendered into static assets, so the Worker only answers requests no page matches.

```sh
SITE_URL=https://your-domain pnpm run deploy
```

(`pnpm deploy` without `run` is a different, built-in pnpm command.)

`SITE_URL` is the public origin. Canonical URLs, the sitemap, robots.txt and the share image use it, and the build fails without it. `pnpm exec wrangler dev` serves the last build locally.

After the first deploy:

1. Add the custom domain to the `free-game` Worker, and a redirect rule from `www.` to the bare domain.
2. Check Security → Bots: AI bot blocking and Bot Fight Mode can stop the search and AI crawlers that robots.txt lets in.
3. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

Lesson narration in `static/audio/` is kept out of git, so deploy from a checkout that has it.

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
