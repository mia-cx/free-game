---
title: Use AI without surrendering your judgment
order: 1
description: Use AI on real decisions and still know what you shipped and why.
---

> [!TLDR]
> - You slide from owning AI output to accepting it unchecked one skim at a time. The test: can you explain the answer?
> - Hand whole decisions to AI only where being wrong is cheap. What to build and who it affects stay yours.
> - Write your guess before you ask, then check what would make the answer wrong.
> - Produce only as much as you can review. Someone answers for what ships, and that's you.

## Notice when you stop checking

Using AI sits on a spectrum. At the top is **offloading**: the AI does the task, you still own the result. In the middle is deferral: the output becomes your input and stops being a guess you might reject. At the bottom is cognitive surrender, a term from Wharton researchers Steven Shaw and Gideon Nave: the output quietly becomes yours and you feel no need to check it.

Nobody chooses to slide. You read one answer carefully, skim the next, scan the outline of the one after. Then someone asks about a line and you can't explain it, even with your agent's help. That's the test: if you can't explain it, you've surrendered it.

You don't need to hold everything in your head. It's fine to rebuild understanding of one part on demand by asking the agent to explain that slice, as long as you know which parts you no longer hold.

> [!DIAGRAM] surrender-scale

## Hand off only what's cheap to get wrong

Delegate the whole decision when a mistake costs little. Addy Osmani, who works on Claude Code at Anthropic, let AI pick between three similarly rated hotels and would do it again. Not for investing money, advising kids on careers, or product calls, though.

Keep the reasoning yourself where other people live with the result: what to build, what changes users feel, whether it's safe to ship. You can offload the work and much of the checking, but not the accountability. Four questions stay yours:

- What are you building?
- Why is it worth it?
- Who does it affect?
- What are you willing to give up for it?

## Guess first, then try to break the answer

Before you run an agent on anything non-trivial, write what you expect the answer to be. A bad guess is fine. Once you've read a polished answer, it's hard to picture any other.

- No idea at all? Ask for a "blind spot pass": give the model what you know and have it find what you don't know you're missing.
- Ask yourself whether you want help thinking or want the thinking done for you. Both are fine if you know which.
- Ask what would have to be true for the answer to be wrong, then go check that. A test you can run beats the model's own confidence rating.
- On an open question where you've taken a hard stance, have more than one model argue the opposite side, then decide for yourself.

> [!TRICK] Make the agent list its decisions, then quiz yourself
> Summaries always say everything went well. After a long session, ask:
>
> 1. "List the defaults you chose, what you treated as out of scope, and which requirement you reinterpreted when two clashed."
> 2. Pick a few lines of the output at random and explain each one out loud.
> 3. For a document: close it and write its main argument from memory.
> 4. For long sessions: have the agent write a report on the change with a quiz at the bottom. Osmani quotes the rule: "I only merge after I pass the quiz perfectly."

## Make only what you can review

Osmani calls it the **orchestration tax**: the gap between what your agents produce and what you'd put your name on. If finished work piles up faster than you can review it, another session won't help. Tighten the checks so less needs you, or slow down.

Human attention is the limit, not the model. The DeepSeek Harness team reports that one person can follow only 3 to 5 active agent sessions at once (their own observation, not a controlled study).

- Use agents to triage incoming work: what breaks your guidelines, where your attention is needed. Make the important calls yourself.
- Put checking on your schedule as its own line item. It isn't free, and unscheduled checks don't happen.

For how to check AI work once it's done, see *Check the work before it ships*.

> [!DO] Log one guess and one gap
> Before your next AI task today, write one line in a note: what you expect the answer to be. When it finishes, add a second line: one thing it didn't check.

> [!CHECK] What is the test for whether you've surrendered your judgment to AI output?
> Whether you can explain it. If someone asks about a line and you can't, you've surrendered it.

> [!CHECK] Your agents finish work faster than you can review it. What do you do?
> Tighten the checks so less needs you, or slow down. Another session won't help, because your attention is the limit.

> [!CHECK] Why write down your own guess before you ask AI a non-trivial question?
> Once you've read a polished answer, it's hard to picture any other.

## Sources

- [@addyosmani: critical thinking when agents do the work](https://x.com/addyosmani/status/2117512471930167377)
- [@DeepSeekHarness: how many agent sessions one person can follow](https://x.com/DeepSeekHarness/status/2116857257245987236)
