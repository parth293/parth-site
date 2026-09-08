# Bioprocess Engineering Notes — Writing & Formatting Guide

> Governs `/notes/bioprocess-eng` specifically. [WRITING_GUIDE.md](WRITING_GUIDE.md)
> still applies underneath this (voice, banned words, honesty about
> uncertainty) — this file adds a stricter format on top, because these notes
> exist to be scanned and memorized, not read once as prose.

## What these notes are for

A reader comes back to these — before an exam, before an interview, to check a
number. The test is not "is this a good explanation" but "can I find the one
fact I need in ten seconds, and does it stick." Optimize for retrieval, not
narrative.

## The shape of a note

Not every note needs every section, but default to this order:

1. **One-line definition.** State what the note is about as a fact, first
   sentence, no wind-up. Not "In this note we look at..." — just the
   definition or the claim.
2. **Mechanism / physical intuition.** What is actually happening, before any
   math. If it is a process, describe it as a sequence, not a description.
3. **Key equations**, pulled out of the paragraph into their own block, every
   symbol defined immediately underneath with units. Never leave a variable
   for the reader to infer from context.
4. **Worked example** with real numbers plugged in — not "suppose X is large."
   A number the reader can check their own work against.
5. **Comparison table** wherever two or more things get confused for each
   other (batch vs. fed-batch vs. continuous; titre vs. yield vs.
   productivity). If you catch yourself writing "unlike X, Y..." in prose,
   that is a table.
6. **Key points** — closing bullet list, 3–6 items, each a standalone
   recallable fact. This is a deliberate exception to the site-wide rule
   against summary paragraphs: a flashcard-style bullet list is a reference
   aid, not a restated argument, and this section is allowed to end with one.
7. **Common confusion.** One or two things people mix up on this topic, stated
   directly: "X is often confused with Y because... the difference is..."

## Formatting mechanics (stricter than the site default)

- **Paragraphs**: 1–3 sentences here, not the site-wide 2–5. If a paragraph
  runs long, it is probably a list.
- **Bold the term, not the sentence.** First use of a defined term gets
  bolded inline, then never again: "**Titre** is product concentration in the
  bioreactor (g/L) — not total product made across the run."
- **Every number carries a unit.** No bare numbers, ever, including in prose.
- **Tables over prose** for any comparison across ≥2 attributes.
- **Numbered steps** for any procedure or sequence (a purification train, a
  scale-up protocol) — never a paragraph describing a sequence.
- **Headings are the concept name**, not a description of the section: "Oxygen
  transfer rate (OTR)," not "Understanding how oxygen gets to cells." The
  heading should work as an index entry on its own.

## Transcribing Parth's dictated notes

Most of this section is built from Parth talking through a topic out loud,
transcribed and cleaned up into the shape above. When doing that:

- **Write only what he said.** Fix obvious speech-to-text errors (e.g.
  "in whisked" → "inviscid") and clean up grammar, but do not add facts,
  classifications, or examples he did not state — even ones that are
  standard, correct textbook additions. If something seems missing, ask
  or wait for him to dictate it; don't fill it in. (He corrected this once,
  2026-09-07: an unrequested "solids are not fluids" line got added and had
  to be removed.)
- **A garbled name is a placeholder, not a guess.** If dictation produces an
  organism, compound, or term you can't confidently resolve, mark it clearly
  in the text and ask, rather than picking the plausible-sounding match —
  wrong facts in study notes are worse than a visible gap.
- **If he says images are coming, stop and wait.** Don't design a
  replacement diagram in the meantime "to fill the gap" — leave an explicit
  `_[Image to come — ...]_` placeholder and move on to the next piece of
  content he dictates.
- **Every equation defines every symbol, with units, every time** — even a
  symbol already defined earlier in the note. This isn't just a formatting
  preference: the Formula Sheet (below) extracts each equation as a
  standalone card, so an equation missing its own variable list will show
  up incomplete there.

## Tooling this section depends on

- **Math renders via KaTeX** (`remark-math` + `rehype-katex`, wired in
  `src/components/mdx.tsx`). Write equations as `$inline$` or block `$$...$$`
  — never as plain-text approximations of notation.
- **Images live in `public/notes/bioprocess-eng/`**, referenced from content
  as `/notes/bioprocess-eng/<file>.png`. Give files descriptive kebab-case
  names matching what they show (`bingham-plastic-curve.png`), not the
  original screenshot filename.
- **The Formula Sheet** (`/notes/bioprocess-eng/formulas`, built by
  `src/lib/formulas.ts`) auto-extracts every equation across every note in
  this pillar — no manual step needed when you add one. It works by
  scanning for the exact pattern this guide already mandates: a heading
  (`##`/`###`/`####`), then a `$$...$$` block, then a contiguous bullet list
  of `- $symbol$ — definition, unit` lines directly beneath it. Breaking
  that shape (e.g. inserting a paragraph between the equation and its
  variable list) makes the equation vanish from the sheet, not error loudly
  — so stick to the shape even when it feels rigid.
- **Each note also gets a "Formulas" and "Worked examples" tab**
  (`/notes/bioprocess-eng/<slug>/formulas` and `.../worked-examples`), scoped
  to just that note — built by `src/lib/formulas.ts` and
  `src/lib/worked-examples.ts` respectively. A worked example is any heading
  (`##`/`###`/`####`) whose text starts with "Worked example" — everything
  under it up to the next heading of the same or shallower level is pulled
  onto that tab and rendered as-is (so it can use bold, numbered lists,
  inline and display math freely — unlike the formula-sheet extraction, this
  one doesn't parse structure). Follow the shape already in
  `content/notes/bioprocess-eng/fluid-mechanics.mdx`: a
  `#### Worked example: <what it's testing>` heading, a
  `**Question.**` paragraph, a `**Solution.**` paragraph with numbered
  steps, and a closing `**Answer:**` line.
- **Marking a formula "very important"**: put a
  `{/* importance: very-important */}` comment on its own line anywhere
  between the heading and the `$$` block. Every formula defaults to
  "important" (unadorned) — this comment is the only way to promote one to
  "very-important", and it's what the Formula Sheet's filter reads. It must
  be the JSX-comment form (`{/* ... */}`), not an HTML comment
  (`<!-- ... -->`) — MDX compiles this content as JSX, and a bare
  `<!-- -->` fails the build.
- **CSS override gotcha**: this project's `globals.css` wraps most rules in
  Tailwind's `@layer components`. Any CSS override targeting a class owned
  by an externally-imported, unlayered stylesheet (KaTeX's own
  `katex.min.css` is the example that bit us on 2026-09-08) must itself be
  unlayered — unlayered CSS always wins over layered CSS regardless of
  source order or specificity. See the `.katex { font-size: 1em; }` rule
  near the top of `globals.css` for the pattern.

## Tags

Keep a small, reused tag vocabulary so tags function as a second index:
`upstream`, `downstream`, `bioreactor-design`, `kinetics`, `scale-up`, `pat`
(process analytical technology), `sterilization`, `media`. Reuse existing tags
before inventing a new one — check the other files in
`content/notes/bioprocess-eng/` first.

## What this section is not

- Not an essay. No persuasion, no "why this matters," no career framing —
  that belongs in `/writing` or `/journey`.
- Not a tutorial sales pitch. The reader already wants to learn this; don't
  motivate them.
- Still bound by [CLAUDE.md](CLAUDE.md)'s rule against fabricating facts —
  if a number or claim is not something Parth has confirmed, mark it and ask
  rather than inventing a plausible one.

## Before publishing a note here

1. Could someone find the one fact they need by scanning headings alone in
   ten seconds?
2. Is every number attached to a unit?
3. Is there a worked example with real numbers?
4. Does the closing bullet list actually work as a flashcard set — would each
   line make sense read on its own, out of context?
5. Read cold in three months, does it still make sense in under a minute?
