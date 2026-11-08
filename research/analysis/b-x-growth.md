# Batch b-x-growth

Sources: 2117684231983800732 (Ryan, X algorithm article, quoted post 2117633599608631361), 2114746175026798821 (0xfJuan, engineering virality), 2119241264843358402 (AIGuide_ quoting Ryan's copywriting article 2118723940638138486), 2119431609472397409 (NicholasDulait, 5k followers list), 2119097657658597491 (tuanle, video chapters), 2119091729181880583 (romanbuildsaas quoting GuillaumeBardet 2118657239217041552, GTM research with Claude), 2119160045263077664 (dsqjaffa, 10 Grok bots on Virlo, quoted article 2118735216990695727).

No new topic slugs.

---

## X algorithm (Ryan, 2117684231983800732)

### Model the feed as find, score, filter
- kind: durable
- topic: x-growth
- claim: A ranked feed works in three stages: candidate sources fetch posts a viewer might like, a model predicts each viewer's actions and turns them into a weighted score, then filters drop ineligible posts; you only reach the For You feed by passing all three.
- how:
  - Find ("Scouts"): several retrieval systems pull roughly 2,000+ candidates per feed refresh.
  - Score ("Judge"): per post and per viewer, predict like, reply, share, read-through, follow, mute, etc., multiply by weights, sum.
  - Filter ("Bouncer"): remove stale, seen, blocked/muted, spam and low-reputation content.
  - The platform's goal is to keep users on the platform; every weight follows from that.
- evidence: Author's reading of X's open-source ranking code plus 1B+ lifetime impressions; author states they are not on the X team and some parts are closed.
- sources: 2117684231983800732

### Know where X finds candidate posts
- kind: durable
- topic: x-growth
- claim: X fills the For You feed from four sources, and reach beyond your followers comes from the two that are not follow-based.
- how:
  - Thunder: posts from accounts the viewer follows and regularly interacts with (their "bubble").
  - Phoenix: predicts posts a viewer wants from accounts they don't follow; this is where broad virality comes from.
  - SimClusters: groups accounts and posts into interest communities by who engages with what; a post can go viral inside one niche (e.g. tech startups/marketing) without going platform-wide.
  - Popular Posts: a smaller shared list of popular recent posts, initially seeded from the most-followed active accounts.
- evidence: Author's interpretation of the open-source code; anecdote of a niche-viral article on "Head of Content".
- sources: 2117684231983800732

### Use the published action weights to choose what to optimise
- kind: trick
- topic: x-growth
- claim: On X, a share by copied link is worth about 30 likes and a reply or quote about 7.5 likes, while a single mute or report erases dozens of positive actions, so design posts for shares and replies and avoid anything that gets you muted.
- how: Production defaults as quoted by the author, dated October 30, 2026:
  ```
  Positive actions
  Share via copy link     20.0
  Reply                   5.0
  Quote                   5.0
  Share via DM            5.0
  Follow author           4.0
  Share                   2.0
  Repost                  1.0
  Like                    0.66
  Click into post         0.3
  Open link               0.2
  Dwell                   0.05
  Photo expand            0.05
  Profile click           0.0
  Video quality view      0.0

  Negative actions
  Not dwelled (scrolled past)    -0.02
  Block author                   -31.2
  Not interested                 -52.3
  Mute author                    -58.8
  Report                         -234.0
  ```
  - Profile clicks count for 0; likes are among the weakest positives.
- evidence: Author's reading of the open-source code; unverified beyond that. Author notes the like weight moved from 0.5 (August) to 0.66 without announcement.
- risk: Weights change silently; re-check the source code before building strategy on exact numbers.
- sources: 2117684231983800732

### Treat ranking weights as moving targets
- kind: durable
- topic: x-growth
- claim: Ranking weights and personalisation inputs change without notice, so optimise for the stable goal (time on platform, sharing, conversation) rather than any single number.
- how:
  - The model mainly reads the viewer's last ~1,000 actions to predict what they want.
  - Personalisation also uses signals like installed apps, inferred gender and IP location.
- evidence: Like weight changed 0.5 → 0.66 between August and October 2026 with no announcement (author's observation).
- sources: 2117684231983800732

### Post inside the 48-hour window and don't flood
- kind: trick
- topic: x-growth
- claim: X filters out posts older than about 48 hours and doesn't give every post a chance when an account posts too often, so each post has a short life and volume has diminishing returns.
- how:
  - Expect a post to make or miss its reach within 48 hours.
  - Other filtered content: posts the viewer has seen, reposts and replies from accounts the viewer doesn't follow, blocked/muted accounts and keywords, spam/flagged/bot accounts.
  - Out-of-network posts get their score multiplied by a discount factor below 1.
- evidence: Author's reading of the code; no numbers given for the posting-volume threshold or the out-of-network factor.
- sources: 2117684231983800732

### Expect a cold-start boost as a small account
- kind: trick
- topic: x-growth
- claim: X gives fresh posts from small accounts a built-in boost, so a new account can go viral early; big accounts get no guaranteed reach.
- evidence: Author's first viral post came three days after starting a new account; grew to 8,000+ followers and 4M+ impressions in 4 weeks solo, later ~9,900 in a month (2119241264843358402). Anecdotal.
- sources: 2117684231983800732, 2119241264843358402

### Protect account reputation
- kind: durable
- topic: x-growth
- claim: Your account carries a reputation score that compounds or caps every post, built from who follows and engages with you and from how often you get blocked or reported.
- how:
  - Credibility is a PageRank-style score: engagement from well-connected accounts in your niche counts more than raw follower count.
  - Engage genuinely with people in your niche to build a dense, high-quality network.
  - Too many blocks/reports relative to likes can get the account labelled.
  - Check X's transparency tool for visibility-limiting labels on your account or posts (e.g. posts marked as spam).
  - Engagement groups no longer have the effect they had.
- evidence: Author's interpretation of the code; anecdotal.
- sources: 2117684231983800732

### Stay clear of the filters
- kind: trick
- topic: x-growth
- claim: A few habits keep an X account out of spam and low-quality filters.
- how:
  - Don't let AI write and post 100% of your copy (X tracks inauthentic behaviour over time).
  - Get Premium, and verify your ID if you're comfortable.
  - Avoid negative and political content.
  - Don't argue with trolls; block or mute them. If they mute or block you, your reach drops.
- evidence: Author's advice; unverified.
- sources: 2117684231983800732

### Keep one idea per post
- kind: durable
- topic: content
- claim: One idea per post makes it easier for readers to take away and for interest-based ranking to know whom to show it to; three ideas are three posts.
- how:
  - Every post needs a clear takeaway, a specific reader and a specific call to action.
  - Mixed topics confuse cluster-based distribution (SimClusters).
- evidence: Author's interpretation of the code and experience.
- sources: 2117684231983800732, 2119241264843358402

### Make posts people want to share and reply to
- kind: durable
- topic: x-growth
- claim: Because shares, replies and quotes dominate the score, the content that wins is original, specific and easy to scan, built on insight only you have.
- how:
  - Draw on your experience, network and job (your unfair advantages).
  - Formats should be easy to scan and pass along.
  - Never copy someone one-for-one; credit others and use X's native image/video features.
  - Test every format X is currently pushing: threads, articles, media.
  - Video creators: invest in camera, mic and lighting.
- evidence: Author's advice, tied to the weight table.
- sources: 2117684231983800732

### Digest long guides with an AI assistant
- kind: trick
- topic: x-growth
- claim: Paste or tag a long platform guide into an assistant (the author suggests tagging Grok on the post) and ask it what the algorithm rewards and how to apply it to your account.
- evidence: The author's own call to action; no results claimed.
- sources: 2117684231983800732

---

## Engineering quotes and launches (0xfJuan, 2114746175026798821)

### Give strangers something to add
- kind: durable
- topic: launch
- claim: A post spreads through quotes only when a stranger has something to add to it, so a launch needs concrete material people can examine, dispute or try themselves.
- how:
  - Replace "Excited to announce our new platform" with a specific demo: e.g. a messy inventory spreadsheet turning into a working app, showing the input, the output and what you fixed by hand.
  - Before publishing, ask: what could someone who doesn't know me add to this? If you can't answer, add something more specific.
- evidence: Author runs a launch agency (Ark Media); anecdotal.
- sources: 2114746175026798821

### Prepare several quote angles for one launch
- kind: trick
- topic: launch
- claim: Plan the different angles others can take when quoting your launch, because each angle reaches a different audience.
- how: Angles to seed:
  - Founder story: why they built it, a personal problem or unusual path.
  - Implications: which part of someone's work changes, who benefits, why a feature matters more than it looks.
  - Video reaction: someone tries it on camera, pauses on the interesting parts, says where they're sceptical.
  - Controversial take: one specific implication someone will defend, with enough evidence to be challenged.
  - Competing interests: who saves money vs. whose business is threatened; who gains independence vs. who has to maintain it.
- evidence: Author's practice; anecdotal.
- risk: Controversy shapes what people believe about the product; only invite disagreement your team can answer with evidence.
- sources: 2114746175026798821

### Match creators to angles and brief them properly
- kind: trick
- topic: launch
- claim: Pick creators who live with the problem and whose audience would plausibly try the product, give them real access, and let them write their own take.
- how:
  - Read their posts and replies first: who pays attention, what questions come up, would that audience try the product?
  - Brief template:
    - Here's what the product does.
    - Here's what you can test yourself.
    - This is the part I think your audience would care about.
    - Here's the evidence behind the claim.
    - What's your take after trying it?
  - Offer a call if they need help understanding it. Disclose paid partnerships. If everyone posts the same paragraph, you've lost the point.
- evidence: Author's practice; anecdotal.
- risk: Undisclosed paid posts break platform rules and advertising law in many countries.
- sources: 2114746175026798821

### Work the launch conversation as a team
- kind: trick
- topic: launch
- claim: After posts go live, split the replies and quotes across your team, answer where people asked, and turn the conversation into an asset.
- how:
  1. Assign who answers product questions and who follows up on business leads, across your posts, quotes and creators' comment sections.
  2. Answer in the thread. DM only with a clear reason and something relevant to what they said; check their profile first. A like alone tells you nothing.
  3. Keep a shared doc of recurring questions, objections, product issues and unexpected use cases, with links and the answers given. Repeated questions become the FAQ; confusing features get a walkthrough; feedback goes to someone who can act.
  4. When you ship a fix someone asked for, go back and tell them.
  5. Ask permission to feature people's tests and results, credit them, and use them as your next posts.
- evidence: Author's practice; anecdotal.
- sources: 2114746175026798821

### Measure a launch by conversations, then run a second wave
- kind: trick
- topic: launch
- claim: Judge launch posts by the trials, relevant DMs and sales calls they produced, not views, and use that to plan a follow-up wave.
- how:
  - Ask prospects where they found you when the source is unclear; track only what you can verify.
  - Rebook creators who brought useful conversations within 1–2 weeks with something new: a deeper walkthrough, a customer use case, an update answering first-round questions.
  - Give the use case buyers keep raising more space in the next demo and on the landing page.
  - Pre-launch checklist: a clear claim with evidence; different angles for different sharers; creators who understand the product and audience; a team ready to answer and follow up; an easy way to try the product or get in touch.
- evidence: Author's practice; anecdotal.
- sources: 2114746175026798821

---

## Copywriting for X (Ryan via AIGuide_, 2119241264843358402)

### Write every post to get one action
- kind: durable
- topic: content
- claim: Copywriting is getting the right person to take the right action (read, reply, share, follow, buy), so decide the action before writing.
- sources: 2119241264843358402

### Picture one reader before you write
- kind: durable
- topic: foundations
- claim: Write for a specific reader, and get more detailed about them the closer the post is to a sale.
- how: Ask before posting:
  - What are they struggling with right now?
  - Where do they consume content? Are they even on X?
  - What value do they want?
  - What are they feeling right now?
- sources: 2119241264843358402

### Choose clarity over cleverness
- kind: durable
- topic: content
- claim: Good writing removes friction; every post needs a concrete takeaway and vocabulary a 12-year-old can read, even when the idea is advanced.
- how: Ask "What does someone walk away with?" Keep concepts intact, simplify words and formatting.
- sources: 2119241264843358402

### Write the first line to earn the second
- kind: durable
- topic: content
- claim: A hook's only job is to get the next line read, by opening a gap the reader wants closed and making it about them.
- how:
  - Lead with the most interesting thing; cut the warm-up. If your best line is at the bottom, move it to the top.
  - Be specific: "I hit 5.8M impressions in my first month" beats "I grew fast". Numbers, names and timeframes beat vague promises.
  - Answer "what's in it for me?"; keep it short; create tension (question, surprise, contradiction).
  - Every hook pulls at least one lever: self-interest, curiosity, novelty, emotion (surprise, fear, FOMO, excitement), identity ("people like me"). Stack two or three.
  - Example: "If you're a founder under 1K followers (identity), this one change doubled my reach (self-interest + curiosity)."
- sources: 2119241264843358402

### Pick from eight hook types
- kind: trick
- topic: content
- claim: Most working hooks are one or a combination of eight types.
- how:
  1. Bold claim: "Copywriting is the most underrated skill on 𝕏."
  2. Callout: "If you're a founder with under 1K followers, read this."
  3. Curiosity gap: "I just realized something 99% of founders miss."
  4. Clear outcome: "How to write posts like the top 1%."
  5. Contrarian: "F*ck posting volume. You NEED to post less."
  6. Story: "It took me 8 years to realize this..."
  7. Number / list: "7 copywriting rules I wish I knew 6 years ago."
  8. Proof: "This post got 2M views. I analyzed why (takeaways)."
- evidence: Author: 1B+ lifetime impressions on X; +9,000 followers and ~6M impressions in first month of a new account. Anecdotal.
- sources: 2119241264843358402

### Fit the hook to the format
- kind: trick
- topic: content
- claim: Where the hook lives depends on the format.
- how:
  ```
  Short posts   → The hook IS the post. Make line one strong enough to stand alone.
  Threads       → Hook + promise of what's coming ("Here are 7 lessons:")
  Articles      → Title + subtitle + first paragraph all need to hook. Treat each as its own hook.
  Video         → The first 1 to 2 seconds. Visual movement + text on screen + spoken hook.
  Quote posts   → Your take needs to add tension or value to the original, not just "this."
  Images        → The headline on the image is the hook. One idea, readable at phone size.
  ```
- sources: 2119241264843358402

### Write the hook last, in 5–10 versions
- kind: trick
- topic: content
- claim: Draft the post first, then write many hooks and cut down.
- how:
  1. Write the post first, hook last.
  2. Write 5–10 versions using different hook types.
  3. Cut the weakest immediately.
  4. Refine each until every line rolls into the next.
  5. Cut words that repeat or add nothing.
- sources: 2119241264843358402

### Give every post a shape, a fast open and a firm close
- kind: trick
- topic: content
- claim: Posts without a structure read as rambles; pick a shape, open with proof, and end with a directed last line.
- how:
  - Six structures: Problem → Insight → Takeaway; list (hook + numbered points + closer); graphic; video; article; quote post.
  - Open: cut filler, get to the point, show proof and credibility as early as possible.
  - Close: takeaway in 1–2 lines, ask a question, or tease what's next. The last line is the second most important line; never trail off.
- sources: 2119241264843358402

### Format for skimmers on phones
- kind: trick
- topic: content
- claim: Most readers scan on mobile, so format for scanning.
- how:
  - Line breaks; no walls of text.
  - Paragraphs of 1–3 lines (4 lines looks like an essay on mobile).
  - One thought per line; a sentence with two "and"s and a comma is probably two sentences.
  - Mix short and long sentences.
  - Numbers, lists, bullets, arrows.
  - Connector lines that pull readers down: "Let me explain...", "But here's what nobody tells you:".
  - Preview on your phone before posting.
- sources: 2119241264843358402

### Make every word earn its place
- kind: trick
- topic: content
- claim: Tight, plain word choice reads faster and avoids sounding machine-written.
- how:
  - Cut filler: really, very, just, actually.
  - Simple words: utilise → use, facilitate → help, commence → start.
  - Strong verbs: "grew really quickly" → "exploded".
  - Active voice: "Mistakes were made" → "Most creators make this mistake".
  - More "you" than "I".
  - Avoid AI tells: em dashes, "it's not [X], it's [Y]".
  - If deleting a word doesn't change the meaning, delete it.
- sources: 2119241264843358402

### Build a voice nobody can copy
- kind: durable
- topic: content
- claim: Formats and hooks can be copied; voice can't, so it is the lasting differentiator.
- how: Write like you talk; have opinions; stay consistent in tone; share what happened to you; choose how you want to be perceived (smart, funny, blunt) and match it; keep your quirks; don't copy someone else's voice.
- sources: 2119241264843358402

### Ask for the action, matched to the funnel stage
- kind: trick
- topic: content
- claim: Readers do what you tell them to, so close with a low-effort call to action that fits how well they know you.
- how:
  ```
  Reply   → "Which one do you disagree with?"
  Share   → "Send this to a friend who's building a brand."
  Follow  → "Follow for daily posts on copywriting."
  Save    → "Bookmark this for your next post."
  Click   → "Full breakdown in the article below."
  Buy     → "DM me 'system' and I'll send you the details."
  ```
  ```
  TOF  → Ask for a follow or share (they don't know you yet)
  MOF  → Ask for a reply, save or click (they trust you a bit)
  BOF  → Ask for the sale, DM or sign-up (they're ready)
  ```
  - Put your CTA as a reply under your best-performing post.
  - Place CTAs early, where retention is highest, not only at the end.
  - Ask readers for something: advice, what they want next.
- sources: 2119241264843358402

### Turn a writing guide into an AI post editor
- kind: trick
- topic: content
- claim: Load a writing guide into a Claude Project and use it to rewrite and critique your drafts before posting.
- how:
  1. Paste the full guide into a Claude Project.
  2. Drop in your next 5 drafts.
  3. Have it rewrite each hook 10 different ways using the guide's rules.
  4. Make it point out the line where a reader would stop.
  5. Post the version you would stop scrolling for yourself.
- evidence: None beyond the guide author's growth; unverified.
- sources: 2119241264843358402

---

## Fast follower growth via articles (NicholasDulait, 2119431609472397409)

### Run a daily long-article engine on one topic
- kind: trick
- topic: x-growth
- claim: One account reached 5,000 X followers in 5 months by publishing one long article a day on one topic and amplifying each article with posts.
- how:
  - Pick one topic; build in public; share real revenue; lead with proof.
  - Publish one long article every day, written for bookmarks; write on fresh trends; give everything away.
  - Post 2–3 times a day; quote your own articles; get someone else to quote them.
  - Prefer long posts over one-liners; double down on what wins; don't stop publishing.
- evidence: Author's own result (5,000 followers in 5 months); anecdotal list with no breakdown.
- sources: 2119431609472397409

### Package cover, title and hook as one story
- kind: trick
- topic: x-growth
- claim: An article's cover image, title and first line should tell one consistent story, styled after covers that already win.
- how:
  - Copy winning cover styles.
  - Write titles to hook hard; put numbers in line one.
  - Add screenshots as proof.
  - Keep links out of the post body.
- evidence: Anecdotal.
- risk: "Keep links out" is a widely held belief; the author gives no data, and Ryan's weight table shows only a low positive weight for link opens, not a penalty.
- sources: 2119431609472397409

---

## Short-form video (tuanle, 2119097657658597491)

### Copy proven formats instead of chasing originality
- kind: durable
- topic: video
- claim: Algorithms push formats they already recognise as working, so the core skill is spotting which proven format to reuse and when, not inventing new ones.
- how:
  - Start from the title and thumbnail (the author cites MrBeast doing this).
  - Reuse a working format with your own subject (examples named: a "Hey chef, can you make me something with this?" format; the "how much do you pay for rent" office-tour format used for Stan; Buldak's proven formats).
  - Diagnose failures by which metric is missing: no views, no saves, or no shares point to different problems (the source names this split but the post doesn't spell out the fixes).
- evidence: Author claims 4B+ views; chapter titles cite a 4M-view iPhone video and 900M views for Buldak. Only the video's chapter list is in the source, so the reasoning is unverified.
- sources: 2119097657658597491

---

## GTM research with AI (GuillaumeBardet via romanbuildsaas, 2119091729181880583)

### Compress market research by feeding AI raw material and hard questions
- kind: trick
- topic: foundations
- claim: You can build a first go-to-market hypothesis in about 3 hours by loading an AI model with raw market material, asking questions that force synthesis, and then having it attack your best angle.
- how:
  1. Gather raw material:
     - 25–40 competitor websites, fully scraped (pricing pages, case studies, docs)
     - the last few earnings calls from the 3–5 biggest incumbents
     - 100+ customer reviews (G2, Capterra, Trustpilot, app stores)
     - every Reddit or forum thread where people vent about the category
  2. Ask questions that force thinking, not summary:
     ```
     What do the winners in this market know that their customers would never admit?
     ```
     ```
     List the beliefs this whole industry takes for granted. For each one, what would need to happen for it to be false?
     ```
     In ~20 minutes this shows where everyone agrees, where everyone is blind, and which customer pains nobody is building for.
  3. Pick your best angle and attack it, for several rounds:
     ```
     Steelman this thesis like a top-tier VC would. Then show me exactly where it fails.
     ```
- evidence: Claimed to be a method taught at Y Combinator and to replace ~4 weeks of research; unverified. Post ends in a product plug (Gojiberry).
- sources: 2119091729181880583

### Validate every AI-made hypothesis with buyers
- kind: durable
- topic: foundations
- claim: AI research gives you a hypothesis, not an answer; only conversations with real buyers confirm it.
- how: Treat the model as a tireless sparring partner that doesn't get defensive, then go talk to the people who would pay.
- sources: 2119091729181880583

---

## Scheduled AI bots for short-form research (dsqjaffa, 2119160045263077664)

### Rank content by performance relative to creator size
- kind: durable
- topic: video
- claim: The useful signal in someone else's content is the outlier: a video that did far better than that creator's usual views or follower count, because it shows the format, not the audience, did the work.
- how: Compare a video's views to the creator's typical views and follower count; shortlist creators under ~100,000 followers with several breakouts.
- sources: 2119160045263077664

### Read competitors' oldest running ads
- kind: durable
- topic: foundations
- claim: Ads a competitor has kept running the longest are the ones that pay for themselves, so sort their live ads oldest first.
- how: Pull each brand's live Meta ads with copy, start date and landing page, sorted oldest first (the prompt below does this via Virlo; Meta's public Ad Library shows the same data).
- sources: 2119160045263077664

### Run a team of scheduled research bots that share one folder
- kind: trick
- topic: agents
- claim: Set up several narrow AI agents on schedules, each writing to shared files, with one "head" agent that reads them all and sends a weekly shortlist; writing and posting stay with you.
- how:
  - Shared folder `social/` with files: `brief.md` (what you sell, buyer, off-limits claims, goal), `outliers.md`, `niche.md`, `competitors.md`, `trends.md`, `templates.md`, `comments.md`, `voice.md`, `creators.md`, `lessons.md`, `log.md`.
  - Data source: Virlo (a paid database of 21.6M+ viral TikTok/Instagram/YouTube Shorts videos) connected to Grok Bot over MCP. Connect prompt:
    ```
    Add a custom MCP server called virlo at https://dev.virlo.ai/api/mcp/mcp

    Ask me for my Virlo API key in a private input, and send it
    as the header Authorization: Bearer [key]

    Then read https://dev.virlo.ai/agent-playbook.txt and list
    your tools.
    ```
  - Per bot: create a new bot, paste its prompt with brackets filled, correct the first draft, then send:
    ```
    Save what we just did as a skill.
    Then set up the routine from your first message.
    ```
  - Rollout: Day 1 Head of Social + Outlier Finder; Day 2 Niche Map + Teardown; Day 3 Pipeline + Comment Miner; Day 4 Trend Radar + Competitor Watch; Day 5 Analyst; Creator Scout on demand. Add the next only once one works.
  - Design rules worth copying to any agent: read free data before paid searches; stay silent on days with nothing new; mark "why it worked" as opinion; cite sample sizes and call patterns under 6 videos "early".
- evidence: Author is co-founder of Virlo; no results reported. Links carry an affiliate/referral parameter.
- risk: Vendor lock-in and paid API usage; the prompts depend on Virlo-specific tools (marketing agents, Virality Score) and on Grok Bot features (skills, routines) that may change.
- sources: 2119160045263077664

### Head of Social bot: weekly plan from the other bots
- kind: trick
- topic: agents
- claim: A coordinator agent interviews you once, writes the shared brief, and every Monday sends the 5 best content ideas scored for fit, ease and novelty.
- how:
  ```
  JOB
  Run my social media team and turn what the other bots find
  into a plan for my week. Writing and posting stay with me.

  SET UP ONCE
  - Look through [website] and [TikTok, Instagram, YouTube and
    X handles].
  - Ask me questions, one per message, until you're clear on
    what I sell, who buys it, which claims are off limits, and
    the result I want from content: [calls, signups, sales].
  - Save the answers to social/brief.md for the other bots.
  - Draft a weekly Virlo marketing agent for my niche: a
    one-line goal, 7 to 12 search phrases, terms to leave out,
    all 3 platforms, AI video breakdown on. Hold it until I
    say yes.

  MONDAYS, 9 A.M.
  - Go through the agent's newest report, which costs nothing
    to read, and everything in social/.
  - Rate each idea out of 10 for fit, how easily I could shoot
    it this week, and whether it's new for us (see
    social/log.md).
  - Send me your best 5 in one message: the idea, its source
    video, how far it outperformed, the format, its first line
    and a suggested day.

  WEEKDAYS, 8 A.M.
  A 5-line update: new finds, decisions for me, blockers.

  DATA
  Every number comes from Virlo. When the newest report hasn't
  landed, tell me and wait for it.
  ```
- sources: 2119160045263077664

### Niche Map bot: who owns the niche and which formats are open
- kind: trick
- topic: agents
- claim: A monthly agent maps the 20 biggest creators in a topic and finds formats that fit you but few do well.
- how:
  ```
  JOB
  Show me who's winning in [topic] and which formats are up
  for grabs. Run now, then on the 1st of each month.

  STEPS
  - Read social/brief.md.
  - On Virlo, look up the 20 biggest creators for this topic
    across TikTok, Instagram and YouTube, with followers,
    typical views, biggest video and breakout count.
  - Label each one brand or person. Star anyone under
    [100,000] followers with several breakouts.
  - For the top 10, pull their outliers and note the hook
    types and formats they come back to.

  SEND ME
  - A table of all 20.
  - The 5 most common formats.
  - 3 formats that fit my business and that few of them are
    doing well.

  Save it as social/niche.md and mark your opinions as
  opinions.
  ```
- sources: 2119160045263077664

### Outlier Finder bot: 5 breakout videos every weekday
- kind: trick
- topic: agents
- claim: A daily agent surfaces 5 videos in your niche that outperformed their creator's size, with first line, hook type and whether you could shoot it.
- how:
  ```
  JOB
  Spot the videos in my niche that took off for their size.
  Weekdays, 7 a.m.

  STEPS
  - Read social/brief.md.
  - Open the outliers from my Virlo marketing agent. They're
    free to read, so check them before spending anything.
  - Run a single Virlo search for [topic]: TikTok and
    Instagram, past week, outliers only, Virality Score 18+,
    creators under [100,000] followers, [language]. One page.
  - Drop paid posts and anything already in
    social/outliers.md.

  SEND ME 5, HIGHEST SCORE FIRST
  - Link, creator, followers, views and score.
  - First line, hook type and format.
  - Your best guess at why it took off.
  - Whether my business could shoot it this week.

  Add them to social/outliers.md. On a day with nothing new,
  stay silent.
  ```
- sources: 2119160045263077664

### Competitor Watch bot: what rivals post and keep paying for
- kind: trick
- topic: agents
- claim: A weekly agent tracks up to 5 competitor handles and their live Meta ads, and turns each change into one test idea.
- how:
  ```
  JOB
  Keep an eye on [up to 5 handles] and the ads from [brands].
  Mondays, 8 a.m.

  SET UP ONCE
  Track those handles on Virlo and change the check from daily
  to weekly. Confirm when it's done.

  STEPS
  - Read social/brief.md.
  - Read this week's tracking signals, which are free.
  - For each handle, note outliers, any hook or format they've
    reused, and changes in posting pace.
  - Pull each brand's live Meta ads with the copy, start date
    and landing page, oldest first. Old ads are the ones
    they've kept paying for.

  SEND ME
  Each change with its link, plus one idea I could test from
  it. Save it as social/competitors.md.
  ```
- sources: 2119160045263077664

### Trend Radar bot: make or skip each trend
- kind: trick
- topic: agents
- claim: A weekly agent sorts trending formats, topics and sounds into make or skip, judged only on whether your buyer would care.
- how:
  ```
  JOB
  Sort this week's trends into make or skip for my business.
  Mondays, 7 a.m.

  PULL FROM VIRLO
  - Content trends: formats being copied now, with stage,
    creator count this week, and what to keep or change.
  - Topic trends: today's and emerging stories in [region].
  - Sounds: most used and breakouts from the past 7 days.

  STEPS
  - Read social/brief.md.
  - Keep formats, topics and sounds in separate lists.
  - Mark each one MAKE or SKIP. Size doesn't matter here, only
    whether my buyer would care.

  SEND ME
  For each MAKE: an example link, its stage, and what we'd
  actually shoot. Flag any sound that may not be cleared for
  brands. Save it as social/trends.md.
  ```
- risk: Trending sounds may not be licensed for commercial use; the prompt flags this but you still need to check.
- sources: 2119160045263077664

### Teardown bot: rebuild any viral video for your business
- kind: trick
- topic: video
- claim: Break a viral video into first line, beats, what viewers came for and what commenters ask, then generate your own hooks from the structure.
- how:
  ```
  JOB
  Break down any video link I send so I can reuse the
  structure with my own words.

  STEPS
  - Read social/brief.md.
  - On Virlo, get how it compares with the creator's recent
    videos, its transcript, top comments and current numbers.
    Instagram has no transcript, so use the caption and
    comments there.

  SEND ME
  - First line, word for word.
  - Each beat in order.
  - What viewers really came for.
  - What commenters keep asking.
  - What to keep and swap for my business.
  - 5 hooks for my version, each from a different angle.
  - Claims inside the video I should verify.

  Mark why-it-worked as opinion, since the data only shows
  that it did. Save the structure to social/templates.md.
  ```
  - The output list works by hand or with any model given a transcript and comments.
- sources: 2119160045263077664

### Comment Miner bot: collect the audience's exact words
- kind: trick
- topic: content
- claim: Pull top comments under the week's best videos, sort them into questions, complaints, requests and reusable phrases verbatim, and make one video per real comment.
- how:
  ```
  JOB
  Collect what my audience says under viral videos. Mondays,
  7:30 a.m.

  STEPS
  - Read social/brief.md.
  - Pick this week's 5 strongest videos from
    social/outliers.md.
  - Pull their top comments from Virlo.
  - Sort them under: questions, complaints, requests, and
    phrases I should reuse.

  SEND ME
  Each list with the original wording untouched and the video
  link, then 5 video ideas that each answer a specific
  comment. Save it as social/comments.md.
  ```
- sources: 2119160045263077664

### Pipeline bot: voice note in, 3 scripts out, in your own voice
- kind: trick
- topic: video
- claim: Record a few minutes of talking, and an agent that has studied your past captions turns it into 3 scripts on proven structures, learning from every edit you make.
- how:
  ```
  JOB
  Turn my spoken thoughts into scripts I can shoot on my
  phone.

  SET UP ONCE
  Study my 30 latest captions plus any transcripts I share.
  Save my go-to words, the words I avoid, and how my videos
  start and end to social/voice.md, along with AI-sounding
  habits to keep out.

  MONDAYS AND THURSDAYS, 9 A.M.
  Look for themes in social/outliers.md and send me 3 prompts
  per theme that I can talk through.

  WHEN A VOICE NOTE ARRIVES
  - Choose 3 structures from social/templates.md.
  - Build a script on each using my words and my claims alone.
  - For each: first line, on-screen text, beats, ending and
    caption.
  - Check them against social/voice.md first.

  Save anything I change to social/voice.md so the next batch
  starts better. Log the script I choose in social/log.md.
  ```
- sources: 2119160045263077664

### Creator Scout bot: find small creators whose commenters are your buyers
- kind: trick
- topic: outreach
- claim: Shortlist small creators who regularly beat their follower count, then check that their commenters match your buyer before reaching out.
- how:
  ```
  JOB
  Find creators worth working with for [product]. On request,
  or on the 1st of each month.

  STEPS
  - Read social/brief.md.
  - Search Virlo for creators covering [topic] on TikTok and
    Instagram with under [100,000] followers.
  - Shortlist the ones who regularly get more views than they
    have followers, with 2 or more breakouts.
  - For your top 5, check who comments on their videos and
    compare that with my buyer.

  SEND ME
  Handle, link, followers, typical views, best video,
  commenter match, and why they fit. Leave out accounts that
  are mostly paid posts. Reaching out is my job. Save the list
  as social/creators.md.
  ```
- sources: 2119160045263077664

### Analyst bot: weekly lessons from your own results
- kind: trick
- topic: video
- claim: Compare each week's videos to your 3-month baseline, find what the strongest share, and write lessons every other agent reads, with honest sample sizes.
- how:
  ```
  JOB
  Show me which of my videos worked and turn that into
  guidance for the team. Mondays, 6 a.m., ahead of the other
  bots.

  SET UP ONCE
  Track [my handles] on Virlo with weekly checks.

  STEPS
  - Read social/brief.md.
  - Line up this week's videos against my typical views over
    the past 3 months.
  - Find my 3 strongest and 3 weakest, then what the strong
    ones share: hook type, format, length, topic.
  - Note the sample size behind every pattern, and call out
    anything under 6 videos as early.
  - Add 3 to 5 lessons to social/lessons.md for the team to
    read.

  SEND ME
  A 6-line summary. Compare saves on TikTok only, since that's
  the one platform that has them.
  ```
- sources: 2119160045263077664

---

## Batch notes

- Theme: reach comes from shares, replies and quotes, not likes. Ryan's weight table, 0xfJuan's "give people a reason to quote" and Nicholas's "write for bookmarks / get someone quoting your stuff" all point the same way; they are a good spine for an X-growth module.
- Contradiction on volume: Ryan says over-posting means X won't distribute every post and his hook example argues for posting less; Nicholas posts 2–3 times a day plus a daily article. Neither gives a threshold.
- Contradiction on copying: Ryan says never copy one-for-one and stay original; tuanle and the Virlo bots say copy proven formats. Reconcilable as "copy the format, not the content", which the course should state explicitly.
- Contradiction on promises: Nicholas's list says "make broad promises", while Ryan says specific numbers and timeframes beat vague promises. I left "broad promises" out of the units as unsupported.
- Thin sources: tuanle (2119097657658597491) is only a video chapter list, so its content is reconstructed from chapter titles; the no-views/no-saves/no-shares diagnosis has no detail. Nicholas (2119431609472397409) is a bare list with no evidence.
- Treat with care: Ryan's weights are one person's reading of open-source code dated October 30, 2026 and will drift; the GTM method's "taught at Y Combinator" and "4 weeks into 3 hours" are unverified marketing claims attached to a Gojiberry plug; the 10-bot system is written by Virlo's co-founder and depends on Virlo's paid API, so the course should teach the agent architecture as tool-agnostic. Skipped as fluff: AIGuide_'s "fastest 0 to 10k" framing, dsqjaffa's "insane that this is free" wrapper, and all follow/like/hiring CTAs.
