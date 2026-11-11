# Free Game

A marketing and growth course for builders, learned from zero. Rewritten from the best posts people shared for free on X, with credit and links on every lesson.

Built for ADHD brains: every lesson starts with the short version, keeps sections short, marks cheap tricks and risks, and ends with one thing to do now. Your progress stays in your browser.

## Run it

```sh
pnpm install
pnpm dev
```

`pnpm dev` and `pnpm build` run through [Svartz](https://github.com/mia-cx/svartz), which indexes the lessons in `content/` as a vault (`svartz.config.ts`) and writes a Markdown copy of every lesson beside its page. The app renders every page itself. `pnpm test` checks every lesson has the parts the reader relies on. `pnpm lint` runs Biome and svelte-check.

Two workarounds keep Svartz 2.3 working with SvelteKit 3, until Svartz supports it: `patches/svartz@2.3.0.patch` makes `svartz build` build the server too, and `vite.config.ts` imports the vault's index alone instead of Svartz's page runtime.

## Agent skills

The course's methods ship as agent skills from [mia-cx/skills](https://github.com/mia-cx/skills): `gtm`, `seo` and `marketing-agents` with their branches. `pnpm skills:sync` copies them into `static/.well-known/agent-skills/` with an `index.json`, so `npx skills add <site>` installs them and every `SKILL.md` is a plain URL. Links to skills the site doesn't serve point at GitHub. `/llms.txt` lists the skills and every lesson for agents.

## Deploy to Cloudflare

The app runs on Cloudflare Workers through `@sveltejs/adapter-cloudflare`. Every page is prerendered into static assets, so the Worker only answers requests no page matches.

GitHub Actions deploys it (`.github/workflows/release.yml`):

- Every push to `main` deploys to [staging.seo.mia.cx](https://staging.seo.mia.cx), which answers every request with `X-Robots-Tag: noindex`, and opens or updates the Changesets release pull request.
- Merging the release pull request bumps the version; that commit deploys to [seo.mia.cx](https://seo.mia.cx) and becomes a tagged GitHub release.

Describe a change for the changelog with `pnpm changeset`. The Cloudflare token and account are the mia-cx organisation's `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

`SITE_URL` is the public origin. Canonical URLs, the sitemap, robots.txt and the share image use it, and the build fails without it. To build and serve locally: `SITE_URL=http://localhost:8787 pnpm build && pnpm exec wrangler dev`.

Lesson narration in `static/audio/` is kept out of git, so deployed lessons have none yet.

## Write a lesson

Lessons live in `content/<module>/<lesson>.md`, and the folder and file names are the URL. `order` sets the sequence. Each module folder has an `index.md` with its title, order, description and signature `diagram`. The folder opens as an Obsidian vault.

```md
---
title: Say what you are, for whom, against what
order: 2
description: Write a positioning doc you can test today.
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
