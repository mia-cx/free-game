# Design

Free Game is read by people with ADHD who are learning marketing from zero. The design serves four needs: know where you are, start the next thing without deciding, skim a lesson and still get it, and remember it next week.

## Learning model

- **Advance organiser**: every module opens with its signature diagram and the list of lessons, so the reader sees the shape before the detail.
- **Short version first**: each lesson starts with its TLDR and keeps sections short.
- **Doing over reading**: diagrams are interactive (pick, toggle, step, adjust) and every lesson ends with one small "Do it now" task.
- **Retrieval practice**: three check cards per lesson. The reader answers in their head, then reveals.
- **Spaced review**: finishing a lesson adds its cards to the review deck. Recalled cards come back after 3, 7, 16, then 35 days; missed cards come back tomorrow (`src/lib/review.svelte.ts`).
- **Visible progress**: the route map, module rings, lesson pips, reading bar and done animation all show movement.

## Routes

- **Landing (`/`)**: for visitors who haven't started. A huge heading that says what the course is and for whom, the facts (lessons, minutes, tricks, no sign-up), one Start button, and the 13 module colours as a strip of links. Then a real lesson (`SHOWCASE` in `+page.server.ts`) taken apart into its pieces, each beside one sentence on why it's there; each piece rises in as it scrolls into view (CSS `view()` timeline), and the diagram and check card work. Then the route, the credits (every cited author, counted from lesson sources), and a closing Start. A reader with progress also gets a Continue link in space held for it.
- **Map (`/map`)**: one card with the next lesson, a Continue button, a review nudge when cards are due, and overall progress. Below it, the route: one station per module on a trail. Stations show a progress ring and one pip per lesson; the trail between finished modules is solid and colour-shifts from one module hue to the next, and draws itself as you scroll (CSS `view()` timeline). On wide screens stations alternate sides of a central trail. The route is `src/lib/Route.svelte`, shared with the landing page.
- **Module (`/<module>`)**: giant module number in the module colour, summary, Start or Continue, lessons as steps with summary and reading time, and the signature diagram beside them (sticky on wide screens).
- **Lesson (`/<module>/<lesson>`)**: reading progress bar along the top (CSS `scroll()` timeline), module pips, lesson body with diagrams placed in it, Check yourself cards, sources, and a footer whose button marks the lesson done (with a check-draw animation), adds its cards to the deck and opens the next lesson. A sticky outline on wide screens highlights the section being read. ← and → move between lessons.
- **Review (`/review`)**: one card at a time with a progress bar. Space reveals, 1 is "Not yet", 2 is "Got it". When nothing is due it says when cards come back and offers a practice round.
- **Tricks (`/tricks`)**: every cheap trick as a card in course order, filterable by module, with "Pick one for me".
- **Lab (`/lab`)**: every diagram under any module colour, for building and checking diagrams. Not linked from the nav.

## Search and sharing

`src/lib/Seo.svelte` writes each page's title, description, canonical URL, Open Graph tags and structured data. The landing, modules, lessons and tricks are indexable and listed in `/sitemap.xml`; the map, review and lab are personal or internal, so they're `noindex`. Title and H1 say the same thing. Module and lesson pages mark up their visible trail as a `BreadcrumbList`; the landing page carries `WebSite`. Course rich results were retired by Google in 2025, so there's no `Course` markup. The share image `static/og.png` is rendered from `research/tools/og.html`.

## Lesson anatomy

Enforced by `src/lib/server/course.spec.ts`: title, summary, TLDR first, a DO, exactly three CHECK cards, and only diagrams that exist. Callouts render by kind: **Cheap trick** (highlighter yellow), **Watch out** (red), **Do it now** (green).

## Diagrams

One Svelte component per file in `src/lib/diagrams/`, registered by file name. A lesson places one with `> [!DIAGRAM] name`; a module picks its signature one with `diagram:` in `_module.md`. Each is a `<figure class="diagram">` framed in the module accent, uses native controls, announces computed results politely, takes every fact from the lesson, and works from 320 to 720px wide. Shared pieces (`.diagram-chips`, `.diagram-chip`, `.diagram-output`) live in `layout.css`. Contract: `research/tools/diagrams-brief.md`.

## Type

Atkinson Hyperlegible Next (variable) for text and Atkinson Hyperlegible Mono for code, chosen for legibility. Base size 18px, line height 1.65, 40rem measure. Headings are heavy (750 to 800) and tight so structure reads at a glance. Module numbers are not zero-padded because the font's slashed zero reads as Ø at display size.

## Colour

Role tokens in `src/routes/layout.css`, exposed to Tailwind through `@theme inline`:

| Token | Role |
| --- | --- |
| `paper`, `surface`, `ink`, `muted`, `line` | Page, raised surface, text, secondary text, rules |
| `accent`, `accent-ink`, `accent-soft`, `accent-line` | The current module's colour: actions, progress, diagram frames |
| `go`, `go-ink` | Course-level action when no module applies |
| `trick-*`, `risk-*`, `do-*` | Callout kinds |
| `focus` | Focus ring |

Each module has a hue from a hand-picked walk round the colour wheel that skips olive yellows (`MODULE_HUES` in `src/lib/server/course.ts`). Any element with `data-hue style="--hue: N"` recomputes the accent roles in OKLCH from that hue, in light and dark. Light is warm paper. Every colour token is `light-dark(light, dark)`, so the page follows the system setting until the reader uses the sun/moon button in the header; that choice is saved (`free-game:theme`) and applied before first paint by a small script in `app.html`, which sets `data-theme` on `<html>` and with it `color-scheme`.

## Motion

Durations and easings are the transitions.dev motion tokens in `layout.css`. Scroll-linked effects (reading bar, trail drawing, diagram entrance) use CSS scroll and view timelines, with no JavaScript per frame. Under reduced motion every animation is off and the content is unchanged; the reading bar stays because it reports position rather than moving on its own.

## Storage

Done lessons (`free-game:done`), the review deck (`free-game:review`), the theme (`free-game:theme`) and playback speed (`free-game:speed`) live in `localStorage`, per browser. When storage is blocked, both last for the visit.
