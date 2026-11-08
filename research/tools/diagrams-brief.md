# Diagrams brief

You are a subagent. Don't run memo.

Working directory: /Users/mia/.t3/scratch/2026-11-08-earlier-posts-bloggersarvesh-https-x-83f0ee82 (SvelteKit 3, Svelte 5 runes, Tailwind 4). PATH needs `/opt/homebrew/bin`.

Free Game is a marketing course for builders with ADHD. Each module gets interactive diagrams that make one idea click faster than prose can. A diagram earns its place by letting the reader **do** something (pick, toggle, step, adjust) and see the consequence, not by decorating.

## Read first

- `src/lib/diagrams/x-score.svelte`: the reference diagram. Match its structure, tone and quality.
- `src/routes/layout.css`: the tokens and the shared `.diagram`, `.diagram-chips`, `.diagram-chip`, `.diagram-output` classes.
- The lesson(s) each diagram belongs to (listed below). Every label, number and claim comes from the lesson text. Never invent data.
- `~/.agents/skills/ui-a11y/SKILL.md` and `~/.agents/skills/ui-copy/SKILL.md`.

## Contract

- One file per diagram: `src/lib/diagrams/<name>.svelte`, no props, no imports outside `svelte`. It registers itself by file name. Write only your own files.
- Root element: `<figure class="diagram">` with a `<figcaption>` (one or two plain sentences: what it shows, and the source when numbers are someone's claim).
- Colour only from tokens: `--ink`, `--muted`, `--line`, `--paper`, `--surface`, `--accent`, `--accent-ink`, `--accent-soft`, `--accent-line`, `--go`, `--trick-bg`, `--trick-edge`, `--risk-bg`, `--risk-edge`, `--do-bg`, `--do-edge`. The accent follows the module, so never hard-code a hue. Both light and dark themes must work with these tokens alone.
- Width: works from 320px to 720px wide. Prefer HTML and CSS (grid, flex) for anything with text; use inline SVG for shapes, lines and arrows, with `viewBox` and `width: 100%`. Text never below 13px at 320px wide.
- Controls are native: `<button>` with `aria-pressed` or `aria-selected`, `<input type="range">` with a visible label, `<details>`. Everything works by keyboard. Computed results sit in an element with `aria-live="polite"`. Decorative SVG gets `aria-hidden="true"`; meaningful SVG gets `role="img"` and an `aria-label`.
- Motion: CSS only, from the motion tokens (`--duration-*`, `--ease-*`, `--distance-*`). Animate named properties, never `transition: all`. No per-frame JS, no libraries. Every animation is off under `@media (prefers-reduced-motion: reduce)` and the diagram still makes sense.
- Svelte 5 gotcha: `$state` proxies objects, so `selected === item` fails when `selected` holds an object. Store a key (label or index) in state and derive the object.
- Copy: sentence case, plain words, no em dashes, no exclamation marks, no headings inside the figure, no eyebrow labels. Buttons say what they show.
- Keep each diagram focused: one idea, one interaction. A reader should get it in 10 seconds.

## Check your work

1. `pnpm check` and `pnpm test` pass for your files. (Some lesson tests may fail while other agents edit lessons; only your files are your concern.)
2. Open `http://localhost:5391/lab` (dev server already running) and screenshot your diagrams at 720 and 360 wide, light and dark:
   `VIEWPORT_ONLY= node research/tools/shot.mjs 9271 /tmp/<you> 720 0 'http://localhost:5391/lab#<name>'` (args: CDP port, out dir, width, dark 0/1, url; add `--eval "<js>"` to click things first). Chromium is already running on CDP port 9271 in the background; never bring it to the front.
3. Look at every screenshot. Fix clipping, wrapping, cramped controls, low contrast, anything that reads as generic. Exercise each interaction state.

Reply with: files written, which lesson and section each diagram belongs after, and anything in the spec you changed and why.

## The diagrams

Each entry: file name, lessons it serves, what it shows, the interaction.

### `circles`: 01-foundations/01-attention-is-the-job

Seth Godin's circles of marketing as concentric rings: product at the centre, then usability and support, then story, price, community and tribe, then the outer ring of ads, spin, buzz, hype and clicks. Tap a ring (or its button) to highlight it and read what lives there and why effort goes from the centre outward. The outer ring is visibly the thinnest in value.

### `funnel`: 01-foundations/05-the-funnel and 11-keep-users/01-retention

Five stages: acquisition, onboarding, engagement, retention, monetisation. Select a stage to see what "done" looks like there and which module of this course covers it (link to `/<module-slug>`; read the module list in `src/content/*/_module.md`). Show retention as the stage that deserves the most time.

### `post-anatomy`: 02-writing/03-shape-and-format

One short example post (write it from the lesson's advice; it is an illustration) shown two ways with a toggle: "Wall of text" and "Formatted for skimmers". In the formatted view, label the parts: hook, one idea per line, proof, close, call to action. Labels sit beside the lines on wide screens and above them on narrow ones.

### `content-map`: 03-content/03-content-map

The content map tree: 3 to 4 pillars, each with 5 to 7 topics, each with 5 to 10 ideas, each with 4 to 5 angles. Let the reader expand one branch at a time (pillar → topic → idea → angles) with a running count of how many posts the full map holds at the chosen sizes. Use neutral placeholder labels ("Pillar 1", "Topic 1.2") or a single worked example taken from the lesson.

### `x-feed`: 04-x/01-how-the-feed-works

The pipeline as three stages: find (candidate sources: in-network accounts you follow, out-of-network interest matches, community clusters, popular posts), score (predicted actions × weights), filter (seen, too old, muted, blocked, spam). Step through with "Next stage" or pick a stage; show a stream of posts narrowing from roughly 2,000 candidates to a feed. Use the lesson's names for the sources.

### `launch-timeline`: 05-launch/03-launch-day

Three phases on one line: before (narrative, quote angles, the list of people who will quote), launch day (the quote wave, working replies as a team), after (the shared doc of questions, measuring by conversations, the second wave in 1 to 2 weeks). Select a phase to see its checklist; each item can be ticked (state is local to the diagram).

### `cold-email-doctor`: 06-outreach/01-cold-email

Pick a symptom (0 replies and 0 bounces; replies but no interest; bounces over 2%) and see the cause and the fix, as a small decision tree that lights the chosen path. Add the benchmark line: 1 lead per 300 contacts is great, 1 per 500 solid.

### `ctr-check`: 07-seo/05-title-tests

The author's CTR benchmarks by position (3 ≈ 9%, 4 ≈ 6%, 5 ≈ 4%) as bars. The reader picks a position (3, 4 or 5) and enters their page's CTR; the diagram says whether it is a "CTR underperformer" (40% or more below the benchmark) and shows their bar beside the benchmark. Make clear these are one author's numbers.

### `link-value`: 08-backlinks/01-what-links-are-worth

A 2×2: relevance to your audience (low/high) × real readers who could click (few/many). Place link types from the lessons in the quadrants (for example a relevant directory listing, an editorial mention, a tool people reference, mass directory submissions, a placeholder profile page). Tap one to read why it sits there; grey-zone types from _Tricks with a price tag_ carry a risk mark.

### `ai-loop`: 09-ai-search/02-the-loop

A cycle: save real buyer prompts → check each AI separately → diagnose (missing page, weak page, crawl problem, third-party sources) → act (own, claim, earn, contest) → rerun the same prompts. Step around the loop; at "diagnose" the reader picks a cause and sees the matching action.

### `cost-ladder`: 10-video/03-ai-video-plan

Three steps of cost: fixing in text is free, in an image is cheap, in video is billed per second. The reader picks where an error gets caught and sees how much rework it causes. Show the rules that keep errors early (no images before the story is approved, no final shots before the style is approved, a reviewer must pass before any paid generation).

### `holdout`: 11-keep-users/01-retention and 11-keep-users/02-paid-ads

A holdout test explained: customers split into a group that gets the flow (or the ads) and a holdout that gets nothing, default 90/10. Two range inputs: holdout size, and the difference in revenue per customer between groups. Show the revenue the flow actually adds versus what you would have credited it with without a holdout. No invented benchmarks: defaults are round illustrative numbers, labelled as an example.

### `bot-team`: 12-agents/06-run-a-team

The coordinator (chief of staff) above worker bots, each with one job (auditor, writer, call notes, check-ins, month-end, from the lessons). Ask-first gates (send, publish, delete, pay) drawn between bots and the outside world. Tap a bot for its job, schedule and gate. The coordinator does no work itself; make that visible.

### `qa-arc`: 12-agents/05-quality-control

Review stepping down: 100% review for a new bot, 50% after 9 of the last 10 runs pass clean, 10% spot checks after 18 of 20. The reader moves a "clean runs" control and watches the review level step down; a "fixed the same thing two weeks running" button steps it back up a stage.

### `surrender-scale`: 13-stay-sharp/01-keep-your-judgment

The spectrum: offloading (you delegate but own the result) → deferral (the output becomes your input) → cognitive surrender (the output becomes yours unchecked). A range input moves along it; each zone shows what it looks like in practice and the test: can you explain the answer, even with your agent's help?
