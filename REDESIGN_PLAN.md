# Redesign Plan

Proposal. Nothing here is executed until approved.

Produced under [DESIGN_PROCESS.md](DESIGN_PROCESS.md), inside the constraints of
[PROJECT_PLAN.md](PROJECT_PLAN.md).

---

## Where the site actually is

Phase 1 shipped a competent scaffold and stopped. Honest assessment:

**Working.** Token layer with no hard-coded values anywhere. MDX pipeline with
build-failing frontmatter validation. `check:css` guard against the unstyled-HTML
failure that shipped once. `/pitch/[company]` is the most designed surface on the
site and the only one carrying real substance.

**Not working.**

- **No identity.** Centered `max-w-4xl` column, one accent green, uniform 5rem
  section gaps, `border-b` between everything. It is the tasteful default —
  which is exactly the mean the design process exists to escape. Nothing about
  it could only be this site.
- **Three placeholder pages.** `/journey`, `/resume`, `/now` render the literal
  string "Not written yet."
- **Four empty pillars.** `/notes/*` are empty folders. Every index renders its
  empty state. The home page advertises five collections containing one document
  in total.
- **Uniform density.** Every page is the same column at the same rhythm. A site
  about holding regulation and software in one head reads as a blog template.
- **The best content is unlisted.** The verified biography in `src/lib/pitch/*`
  is `noindex`, reachable only by guessing a company slug.

So "redesign" here means **establish an identity and build every surface against
it**, not repaint finished pages. The two cannot be separated — you cannot
design a site whose pages say "Not written yet."

---

## What is not in scope

Unchanged unless separately proposed: route architecture, the MDX content
pipeline and frontmatter schema, `src/lib/content.ts` as the sole reader of
`content/`, the pillar-registration pattern in `site.ts`, light-only, token
discipline, the `check:css` guard, and the no-fabrication rule.

**I will not write biography.** Everything on `/journey` and `/resume` renders
from data you supplied. Where a fact is missing it ships as a visible marked
placeholder and I ask.

---

## Phase 0 — Instrumentation

The critic loop is the engine of this plan and it is impossible without
screenshots. This is a prerequisite, not a nicety.

- Add `playwright` as a devDependency, install Chromium.
- `scripts/shoot.mjs` — boots the production build, captures every route at
  desktop (1440), tablet (834), and mobile (390) into `.design/shots/`, plus
  full-page and above-fold variants. `npm run shoot`.
- `.design/` added to `.gitignore` — sketches and shots are disposable.
**Decided: no reference moodboard.** The critic works from the "OK criteria"
framework in `DESIGN_PROCESS.md` — identify the aesthetic, imagine how a top
studio would execute it, judge the gap — rather than ranking against supplied
references. That is a real trade: reference ranking is the most objective variant
and we are giving it up. Compensating for it: the critic prompt is fixed and
reused verbatim so scores stay comparable run to run, and Phase 4 confirms the
score is actually converging on one surface before the loop is trusted anywhere
else.

**Exit:** `npm run shoot` produces a labelled contact sheet of the current site.

---

## Phase 1 — Discover (divergence)

**Scoped, by decision.** Two surfaces only — the home page and one article page.
Not the whole site, not every route. Those two carry the identity: one is the
first impression, the other is where the site is actually used. Whatever wins
propagates in Phase 3.

Every direction stays **inside the fixed envelope** in `DESIGN_PROCESS.md`. None
of them argues against the light paper, the serif/mono pairing, the single
accent, or the reading measure. Exploration operates on composition, grid,
density, rhythm, type scale, and how structure is drawn — the conventions nobody
actually decided.

Six directions, built as standalone HTML in `.design/explore/` — outside the Next
app, so they are fast, parallel, and disposable. They will already consume CSS
custom properties, so translating the winner is mechanical rather than a rewrite.

- **Four seeded.** Four runs of Technique 1 — real shell-generated random strings,
  direction derived from each. Genuinely divergent by construction.
- **Two directed.** Ambitious briefs from outside taste, bound to the envelope.
  Candidates: a *batch-record* aesthetic — ruled forms, revision marks, signature
  blocks, the visual grammar of documents that must survive audit; and a
  *laboratory-notebook* aesthetic — gridded paper, plotted figures, marginalia,
  dated entries. Both are native to what you actually do, and neither is a thing
  the model reaches for on its own.
- Each direction ships with a one-paragraph brief: what it feels like, what it
  optimizes for, what it sacrifices.
- Output is a contact sheet at `.design/explore/index.html` plus screenshots.

**Exit: you pick one, or a hybrid.** This is the highest-leverage decision in
the plan and it is yours, not mine.

---

## Phase 2 — Define the identity

Turn the chosen direction into a written specification, then into tokens.

- `DESIGN_BRIEF.md` — the actual identity: type scale and its ratio, the grid,
  how structure is drawn (rules, space, alignment, or something else), color
  including exact hues and temperature, spatial rhythm and where the page is
  deliberately quiet, motion policy, figure/plate treatment, and the full
  component inventory. This is the durable artifact; the sketches are not.
- Rewrite the token layer in `globals.css` to serve it — surfaces, ink, accent,
  a real type scale, a space scale, rule weights. Extend, do not litter.
- Extend `REQUIRED` in `scripts/check-css.mjs` to cover new load-bearing classes.

**Exit:** brief approved, tokens compile, `npm run build` green.

---

## Phase 3 — Rebuild every surface

Against the brief, in dependency order. Layout shell, header, footer, `PageShell`
/ `PageHeader`, `DocList`, `.prose`, then `/`, `/notes`, `/notes/[section]`, the
article page, `/writing`, `/journey`, `/resume`, `/now`, `/pitch`, `not-found`.

Two structural changes worth calling out now:

- **Promote the pitch data to first-class biography.** `src/lib/pitch/{profile,
  timeline,products}.ts` is verified, structured, and currently invisible.
  `/journey` renders the narrative from it and `/resume` renders the structured
  version from it, so page, PDF, and pitch can never drift. `stories.ts` and the
  per-company research stay unlisted and `noindex` — that split is deliberate
  and correct. Nothing gets invented; existing facts get surfaced.
- **Break the uniform density.** Different page types earn different treatments —
  an index is not an essay is not a resume. Currently they are identical.

**Exit:** no page renders "Not written yet." Every surface is real or an
honestly-marked stub.

---

## Phase 4 — Critic loops

Where the process earns its keep. Per Technique 3, for each key surface:
screenshot → fresh critic subagent, image only, no code, no history → aesthetic
identified, studio-level gaps named, score /10 → implement → repeat.

- **Critic: Opus. Implementer: Sonnet.** The split the technique calls for —
  taste where it is scarce, throughput where it is cheap.
- One fixed critic prompt, reused verbatim, so scores are comparable. It carries
  the four instructions and the anti-slop checklist from `DESIGN_PROCESS.md`.
- **The critic never learns the stopping bar.** 9/10 lives with the implementer.
- Two iterations first on one surface to confirm the score is *converging*
  before spending the loop across the whole site.
- **This requires spawning subagents.** Approving this plan is the authorization.

**Exit:** every key surface independently scored 9/10 or higher.

---

## Phase 5 — Texture

Technique 4, in this site's medium. Coding agents decorate with gradients and
CSS shapes because those are easy; that is a tell. But this aesthetic wants
*figures*, not photographs.

**My recommendation: generated SVG plates, not AI imagery.** Plotted diagrams,
process schematics, data figures, a distinctive 404, generative section marks —
drawn from real content, native to an engineering notebook, and they never date
the way generated imagery does. Photographic AI art on a compliance-engineering
site would read as decoration, which is the failure mode.

**Decided: SVG-only.** No image-generation API key, no generated imagery
anywhere — Open Graph cards included. Those get drawn as SVG from the same
figure system and rendered to PNG at build time, so the cards inherit the site's
identity instead of borrowing a generator's.

---

## Phase 6 — Deliver

- Responsive verification at all three widths, **by screenshot, not by assuming
  the markup implies the render.**
- Print stylesheet for `/resume` — the PDF should be the page, printed.
- Open Graph images per article and page.
- Accessibility: contrast ratios against final tokens, focus states, reduced
  motion, heading order, skip link.
- `npm run build` green including `check:css`; lint clean.
- Commit in reviewable chunks so Vercel previews stay useful.
- Update `PROJECT_PLAN.md` — the design direction section will be outdated by
  the brief, and phases 2–5 will need re-marking.

---

## Decisions taken

- **Critic model: Opus**, not Fable.
- **No reference moodboard.** Critic judges against its own imagined studio bar.
- **Phase 1 is scoped** to two surfaces, inside the fixed envelope.
- **SVG-only texture.** No image generation, no API key.

## Still open

1. **`/notes` content.** Four empty pillars is the site's biggest credibility
   problem and design cannot fix it. The pillars need 2–3 seed articles each
   (Phase 4 of `PROJECT_PLAN.md`). Out of scope here, but the redesign will
   expose it — the indexes will look better and still be empty.
2. **Missing facts** — a few will surface as the resume and journey get built
   (dates per role, the PDF, `/now` content). I will collect them and ask in one
   batch rather than interrupting per page.

---

## Sequencing

Phase 0 → 1 → **your decision** → 2 → 3 → 4 → 5 → 6.

The only hard gate is after Phase 1. Everything downstream inherits that choice,
so it is worth taking time over.
