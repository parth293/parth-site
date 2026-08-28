# Project Plan — Personal Site

Standing spec for this project. Read before scaffolding, and re-read whenever
adding new sections — it defines architecture, stack, and design direction so
decisions stay consistent as the site grows.

Prose content is governed by [WRITING_GUIDE.md](WRITING_GUIDE.md). This file
governs structure and code.

## What this site is

Simultaneously:

- An identity/credibility hub — who I am, my background, my resume.
- A digital garden of three evolving knowledge projects, plus general writing.

It is meant to keep evolving indefinitely — new notes, new essays, updated
journey — not a one-time static portfolio.

## Positioning

Engineering degree (B.Tech, Pharmaceutical Engineering, IIT BHU) that sits
closer to chemical engineering than to pharmacy — heavy on math,
thermodynamics, numerical methods, applied to pharmaceutical systems. Six years
at Leucine (GMP compliance software for pharma manufacturers), growing from an
early implementation specialist into Director of Strategic Initiatives —
spanning product management, AI product development, enterprise sales
engineering, and delivery/change management at pharma majors globally.
Currently exploring: a research-oriented masters/PhD path in pharma/biotech, or
a startup/consulting path in the same specialization. Also want to read and
write more, publicly.

The site should make this combination — rigorous engineering + deep
regulated-industry domain expertise + product/GTM leadership — legible fast,
then let people go deep.

Context for tone and positioning; not for direct reproduction.

## Site architecture

| Route | Purpose |
| --- | --- |
| `/` | Hook, one-liner, 4 pillars, latest writing, resume CTA |
| `/journey` | Narrative version of academic + professional background |
| `/resume` | Web version + downloadable PDF |
| `/notes` | Index across all three pillars |
| `/notes/pharma-eng` | Pillar 1 — pharmaceutical sciences explainers |
| `/notes/gate-bt` | Pillar 2 — GATE-BT preparation strategy |
| `/notes/sales-eng` | Pillar 3 — technical sales engineering & philosophy |
| `/writing` | Essays, book notes — general evolving writing |
| `/now` | Current focus; updated periodically |

Each `/notes/*` section has its own index/philosophy page plus a growing list of
articles. All three are **siblings under one `/notes` collection type**, not
three separate apps — sections within this one repo, not separate domains.
Splitting one out later is easy if it ever needs it.

## Design direction

Aesthetic: **technical-editorial / digital garden** — not a SaaS marketing site.
No gradient hero sections, no bouncy animations, no stock-photo-startup feel.
Think a well-typeset engineering notebook.

- **Typography** — serif for body/reading content; monospace for metadata and
  labels (dates, tags, institution names, `IIT BHU · 2016–2020`).
- **Color** — mostly neutral (near-black text, warm off-white background), one
  restrained accent used sparingly (links, tags, small highlights). No
  multi-color palette.
- **Layout** — generous whitespace, ~65–75 character line length for reading
  content, no dense multi-column magazine layouts.
- **Aliveness** — notes and writing sections show a visible "last updated" date
  and a "recently added" list on index pages.

### Design tokens

All tokens live in [`src/app/globals.css`](src/app/globals.css). Colors, fonts,
and the reading measure are CSS custom properties surfaced to Tailwind via
`@theme inline`.

**No component hard-codes a color, font family, or measure.** If a value is
needed that does not exist, add a token — do not inline a hex code.

| Token group | Names |
| --- | --- |
| Surfaces | `paper`, `paper-raised`, `rule`, `rule-strong` |
| Ink | `ink`, `ink-muted`, `ink-faint` |
| Accent | `accent`, `accent-hover`, `accent-tint` |
| Utilities | `measure` (reading width), `label` (mono metadata) |

Long-form MDX renders inside `.prose`, defined once in `globals.css`. Article
styling changes go there, never into a page component.

## Tech stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **MDX** for all long-form content — each piece is a `.mdx` file with
  frontmatter. Publishing = writing a file + git commit.
- **Vercel** (free tier) — auto-deploy on push to `main`, preview deploys per PR
- **GitHub** as source of truth
- Later, optional: Vercel Analytics to see what content gets read

### Content pipeline

[`src/lib/content.ts`](src/lib/content.ts) is the only module that reads
`content/`. Everything else goes through it.

```
content/notes/<pillar>/<slug>.mdx   → /notes/<pillar>/<slug>
content/writing/<slug>.mdx          → /writing/<slug>
```

Frontmatter schema (missing required fields fail the build):

```ts
type Frontmatter = {
  title: string
  date: string      // ISO — "2026-08-28"
  summary: string
  tags?: string[]
  draft?: boolean   // in repo, out of production listings
  updated?: string  // rendered as "last updated" when newer than date
}
```

Adding a pillar means adding an entry to `pillars` in
[`src/lib/site.ts`](src/lib/site.ts) and a folder under `content/notes/`. Routes,
nav, and index pages follow automatically.

## Build phases

- [x] **Phase 1 — Scaffold.** Next.js + TS + Tailwind + MDX, folder structure
      matching the architecture above, design token layer, deploy the shell to
      Vercel to confirm the GitHub → Vercel pipeline before real content exists.
- [ ] **Phase 2 — Core identity pages.** `/`, `/journey`, `/resume` (web version
      + PDF).
- [ ] **Phase 3 — Content system.** Harden the MDX collection pattern: tag
      filtering, per-tag pages, RSS.
- [ ] **Phase 4 — Seed the three pillars.** Each `/notes/*` section gets an
      index/philosophy page plus 2–3 seed articles — enough to establish the
      section and let it grow.
- [ ] **Phase 5 — Polish.** SEO metadata, Open Graph images for articles, `/now`
      page, final visual pass against the design direction.

## Working conventions

- Every meaningful change gets committed with a clear message; push in small
  chunks so Vercel preview deploys stay reviewable.
- New content = a new `.mdx` file with correct frontmatter, not a hardcoded
  page — unless it is a structural page (`/`, `/journey`, `/resume`, `/now`).
- When drafting any prose for this site, follow
  [WRITING_GUIDE.md](WRITING_GUIDE.md).
- Prefer extending the existing MDX/collection pattern over inventing a new
  content mechanism for a new section.
