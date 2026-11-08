---
title: Give the bot your context, not clever prompts
summary: Set up a bot with your examples, rules and playbook so it stops producing generic work.
---

> [!TLDR]
> - A bot gives the most generic answer until it reads your process, your best examples and your style rules.
> - Write the brief yourself first. If you can't, the bot will fill the gaps and hand back something that only looks done.
> - Keep one standing context file, and turn every correction into a new rule in it.
> - Have the bot extract your playbook from finished work and recordings, asking you where it can't tell.

## Input beats wording

A bot defaults to the most generic answer. It only produces work at your level once it reads **your process docs, finished examples and style guide**, so what you feed it matters more than how you phrase the request.

Kyle Hunt runs a solo agency on bots and built guides for most of what he delivers. He reports $382,428 in year one at 87% margins, after spending $7,000 to $8,000 a month on AI. Those are his own numbers, and his posts also sell his consulting.

Before you automate a job, gather three things:
- a process doc: how you do the job, step by step
- 3 finished examples you were happy with
- a style guide plus a banned-words list

Then tell the bot to read those files before every run.

## Write the brief yourself first

An agent fills the gaps in a vague request and returns something that looks finished. Your prompt shows how well you understand the problem, so write the brief before you ask for help. Addy Osmani's checklist:

- the audience
- what's out of scope
- the definition of done

If you can't fill those in, ask the agent to interview you about what it doesn't understand. If two rounds of corrections haven't landed, stop tweaking and rewrite the prompt.

Hunt says prompting matters less as models get smarter; Osmani calls prompting a thinking skill. They agree on the part that counts: the substance you supply (data, examples, intent, finish line), not clever wording.

## Set it up once and let it learn

Put a standing brief in a Claude Project, a custom GPT or a Gemini Gem, so you never re-explain your business. The last rule in the template below matters most: every correction becomes a new line, so the brief gets better each week.

> [!TRICK] Paste this into the instructions box
> ```
> ROLE
> You are my [job, e.g. "brand designer", "sales assistant",
> "data analyst"] for [my business or my work]. You've done this
> for years and you're picky about quality.
>
> WHAT WE'RE WORKING ON
> [the business or project, who it's for, what makes it different]
>
> WHO THE WORK IS FOR
> [the customers or viewers: what they like, what they hate,
> what they already know]
>
> WHAT GOOD LOOKS LIKE
> [upload 3-5 of your best examples: texts, designs, screenshots, reports]
> What makes them good: [e.g. "simple layouts with one bold color",
> "short sentences, no jargon", "every number has a source"]
>
> RULES
> - always: [e.g. "use our brand colors", "write in British English"]
> - never: [e.g. "a stock photo look", "made-up numbers"]
>
> HOW TO WORK WITH ME
> - if my request is unclear, ask up to 3 questions before you start
> - give me [2-3 options / one finished version] unless I say otherwise
> - check everything against these rules and fix what doesn't fit
>   before you show it to me
> - when I correct you, suggest a new rule I can add here, so the
>   same mistake doesn't happen again
> ```
> The author's advice: give it a month before you judge it.

## Let the bot write your playbook

You don't have to write the process doc from scratch. Give AI your finished work and recordings of you doing the job, and have it extract the steps. Comparing recordings side by side shows where you do the job inconsistently, which is exactly where a bot would guess. Hunt says this cut one 10 to 14 day process to 5 days (his anecdote).

> [!TRICK] Playbook-from-recordings prompt
> ```
> Here are [5] finished examples of [job] and [3] recordings of me doing it. If you can't open a recording, tell me.
>
> Write this job up as a playbook:
> 1. One line at the top: the input, the steps in order, the finished output
> 2. Numbered tasks, one action each
> 3. Under each task, the key points: what a new person would get wrong, and the call I make there
> 4. How long each task takes
> 5. A link to where you saw it in my examples
>
> Then compare the [3] recordings side by side and list every place I did the job differently. Ask me which way is right, one question at a time.
>
> Where you can't tell why I did something, ask me. Never guess.
> Save it as "[job] playbook" in [folder].
> ```
> - Only build a playbook if it saves 20 to 30 minutes per client.
> - Some agent tools can record one browser task and turn it into a draft skill (Grok's "Teach a task", rolling out, records up to 10 minutes). A recording only knows that one run, so add by hand what to do when a file is missing or a number looks off.

> [!DO] Build the context folder
> Make one folder for the job you most want to hand off. Put in 3 finished examples you're proud of and a text file with 10 banned words or phrases. That folder is what every future bot run reads first.

> [!CHECK] Before you hand a job to a bot, what three things do you gather for it to read?
> A step-by-step process doc, 3 finished examples you were happy with, and a style guide with a banned-words list.

> [!CHECK] You've corrected a bot twice and its output still misses. What do you do?
> Stop tweaking and rewrite the prompt. Then add the correction as a new rule in its standing context file.

> [!CHECK] Why write the brief yourself before asking an agent for help?
> A vague request lets the agent fill the gaps and return something that only looks finished. If you can't write the brief, have the agent interview you.

## Sources

- [@huntkyle: feeding bots past work and extracting playbooks](https://x.com/huntkyle/status/2118086670918750341)
- [@addyosmani: writing the brief yourself first](https://x.com/addyosmani/status/2117512471930167377)
- [@notkvtwts: context-file template that learns from corrections](https://x.com/notkvtwts/status/2115810173830750575)
- [@notkvtwts: AI business guide](https://x.com/notkvtwts/status/2116886564802576703)
