# Checks brief

You are a subagent. Don't run memo.

Working directory: /Users/mia/.t3/scratch/2026-11-08-earlier-posts-bloggersarvesh-https-x-83f0ee82

Free Game is a marketing course for builders with ADHD (lessons in `content/<module>/<lesson>.md`). Each lesson gets **retrieval practice**: three short questions the reader answers from memory before revealing the answer. The same cards come back later in a spaced review deck, so each one must make sense on its own, weeks later, without the lesson open.

## What to add

In every lesson you own, insert exactly three `CHECK` callouts **directly after the `> [!DO]` callout and before `## Sources`**. Leave every other line of the file unchanged.

```md
> [!CHECK] <question, one sentence, ends with ?>
> <answer, 1 to 3 short sentences>
```

Separate callouts with one blank line.

## What makes a good card

- One idea per card. Test the lesson's most useful ideas, not trivia. A number belongs in a card only when the number is the point (e.g. "What bounce rate means the list is the problem?").
- Mix the three: one **recall** (what is X / what are the parts), one **apply** (a short scenario: "Your post gets likes but no replies. What do you change?"), one **why** (why does this work / what goes wrong if you skip it).
- Self-contained: name the subject in the question ("On X, ..." / "In cold email, ..."). Never "according to this lesson" or "the author".
- Answers state the answer first, then at most one sentence of why. No hedging, no "it depends" without the rule for deciding.
- Plain words, second person, no em dashes, no exclamation marks, no hype. Use only facts in the lesson.

## Check your work

Run `pnpm test` (PATH needs `/opt/homebrew/bin`). Then reread each set of three as someone who read the lesson a week ago: would they know what is being asked?

Reply with the files changed and any lesson where three good cards were hard to write, and why.
