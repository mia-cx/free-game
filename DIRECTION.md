# Direction

## What it is

Free Game is a marketing and growth course for builders learning it from zero, rewritten from posts people shared for free on X. It keeps both durable principles and cheap, specific tricks, and it is built for readers with ADHD: short lessons, the short version first, one small action per lesson, visible progress.

## How the course is made

1. `research/tools/links.txt` lists the source posts. `research/tools/scrape.mjs` fetches each one through the fxtwitter API (threads, long-form articles and quoted posts) into `research/sources/`.
2. Five analysts extracted knowledge units into `research/analysis/`, each tagged durable or trick, with evidence and risk.
3. `research/tools/course-outline.md` deduplicates the units and orders them into 13 modules. Every unit lives in exactly one lesson.
4. Writers followed `research/tools/writing-brief.md` to produce the lessons in `src/content/`.

To add sources: append to `links.txt`, scrape, analyse into a new batch file, place the units in the outline, then write or revise the affected lessons.

## Decisions

- Static SvelteKit site, no backend. Progress lives in the reader's browser.
- Lessons are plain markdown with GitHub-style callouts (`[!TLDR]`, `[!TRICK]`, `[!RISK]`, `[!DO]`), so they read fine on GitHub too.
- Unverified numbers stay in, labelled as one person's claim. Risky tricks stay in with a concrete Watch out note; the reader decides.
- Sources are credited and linked on every lesson.

## State

v1: 62 lessons (143 tricks) across 13 modules, built from 58 posts (one inaccessible). Private repo, not deployed yet.
