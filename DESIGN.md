# Design

Free Game is read by people with ADHD who are learning marketing from zero. The design serves three needs: know where you are, start the next thing without deciding, and skim a lesson and still get it.

## Layout

- **Map (`/`)**: one dark card with the next unfinished lesson and a single button. Below it, every module as a numbered list with done marks and a count. No decisions needed to start; the whole course is visible when wanted.
- **Lesson (`/<module>/<lesson>`)**: module name, a row of lesson pips (current, done, not done) and "3 of 6" at the top. One 40rem column. On wide screens a sticky list of the lesson's sections sits to the right. The footer has the previous lesson and one primary button that marks the lesson done and opens the next. ← and → also move between lessons.
- **Tricks (`/tricks`)**: every cheap trick from every lesson as cards, filterable by module, with "Pick one for me" to jump to a random one. Each card links back to its lesson.

## Lesson anatomy

Every lesson has the same shape, enforced by `src/lib/server/course.spec.ts`:

1. Short version (TLDR) first.
2. 2 to 5 short sections.
3. Callouts by kind, each with its own colour and label: **Cheap trick** (highlighter yellow), **Watch out** (red), **Do it now** (green, always last).
4. Sources.

Code blocks (mostly prompts) get a Copy button.

## Type

Atkinson Hyperlegible Next (variable) for text and Atkinson Hyperlegible Mono for code. It was designed for legibility, with distinct letterforms that reduce misreads. Base size 18px, line height 1.65, 40rem measure. Headings are heavy (750 to 800) and tight so structure reads at a glance.

## Colour

Role tokens in `src/routes/layout.css`, exposed to Tailwind through `@theme`:

| Token | Role |
| --- | --- |
| `paper`, `surface`, `ink`, `muted`, `line` | Page, raised surface, text, secondary text, rules |
| `go`, `go-ink` | Primary action and done state |
| `trick-bg`, `trick-edge` | Cheap trick callouts |
| `risk-bg`, `risk-edge` | Watch out callouts |
| `do-bg`, `do-edge` | Do it now callouts |
| `focus` | Focus ring |

Light is warm paper; dark follows the system setting with the same roles. No theme switcher.

## Progress

Done lessons are stored in `localStorage` under `free-game:done`, per browser. When storage is blocked, progress lasts for the visit.
