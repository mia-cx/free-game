# Analysis brief

You are a subagent. Don't run memo.

Working directory: /Users/mia/.t3/scratch/2026-11-08-earlier-posts-bloggersarvesh-https-x-83f0ee82

We are turning ~54 scraped X posts and articles (in `research/sources/<id>.md`) into a from-scratch marketing and growth course for builders. Your job is one batch: read every source in it, in full, and extract every piece of knowledge worth teaching. Another step merges batches and removes duplicates, so extract generously within your batch but merge duplicates inside it.

We want two kinds of knowledge:

- **durable**: principles and mental models that will still be true in 5 years (positioning, why attention is the asset, how ranking systems decide).
- **trick**: concrete, cheap, specific tactics that work now (a prompt, a directory list, a posting format, a cold-email number). Keep the specifics: numbers, tool names, prompts, URLs, templates, step lists. A trick without its specifics is worthless.

Skip fluff: engagement bait, "this is gold", self-promotion, hype claims with no transferable content. Where a source quotes another post that is also in the full list (e.g. a repost of an article), only analyse it once and note both ids.

## Output

Write `research/analysis/<batch>.md` (create `research/analysis/` if missing). No other files. Format, one block per knowledge unit:

```md
### <short imperative title, e.g. "Answer the question in the first 40 words">

- kind: durable | trick
- topic: <one slug from the list below>
- claim: <one sentence: what is true or what to do>
- how: <the specifics: steps, numbers, prompts (verbatim, fenced), tools, templates. Bullet list allowed. Omit for pure principles.>
- evidence: <what the author offers as proof, with numbers; write "anecdotal" or "unverified" honestly>
- risk: <only if real downside: search penalty, account ban, spam law, wasted money. Omit otherwise.>
- sources: <ids>
```

Topic slugs (pick the best fit; propose a new one only if nothing fits, and say so at the top of the file):
`foundations` (what marketing is, positioning, audience, strategy), `offer` (business models, pricing, what to sell), `content` (writing, hooks, storytelling, content systems), `x-growth` (X/Twitter algorithm, posting, growth), `video` (product video, short-form, AI video), `seo` (classic search), `geo` (AI search / LLM visibility), `backlinks`, `outreach` (cold email, LinkedIn, DMs), `launch` (first users, directories, launches), `product-marketing` (activation, retention, messaging), `agents` (AI agents, automation, running ops with bots), `marketing-engineering` (building tools/automations as marketing), `career` (getting better as a marketer, habits).

At the end of the file add `## Batch notes`: 3-6 bullets on themes across the batch, contradictions between sources, and anything you judged too dubious to include (one line each, with why).

## Acceptance criteria

- Every source in your batch is read fully and represented, or listed in Batch notes as skipped with a reason.
- Every trick keeps its concrete specifics; reusable prompts are copied verbatim.
- No invented facts. Paraphrase in plain words; no source's hype language.
- Reply with a 3-line summary: units extracted (durable/trick counts), sources skipped, notable gaps.
