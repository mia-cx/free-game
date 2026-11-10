# Skills brief

You are a subagent. Don't run memo. Don't commit or push; the parent reviews and commits.

You are turning part of **Free Game**, a 62-lesson marketing course, into agent skills. A skill tells a coding agent how to do a marketing job for a user who builds software products. The course teaches a human. The skill gives an agent steps and rules to follow. Distil: keep what changes what the agent does, and drop the teaching scaffolding.

## Read first

1. `/Users/mia/.agents/skills/agent-copy/SKILL.md`, in full. Every file you write follows it: steps end on a completion criterion, reference is flat and co-located, you use leading words, and you state positive targets instead of prohibitions.
2. The skill files you own (listed in your task) and the current files they replace or extend. Existing content was researched against primary sources. Keep every fact in it unless the course gives a better-sourced replacement.
3. Every course lesson in your task, in full: `/Users/mia/.t3/scratch/2026-11-08-earlier-posts-bloggersarvesh-https-x-83f0ee82/src/content/<module>/<lesson>.md`. When a claim is unclear, its source post is in `research/sources/<post id>.md` in the same repo.

## Layout

Each skill is an entrypoint plus disclosed references:

- `SKILL.md` holds what every branch needs and a table that points each job to one reference file. The parent writes the gtm entrypoint. Write an entrypoint only when your task says so.
- `references/<job>.md` holds one job. It opens with `# Title` and a one-paragraph purpose, then numbered steps when order matters, and reference sections otherwise. Aim for 400 to 900 words. Go to 1,200 only when every line is live.
- A reference may point to a sibling reference or another skill by relative link (`[links.md](links.md)`, `[seo](../../seo/SKILL.md)`). Point to them; never copy their content.

## Distilling

- **Durable rules become imperatives with their reason**: "Choose keywords by intent to buy, because 50 buyers outweigh 1,000 browsers."
- **Cheap tricks stay with their specifics**: numbers, tool names, thresholds, prompt templates. A trick without its specifics is worthless. Keep a prompt only when the agent can run or adapt it. Put it in a fenced block and tighten it, but keep the substance.
- **Evidence.** Put a number from one person's post in the text as a heuristic ("one practitioner's threshold: 5 to 15"), not as a fact. Primary documentation (Google Search Central, platform policies) outranks posts. When the course and existing skill text conflict, keep the primary-sourced version and drop the post claim. Drop vendor plugs, follower counts and author names, except where the name is the evidence label.
- **Risks** become boundaries next to the step they guard: what not to do, why, and the safe version.
- **Agent's view.** The agent does the work for the user. Write "draft", "check" and "propose", and say where the user's go, input or firsthand material is required. The user's public posts and messages go out only after the user approves them.
- Cut learning-design material: TLDRs, check questions, "do it now" tasks, motivation, history, sources lists. Keep a link only when the agent needs to open it (a tool URL, a policy page).
- **Exhaustive coverage.** Account for every lesson section in your scope. Each one lands in a file, or appears in your report as deliberately dropped, with a reason.

## Style

Plain, imperative, second person addressed to the agent. Short sentences. No em dashes; use colons, commas or full stops (en dashes in ranges like 5–15 are fine). No hype words. Tables of 2 to 4 columns for comparisons. Sentence-case headings.

## Done when

Every file in your task is written, each section of each lesson in scope is placed or reported as dropped, and every link between files resolves. Reply with:

- the files written, with `wc -w` for each
- each dropped lesson section, with a one-line reason
- any conflict between the course and the existing skill text, and which side you kept
