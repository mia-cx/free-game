---
title: Design an always-on agent
order: 8
description: Design an agent that filters noise, works ahead, keeps context lean and never blocks you.
---

> [!TLDR]
> - Drop most incoming events with cheap rules; send only the ambiguous ones to the model.
> - Let the agent start likely work early, and keep its replies short in chat and structured everywhere else.
> - Treat the context window as a cache: IDs and summaries inline, pointers to the rest.
> - Run long tools in the background, keep the agent's state in the cloud, and build delegation into the structure instead of asking for it.

## Filter with rules, then the model

Most incoming events need no action. **Drop noise with cheap, fixed rules first** (source, channel, allowlists) and send only the ambiguous candidates to the model, whose policies you can edit in plain language.

For each source, set one of three modes:
- respond only to explicit requests
- treat as candidate events
- ignore

The same split applies to choosing models: route easy requests to a fast, cheap path and escalate only the hard ones to a reasoning model. Suraj Sharma's checklist frames it as resolving about 95% cheaply and escalating 5%; he gives no evidence for the split.

## Work ahead, and speak in the channel's format

Use spare compute to start likely work in the background, so you only review a finished draft. Discard what isn't needed.

- On a meeting invite or to-do: check calendar conflicts, gather background, draft the reply. You review and send.
- On a reported issue: try to reproduce and fix it silently. Speak only once it's confirmed.

Match what the agent says to where it says it, and keep its reasoning and tool logs out of shared spaces.

> [!TRICK] Output rules per channel
> - Chat: notify only when a decision or sign-off is needed, ask direct questions, give short conclusions. Hard rule: max 100 words per reply. DeepSeek calls the cap "simple, effective" and says they verified it internally.
> - GitHub, email, docs: dense and structured (background, what changed, verification results).

## Treat the context window as a cache

Put in what the model is likely to need soon, and leave the long tail outside with a pointer it can follow.

> [!TRICK] Build context in three layers
> 1. Start with the current object's ID and a summary.
> 2. Add related objects' IDs and nearby content: the first 50 characters, surrounding messages, the message it replies to.
> 3. Cut long content at a small cap and leave a pointer to where it continues.
>
> Give every object (event, thread, task) an ID and list related IDs, so the agent can follow links hop by hop to recover old context. DeepSeek calls this "Chain of Recall".

## Never block the conversation

A long-running tool should start in the background and report back as a new event; a blocking call leaves the agent deaf until it finishes. Replace `run()` with `start()` (returns "Started" at once) and `stop()`, and deliver results as new messages. DeepSeek has built this but hasn't turned it on by default. Sharma suggests a durable workflow engine such as Temporal, so a run resumes from the exact step after a crash or a multi-day approval (no evidence given).

Keep the agent in the cloud and the tools where they live. The agent keeps its state in a database, runs on stateless cloud compute, and reaches your machines through a thin daemon. Your laptop sleeping no longer stops it, and a device that reconnects runs its queued tasks. Anthropic calls this "Decoupling the brain from the hands" (https://www.anthropic.com/research/managed-agents). DeepSeek's prototype is at https://github.com/deepseek-ai/dsh-superagent-prototype (not an official product).

> [!RISK] One compromised loop reaches every machine
> If the cloud loop is compromised, every device connected to it can be taken over. Give each connection the least access it needs and keep credentials out of the model's context; see *Keep bots from doing damage*.

## Build delegation into the structure

Telling a single agent to delegate is unreliable, because it decides case by case whether work is "small". In DeepSeek's test, a neutral prompt delegated in 0 of 5 runs and a delegation-first prompt in 4 of 5; the one run where it judged the work "small" produced the slowest results. The workload was synthetic and the authors call it indicative only.

The fix is structural: the coordinator has no tools to do the work, and workers see only their own threads. See *Put a coordinator over your bots* for the timings and the solo version of this split.

> [!DO] Write your agent's filter table
> List every source your agent watches (inboxes, channels, repos, calendars). Next to each, write one mode: explicit requests only, candidate events, or ignore.

> [!CHECK] In an always-on agent, what three modes can you set for each incoming source?
> Respond only to explicit requests, treat as candidate events, or ignore.

> [!CHECK] A tool your always-on agent calls takes ten minutes. How should it run?
> In the background: it returns "Started" at once and delivers the result later as a new event. A blocking call leaves the agent deaf until it finishes.

> [!CHECK] Why build delegation into an agent's structure instead of telling it to delegate?
> An agent told to delegate decides case by case whether work is "small", so it often doesn't. Give the coordinator no tools to do the work, and it has to delegate.

## Sources

- [@DeepSeekHarness: super-agent architecture](https://x.com/DeepSeekHarness/status/2116857257245987236)
- [@suraj_sharma14: model routing and durable workflows](https://x.com/suraj_sharma14/status/2118682313479573689)
