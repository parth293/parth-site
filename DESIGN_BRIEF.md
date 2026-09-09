# Design Brief — The Controlled Record

The visual identity for this site. Produced by the Phase 1 exploration in
[REDESIGN_PLAN.md](REDESIGN_PLAN.md), selected from six independent directions.

[PROJECT_PLAN.md](PROJECT_PLAN.md) governs architecture. This file governs how
the site looks and why. When the two disagree about visual direction, this file
wins and PROJECT_PLAN should be updated to match.

---

## The idea in one line

**A controlled document that is also a working notebook** — the rigour of an
artefact built to survive an audit, carrying the annotations of something still
being written.

## Why this and not something else

Parth spent six years turning batch records, SOPs, and validation protocols from
paper into software. That document grammar is *native* to the work rather than
borrowed from a design trend, it is instantly legible to the exact audience
(quality directors, professors, technical founders), and no model reaches for it
unprompted — which is why it survives the anti-slop bar in
[DESIGN_PROCESS.md](DESIGN_PROCESS.md).

It also answers this site's hardest problem. Four note sections have zero
articles and will stay sparse for months. In a controlled document, an empty
numbered field does not read as neglect — it reads as **awaiting entry**. The
structure declares that something belongs there and has not been filled in yet.
That is honest, and it is the opposite of a dead page.

## What it deliberately sacrifices

Warmth and approachability. This is a formal, dense, high-information surface.
It will read as severe to a casual visitor. That is the correct trade for an
audience that is evaluating rigour, but it must be actively fought at the detail
level — generous line height, real whitespace between sections, and a serif with
character rather than a neutral one. **Rigour is not sterility.** If the page
stops being a pleasure to read, the direction has failed.

---

## The two borrowed ideas

From the `lab-notebook` direction, which solved things this one had not:

1. **The margin column is real architecture, not ornament.** A genuine outer
   column carrying annotations, cross-references, statuses, and dates. If it has
   nothing to say on a given screen, it collapses — it never carries filler.
2. **Figures plot real data and caption it honestly.** A chart of entries per
   section, flat at zero, captioned so the reader understands that a flat line
   is a section that exists and has not been written yet. Never a decorative
   squiggle. A figure that plots nothing is an anti-slop violation.

---

## Fixed rules

- Light only. No dark mode without revisiting the audience decision.
- One primary accent (signature blue), for links, section numbers, status
  marks, figure strokes. Never a gradient.
- **One narrow, named exception**: every notes pillar's subject noun (the
  word in front of "Engineering") shares one warm copper tone, so
  "Engineering" itself reads as the constant across pillars and the domain
  reads as the variable — see the colophon. Two colours total, dual not
  multi. Scoped to that one use; it does not license a general multi-colour
  palette anywhere else on the site.
- Serif for reading, mono for metadata, labels, numbers, and status.
- Reading measure 65–75 characters for all long-form.
- No decorative motion. Transitions are 120ms colour changes, nothing else.
- No skeuomorphism. No paper texture, no faux binding, no stamps, no
  handwriting, no sepia. This is a digital surface that absorbed a document's
  logic, not a picture of paper.
- Every value is a token in `globals.css`. No hex codes in components.

---

## Colour

Warm near-white paper, warm near-black ink, one blue accent.

The accent is **signature blue** — the ink a wet original signature is written
in, so an original can be told apart from a photocopy. It is used for links,
section numbers, status marks, and figure strokes. Nothing else.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#faf8f2` | page background |
| `--paper-raised` | `#f1efe4` | the document header bar, code blocks, table stripes |
| `--paper-sunken` | `#ece9db` | inset fields, empty-state wells |
| `--ink` | `#1c1a15` | body text |
| `--ink-muted` | `#57534a` | secondary prose, summaries |
| `--ink-faint` | `#8c8778` | metadata, labels, disabled |
| `--rule` | `#ddd7c5` | hairlines |
| `--rule-strong` | `#b9b29a` | section boundaries, table heads |
| `--accent` | `#1f3f8f` | links, numbers, status, figure strokes |
| `--accent-dim` | `#4a63a0` | hover, secondary marks |
| `--accent-tint` | `#e8ecf6` | selection, active field background |

## Typography

- **Serif — STIX Two Text.** A Times-descended text face designed for
  scientific and technical publishing, with real italics and a large glyph set.
  Correct for the domain rather than merely tasteful.
- **Mono — IBM Plex Mono.** Metadata, labels, numbers, status, nav, the document
  header. Pushed hard as a display face: the page title is set in mono, which is
  the single most identity-defining typographic decision here.

Scale (`--text-*`): `2xs .6875` · `xs .75` · `sm .875` · `base 1` · `md 1.0625`
· `lg 1.375` · `xl 1.75` · `2xl 2.5` · `display clamp(2.6rem, 6.4vw, 5.1rem)`.

## Structure

- **Space unit `--u: 8px`.** Every margin and padding is a multiple.
- **Container 1160px**, wider than the old 4xl — the layout needs a margin
  column, and the reading column stays at `--measure` inside it.
- **Section numbering is load-bearing.** Sections are `1.0`, `2.0`; subsections
  `2.1`. Numbers are real navigation and cross-reference targets, not decor.
- **Every field is labelled.** A value without a label above or beside it is a
  bug in this system.
- **Rules carry weight meaning.** `--line` 1px hairline separates rows;
  `--line-heavy` 2px separates sections. A rule is never decorative.
- **Status is explicit.** Empty collections read `AWAITING ENTRY`, populated
  ones read their count. Never a bare `0`.

## Responsive

- **1440 / 1160 container** — margin column live at `--margin-col: 84px`+.
- **834** — margin column collapses; its content moves inline, above the block
  it annotates, at `--text-xs`.
- **390** — single column. The document header bar wraps to two rows and drops
  `PAGE`. Section numbers stay; they are the identity.

Nothing may scroll horizontally at any width. Tables and code blocks scroll
inside their own container.

## The component inventory

`DocHeader` (document control bar) · `SectionNumber` · `Field` (label + value) ·
`StatusChip` · `MarginNote` · `Figure` (SVG + numbered caption + reference) ·
`DocList` (record rows) · `PageShell` · `.prose`.
