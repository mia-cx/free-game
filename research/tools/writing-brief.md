# Writing brief

You are a subagent. Don't run memo.

Working directory: /Users/mia/.t3/scratch/2026-11-08-earlier-posts-bloggersarvesh-https-x-83f0ee82

You are writing part of **Free Game**, a marketing and growth course rewritten from free posts on X. The reader is a builder with no marketing background, learning it as a new skill, and has ADHD: they skim, lose the thread when a page is a wall, and need a small concrete action to start. Every choice below serves that reader.

## Inputs

- `research/tools/course-outline.md`: the full course. Read all of it so you know what other lessons cover and can point to them. Write only the modules assigned to you.
- `research/analysis/*.md`: knowledge units. Your lessons list the units they cover by batch letter and exact heading. Read each listed unit in full. Units marked "merge" are duplicates: teach them once.
- `research/sources/<id>.md`: the scraped posts. Open one when a unit is unclear, and to get the author handle and URL for citations (first lines of each file).

Use only facts from these inputs. Never invent a number, tool, result or quote.

## Files you write

For each module you own, in `src/content/<NN-module>/`:

`_module.md`:

```md
---

title: <the module title from the outline>
summary: <the module summary from the outline>
---
```

One file per lesson, named exactly as in the outline:

```md
---

title: <lesson title from the outline>
summary: <one sentence, under 90 characters: what the reader can do after this lesson>
---

> [!TLDR]
> - <2 to 4 bullets: the whole lesson for someone who reads nothing else>

## <section heading>

...

> [!TRICK] <short imperative title>
> <the specifics: steps, numbers, tools, prompt>

> [!RISK] <short title>
> <the concrete downside and how to avoid it>

> [!DO] <short imperative title>
> <one action>

## Sources

- [@handle: what they covered](https://x.com/handle/status/id)
```

Do not touch any other file. Do not edit other writers' modules.

## Structure rules

- The file starts with the frontmatter, then the `> [!TLDR]` callout. Nothing before it.
- 2 to 5 `##` sections between the TLDR and the DO. Headings are plain statements or imperatives, under 50 characters, sentence case. No heading numbers, no eyebrows, no subtitles under headings.
- Each section is short: a paragraph or two (1 to 3 sentences each), or a list. If a section passes ~150 words, split it.
- **durable** units become the teaching in sections. **trick** units become `> [!TRICK]` callouts with every specific kept: numbers, tool names, lists, URLs, prompts. A trick without its specifics is worthless. Small tricks can be a bullet inside a section instead.
- Prompts are copied verbatim inside fenced code blocks inside the callout (prefix every line with `> `, including the fences). For sources in Chinese, use only the English translation.
- Use a `> [!RISK]` callout for every unit with a `risk:` line that matters (bans, penalties, legal rules, lost money). Keep it to what the downside is and how to avoid it.
- Exactly one `> [!DO]` callout per lesson, as the last thing before `## Sources`. It is one bounded action the reader can finish in under 20 minutes today, with a concrete output ("Write the sentence and pin it above your desk", "List 10 reviews in a doc"). Not "think about".
- `## Sources` is always the last section: one bullet per source post used, author handle plus a few words on what they covered, linked to the post. Use the `Source:` URL from the top of `research/sources/<id>.md`.
- Tables are fine for comparisons (e.g. weights, benchmarks). Keep them to 2 to 4 columns.
- Callout titles and the TLDR use inline markdown only; no headings inside callouts.

## Voice

- Plain, direct, second person. Short sentences. Say it once.
- Lead each section with the point, then the detail.
- Bold at most one key phrase per section.
- Be honest about evidence without hedging every line: when a number is one person's claim, say so once ("one founder reports", "the author's own data"). Do not present unverified numbers as facts. Note when a source sells the tool it recommends.
- Where sources disagree, say so and give the reader a rule for choosing.
- No hype or filler: no "game-changer", "unlock", "supercharge", "leverage" (as a verb), "dive in", "in today's world", "let's explore", "it's not X, it's Y". No exclamation marks. No em dashes: use a colon, comma, full stop or parentheses. No "In this lesson" openers or recap closers.
- Use "you". Don't address the reader as a founder unless the advice is founder-specific.
- Point to other lessons by title when it helps ("see _Test titles for quick wins_"), sparingly.
- Length: 400 to 900 words per lesson, not counting prompts and lists inside tricks. Shorter is better if nothing is lost.

## Check your work

Run `pnpm test` from the working directory (the PATH needs `/opt/homebrew/bin`). It checks every lesson has a title, summary, a TLDR first and a DO. Fix any failure in your files. Then re-read each lesson top to bottom as the reader: cut anything that repeats, check every trick kept its specifics.

Reply with: files written, word count per lesson (`wc -w`), any unit you could not place and why.
