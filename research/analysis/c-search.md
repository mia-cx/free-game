# c-search

Source id notes:
- 2116164330014007296 (@borjafat backlinks list) quotes 2115050945746739607, which links the article "SEO MAXXING with Claude" (x.com/i/article/2114691798471712768). Both are analysed here under 2116164330014007296. The 69 backlink tactics are a subset of that article.
- 2119227612258054502 (@borjafat title testing post) quotes 2118851191538946188 (article "Rank #1 With Claude…"); analysed once under 2119227612258054502.
- 2119089991217262884 (exact-match domains) is quoted by 2119126406613610758 and 2119362694713078139; analysed once.
- 2119368837208686724 (@SimonHoiberg) quotes 2119364302385860979, which has no transferable content.
- 2119165493470974378 (@tarasshyn) quotes 2119079928901890194 (skills.sh how-to).

No new topic slugs.

---

## Clicks and titles

### Treat clicks as a ranking signal
- kind: durable
- topic: seo
- claim: Google uses click behaviour to rank pages, so a page that gets skipped despite ranking is leaving rankings on the table, and a page that disappoints after the click hurts itself.
- how:
  - Google's NavBoost (described by Google VP of Search Pandu Nayak in the 2023 US antitrust trial) uses about 13 months of click data to decide which pages deserve the top.
  - The 2024 Google internal docs leak references "good clicks", "bad clicks" and "last longest clicks".
  - Consequence: a title that overpromises earns clicks that bounce ("bad clicks"); never promise what the page does not deliver.
- evidence: Court testimony and the 2024 leak, as summarised by the author. Author also cites Search Engine Roundtable (AI Overviews on about 8 in 10 searches) and Ahrefs (the #1 result gets about 58% fewer clicks when an AI Overview shows). Numbers not independently checked here.
- sources: 2119227612258054502

### Test titles before anything else, because they report back in two weeks
- kind: durable
- topic: seo
- claim: A new title on a page that already ranks is picked up on the next crawl and shows a result in Search Console within about two weeks, so title tests give far more learning cycles per year than new articles, which take months.
- evidence: Author's experience running Distribb (claims 20M+ clicks across connected sites in 12 months); anecdotal.
- sources: 2119227612258054502

### Find the pages where the title is the problem
- kind: trick
- topic: seo
- claim: Pick pages ranking 3–10 with enough impressions and a CTR far below the norm for their position; then check the same page's individual queries, where the easiest wins hide.
- how:
  - Search Console → Performance → turn on all four metrics → Pages tab.
  - Filter: position 3–10, at least a couple hundred impressions.
  - Author's CTR benchmarks: position 3 ≈ 9%, position 4 ≈ 6%, position 5 ≈ 4%. A position-4 page under 1% CTR is a first target.
  - Flag as "CTR underperformer": any top-10 page getting 40%+ less CTR than its position benchmark.
  - Then open the page's queries: a page can be fine for its main keyword but skipped on queries where it sits at 5–6, usually because the title lacks the words people type.
- evidence: Benchmarks are from the author's own data ("in our experience"); unverified.
- sources: 2119227612258054502

### Look at the results page the way a searcher does
- kind: trick
- topic: seo
- claim: Before rewriting, check the title Google actually shows and what the results above you promise, and use the searcher's exact words.
- how:
  - Search the query in a private window. Google rewrites many titles (usually to your H1) when the title is too long, keyword-stuffed, repeated across pages, or off-topic. You can ask Claude to run the search several times until it catches a rewrite.
  - Keep the title and H1 saying the same thing.
  - Note which query words the competitors use that you don't.
- evidence: Author's 90 days of Distribb click data: titles containing the user's words (e.g. "QuickBooks alternatives") got 4.7% CTR; titles naming only the category ("best accounting software") got under 1%, on searches for the specific term. About 5× clicks. Single site, self-reported.
- sources: 2119227612258054502

### Write at least three titles with a fixed recipe
- kind: trick
- topic: seo
- claim: Write three or more candidate titles that lead with the query, make a specific promise, give a reason to click now, and fit under 60 characters.
- how:
  - Query words as close to the start as possible ("How to get more leads…").
  - Specific promise: "7 ways to get more leads".
  - Reason to click now: the current year. In Q4 only, use next year (e.g. 2027 in November 2026), since nobody else has yet. Don't do it earlier in the year.
  - Under 60 characters so Google doesn't truncate.
  - Nothing the page doesn't deliver (bad clicks hurt).
  - Optional prompt pairing from @asaio87 (gives 3 titles under 60 chars and 3 meta descriptions under 155 chars; see "Answer the main question in the first two paragraphs").
- sources: 2119227612258054502, 2119171723849245031

### Run a title test that you can't fool yourself with
- kind: trick
- topic: seo
- claim: Change one thing per page, record the before numbers, compare equal windows at similar positions, and judge on clicks rather than CTR.
- how:
  - Change one variable on one page. Write down date, clicks and CTR first.
  - Request a recrawl with the URL Inspection tool.
  - Compare the same number of days before and after at a similar average position; CTR moves with position, so a week at #6 vs a week at #3 makes any title look good.
  - Judge on clicks: a new title often wins new long-tail queries, so impressions rise and CTR falls while clicks rise.
  - Duration: 2 weeks on busy pages, a full month on quiet ones.
  - For many similar pages (one per location or category), test a title template: change the pattern on half, leave the other half, keep or revert.
- sources: 2119227612258054502

### Pre-test title angles with Google Ads
- kind: trick
- topic: seo
- claim: Run your top three title angles as search ads on the target keyword and keep the one with the best CTR before touching the page.
- how:
  - Three ads on the keyword the page targets, one angle per ad.
  - About $20/day; stop once each ad has about 1,000 impressions; pick the highest CTR.
  - Ad headlines are capped at 30 characters, so you are testing the angle, not the full title.
  - Precedent: Tim Ferriss reportedly chose the title of The 4-Hour Workweek with a similar ad test.
- evidence: Anecdotal; no numbers from the author's own runs.
- risk: Ad spend; small budgets may not reach 1,000 impressions on low-volume keywords.
- sources: 2119227612258054502

## Improving pages that already rank

### Refresh the pages Google already trusts using their own query data
- kind: trick
- topic: seo
- claim: Your fastest SEO gains come from adding missing answers to your top pages, using the queries they already get impressions for, rather than writing new articles.
- how:
  - GSC → Performance → Pages, sort by clicks then impressions, take the top 10.
  - Get data into Claude: a GSC MCP connector, or click a page → Queries tab → Export → upload the zip. Use the last 3 months, not 7 days.
  - Hunt for (a) queries with impressions the article never mentions, (b) queries at positions 10–30 (pages 2–3: Google thinks you're relevant but the page is incomplete).
  - Prompt, verbatim:
    ```
    My site is [URL]. Here's my GSC data for the last 3 months: [pull via connector or attached export]
    Find my top 10 pages by clicks and impressions

    For page #1, list queries with impressions that the article doesn't directly answer or mention
    List queries ranking in positions 10–30

    For each one, tell me exactly where it belongs: new H2, new paragraph, FAQ entry, or a tweak to an existing sentence
    Rewrite only the sections that need to change, don't rewrite the whole article

    Current article: [paste or URL]

    Stop after page #1 and wait for me before moving to the next.
    ```
  - Afterwards: GSC → URL Inspection → Request indexing for each updated page; wait 7–14 days; pull queries again; repeat. Expect results over 1–3 months.
  - Related moves from Borja's list: find pages losing clicks (compare against the same seasonal period to separate recurring dips from new ones), refresh old prices and screenshots, merge overlapping pages and redirect old URLs, rewrite weak titles.
- evidence: Anecdotal (agency owner's process).
- sources: 2119171723849245031, 2116164330014007296

### Answer the main question in the first two paragraphs
- kind: trick
- topic: seo
- claim: Put the answer up front and the main keyword in the title, meta description and first paragraph; many pages miss at least one.
- how:
  - No "in today's digital world" intros, no 300-word story before the point.
  - Prompt, verbatim:
    ```
    Here's my article: [paste]
    Main keyword: [keyword]

    Check if the main query is answered within the first 2 paragraphs. If not, rewrite the intro so it is

    Check that the main keyword appears in the title, meta description and first paragraph
    Give me 3 title options under 60 chars and 3 meta descriptions under 155 chars

    Keep my tone of voice, no fluff, no filler words
    ```
  - Borja's D-tier version: specific meta descriptions, title matching the H1, a useful share image and title.
- sources: 2119171723849245031, 2116164330014007296

### Add information only you can provide
- kind: durable
- topic: content
- claim: Pages win by adding what the top results lack (firsthand tests, your own data, screenshots, a new angle); AI can find the gaps but you must fill them yourself.
- how:
  - Research the gap: read the top 10 Google results, YouTube transcripts on the topic, forum and review complaints; compare buyer questions with existing answers.
  - Fill it: have Claude interview you for firsthand examples; analyse your own records; count review complaints; test the same task across competing products; save observations and calculations; put evidence beside each finding.
  - Add screenshots of you doing the thing, tables, simple diagrams, your results and opinions. Write those sentences yourself.
  - Prompt (@asaio87), verbatim:
    ```
    Here's my article: [paste]

    Tell me where a screenshot, image, table or diagram would help the reader more than text. For each one, tell me exactly what to show and why.

    Then tell me what the top 5 results for "[keyword]" all say the same way, and suggest 3 unique angles I could add from my own experience.
    ```
- sources: 2119171723849245031, 2116164330014007296

### Add internal links readers would actually click
- kind: trick
- topic: seo
- claim: Link related pages to each other and to product pages where a reader would want to go next, with descriptive anchor text, 3–5 per article.
- how:
  - Link articles to relevant product pages; link to orphan pages; link from established pages to pages near page one; put the link beside the question it answers; describe the destination in the anchor and vary it naturally; put key guides and product pages in the footer; measure internal-link clicks.
  - Prompt (@asaio87), verbatim:
    ```
    Here are my pages with their URLs and main keywords: [paste list]

    Suggest internal links between them. For each one give me the source page, target page, the exact sentence where it fits, and the anchor text. Only suggest links a reader would actually click. Max 3–5 per article.
    ```
- sources: 2119171723849245031, 2116164330014007296

### Point your few backlinks at pages already near page one
- kind: trick
- topic: backlinks
- claim: Pages already ranking (especially positions 10–30) are the best link targets; 2–5 links a month can move them to page one.
- how: Free sources count: directories, podcast guest spots, partner pages, answering journalist requests.
- evidence: Anecdotal.
- sources: 2119171723849245031

## Keywords, pages and site structure

### Pick keywords from buyers' own words and intent
- kind: trick
- topic: seo
- claim: Choose keywords from how buyers actually describe their problem and rank them by buying intent, not volume.
- how:
  - Sources: sales calls and support questions; buying queries filtered in Search Console; Google autocomplete for specific problems.
  - Rank by buying intent; check the live results to see which page format buyers expect; group searches that need the same answer onto one page; target a specific buyer plus use case to compete on a narrower search.
- sources: 2116164330014007296

### Build the pages buyers check before paying
- kind: durable
- topic: seo
- claim: The highest-value pages are the ones that answer purchase questions directly: price, comparison, alternatives, switching, trial terms.
- how:
  - One pricing page with prices and plan limits; published discount terms; trial terms beside signup.
  - Comparison pages using the same criteria for each product; "alternative to X" pages explaining switching reasons; migration guides from competitors.
  - Feature and integration demos to answer objections; a trial or demo button on each.
- sources: 2116164330014007296

### Build topical authority around a commercial page
- kind: durable
- topic: seo
- claim: Start each topic from a product page, then cover the surrounding buyer questions with one broad guide plus dedicated pages for detailed questions, all interlinked.
- how: Choose the product page first → list related buyer questions → one broad guide → separate pages for detailed questions → reuse existing answers instead of duplicates → link guide and detail pages both ways → expand into the same buyer's next problem.
- sources: 2116164330014007296

### Generate programmatic pages only where each one has distinct facts
- kind: trick
- topic: seo
- claim: Programmatic pages work when each page answers a distinct buyer need with specific facts, not when they swap a keyword into a template.
- how: Combine categories × real buyer needs; merge combinations that need the same answer; store verified facts in a spreadsheet and pull them into templates; review a small draft batch before scaling; link each page to the matching offer.
- risk: Thin, near-duplicate pages at scale can be treated as scaled content abuse by Google.
- sources: 2116164330014007296

### Publish on platforms that already rank (parasite SEO)
- kind: trick
- topic: seo
- claim: When third-party platforms rank for your query, publish a complete answer there and link to your site as the next step.
- how:
  - Check which platforms rank for the query; publish there with the topic in the headline and the answer in the opening; adapt format to the platform's readers; link to one relevant next step.
  - LinkedIn articles specifically: pick queries LinkedIn already ranks for, put the query early in the headline (the headline sets the article URL, so check it before publishing), lead with an answer and example, link to the article from your own site.
- sources: 2116164330014007296

### Make YouTube videos for searches that show videos
- kind: trick
- topic: video
- claim: Where Google shows videos for a buyer question, publish a demo of the product completing that exact task.
- how: Confirm videos appear in the results; target a specific product question; record the product doing the task; name the task in the title; add captions and chapters; answer buyer questions in the description; embed the video beside the written answer.
- sources: 2116164330014007296

### Repurpose one piece of research per platform's native format
- kind: trick
- topic: content
- claim: Reshape the same research into each platform's native form instead of reposting the same article everywhere.
- how:
  - Borja: articles → YouTube demos; original findings → Reddit answers; answer existing Quora questions; adapt for Medium or Substack; partner with complementary creators; carousels with one answer per slide plus descriptive captions and alt text; cut product demos into short clips that show the product or result immediately; end with a related guide; repeat formats that bring enquiries.
  - @2whazzuup's examples: research report → SlideShare; coding tutorial → DEV; DIY process → Instructables; design case study → Behance; real newsletter → Substack. Other publishing hosts: Hashnode, Medium, WordPress.com, Blogger, Tumblr, Bear Blog, Flipboard, Issuu, Calaméo, Yumpu, dribbble, Tealfeed, Vocal Media, HubPages, Google Sites.
- risk: Spinning the same low-quality article across dozens of sites to manufacture links is link spam.
- sources: 2116164330014007296, 2119247229601062993

### Ride rising searches with Google Trends
- kind: trick
- topic: seo
- claim: Cover rising buyer questions early, explaining news through your expertise.
- how: Filter Google Trends by category and country; check history to tell seasonal demand from a spike; read the original announcement; explain what changed and its effect; send the finding to relevant reporters.
- sources: 2116164330014007296

### Show who wrote it
- kind: durable
- topic: seo
- claim: Real author bylines linked to real experience, firsthand tests and a factual About page let readers and search engines judge whether to trust the advice.
- how: Real byline; link it to relevant experience; show firsthand tests; factual About page; consistent company facts everywhere.
- sources: 2116164330014007296, 2116062550416871512

### Paste the full technical SEO checklist into your coding agent
- kind: trick
- topic: seo
- claim: Almost all technical SEO for a vibe-coded site is a mechanical checklist an agent can apply; the last two items (human writing and earned links) you do yourself.
- how:
  - Prompt, verbatim:
    ```
    My vibe-coded site doesn't show up on Google. Fix it.
    - Switch to server-side rendering.
    - Create an XML sitemap.
    - Submit it in Search Console.
    - Let Googlebot in through robots.txt.
    - Strip out every noindex tag.
    - Collapse the redirect chains.
    - Fix every broken link.
    - Set canonical URLs.
    - Give every page a unique title and meta description.
    - Use one H1 per page.
    - Add FAQ and Article schema.
    - Add breadcrumb navigation.
    - Internally link every orphan page.
    - Write alt text for every image.
    - Compress images to WebP.
    - Get CLS under 0.1.
    - Load every page in under 2 seconds.
    - Rewrite anything that sounds like AI slop.
    - Add a real author with a real bio.
    - Earn backlinks from sites people trust.

    Page one by Monday. Make no mistakes.
    ```
  - Borja's equivalents: inspect URLs in Search Console to confirm indexability; fix unintended blocks/noindex; add pages to navigation and sitemaps; use crawlable links; fix canonicals; check the rendered page shows the answer; structured data must match visible facts (test with Google's Rich Results Test); compress images, remove unneeded scripts, fix broken mobile interactions; add llms.txt as an index for compatible agents.
- sources: 2116062550416871512, 2116164330014007296

### Prioritise technical fixes by buyer demand
- kind: durable
- topic: seo
- claim: Fix crawl, index and performance issues first on pages tied to real buying questions; site-wide warnings on unimportant pages can wait.
- evidence: Part of the Granola case study below (secondhand).
- sources: 2115568290307469548

### Get local listings right before anything else local
- kind: trick
- topic: seo
- claim: For local businesses, a complete, accurate Google Business Profile tied to the matching service page, plus fresh reviews and photos, drives local visibility.
- how:
  - Pick the specific category; keep name, address, phone identical everywhere; link the profile to the matching service page; complete contact and booking details; ask for honest reviews after every job and reply with relevant details; upload real job photos; publish current offers; track profile calls and bookings.
  - Citation sites (use where customers really look): Google Business Profile, Apple Business, Bing Places, Yelp, Better Business Bureau, Manta, Brownbook, EZlocal, Hotfrog, CitySquares, Cylex, Cybo, Foursquare, MerchantCircle, Superpages, DexKnows, Yellowbook, Alignable, Nextdoor Business, Chamber of Commerce.
- risk: Google Business Profile requires qualifying in-person customer contact; online-only businesses generally don't qualify, and fake locations violate its rules.
- sources: 2116164330014007296, 2119247229601062993

## AI search (GEO/AEO)

### Measure AI visibility per buyer question, not per keyword
- kind: durable
- topic: geo
- claim: Map the decisions buyers make before purchase, turn each into both Google keywords and AI prompts, and measure where you show up, with Google and AI tracked separately because they move independently.
- how:
  - A page can climb in Google and barely move in ChatGPT; AI mentions can rise while organic traffic stays flat.
  - Ask: which questions should we show up for? who gets recommended today? which pages are being cited? do we have a page that fully answers the question?
  - Judge success by qualified visitors and customers, not visibility alone.
- evidence: Granola and Ramp case studies below (secondhand).
- sources: 2115568290307469548, 2117333079106932897, 2116164330014007296

### Run AI visibility as a repeatable experiment loop
- kind: trick
- topic: geo
- claim: Save a fixed set of real buying prompts, check each AI separately, record brands and citations, make one change, and rerun the same prompts.
- how:
  - Save real buying questions so checks are repeatable.
  - Test each AI (ChatGPT, Google AI, etc.) separately; record brands recommended and cited sources in separate columns.
  - Find prompts naming competitors; read the sources cited repeatedly to see what evidence they rely on.
  - Make one specific change (improve your page, or pitch the cited page); rerun the same prompts; track visibility and activated users; double down on what moved.
- sources: 2116164330014007296, 2117333079106932897, 2115568290307469548

### Diagnose a lost prompt before creating anything
- kind: trick
- topic: geo
- claim: When you don't appear for a prompt, work out which of four causes applies, because each needs a different fix and most don't need a new article.
- how:
  - Missing page: no page answers the question → create one.
  - Weak page: a page exists but doesn't answer fully → improve it, don't publish a second page on the same question.
  - Crawl/index problem → fix technically.
  - Third-party problem: AI draws on Reddit threads, review sites, articles and directories that barely mention you → work those sources (see OWN/CLAIM/EARN/CONTEST).
- evidence: Granola case study as relayed by @wespreadjam, credited to Discovered Labs: monthly new active users from AI search +4,600% in 7 months, non-branded AI citation rate +558%, non-branded mention rate +739%, organic sessions +134%. Secondhand; the poster sells AEO audits.
- sources: 2115568290307469548

### Sort every source shaping an AI answer into own, claim, earn, contest
- kind: trick
- topic: geo
- claim: For each source AI cites on your buying questions, choose the action by who controls it.
- how:
  - OWN: pages you control → improve directly.
  - CLAIM: profiles and listings you can take over (review sites, directories) → claim and complete.
  - EARN: editorial mentions, reviews, community threads → deserve them.
  - CONTEST: outdated or wrong information → get it corrected.
  - The question is "which sources shape this specific recommendation, and why are competitors better represented there?", not "how do we get more backlinks?"
- sources: 2115568290307469548

### Join only the Reddit threads your tracked buyer questions point to
- kind: trick
- topic: geo
- claim: Use your tracked buyer questions to pick which Reddit conversations and communities are worth joining, and focus on communities close to the product and buyer instead of posting everywhere.
- how:
  - Participate before promoting; post things the community would value even without your link.
  - Community list from @2whazzuup: Indie Hackers, Hacker News, Reddit, Quora, GrowthHackers, BizSugar, Devpost, StackShare, Slant, BiggerPockets, SitePoint Community, freeCodeCamp Forum, Elpha, NoCodeFounders, NoCodeDevs, CoFoundersLab, Startup Grind, DevDojo, Lobsters, Hackaday.io.
- risk: Context-free links on Reddit or Hacker News get treated as spam.
- sources: 2115568290307469548, 2119247229601062993

### Create one page per buying decision and buyer segment
- kind: trick
- topic: geo
- claim: Where you barely appear in AI answers for a category, publish dedicated pages for each buyer segment's version of the decision, backed by supporting comparison and explainer pages.
- how:
  - Pick one category with a low baseline (Ramp: 3.2% AI visibility in accounts payable).
  - Study what AI already cites (Ramp: automation, AI and software-comparison content; only 6% of Ramp's citations came from automation content).
  - Segment pages: "accounts payable software for small businesses" and "…for large businesses".
  - Support pages: AP automation software comparisons; AI in accounts payable.
- evidence: Ramp case relayed by @wespreadjam, credited to Profound: the two pages earned 300+ citations in one month; visibility 3.2% → 22.2%; rank among fintech brands in AP 19th → 8th. Secondhand.
- sources: 2117333079106932897

### Make your product usable by agents
- kind: trick
- topic: geo
- claim: Publishing an agent skill for your API, and listing it on Vercel's skills.sh, gives you a high-authority page and puts your product where AI assistants look for tools.
- how:
  1. Write a SKILL.md that tells an agent how to use your API (Claude can write it).
  2. Put it in a public GitHub repo.
  3. Run `npx skills add your-org/your-repo` once. You get a dedicated skills.sh page (author cites DR 82) with the skill, its install command and an install counter.
- evidence: Author says Claude now sends them "multiple customers a day" via integrations, with screenshots not included in the scrape. Anecdotal.
- sources: 2119165493470974378

## Backlinks

### Judge a link by relevance and real audience, not Domain Rating
- kind: durable
- topic: backlinks
- claim: A link is worth pursuing when the site reaches your audience, you genuinely qualify, and real visitors could click it; a useful listing, a tool people reference or a real editorial mention outweighs a hundred placeholder pages.
- how: Score each prospect on relevance, eligibility, cost, placement (does the accepted listing actually show your URL?), and audience. Don't let a high DR override relevance.
- risk: Google's spam policies name low-quality directory links, automated link creation and manipulative link schemes as link spam. Use lists for discovery, not mass submission.
- sources: 2119247229601062993

### Run link building as five quality submissions a week
- kind: trick
- topic: backlinks
- claim: Pick 2–3 relevant categories, shortlist 20 prospects, prepare one reusable kit, submit five a week, and track whether a live link actually exists.
- how:
  - Categories by business type: SaaS → software directories, startup launches, developer resources; local tutoring → local listings, educational resources, community partnerships; affiliate site → resource publishing, communities, editorial outreach.
  - Submission/launch kit folder: URL, short and long description, logo, screenshots, founder bio and story, tagline, project examples. Keep several descriptions tailored per audience.
  - Weekly: Mon research and qualify 5; Tue prepare materials; Wed submit or pitch; Thu follow up; Fri check approvals and update tracker.
  - Tracker fields: website, category, target URL, submission date, status (researching/submitted/approved/rejected), published URL, link status (clickable/missing/restricted), link attributes (followed/nofollow/sponsored/UGC), referral traffic, notes.
  - Approval ≠ backlink: open the published page and check the link. After a month, keep what approved, sent visitors, reached the right audience or created relationships.
- sources: 2119247229601062993

### Use directory and launch lists for discovery
- kind: trick
- topic: launch
- claim: Submit only to directories where your buyers already look and where you qualify; a complete, specific profile beats a generic one everywhere.
- how:
  - Software discovery: Product Hunt, AlternativeTo, SaaSHub, SourceForge, G2, Capterra, GetApp, Software Advice, SoftwareSuggest, GoodFirms, Crozdesk, SaaSWorthy, Serchen, LibHunt (open source), OpenAlternative, AppSumo (marketplace), Uneed, Fazier, DevHunt, Peerlist.
  - Startup/indie launch: 10words, StartupBlink, Startup Ranking, F6S, Crunchbase, Startup Stash, PitchWall, Launching Next, BetaPage, Huzzler, IndieHunt, Tiny Startups, OpenHunts, ShinyLaunch, PeerPush, MicroLaunch, MakerHunt, Makerlist, Product Watch, What Launched Today. Check stage requirements (some take pre-launch waitlists) and whether free routes involve queues, badges or community participation.
  - AI/no-code: Futurepedia, Future Tools, There's An AI For That, AIxploria, AITopTools, AI Tools FYI, Dang AI, FindMyAITool, AI Tool Guru, AI Toolkit, AI Center, AI Finder, OpenTools, Insidr AI, ToolPilot (free route needs a reciprocal badge/link), BAI.tools, Phygital+ Library, Famous AI Tools, AI Agent Store, AI Tools Explorer. Describe what it does, for whom, and how it differs; avoid "the ultimate AI-powered productivity platform".
  - Industry-specific (only if you qualify): Tripadvisor, Hipcamp, The Dyrt, HappyCow, Houzz, Thumbtack, Justia, Avvo, Martindale-Hubbell, FindLaw, Healthgrades, WebMD Care, Vitals, MERLOT, OER Commons, Share My Lesson, GreatNonprofits, Candid/GuideStar, Charity Navigator, VolunteerMatch.
  - Creator profiles/storefronts (only ones you'd use anyway): Linktree, Beacons, Bio.site, Lnk.Bio, Campsite, Milkshake, Taplink, AllMyLinks, HeyLink, Bio.fm, Portaly, Carrd, Ko-fi, Buy Me a Coffee, Payhip, Gumroad, itch.io, Bandcamp, Flickr, 500px.
  - Developer/open source (needs a real, working project with docs): GitHub, GitLab, Codeberg, GitHub Pages, PyPI, npm, crates.io, RubyGems, Packagist, Docker Hub, F-Droid, Open VSX, VS Code Marketplace, Firefox Add-ons, WordPress.org plugins, Drupal Projects, Hugging Face, StackBlitz, CodePen, Replit.
  - Review profiles: complete G2 and Capterra, ask customers for real reviews, give reviewers access and current facts.
  - Government/supplier directories and business listings: claim eligible ones, keep details consistent.
  - More: searchable list at https://backlinkforme.com/backlinks (author's own).
- risk: Reciprocal-link listings and mass directory submission can count as link schemes; empty profiles created only to hold a URL add nothing.
- sources: 2119247229601062993, 2116164330014007296, 2119140218028900809

### Get into the roundups that Google and AI cite
- kind: trick
- topic: backlinks
- claim: For the buying queries you want, the cited sources are mostly listicles; get your product added to those lists, either by giving the author a concrete reason or by offering to pay.
- how:
  - Search the query on Google and ChatGPT; open the cited sources (both show them); also find competitor roundups in your category.
  - Collect the site owners' emails (Simon Hoiberg: have an agent find them).
  - Earned route (Borja): find a buyer need the list misses; send a tested feature or fresh example; send the exact text you propose so the edit is easy; later refresh your entry so details stay accurate.
  - Paid route (Hoiberg): skip flattery; say how you found the list, that you'd like your product included, and that you're happy to pay. Expect some rejections.
- evidence: Hoiberg (bootstrapped SaaS portfolio) and Borja both report it as their practice; anecdotal.
- risk: Google's policies treat paid links that pass ranking credit as link spam unless marked rel="sponsored"/nofollow; cold email must follow CAN-SPAM/GDPR rules.
- sources: 2116164330014007296, 2119368837208686724

### Publish original statistics writers can cite
- kind: trick
- topic: backlinks
- claim: Original research on a question your buyers have gives writers and journalists a source to link.
- how: Pick a buyer question; publish original stats; explain sample and method; write each finding as a complete, quotable sentence; keep research URLs stable as findings update; link the research to relevant product pages.
- sources: 2116164330014007296

### Answer journalist requests with a quotable answer and a number
- kind: trick
- topic: backlinks
- claim: Answer reporters' source requests with a direct answer, an original number or firsthand example, and a research page they can verify.
- how:
  - Platforms: Qwoted, Featured, SourceBottle, ResponseSource, Dot Star Media (some paid).
  - Show real experience in your profile; filter requests by topic and deadline; lead with the direct answer; add an original number or example; include your research page; log requests and replies so you never pitch one twice.
- evidence: No guarantee of publication or a link.
- sources: 2116164330014007296, 2119247229601062993

### Exchange editorial links within a relevant network
- kind: trick
- topic: backlinks
- claim: Swap contextual links with relevant businesses where each link genuinely helps the reader, and log what was delivered.
- how: Join a relevant business network; match each link to the surrounding topic; link to the specific answer the reader needs; log source and destination URLs.
- evidence: Author ranks it top tier but sells a link-exchange product (Distribb); unverified.
- risk: Google lists "excessive link exchanges" as a link scheme.
- sources: 2116164330014007296

### Mine competitors' backlinks for missing answers
- kind: trick
- topic: backlinks
- claim: Look at why publishers linked to competitor pages, then offer the evidence those publishers lack.
- how: Inspect competitors' linked pages; read the sentence around each link to see why it was added; create the missing evidence; pitch the specific missing answer.
- sources: 2116164330014007296

### Recover links you've already earned
- kind: trick
- topic: backlinks
- claim: Mentions and reused assets that don't link back, and dead pages that still have links, are the cheapest links to win.
- how: Find unlinked brand mentions and ask for a link; search for reused charts and quotes missing credit; restore removed pages that still have live backlinks; redirect old URLs to equivalent replacements.
- sources: 2116164330014007296

### Build a free calculator that earns links
- kind: trick
- topic: marketing-engineering
- claim: A free tool answering a calculation your buyers repeat gives publishers something to link to.
- how: Find a repeated buyer calculation; have Claude build the calculator; test normal and unusual inputs; give it a permanent URL; offer it to relevant guides as a shortcut for their readers. Also distribute it on developer platforms (npm, browser extension stores, WordPress plugins) if relevant.
- sources: 2116164330014007296, 2119247229601062993

### Replace broken competitor resources
- kind: trick
- topic: backlinks
- claim: Dead pages that still have backlinks, and guides that name closed tools, are openings for your replacement.
- how: Find dead competitor URLs with backlinks; read the archived page to see what readers expected; publish a matching replacement; send the editor the broken link plus your replacement; also find guides naming shut-down tools.
- sources: 2116164330014007296

### Offer the visual or video an article is missing
- kind: trick
- topic: backlinks
- claim: Offer authors a graphic or short demo video for a named section of their text-heavy guide, made only after they agree.
- how:
  - Graphic: find text-heavy guides; offer a graphic for a specific section; ask before making it; use the author's checked facts; send image plus embed code with credit.
  - Video: find guides missing a demo; pitch a short video for one section; record after agreement; send it with suggested source-credit wording.
- sources: 2116164330014007296

### Become a case study for tools you use
- kind: trick
- topic: backlinks
- claim: Vendors whose software you use often feature customer stories with a link.
- how: List your software; document your workflow and result; send the case study to the vendor's relevant editor.
- sources: 2116164330014007296

### Use press-release sites only for real news
- kind: trick
- topic: backlinks
- claim: Press-release distribution hosts announcements but is not news coverage; use it only for genuine launches, studies or milestones.
- how: Sites: PRLog, openPR, PR.com, IssueWire, 1888PressRelease, Express Press Release, Pressbox, PressReleaseBox, PressReleasePoint, Press Release Power, PRFree, Circle Acts, Press Release Submit, PR News Releaser, SubmitPR. Some limit free publication or clickable links.
- risk: Little SEO value; a hosted release is not independent coverage.
- sources: 2119247229601062993

## Exact-match domains (dubious)

### Buy exact-match "best X" domains in a niche where money is flowing
- kind: trick
- topic: seo
- claim: One poster claims exact-match domains for "best X" queries ranked #1 on Google and in LLMs within 10 days in a high-ticket niche (data labelling) and drew a seven-figure acquisition offer.
- how:
  - Spot a niche with heavy spending, urgent need, high ticket sizes, and buyers and sellers who struggle to find each other (the author's example: AI training-data buying/selling).
  - Register domains matching queries 1:1 ("best data labs", "best data labelling platform", "best enterprise fine tuning services", etc.).
  - Publish relevant content on them and link the entity to the keywords consistently; wait.
  - Underlying logic: when one lead is worth a lot, owning the "best X" answer is worth renting or selling.
- evidence: Unverified. No URLs, traffic or ranking data shown; a domain broker (@andrewrosener) amplified it, with an obvious interest in domain sales; a quote-tweeter called it gold with nothing added.
- risk: Google demoted low-quality EMDs in 2012; results may not last; method details ("lexical proximity", "entity mapping") are vague.
- sources: 2119089991217262884, 2119126406613610758, 2119362694713078139

## Running SEO with an agent

### Give Claude a repeatable SEO job with a playbook
- kind: trick
- topic: agents
- claim: Connect Claude to your search data and CMS, store context and corrections in a playbook, and have it run scheduled checks, verify edits, and log work.
- how:
  - Give Claude your website, product facts and Search Console data; pick one tactic list and ask it to work through it.
  - Connect Search Console (MCP connector) and your CMS so Claude can prepare page edits.
  - Save product facts, writing examples, instructions and finished examples; add every correction to the playbook.
  - Schedule page and citation checks; open each published URL to confirm the change; log finished jobs and failures to avoid duplicates.
  - Track: starting metrics and edits, sales by landing page, UTM-tagged distribution links, profile calls and bookings.
- evidence: Author sells a Claude SEO connector (Distribb); process anecdotal.
- sources: 2116164330014007296, 2119227612258054502, 2119171723849245031

## Batch notes

- Theme: "improve what already ranks" is the dominant move: title/CTR tests (Borja), query-gap refreshes (asaio87), and pointing links at page-2 pages. All three run on Search Console data piped into Claude.
- Theme: AI-search wins come from diagnosis plus third-party sources (listicles, Reddit, review sites), not volume of blog posts; Granola, Ramp, Borja and Hoiberg converge on "find what AI cites, then get into it".
- Contradiction: Hoiberg says just pay listicle owners; Borja and @2whazzuup push earned, relevant placements and warn about link schemes. Borja also ranks link exchanges as top tier while Google lists excessive exchanges as a scheme; Borja sells an exchange.
- Dubious: @margatix's exact-match-domain "#1 in 10 days, 7 figures" claim is included but flagged; no data, vague method, amplified by a domain broker. 2119126406613610758 and 2119362694713078139 add nothing beyond endorsement.
- Mostly skipped: @seonatia's "high DA sites" list (2119140218028900809) is DA-driven with spam-prone entries (Imgur, Gifyu, Gab, BookLikes, AuthorSTREAM, Site123, Strikingly) and an unclear "Viral Marketing Lab"; only overlaps with the directory unit were kept. 2119368837208686724's quoted post (2119364302385860979) has no content.
- Case-study caveat: the Granola and Ramp numbers come from an AEO tool vendor relaying other vendors' (Discovered Labs, Profound) case studies; treat as directional.
