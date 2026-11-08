# Batch a-business-content-video

Sources: 2117664712532123680 (Dan Koe article; reposted by 2118351989511749841), 2115810173830750575 (notkvtwts article; reposted by 2116886564802576703), 2117351855856779486, 2118317430665613741, 2103529310208606701, 2119429831163027708, 2119173056673309041, 2088983373859725755.

The two reposts (2118351989511749841, 2116886564802576703) add only a one-line teaser and a newsletter plug; they are cited alongside their originals below.

Source 2118317430665613741 is in Chinese. Its prompts are copied verbatim in Chinese, each followed by an English translation.

---

## Foundations and offer

### Treat attention capture as the bottleneck skill
- kind: durable
- topic: foundations
- claim: Whatever you build, revenue is capped by how many of the right people know it exists, so the ability to capture attention is worth more than marginal product quality.
- how:
  - Social feeds, not TV or radio, are where attention sits now; "founder-led marketing" is the startup version of the same idea.
  - Content in this sense means good content, not volume.
- evidence: author's argument plus cited forecasts: Goldman Sachs projects the creator economy going from $250B (2023) to $480B (2027); IAB expects US brand spend on creators to go from $13.9B (2021) to $43.9B (2026); creators reportedly passed traditional media in ad revenue in 2025 (~$185B). Figures are cited, not checked here.
- sources: 2117664712532123680, 2118351989511749841

### Sell yourself as a one-person creative team
- kind: durable
- topic: offer
- claim: Founders and creators who lack time for content will pay one AI-equipped person to act as their creative director, at a fraction of what a team costs.
- how:
  - Two versions: be your own creative team (personal brand, audience, digital products, email list) or be one for clients.
  - The client gap: most founders still post "announcement"-style content and don't know how influence is built.
  - Author's price range: $10k-$75k/month across 1-3 clients, explicitly "if you're good at this and practice", not a quick win.
  - Agencies report AI moved the human role to reviewing and rewriting drafts: one says 4 hours a day instead of 12.
- evidence: anecdotal (paraphrased agency conversations; author runs Eden, a creator tool, so has a stake).
- sources: 2117664712532123680, 2118351989511749841

### Pick skills where AI makes you more valuable, not redundant
- kind: durable
- topic: career
- claim: The skills that pay are the ones where AI amplifies a person who already knows a field; skills AI can do alone are losing value.
- how: Three-question test for any skill:
  1. Do people already pay for this result today?
  2. Does AI make you faster at it, instead of doing it without you?
  3. Does it need knowledge of a field, like sales, health or law?
  If it passes all three, it is worth learning.
- evidence: cited studies: PwC (over a billion job ads) finds jobs asking for AI skills pay 62% more and grew 69% vs 9% for all jobs; MIT study: writing tasks 40% faster and 18% better with AI; Stanford 2025: workers aged 22-25 in jobs AI can do alone dropped 13% relative to other jobs; Lightcast: over half of AI-skill job ads are outside tech. Not checked here.
- sources: 2115810173830750575, 2116886564802576703

### Stack two complementary AI skills and give it three months
- kind: trick
- topic: career
- claim: Learn two of five AI skills that fit your goal, run a 30-day build-and-share plan, and judge it only after 3 months.
- how:
  - Five skills: AI workflow design, context engineering, AI automation and agents, AI-assisted development, content and distribution.
  - Pairings: job you like → workflow design + context engineering; freelance → agents + content/distribution; own product → AI-assisted dev + content/distribution; unsure → start with context engineering, add one more.
  - 30 days: week 1 pick one skill and one real problem; week 2 build v1 (assistant, agent or app); week 3 use it on real work and log time saved; week 4 share how you built it and offer it to 3 people.
  - Don't get attached to a tool (they change every few months); learn on real problems, not courses alone.
- evidence: author's opinion.
- sources: 2115810173830750575, 2116886564802576703

### Generate a personal learning plan with one prompt
- kind: trick
- topic: career
- claim: Have an AI interview you, then build a week-by-week plan for one skill, and report back to the same chat weekly so it adjusts.
- how: Fill the brackets, paste, answer its questions, save the chat and return weekly.
  ```
  I want to get really good at [the skill] so I can [your goal, e.g.
  "get a better-paid job", "sell AI agents to small businesses",
  "launch my own product"] within [time, e.g. 3 months].

  WHERE I AM NOW
  - what I do now: [your job or studies]
  - how I use AI today: [e.g. "ChatGPT every day for writing and research,
    never built an automation"]
  - what I already know about this skill: [be specific]
  - tools I already use: [e.g. Claude, Notion, Figma]
  - time I can spend: [hours per week]
  - budget for courses and tools: [amount, or "free only"]
  - how I learn best: [videos / reading / building projects]

  Act as an expert who uses [the skill] for paid work every day and has
  trained a lot of people to do the same.

  Build me a learning plan with:

  1. The few parts of this skill that give most of the results
  2. A week-by-week plan for [time], with what to learn and one real
     project to build each week
  3. The best resources for each week (name real courses, channels or
     docs, and tell me if you're not sure something exists)
  4. 3 portfolio projects that prove I have this skill, from easy to hard
  5. The mistakes people at my level usually make, and how to avoid them
  6. How I'll know I'm ready: what I should be able to do by the end
  7. How people make money with this skill: who pays for it, what they
     pay for, and how I can find my first paying client or job

  RULES
  - skip the basics I already know, start from where I am
  - be honest about what's hard and how long things really take
  - everything has to fit my time and budget

  Before you start, ask me up to 5 questions about anything that's unclear.
  After that, I'll tell you every week what I did, and you'll adjust the plan.
  ```
- evidence: none beyond author's use.
- sources: 2115810173830750575, 2116886564802576703

---

## Agents and AI operations

### Audit your week to find what AI should draft
- kind: trick
- topic: agents
- claim: AI does roughly 80% of a task fast; the paid part is the last 20% (choosing, fixing, catching mistakes), so map your tasks and measure the gain.
- how:
  1. List every task you do in a normal week.
  2. Sort into three groups: AI does it alone / AI drafts, you fix / AI can't help yet.
  3. Set up an AI assistant (see context setup below) for each middle-group task.
  4. Time each task before and after.
  5. Write down the change ("used to take 4 hours, now 1"); this log is also proof you can do it for others.
  - Example of the 20%: AI writes 50 ads in a minute; the skill is knowing which 3 to test and why the other 47 won't work.
- evidence: author's opinion.
- sources: 2115810173830750575, 2116886564802576703

### Set the AI up once with a context file that learns from corrections
- kind: trick
- topic: agents
- claim: Put a standing brief in a Claude Project, custom GPT or Gemini Gem, and every time you correct the AI, have it propose a new rule you add to the brief.
- how: Paste into the instructions box:
  ```
  ROLE
  You are my [job, e.g. "brand designer", "sales assistant",
  "data analyst"] for [my business or my work]. You've done this
  for years and you're picky about quality.

  WHAT WE'RE WORKING ON
  [the business or project, who it's for, what makes it different]

  WHO THE WORK IS FOR
  [the customers or viewers: what they like, what they hate,
  what they already know]

  WHAT GOOD LOOKS LIKE
  [upload 3-5 of your best examples: texts, designs, screenshots, reports]
  What makes them good: [e.g. "simple layouts with one bold color",
  "short sentences, no jargon", "every number has a source"]

  RULES
  - always: [e.g. "use our brand colors", "write in British English"]
  - never: [e.g. "a stock photo look", "made-up numbers"]

  HOW TO WORK WITH ME
  - if my request is unclear, ask up to 3 questions before you start
  - give me [2-3 options / one finished version] unless I say otherwise
  - check everything against these rules and fix what doesn't fit
    before you show it to me
  - when I correct you, suggest a new rule I can add here, so the
    same mistake doesn't happen again
  ```
  The last rule matters most: corrections accumulate into the brief.
- evidence: anecdotal ("give it a month").
- sources: 2115810173830750575, 2116886564802576703

### Build one scheduled agent for a weekly manual task, then resell it
- kind: trick
- topic: agents
- claim: An agent that replaces a recurring manual report (e.g. competitor monitoring) saves hours every week and can be sold to other businesses with the same problem.
- how:
  - Example Monday schedule: 8:00 check 10 competitors' sites and socials; 8:05 detect changes (prices, products, posts); 8:10 compare with last week; 8:15 write a one-page report with 3 moves worth making; 8:20 report lands in your inbox before the team sees it.
  - Steps: pick one weekly manual task; write every step including the decisions a person makes; build the agent (tools named: Claude Code, Grok Bot, Hermes Agent); route results to yourself for approval first; run 2-3 weeks, fix breakages, count hours saved.
  - Distinction: an automation follows fixed steps; an agent gets a goal and works out the steps.
- evidence: none; illustrative.
- sources: 2115810173830750575, 2116886564802576703

### Review AI work with a fresh agent that sees only the artefact
- kind: trick
- topic: agents
- claim: The agent you've been working with fills gaps from context it shares with you; a new agent given only the output reads like a first-time viewer and finds what is actually unclear or wrong.
- how:
  - Tell Claude "open a new agent to review this", hand it only the artefact (story, prompt + images, final cut), no conclusions.
  - Reviewer is read-only: it lists problems and ends with "pass" or "fail". Mark uncertain findings "maybe".
  - Gate any paid step (e.g. video generation) on a written "pass".
- evidence: anecdotal; author says it caught a 13% cup-size mismatch between two frames, a hat brim present in one frame and missing in the other, and left/right reversals.
- sources: 2118317430665613741

### Run long AI jobs as four cooperating agents with a budget cap
- kind: trick
- topic: agents
- claim: For a long unattended job, pair the main worker with a reviewer, a supervisor that tracks your stated requirements, and a proxy that decides on your behalf within a preset budget.
- how:
  | role | job |
  | --- | --- |
  | maker | does all production |
  | reviewer | checks every step; must write "pass" before any paid generation |
  | supervisor | turns everything you said into a requirements checklist and checks nobody forgot one |
  | proxy | learns your preferences, decides when maker/reviewer disagree or a spend is needed, within budget only |
  Prompt (Claude Code transcripts are under `~/.claude/projects/`):
  ```
  这支片子用四线程来做。你当主做，再开三个子 agent，四个一起配合，一直做到片子做完，或者账户欠费为止。
  我说过的话在：[对话记录或者要求文件的路径；Claude Code 的记录在 ~/.claude/projects/ 下]。
  总预算：¥[金额]。

  分工：
  - 主做：就是你，负责所有制作。
  - 审核：开一个子 agent，只挑错，不改文件。每一步都要查，提交生成视频之前必须明确写“通过”。
  - 监督：开一个子 agent，读完我说过的所有话，整理成要求清单。每一步都查有没有人忘了要求，包括你。
  - 代理：开一个子 agent，读完我说过的所有话，整理成我的偏好。你和审核拿不准，或者要提交生成视频时，由它按我的偏好来决定，并写明依据和把握。它只能在总预算内批准提交，超过预算就停下来等我。

  配合的顺序：
  1. 你每做完一步，先交给审核，再交给监督。
  2. 有分歧就交给代理决定。
  3. 所有决定和花费都记进审核记录，我回来可以推翻任何决定。

  不充值，不买额度。欠费就停，先把已有的片段粗剪出来给我看。
  ```
  English translation:
  ```
  Make this film with four threads. You are the maker; open three sub-agents and work together until the film is done or the account runs out of credit.
  Everything I've said is at: [path to transcript or requirements file; Claude Code transcripts are under ~/.claude/projects/].
  Total budget: ¥[amount].

  Roles:
  - Maker: you, responsible for all production.
  - Reviewer: a sub-agent that only finds faults and never edits files. It checks every step and must explicitly write "pass" before any video generation is submitted.
  - Supervisor: a sub-agent that reads everything I've said and turns it into a requirements checklist. At every step it checks whether anyone, including you, forgot a requirement.
  - Proxy: a sub-agent that reads everything I've said and distils my preferences. When you and the reviewer are unsure, or a video generation is about to be submitted, it decides according to my preferences, stating its reasoning and confidence. It may approve submissions only within the total budget; over budget, it stops and waits for me.

  Order of work:
  1. After each step, hand it to the reviewer first, then the supervisor.
  2. Disagreements go to the proxy.
  3. Log every decision and spend in the review log; I can overturn any decision when I'm back.

  Don't top up or buy credits. If the balance runs out, stop and rough-cut the clips you have for me to see.
  ```
- evidence: anecdotal.
- risk: unattended paid API calls can overspend; the hard budget cap and "no top-ups" rule are the safeguard.
- sources: 2118317430665613741

---

## Marketing engineering

### Give a coding agent the whole marketing stack, then build per-channel feedback loops
- kind: trick
- topic: marketing-engineering
- claim: A coding agent with access to your data and channels can run marketing as code: pick one channel and build a system that improves from its own performance data.
- how: Environment the agent needs for the brand:
  - data pipeline and data warehouse
  - cloud runtime for hosting, object storage, cron jobs
  - API access to all ad channels, the CMS, etc.
  - a git remote so several people can ship to it
  - generation tools: image model (named "chatgpt image 2.5"), Seedance video, word-by-word transcription
- evidence: none; post promotes the author's product (Graphed), which sells this setup.
- sources: 2119173056673309041

### Automate a pain-point-to-ad pipeline that feeds on revenue data
- kind: trick
- topic: marketing-engineering
- claim: One person can replace a researcher, designer, editor, copywriter, media buyer and analyst with a six-step agent pipeline from customer complaints to revenue-attributed ads.
- how:
  1. Agent scrapes Reddit for customer pain points into one big markdown file.
  2. Each pain point becomes a static ad via GPT Image 2 through kie (kie.ai API reseller).
  3. Seedance generates avatar videos on the same angles.
  4. fal transcribes every word; motion graphics are cut in (author names "tesseract"; unclear which tool).
  5. Upload everything to Meta and Google Ads through their APIs.
  6. Track each ad to revenue in the warehouse and make more of what works.
- evidence: unverified; headline claim is "1,000 on-brand ads for a couple hundred dollars"; post promotes Graphed.
- risk: volume without review can burn ad budget on weak creative; brand fit of 1,000 generated ads is asserted, not shown.
- sources: 2119429831163027708

### Build a research tool that finds outlier posts, objections and hooks before you write
- kind: trick
- topic: marketing-engineering
- claim: Before writing launch copy, run an agent that gathers the brand's material, finds posts that beat expectations, and assembles sourced objections and candidate hooks.
- how: Shown Media's "Script Studio" runs inside Claude Code and:
  - reads every call transcript and doc the brand provided;
  - searches X and scores every post against the median of its own search results, so you study outliers, not averages;
  - pulls Reddit threads, reviews and competitor material, saving each as a cited "receipt";
  - builds a page of objections with sources, so the script answers doubts people already have;
  - writes five hooks from different angles and tests them against a library of past winning launches.
- evidence: anecdotal; internal tool not public (author offers it via comment-for-DM).
- sources: 2117351855856779486

---

## Content

### Build a recognisable brand, not isolated viral hits
- kind: durable
- topic: content
- claim: One post with a million views followed by posts at a thousand means the content worked but the brand doesn't exist; aim for a body of work people want to explore.
- how:
  - Separate three roles: brand strategist (positioning and perception; trust and authority over trend-chasing), content strategist (scouts what performs: formats, YouTube title/thumbnail structures, retention), writer/social manager (drafts, schedules, posts in line with both).
  - Most people skip brand strategy entirely; some do content strategy; most post random ideas.
  - Test: if you stopped posting, would anyone ask where you went?
  - A brand's ideas play out over 6-12 months of posts, not in one post.
- evidence: author's opinion.
- sources: 2117664712532123680, 2118351989511749841

### Interview the person to build a brand document before writing anything
- kind: trick
- topic: content
- claim: Record an onboarding interview (or answer it yourself), keep the transcript as a brand document, and feed it to AI whenever you ideate.
- how: Question bank, nine sections (paste into Claude to have it interview you and save the answers):
  1. Who you help: Describe one real person. What does a bad day look like for them? What do they say when they complain to a friend (exact words)? What have they already tried that didn't work?
  2. Your story: What have you lived through that your audience is living through now? The moment things changed? What have you built, tried, failed at, figured out (biggest to smallest)? What results can you point to?
  3. Who shaped your mind: Whose books, posts, videos do you never skip (real names and titles)? Which idea do you keep coming back to and why? Who changed how you think, even if you now disagree?
  4. Pillars and perspective: What could you talk about for hours (everything)? Which 2-3 matter most? How do you come at each differently ("through psychology", "as a former nurse")? What do people ask your advice on? What do you keep explaining?
  5. Mission and beliefs: One sentence on what you help people do. What do you believe that most in your space don't? What common advice is wrong?
  6. What you're against: What way of living hurts your people? What life do you help them escape? What myth or habit (not a person or company) would you remove?
  7. Why now: What just changed in the world that most haven't noticed?
  8. Where you're taking them: Their day-to-day five years after following you? What would they proudly put in their bio? Who are you in their story (guide, documenter, someone who got out and came back with a map)?
  9. Rules and words: 5-12 rules your ideal reader lives by. Names for your own ideas, methods or problems, with meanings.
- evidence: author's client process; the full prompt sits in an Eden doc (promotional).
- sources: 2117664712532123680, 2118351989511749841

### Extract a voice-and-ideas document from someone's best posts
- kind: trick
- topic: content
- claim: Don't try to clone a voice with AI; instead compile what is distinctive about the person into a knowledge base that makes drafting easier.
- how: Give an AI with social access (author uses Eden via MCP in Claude or ChatGPT) the handles and run:
  ```
  Pull the best content from [@handles]. 10-20 posts from each platform they are on. Then, I want you to note down the core ideas that make them unique, the aspects of their voice that have personality, and a guess at what their worldview or philosophy is that could rally other people behind it. In essence, note down everything that led to their growth, and compile it into a document.
  ```
  - Also read their top posts on each platform yourself to spot repeatable patterns.
  - Not posting yet? List 5-10 people who shaped your thinking and run the same prompt on them (or ask AI to pull their best ideas from books and the web). Your angle is how you combine and reinterpret them.
- evidence: anecdotal.
- sources: 2117664712532123680, 2118351989511749841

### Turn brand and influence documents into a six-month content map
- kind: trick
- topic: content
- claim: Combine your brand document with research on what has performed over the past 6-12 months to produce a tree of pillars, topics, ideas and angles.
- how:
  ```
  I want you to create a research backed content map: 3-4 unique and broad content pillars that branch into 5-7 topics that are both based on ideas that are working, through my own unique lens based on [@ brand document] and [@ content document]. Branching off each topic should be 5-10 ideas that are likely to perform well, with 4-5 angles branching off of each of those ideas.

  Look over my brand and content docs, pull potential pillars and my lens out of it, then use Eden to research what's performing across platforms in those topics. We want a unique content map, but we want to merge it with patterns that have been proven to perform over the past 6-12 months.

  Put the output in an easy to read document.
  ```
  - Swap "Eden" for whatever research tool you have.
  - Research platforms you don't post on for less-copied ideas.
  - Frame performance research as collecting references, like an artist's inspiration board: pull patterns, don't copy 1:1.
- evidence: author's claim of "about 6 months of content ideas"; unverified.
- sources: 2117664712532123680, 2118351989511749841

### Post about what you build, 3-5 times a week, on one platform
- kind: durable
- topic: content
- claim: When anyone can build in a weekend, distribution goes to people others already know and trust; documenting real work is the cheapest way to earn that.
- how:
  - Pick the one platform where the people you want to work with spend time (X or LinkedIn for most).
  - Post 3-5 times a week about what you're building and learning: an agent you built, a task you sped up, your exact setup.
  - AI can research and draft; experience, opinions and results must be yours.
  - Expect a few months before it pays off; it then makes every other skill worth more because people come to you.
- evidence: author's opinion.
- sources: 2115810173830750575, 2116886564802576703

### Write so a layperson finds it interesting and an expert finds it ten times more so
- kind: durable
- topic: content
- claim: Copy pitched at a general audience still lands with experts, but copy pitched only at experts loses everyone else.
- how: Magician analogy: a never-done trick makes a layperson say "cool" and makes a fellow magician lose their mind. Check each draft: would a non-specialist stop for this?
- evidence: author's opinion.
- sources: 2117351855856779486

---

## Outreach

### Do the work for free, then send it (permissionless apprentice)
- kind: trick
- topic: outreach
- claim: Instead of pitching, write 10 posts for a target creator or founder and send them with an ask to post them, then hire you or give a testimonial.
- how:
  - Target busy creators, founders, or accounts struggling to grow.
  - Run the brand-research and content-map prompts on them, have AI draft 10 posts, polish by hand.
  - DM template (paraphrased from the original): "I know you don't want anyone writing for you, but I wrote 10 posts for you anyway. Try posting them; if you like them, let me write more, or just give me a testimonial."
  - Volume: 10 DMs a day; author expects at least one client a month at $2,500-$5,000/month.
  - Public variant when DMs fail: post the work openly, e.g. a reel hooked "[Name] needs a new creative director and this is my application. It seems like his content is stuck in 2016."
- evidence: anecdotal: JK Molina sent this DM to the author; the public example got a reply from Grant Cardone ("Hit me I'm stuck").
- sources: 2117664712532123680, 2118351989511749841

---

## X growth and launches

### Know how X picks and ranks posts
- kind: durable
- topic: x-growth
- claim: X first sources candidate posts from your network and interest matches, then ranks them by predicted engagement, and shows one post per conversation, so a launch must live in one self-contained post.
- how:
  - Sourcing (per author): Thunder pulls recent posts from accounts you follow; Phoenix retrieval matches posts to an interest profile built from your history; SimClusters finds posts liked by accounts that engage like you.
  - The first audience is your follower/following circle, which is why large accounts get bigger launches; it's also the part you control most.
  - Ranking: Phoenix predicts each viewer's likely actions and sums them with weights; rarer actions get larger weights.
  - X keeps one post per conversation in the feed: split a launch across 5 tweets and 4 flop and never reach non-followers.
- evidence: author's description of X's published system; the weight table was an image missing from the scrape.
- sources: 2117351855856779486

### Give strangers a reason to care in the first line
- kind: durable
- topic: launch
- claim: A stranger decides in under a second whether to stop; announcement language and product detail don't pass that filter, stakes and conflict do.
- how:
  - Avoid: "We're excited to announce", logo animations, niche category launches, 12 seconds of a founder talking before anything happens.
  - Use: a funding number ("$20M raise" signals it matters), a fight people already have opinions on (datacenters, OpenAI), a result so big it sounds fake.
  - Launch comments rarely ask about features; they congratulate on the raise or argue about what it means. Decide what people will argue about before writing copy.
  - Exercise: watch people scroll on a subway and note what makes them stop.
- evidence: anecdotal.
- sources: 2117351855856779486

### Plant the narrative before writing launch copy
- kind: trick
- topic: launch
- claim: Start from a conversation people already have and place the product in it; make the claim bigger than the product by attaching it to something people already feel.
- how: Answer six questions before writing:
  1. What does the market already love?
  2. What does the market already hate?
  3. Who is the enemy?
  4. What is the highest-status outcome?
  5. What exact words do customers use?
  6. What is the most polarizing thing you can say that's true?
  - Example: a hospital intake/notes software launch reframed from "first step toward medical superintelligence, $24M raised, 10M+ patients" (true, but any health-AI company could say it) to copy that gave patients told "it's probably nothing", families who lost someone to a late diagnosis, clinicians, and AI debaters each a reason to reply.
- evidence: author's agency claims 1.5M views on day one and trending for that launch (Concurrence, Oct 27).
- sources: 2117351855856779486

### Make the demo prove the product at its extreme
- kind: durable
- topic: video
- claim: The narrative earns the stop; the demo earns belief, so show the most extreme thing the product can do in a way viewers can't dismiss as fake.
- how: Answer two questions and film exactly those moments: (1) What is the most extreme thing your product can do? (2) How do you make people believe it happened? Example: a car launch filmed live in front of a crowd jumping a row of cars rather than one, so it couldn't be read as CGI.
- evidence: anecdotal (Tesla Roadster launch cited).
- sources: 2117351855856779486

### Ask connections to quote-tweet your launch, not retweet it
- kind: trick
- topic: launch
- claim: A quote tweet from someone with an audience is a new post distributed to their followers, so the highest-leverage favour you can ask is a quote on launch day.
- how:
  1. Export the followers of everyone on your team with an account.
  2. Add people no export shows: investors, advisors, customers, beta testers, portfolio founders.
  3. Rank by reach into your customer.
  4. Tier it: the top ~25 get a personal message from the founder.
  - Bad: "Hey, we're launching Tuesday, would love a retweet!"
  - Good: "Hey, here's what we've been working on. Would you quote this? Here's an example of a great one from an investor on a similar launch."
  - Same favour as asking for an intro, which yields one meeting; a quote reaches their whole audience.
- evidence: author's agency claims 200M views across 30+ X launches and 2,000+ booked demos; one launch (WithCoverage) booked 600 demos. Unverified.
- sources: 2117351855856779486

---

## Video

### Catch errors at the cheapest stage: text, then image, then video
- kind: durable
- topic: video
- claim: Editing a prompt is free, regenerating an image is cheap, regenerating video is billed per second, so every check belongs as early in the pipeline as possible.
- how: Rule set: no images until the story is approved; no final shots until the style is approved; a separate review agent must pass prompts and frames before any video generation; fix video in code before regenerating; save new versions as new files, never overwrite.
- evidence: anecdotal; author attributes a very low reroll rate to it.
- sources: 2118317430665613741

### Run AI video with Claude Code as director, Codex as illustrator, Seedance as animator
- kind: trick
- topic: video
- claim: Talk only to one coding agent and let it call the image and video models, so you approve direction and spend while it handles prompts, checks and post-production.
- how:
  | role | does |
  | --- | --- |
  | you | choose direction, approve style, approve spend; watch motion, listen to sound |
  | Claude Code (director) | story, storyboard, all prompts, checks every image and clip, post-production in code |
  | Codex (illustrator) | style sheets, sample frames, first/last frame of every shot |
  | Seedance (animator) | turns first/last frames into a few seconds of video |
  - Setup: if Claude and Codex are installed, tell Claude to call Codex for images; for Seedance, register on Volcengine (火山引擎), get an Ark API key, and have Claude write the call script. Tools needed: ffmpeg, Python. Codex alone can do the whole job; author finds Claude's taste better.
  - Director prompt (send before starting):
  ```
  你当这支短片的总导演，全程负责，我只和你沟通。
  开工前先做两件事：
  1. 问我：片长、画幅、总预算、要不要配乐和字幕。
  2. 检查 Codex、ffmpeg、Python 和 ARK_API_KEY 能不能用，缺什么告诉我。

  记住所有文件都放在一个新的项目文件夹里。

  分工：
  - 你：写故事和分镜，写所有提示词，调用其他模型，抽帧放大检查每张图和每段视频，用 ffmpeg 和 Python 写代码做后期。
  - Codex（画师）：画设定图、样帧和每个镜头的首尾帧。你不自己画。

  如果你就是 Codex，就用你自己的生图工具。

  - Seedance（动画师）：把首尾帧变成几秒钟的视频。

  - 我：选方向、确认画风、批准花钱、看动态、听声音。

  调用 Codex：
  codex exec --skip-git-repo-check -s read-only -i 参考图.png - < 提示词.txt
  提示词开头写：Use your image generation tool to create exactly ONE image. Do not run shell commands.
  画好的图在 ~/.codex/generated_images/<日志里的 session id>/。

  调用 Seedance：
  POST https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks
  key 在环境变量 ARK_API_KEY 里，不要打印出来。请求格式查火山方舟文档。
  模型选 doubao-seedance-2-5-260628（720p 约 ¥1.5/秒）或 doubao-seedance-2-0-mini-260615（720p 约 ¥0.5/秒），价格以账单为准。

  总原则：把错误挡在花钱之前。文字里能发现的错，不留到图上；图上能发现的错，不留到视频上。

  规矩：
  1. 我确认故事前，不画任何图。
  2. 我确认画风前，不画正式镜头。
  3. 提交视频生成前，另开一个 agent 审核提示词和图片的每个细节，它只挑错，不改文件。通过后报价，我同意才提交。
  4. 视频有问题，先想能不能用代码修，修不了才重拍，只拍这一镜。
  5. 新版本存新文件，不覆盖、不删除旧文件。
  6. 你看不到真正的动态，也听不到声音。没看过、没听过的东西，要明确告诉我。
  7. 不充值，不买额度。接口返回欠费就停，把已有的片段先粗剪给我看。
  ```
  English translation:
  ```
  You are the director of this short film, responsible end to end; I talk only to you.
  Before starting, do two things:
  1. Ask me: length, aspect ratio, total budget, whether to add music and subtitles.
  2. Check that Codex, ffmpeg, Python and ARK_API_KEY work; tell me what's missing.

  Keep all files in a new project folder.

  Roles:
  - You: write the story and storyboard, write all prompts, call the other models, extract and zoom into frames to check every image and clip, do post-production in code with ffmpeg and Python.
  - Codex (illustrator): draws style sheets, sample frames and the first/last frame of every shot. You don't draw yourself.

  If you are Codex, use your own image generation tool.

  - Seedance (animator): turns first/last frames into a few seconds of video.

  - Me: choose direction, approve style, approve spend, watch motion, listen to sound.

  Calling Codex:
  codex exec --skip-git-repo-check -s read-only -i reference.png - < prompt.txt
  Start the prompt with: Use your image generation tool to create exactly ONE image. Do not run shell commands.
  Images land in ~/.codex/generated_images/<session id from the log>/.

  Calling Seedance:
  POST https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks
  The key is in env var ARK_API_KEY; never print it. Check the Volcengine Ark docs for request format.
  Model: doubao-seedance-2-5-260628 (720p ~¥1.5/s) or doubao-seedance-2-0-mini-260615 (720p ~¥0.5/s); the bill is authoritative.

  Core principle: stop errors before money is spent. Errors findable in text don't reach images; errors findable in images don't reach video.

  Rules:
  1. No images before I approve the story.
  2. No final shots before I approve the style.
  3. Before submitting video generation, open a separate agent to review every detail of prompts and images; it only finds faults, never edits files. After it passes, quote the cost; submit only with my approval.
  4. If a clip has a problem, first try fixing it in code; reshoot only that shot if code can't fix it.
  5. Save new versions as new files; never overwrite or delete old ones.
  6. You can't see real motion or hear sound. Tell me explicitly about anything you haven't seen or heard.
  7. Don't top up or buy credits. If the API reports insufficient balance, stop and rough-cut the clips you have for me.
  ```
- evidence: anecdotal; prices are the author's figures at time of writing.
- sources: 2118317430665613741

### Write stories AI video models can actually shoot
- kind: trick
- topic: video
- claim: A short-film story should be logical, sayable in one sentence, front-loaded, have realistic staggered reactions, and avoid shots video models reliably get wrong.
- how:
  - Check every turn against reality: why does it happen, where does the object come from, can they reach it?
  - Write the one-sentence point first; if you can't, the story is flat.
  - Put the most striking image first, with the second it appears.
  - Every gag or turn in three beats: problem → how the protagonist solves it → how bystanders react. Reactions are staggered (no one-second group hand-raise); bodies recoil when surprised.
  - Avoid: people crossing each other, hands holding small objects, text, mirrors and reflections, asymmetric features, lighting changes within a shot, one person doing three actions, top-down shots hiding faces, many extras.
  - Prefer episodic structure (no continuity between shots); continuous narrative breaks most easily.
  - With a song: turns on the chorus, key actions on the downbeat.
  - Prompt:
  ```
  我想做的片子：[一句话，或者我的初步剧情]。片长：[秒]。
  配歌：[歌名、时长、BPM；不配歌就删掉]。
  参考片：[有就写，没有就删掉]。

  先帮我把这个想法完善成一个完整的故事。有不清楚的地方就问我，我们一起聊，等我确认了再往下写。
  故事结构首选片段式，因为每个镜头之间都不用接戏，最稳。连贯式最容易穿帮，除非我要求，否则不要用。

  故事确定以后，展开成逐镜头的故事，要满足下面这些要求：
  1. 符合现实逻辑。每个转折都按现实追问一遍：为什么会这样？东西从哪来？够得着吗？现实里真会这样吗？
  2. 能用一句话说清想表达什么。先把这句话写出来，说不出来就说明故事还要改。
  3. 开头就要抓人。最抓眼球的画面放在前面，写清楚第几秒出现什么。
  4. 旁人的反应要像真人。每个包袱或者转折都分 3 段写：问题 → 主角怎么解决 → 旁人什么反应。反应要有先后，不能几个人同一秒做同一个动作。细节也要真实，比如人吃惊时身体会往后缩。
  5. 要让 AI 拍得出来。避开这些弱点：人物交叉、手拿小东西、文字、镜子和倒影、左右不对称的特征、一个镜头里换光、一个人连做三个动作、俯拍看不到脸、配角太多。

  如果配歌，转折对副歌，关键动作对重拍。
  ```
  English translation:
  ```
  The film I want: [one sentence, or my rough plot]. Length: [seconds].
  Song: [title, length, BPM; delete if none].
  Reference film: [if any; otherwise delete].

  First help me develop this idea into a complete story. Ask me about anything unclear; we'll discuss, and wait for my approval before writing further.
  Prefer an episodic structure, because shots needn't match continuity, which is safest. Continuous structure breaks most easily; don't use it unless I ask.

  Once the story is set, expand it shot by shot, meeting these requirements:
  1. Real-world logic. Question every turn: why does this happen? Where does the object come from? Can they reach it? Would it really happen?
  2. Sayable in one sentence. Write that sentence first; if you can't, the story needs work.
  3. Hook at the start. Put the most striking image first and state at which second it appears.
  4. Bystander reactions feel human. Write every gag or turn in 3 beats: problem → how the protagonist solves it → how bystanders react. Reactions are staggered; several people never do the same action in the same second. Details are real, e.g. people lean back when surprised.
  5. Shootable by AI. Avoid these weaknesses: people crossing, hands holding small objects, text, mirrors and reflections, asymmetric features, lighting changes within one shot, one person doing three actions in a row, top-down shots hiding faces, too many extras.

  With a song, put turns on the chorus and key actions on the downbeat.
  ```
  - Fresh-agent story review prompt (give it only the shot-by-shot story):
  ```
  这是一支短片的逐镜头故事。你是第一次看，只负责挑错，不改文件。
  1. 只按镜头顺序读，先写出你看懂的故事。
  2. 按顺序追问每个转折：为什么会这样？东西从哪来？够得着吗？现实里真会这样吗？
  3. 能用一句话说清想表达什么吗？
  4. 开头抓人吗？最抓眼球的画面放在前面了吗？
  5. 旁人的反应像真人吗？有没有先后？
  6. 哪些镜头 AI 视频模型容易拍错？（人物交叉、手拿小东西、文字、镜子和倒影、左右不对称的特征、一个镜头里换光、一个人连做三个动作、俯拍看不到脸、配角太多）
  每条写：镜头、问题、建议改法。没把握的写“可能”。最后写“通过”或“不通过”。
  ```
  English translation:
  ```
  This is the shot-by-shot story of a short film. You're seeing it for the first time; only find faults, don't edit files.
  1. Read in shot order and first write the story as you understood it.
  2. Question every turn in order: why does it happen? Where does the object come from? Can they reach it? Would it really happen?
  3. Can the point be said in one sentence?
  4. Does the opening hook? Is the most striking image up front?
  5. Do bystander reactions feel human? Are they staggered?
  6. Which shots are AI video models likely to get wrong? (people crossing, hands holding small objects, text, mirrors and reflections, asymmetric features, lighting change within a shot, one person doing three actions, top-down shots hiding faces, too many extras)
  For each: shot, problem, suggested fix. Mark uncertain ones "maybe". End with "pass" or "fail".
  ```
- evidence: anecdotal.
- sources: 2118317430665613741

### Storyboard every shot with angle, motion and a colour script
- kind: trick
- topic: video
- claim: Shot design and colour decide quality more than plot; specify each shot's angle, what moves, and why the camera moves, and lock the palette before any image.
- how:
  - Find a reference film and have Claude study it frame by frame, measuring camera positions and how far subjects enter/exit frame.
  - Eye-level frontal shots at most twice per film; use high, low, from behind, over-shoulder, through-object angles.
  - Something always moves: subjects enter or leave frame; if a character sits, move something else (drifting paper, passer-by). Static camera shots need people walking far-to-near.
  - Alternate full, medium and close-up sizes.
  - Name what moves in each shot (camera, focus, light, foreground object, small gesture); if nothing, rethink the shot. Contrast motion with stillness.
  - Camera moves need a reason: follow a subject, slow push-in to a close-up, or start close and pull out.
  - Every frame should work as a still: put heads/eyes at ~38% or ~62% of frame width, not centre.
  - Design the palette yourself, list colours per scene, then view sketches in greyscale; if subject and background merge, increase contrast.
  - Prompt:
  ```
  把定稿的故事写成分镜表。每个镜头一行，写清楚：片中时间（配歌就按小节算）、生成秒数（片中时长向上取整，尽量多留 0.5 秒）、景别、机位、运镜、谁往哪走（写画面的左右）、靠什么表情推进、这个镜头是什么在动、怎么转到下一个镜头。

  如果有参考片，先逐帧看参考片，把机位、进出画比例这些都量出来，然后学习模仿。没有参考片就按下面的要求自己构思。

  要求：
  1. 每个镜头换角度。全片平视正面最多两次，其余用俯拍、仰拍、从背后、过肩、透过东西拍。
  2. 画面里要一直有东西在动。大多数镜头都要有人或者东西走进画面，或者走出画面。人不走动的镜头，就让别的东西动起来，比如飘过去的一张纸，或者身后走过的路人。固定机位更要让人在画面里走动，比如从远处走到近处。
  3. 不要连着好几个镜头都是一样大小的画面，全身、半身、脸部特写要换着来。
  4. 每个镜头都要写清楚是什么在动：摄影机、焦点、光线、镜头前面飘过的东西，或者人物的小动作，至少要有一样。也不要一直动，该动的地方动，该静的地方静。
  5. 镜头运动要有理由：跟着一个东西走，慢慢推近给特写，或者从近处慢慢拉远。
  6. 每一秒截图都要好看。人的头或者眼睛落在画面从左往右大约 38% 或者 62% 的位置，不要放在正中间。

  配色要单独设计，在画第一张图之前定好。我想要的配色：[我的喜好；没想好就给我几个方案选]。
  把每一场用什么颜色单独列成一张色表。

  最后用代码给每个镜头画一张 1920×1080 的色块草图，标出 38% 和 62% 的位置和主要的东西，拼成一张总表给我确认。再把草图转成黑白看一遍，如果人和背景区分不开，就说明明暗对比不明显，要重新调配色。
  ```
  English translation:
  ```
  Turn the final story into a shot list. One row per shot: time in film (by bar if there's a song), generation seconds (film duration rounded up, leave ~0.5 s extra), shot size, camera position, camera move, who goes where (screen left/right), which expression drives it, what moves in the shot, how it transitions to the next.

  If there's a reference film, first study it frame by frame, measure camera positions and entry/exit proportions, and imitate. Without one, design to the rules below.

  Rules:
  1. Change angle every shot. Eye-level frontal at most twice in the film; otherwise high, low, from behind, over-shoulder, through objects.
  2. Something is always moving. Most shots have a person or thing entering or leaving frame. If people don't move, move something else, e.g. a drifting sheet of paper or a passer-by behind. Static-camera shots especially need people moving, e.g. from far to near.
  3. Don't run several shots of the same size in a row; alternate full, medium and close-up.
  4. State what moves in each shot: camera, focus, light, something passing in front of the lens, or a small gesture; at least one. Don't move all the time either: move where it matters, stay still where it matters.
  5. Camera moves need a reason: follow something, slowly push in to a close-up, or slowly pull out from close.
  6. Every frame should look good as a still. Put heads or eyes at roughly 38% or 62% of frame width, not centre.

  Design the colour separately, before the first image. The palette I want: [my preference; if unsure give me options].
  List each scene's colours in a separate colour table.

  Finally, use code to draw a 1920×1080 colour-block sketch per shot, marking the 38% and 62% lines and the main objects, tiled into one sheet for my approval. Then view the sketches in black and white; if people and background aren't distinguishable, contrast is too low, so rework the palette.
  ```
- evidence: anecdotal.
- sources: 2118317430665613741

### Lock style and character sheets before any shot
- kind: trick
- topic: video
- claim: Fix the art style from a reference, then draw a sheet for each character and recurring prop, with the position of every fixed feature written down.
- how:
  - Give a reference image for style (e.g. soft warm hand-drawn, cut-paper, photoreal, US hand-drawn).
  - Character sheet: front, side, a few expressions.
  - Write positions of fixed details ("tattoo on left forearm"), or they drift between images.
- evidence: anecdotal.
- sources: 2118317430665613741

### Draw first and last frames for every shot to cut video rerolls
- kind: trick
- topic: video
- claim: Generating video between a drawn first and last frame, instead of from text alone, prevents most logic errors and vanishing details.
- how:
  - Describe each shot's first frame, last frame and what happens between, and have the review agent pass it before drawing (saves image quota).
  - Draw the busier frame first (usually the last), then edit it into the first frame, keeping camera and composition identical.
  - Same location and angle: edit the previous image rather than redrawing (Codex supports local edits).
  - Push-in shots: make the last frame a cropped, enlarged region of the first; identical framing yields no motion.
  - Check aspect ratio (Codex output isn't always 16:9); crop before submitting; first and last frame must match in size.
  - Small items like rain, hats, tattoos must appear in both frames or they disappear.
  - Codex re-renders the whole image even for a small edit, so paste the edited patch back onto the original.
  - Checklist prompt:
  ```
  首尾帧画完了，帮我按下面这些逐条检查，每张图都要放大看。有问题就告诉我是哪张图、哪里不对，我同意了再改。
  材料：[首帧]、[尾帧]、[设定图]、[这个镜头的分镜]

  1. 动作要用到的东西，首帧里必须有。比如后面要拿杯子，首帧里就要看得到杯子，否则杯子会凭空冒出来。
  2. 别人的反应要提前摆好。一段视频就是一个镜头，没法中途切过去拍别人，所以首帧里要安排好：一个人在前面做事，另一个人在后面，脸朝着镜头。
  3. 很多人一起出现时，不能摆同一个姿势，不然模型会让所有人同时动。
  4. 给动作留出空间。东西要落到、飘到的地方要提前空出来，人的头顶也要留点空。
  5. 风往哪边吹要统一，不能围巾往左飘，床单却往右飘。
  6. 缩小到手机大小看一遍，远处的人太小、看不清就要改。
  7. 放大看有没有多余的东西，比如多一个水壶，或者多一条奇怪的细线。
  8. 把首帧和尾帧叠在一起看有没有错位。不该变的地方两张图必须一样。比如墙的颜色不一样，视频里墙就会慢慢变色；杯子大了一点，视频里杯子就会慢慢变大。

  要改图的时候注意两点：
  - Codex 就算只改一小块，也会把整张图重新处理一遍。所以只改一小块时，要把改好的那一块贴回原图。
  - Codex 的额度用完了就等它恢复，不要买额度，也不要一次同时画太多张。
  ```
  English translation:
  ```
  The first and last frames are done; check them item by item, zooming into every image. Tell me which image and what's wrong; edit only after I agree.
  Materials: [first frame], [last frame], [character sheet], [this shot's storyboard]

  1. Anything used in the action must be in the first frame. If someone picks up a cup later, the cup must be visible in the first frame, or it appears from nowhere.
  2. Stage others' reactions in advance. A clip is one shot and can't cut away to someone else, so the first frame must place one person doing something in front and another behind, facing the camera.
  3. When many people appear, they mustn't share a pose, or the model will move them all at once.
  4. Leave room for action. Clear the space where things will land or drift; leave headroom above people.
  5. Wind direction must be consistent: no scarf blowing left while a sheet blows right.
  6. View at phone size; if distant people are too small to read, fix it.
  7. Zoom in for extra objects, like an extra kettle or a stray thin line.
  8. Overlay first and last frames to check for misalignment. Anything that shouldn't change must be identical. If the wall colour differs, the wall will slowly change colour in the video; if the cup is slightly bigger, it will slowly grow.

  When editing images, note two things:
  - Even for a small edit, Codex reprocesses the whole image, so paste the edited patch back onto the original.
  - If Codex quota runs out, wait for it to reset; don't buy credits or draw too many at once.
  ```
- evidence: anecdotal.
- sources: 2118317430665613741

### Use a seven-part second-by-second video prompt and a failure table
- kind: trick
- topic: video
- claim: Most bad generations trace back to the prompt, so write every clip with the same seven sections, timing each second, and phrase fixes positively.
- how:
  - Template:
  ```
  【画风】[一句话写画风，比如：干净的现代 2D 手绘动画，平涂色块，线条利落，没有颗粒和纹理]。整段的画风、颜色、人物设计与首帧和尾帧完全一致。
  【镜头】整段 [X] 秒，[景别]，[机位]，[运镜；不动就写“不推不拉不摇，不切镜”]。
  【构图与配色】[人和东西在画面哪里，墙和光是什么颜色。要和首帧对得上]
  【人物】[每个人的长相、衣服、固定道具，写死]
  【逐秒】
  0–0.2 秒：画面完全静止，和首帧一模一样。
  [每一段：谁做什么，表情怎么变，手放在哪、不能碰什么，往画面哪边]
  最后 0.3 秒：所有人完全停住，画面与尾帧完全一致。
  【声音】只有 [看得见原因的声音]。人物不说话。
  【约束】画面里一直只有首帧这几个人和这些东西，脸和身形全程不变，一镜到底。画面干干净净，没有文字、字幕、水印。
  ```
  English translation:
  ```
  [Style] [one sentence, e.g. clean modern 2D hand-drawn animation, flat colour fills, crisp lines, no grain or texture]. Style, colour and character design throughout exactly match the first and last frames.
  [Camera] [X] seconds total, [shot size], [camera position], [move; if static write "no push, no pull, no pan, no cut"].
  [Composition and colour] [where people and objects are in frame, colour of walls and light; must match the first frame]
  [Characters] [each person's appearance, clothes, fixed props, locked]
  [Second by second]
  0–0.2 s: frame completely still, identical to the first frame.
  [each segment: who does what, how expression changes, where hands are and what they must not touch, toward which side of frame]
  Final 0.3 s: everyone completely still, frame identical to the last frame.
  [Sound] Only [sounds with a visible cause]. Characters don't speak.
  [Constraints] Only the people and objects in the first frame appear throughout; faces and bodies never change; one continuous shot. Clean frame, no text, subtitles or watermark.
  ```
  - Failure → fix table (author's tested phrasings):
    - Group moves in unison → name the order ("Dad first… a second or two later Grandma… the girl last") and don't pose them identically in the first frame.
    - A person does what wind should do (e.g. lifts a bag flap by hand) → state the cause, add "both hands never touch the bag".
    - Clouds, moon, plants grow faces → don't write "cartoon cloud"; write "fluffy grey-white cumulus, only cotton-like texture and shading"; describe only how it moves.
    - Walks the wrong way → give direction in screen terms ("walks toward frame left, past the left shopfront").
    - Ambiguous phrase (e.g. "the old man behind the window" put a person in a car) → be specific ("in the window of the stone house, top left"), add "driver's seat stays empty".
    - Object count changes → state counts ("only one yellow envelope; afterwards his arms are full of white envelopes").
    - Negatives ignored ("spout doesn't pour" still pours) → phrase positively ("only the people in the first frame appear").
    - Model infers prop use (kettle always pours) → keep that prop out of action shots.
    - Objects appear from nowhere → use only objects in the first frame.
    - Objects teleport → describe the motion ("slides back off the head, caught, put back on").
    - Rain, hats, tattoos vanish → draw them in both frames.
    - Lightning too realistic → "a flash of white light in the clouds", trim the start.
    - Too much action in one shot gets messy → one or two main actions per shot.
    - Timing differs from prompt → treat times as approximate, leave slack, retime in the edit.
    - Push-in weaker than written → push further in code afterwards.
    - Mouths move → "characters don't speak"; fix in code if it persists.
    - Seedance 2.5 adds music despite "no music" → discard clip audio, add sound in post.
    - Seedance 2.5 jumps to the last frame in the final frames → freeze on a clean frame.
    - Seedance 2.5 first frame oversharpened → drop that frame.
    - Seedance 2.0 mini drifts darker and cooler → colour-match each clip to its first frame.
- evidence: anecdotal.
- sources: 2118317430665613741

### Gate every paid generation on an independent pre-submit audit
- kind: trick
- topic: video
- claim: Before each clip is generated, a fresh read-only agent compares prompt and frames line by line and must pass it.
- how:
  ```
  你是审核，只读不改。这个镜头马上要提交视频生成，花的是真钱。
  材料：[提示词文件]、[首帧]、[尾帧]、[设定图]、[分镜表]、[配色规则]。
  逐项核对，放大看图：
  1. 提示词的每句话和两张图对得上吗？（位置、左右、颜色、人数、道具数量、衣服、表情）
  2. 两张图的机位、大小、背景一致吗？
  3. 和设定图、配色规则、前后镜头对得上吗？
  4. 动作现实吗？每个动作的原因写了吗？手放在哪？
  5. 模型可能在哪里出错？（同时动作、凭空出现、长脸、走反方向、歧义词）
  最后只写“通过”或“不通过”。不通过就逐条列出要改什么。
  ```
  English translation:
  ```
  You are the reviewer; read only, don't edit. This shot is about to be submitted for video generation, which costs real money.
  Materials: [prompt file], [first frame], [last frame], [character sheet], [shot list], [colour rules].
  Check item by item, zooming into the images:
  1. Does every sentence of the prompt match both images? (position, left/right, colour, headcount, prop count, clothes, expression)
  2. Do both images share camera position, size and background?
  3. Do they match the character sheet, colour rules, and neighbouring shots?
  4. Are the actions realistic? Is the cause of each action written? Where are the hands?
  5. Where might the model go wrong? (simultaneous action, things appearing from nowhere, faces growing on objects, walking the wrong way, ambiguous words)
  End with only "pass" or "fail". If fail, list what to change, item by item.
  ```
- evidence: anecdotal (see fresh-agent review unit).
- sources: 2118317430665613741

### Generate cheaply and repair before regenerating
- kind: trick
- topic: video
- claim: Generate at 720p on the cheaper model where possible, skip test clips, and exhaust trimming and code fixes before paying for a reshoot.
- how:
  - Generate at 720p, upscale to 1080p in post.
  - No test clips: shoot the first real shot; if usable, it's free progress.
  - For a new technique, try the one or two hardest shots first, then submit the rest.
  - Seedance 2.5 costs ~3x 2.0 mini; 2.0 mini is enough for most non-complex shots.
  - Listen before using audio: 2.0 mini's built-in effects are often usable; 2.5 may add music despite instructions.
  - Problem order: (1) trim if it's only at the start/end; (2) ask Claude to fix it in code; (3) reshoot only after changing the prompt or frames, and keep the old take, since the new one isn't always better.
- evidence: anecdotal.
- sources: 2118317430665613741

### Do post-production in code, then review the cut as a first-time viewer
- kind: trick
- topic: video
- claim: Have the coding agent stitch, transition, grade, upscale and beat-sync in code, then have a fresh agent review the final cut, and save lessons for next time.
- how:
  - Post-production prompt:
  ```
  用代码做后期：
  1. 转场：[哪一镜到哪一镜，用什么东西盖屏或带过去]。运动模糊切 8–16 份，半帧快门。
  2. 调色：按故事分段。只调彩度和亮度，不动色相，强调色受保护，肤色不变。不加颗粒、柔光、暗角。
  3. Seedance 的 mp4 按 BT.601 解码，中间文件用无损格式，交付标 BT.709。
  4. 放大：720p 用 lanczos 放大到 1080p，加轻微锐化。不用整段插帧。
  5. 按小节卡点：拍点只从原曲上测，不要在剪过的文件上测。
  做完抽查切点前后 3 帧。
  ```
  English translation:
  ```
  Do post-production in code:
  1. Transitions: [which shot to which, what object wipes the screen or carries across]. Motion blur with 8–16 sub-frames, half-frame shutter.
  2. Grading: by story section. Adjust only saturation and brightness, never hue; protect accent colours; keep skin tones unchanged. No grain, bloom or vignette.
  3. Decode Seedance mp4s as BT.601, use lossless intermediates, tag delivery as BT.709.
  4. Upscale: 720p to 1080p with lanczos plus light sharpening. No whole-clip frame interpolation.
  5. Cut to the bar: measure beats only on the original track, never on an edited file.
  Afterwards, spot-check 3 frames either side of each cut.
  ```
  - Final review prompt (fresh agent, final cut only, no conclusions given):
  ```
  这是成片：[文件]。你第一次看，我不告诉你任何结论。
  1. 全部解码，每镜取多张全分辨率帧，切点前后各取 3 帧。
  2. 先写你看懂的故事，再列看不懂的地方。
  3. 逐镜查：重复的动作、道具数量、穿帮、突跳、颜色跳变、脸变形、字的问题。
  4. 明确写出你查不了的东西（动态手感、声音）。
  每条写：时间、帧号、问题。分“硬伤”和“小问题”。
  ```
  English translation:
  ```
  This is the final cut: [file]. You're seeing it for the first time; I won't tell you any conclusions.
  1. Decode everything; take several full-resolution frames per shot and 3 frames either side of each cut.
  2. First write the story as you understood it, then list what you didn't understand.
  3. Check shot by shot: repeated actions, prop counts, continuity errors, jumps, colour jumps, face distortion, text problems.
  4. State explicitly what you can't check (feel of motion, sound).
  For each: time, frame number, problem. Split into "critical" and "minor".
  ```
  - Finish by having the AI write a summary of style, prompts and mistakes made, as reusable notes for the next film.
- evidence: anecdotal.
- sources: 2118317430665613741

### Make product videos feel premium through restraint and fixed rules
- kind: durable
- topic: video
- claim: A premium feel comes from every element looking deliberate and from leaving out anything that cheapens the brand, so set fixed rules and keep them across videos.
- how:
  - Strong brands give people a way to identify through their choice; Apple's videos aim to make existing customers feel special, not to raise awareness.
  - Every choice has a purpose: font, background, music, colour theme.
  - Common mistakes: too many effects, unnecessary sound effects, hype music.
  - Rules example: 3 colours per video type, the same backgrounds, similar music for similar projects.
- evidence: author's studio made 50+ product videos in one summer (anecdotal).
- sources: 2103529310208606701

### Design and storyboard frames before animating
- kind: trick
- topic: video
- claim: A product video's quality is set at the design stage, so storyboard every animation frame in a design tool first and follow a brand guideline.
- how:
  - Author's team storyboards each animation frame by frame in Figma before motion work.
  - Principles: one shot = one idea; every scene has room to breathe; key objects centred; background follows brand guidelines and never competes with key objects.
- evidence: anecdotal.
- sources: 2103529310208606701

### Ease motion, transition instead of cutting, vary the rhythm
- kind: trick
- topic: video
- claim: Three animation habits make motion graphics look more expensive.
- how:
  1. Smoothness: ease keyframe graphs and overlap them; linear motion reads as cheap.
  2. Dynamic transitions: flow one scene into the next; hard cuts only when the message needs them.
  3. Adaptive rhythm: speed up, slow down or hold depending on the section.
- evidence: anecdotal.
- sources: 2103529310208606701

### Pick music by BPM for the feeling you want, and cut stray sound effects
- kind: trick
- topic: video
- claim: Tempo sets a video's energy, and sound design should keep only effects that help understanding or attention.
- how:
  - 60-80 BPM: regal, cinematic, heritage.
  - 90-110 BPM: smooth, cool, effortless.
  - 115-123 BPM: elite, kinetic, sophisticated.
  - Faster: drive and hype; fits some projects, ruins others.
  - Then choose genre for the audience.
  - Sound pass: listen through, remove any effect that is too loud, out of place, or doesn't help engagement or understanding.
- evidence: author's opinion.
- sources: 2103529310208606701

---

## Local SEO

### Load business and competitor context into the AI once, then run task prompts
- kind: trick
- topic: seo
- claim: Generic AI SEO output comes from missing context; a one-time folder of business and competitor data turns task prompts into business-specific audits.
- how: Set up before any prompt (author uses Grok Bot; any agent with browsing works):
  - a file with business name, address, phone, website, Google Business Profile (GBP) URL, service areas, target keywords;
  - one file per competitor with their GBP URL;
  - your GBP details (categories, attributes, photos, services);
  - a prompt library, one file per SEO task.
- evidence: anecdotal.
- sources: 2088983373859725755

### Audit GBP categories against the map-pack leaders
- kind: trick
- topic: seo
- claim: GBP primary and secondary categories control which searches show you in the map pack, and adding a missing secondary category is often the fastest local win.
- how:
  ```
  Search '[service] in [city]' on Google, note which of my competitors show up in the Map Pack. Then open each competitor's GBP listing and extract their primary category and all secondary categories. Put everything in a spreadsheet. One tab per keyword. Columns: business name, primary category, secondary categories, star rating, review count, ranking position. Highlight any categories my competitors have that I'm missing from my GBP.
  ```
  - Look for patterns, e.g. every business ranking for "emergency plumber in [city]" also lists "water damage restoration".
- evidence: anecdotal: clients who added one secondary category showed up for new searches within a week.
- sources: 2088983373859725755

### Measure competitors' review velocity, not their star rating
- kind: trick
- topic: seo
- claim: Recent review rate matters more than total count or rating, and the services and neighbourhoods named in reviews act as local relevance signals.
- how:
  ```
  Go to these competitor GBP listings: [URL1], [URL2], [URL3]. For each competitor, read their last 50 reviews. Extract: total review count, average rating, how many reviews in the last 30/60/90 days, the most mentioned services in reviews, the most mentioned neighborhoods or cities, and any recurring complaints. Then compare their review velocity to mine at [my GBP URL]. Output a spreadsheet with all this data and a separate tab that says exactly how many reviews per month I need to catch the top competitor and how long it will take.
  ```
  - Example: 90 reviews gaining 15/month beats 200 reviews with 180 of them two years old.
  - Use the mentioned services/places to know what to encourage happy customers to talk about.
- evidence: author's 14 years in local SEO; ranking-weight claims unverified.
- risk: Google's review policy bans incentivised reviews and review gating; ask for honest reviews, don't script or reward them.
- sources: 2088983373859725755

### Respond to every review from a keyword-aware template set
- kind: trick
- topic: seo
- claim: Responding to reviews helps local ranking, and templates with variations cut each response to under a minute while naturally mentioning services and places.
- how:
  ```
  Go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, analyze the last 30 review responses from the business owner. Note: how many reviews have responses vs no response, average response time, whether responses mention specific services or locations, response length and tone, and how negative reviews are handled. Put this in a spreadsheet comparing my response strategy vs competitors. Then write me a review response template system: one template for 5-star reviews that naturally includes service + location keywords, one for 4-star reviews, one for 3-star reviews, and one for 1-2 star reviews that's professional and defuses negativity. Each template should have 3 variations so my responses don't look robotic.
  ```
  - At 10 reviews a month that's ~120 keyword-bearing responses a year on the listing.
- evidence: author states Google confirmed responses help ranking; not sourced in the article.
- sources: 2088983373859725755

### Post to GBP 2-3 times a week with neighbourhood-specific content
- kind: trick
- topic: seo
- claim: Most competitors don't post on their GBP, so a steady calendar of posts naming the neighbourhoods you serve signals activity and builds location relevance.
- how:
  ```
  Go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, check their GBP posts section. Note: how many posts in the last 90 days, what type of posts, whether posts include images and CTAs, what topics they cover, and how often they post. Put this in a spreadsheet. Then build me an 8-week GBP posting calendar. I want 2-3 posts per week covering: seasonal service promotions, before-and-after project showcases, neighborhood-specific content mentioning areas we serve ([area1], [area2], [area3]), review highlights, and team spotlights. Each post should naturally include at least one target keyword from this list: [keyword1], [keyword2], [keyword3]. Write the first 4 weeks of posts for me - full copy and image suggestions.
  ```
  - Example post angle: "just completed a kitchen remodel in [neighborhood]", across 8-10 neighbourhoods a month.
- evidence: anecdotal; author says posts expire after 7 days (may be outdated; not verified).
- sources: 2088983373859725755

### Fill the GBP services section and sync it with your website
- kind: trick
- topic: seo
- claim: The services section is text you fully control on GBP; list every service with a keyword-bearing description and add any service on your site that's missing from GBP.
- how:
  ```
  Go to my GBP listing at [URL] and these competitors: [URL1], [URL2], [URL3]. For each listing, check the services section. Extract: every service listed, whether it has a description, how detailed the descriptions are, and any service categories or groupings. Put this in a spreadsheet comparing my services section vs competitors. Then audit my current services section against my website [URL] and find any services on my site that aren't listed on my GBP. Finally, write optimized descriptions for all my services. Each description should be 2-3 sentences, naturally include target keywords, mention specific service areas where relevant, and include a benefit statement. Here are my core services: [service1], [service2], [service3] and service areas: [area1], [area2], [area3].
  ```
  - Example gap: a business offering "trenchless sewer repair" on its site but not on GBP is invisible for that map-pack search.
- evidence: anecdotal.
- sources: 2088983373859725755

### Sequence local SEO fixes over five weeks, then execute weekly
- kind: trick
- topic: seo
- claim: Run the audits in order of impact, one block per week, then switch to steady weekly execution.
- how:
  - Week 1: category audit and attributes audit (fastest ranking impact, changes within days).
  - Week 2: services section and business description.
  - Week 3: review teardown and response templates.
  - Week 4: GBP post calendar and photo audit.
  - Week 5+: post consistently, upload photos weekly, respond to every review.
  - (The attributes, description and photo audit prompts are named but not given.)
- evidence: author claims 90 days of this outranks long-established businesses, "dozens of times"; unverified.
- sources: 2088983373859725755

### Let AI do the research; the ranking edge is often offline
- kind: durable
- topic: seo
- claim: AI removes the excuses for skipping audits, but choosing revenue keywords and reading the market stays human, and a competitor's rank may come from real-world presence, not SEO.
- how: Example: a competitor outranks you because they've sponsored local youth sports for 10 years and earned links from every local news site.
- evidence: author's opinion.
- sources: 2088983373859725755

---

## Batch notes

- Theme: AI as drafter and researcher, human as editor and strategist. Koe (agency reviewers rewrite drafts), notkvtwts (the last 20%), Sarvesh ("Grok does the research, you make the decisions") and EianLu (human approves story, style, spend) agree. Cody Schneider is the outlier ("all marketing is now just code and tokens").
- Theme: load context before prompting. Brand interview docs (Koe), context-engineering brief (notkvtwts), GBP context folder (Sarvesh), Script Studio ingest (Epstein) and the director prompt (EianLu) are the same pattern; the merge step may want one unit for it.
- Tension: Koe argues against chasing virality in favour of a durable brand; Epstein treats a launch as a one-shot event where engineered virality decides survival. They fit if launches are single moments and brand is the ongoing baseline.
- Dubious, kept but flagged: Epstein's "1,000+ launches, 90% under 30k views, 750 shut down" implies flopped launches caused shutdowns, with no source; left out of the units. The weight table he references was an image missing from the scrape.
- Dubious headline claims not carried into units: Sarvesh's "$100k/month in 90 days" (body never supports a revenue number), Koe's "$75K/month" framing in the repost, Cody's "1,000 ads for a couple hundred dollars" (kept only as an unverified evidence note). Cody's "tesseract" for motion graphics is unclear (Tesseract is an OCR engine).
- Promotional weight: Koe (Eden), Cody Schneider (Graphed, both posts), Sarvesh (Alventra) and Epstein (Shown Media) all sell the thing they describe; tool-specific steps were generalised where possible.
