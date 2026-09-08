@AGENTS.md

# Project conventions

Read [PROJECT_PLAN.md](PROJECT_PLAN.md) before adding sections or components —
it is the standing spec for architecture, stack, and design direction.

Read [WRITING_GUIDE.md](WRITING_GUIDE.md) before drafting any prose (notes,
essays, journey copy, page ledes, resume bullets).

Read [DESIGN_PROCESS.md](DESIGN_PROCESS.md) before doing any visual work — it is
the standing procedure for how design gets produced here (exploration, critic
loops, the anti-slop bar, and what is fixed vs. open to exploration).

Read [BIOPROCESS_ENG_GUIDE.md](BIOPROCESS_ENG_GUIDE.md) before drafting or
editing any `/notes/bioprocess-eng` article — that section uses a stricter,
memorization-first format on top of the general writing rules.

## Hard rules

- **No hard-coded colors, fonts, or measures in components.** Everything comes
  from the tokens in `src/app/globals.css`. Need a new value? Add a token.
- **Long-form styling lives in `.prose`** in `globals.css`, never in a page.
- **`src/lib/content.ts` is the only module that reads `content/`.**
- **New content is a `.mdx` file**, not a hardcoded page — unless it is a
  structural page (`/`, `/journey`, `/resume`, `/now`).
- **The `/notes` pillars are siblings in one collection.** Add a pillar by
  adding an entry to `pillars` in `src/lib/site.ts` plus a content folder — do
  not write a bespoke route for it.
- Aesthetic is technical-editorial, not SaaS marketing. No gradient heroes, no
  animation flourishes, no multi-color palette.

## Do not fabricate biography

Dates, titles, employers, metrics, and project details must come from Parth. If
a page needs a fact that is not already in the repo, leave a marked placeholder
and ask — do not invent a plausible-sounding one.
