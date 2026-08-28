# parth-site

Personal site — identity hub and digital garden. Next.js (App Router) +
TypeScript + Tailwind v4 + MDX, deployed on Vercel.

## Read first

- [PROJECT_PLAN.md](PROJECT_PLAN.md) — architecture, stack, design tokens, phases
- [WRITING_GUIDE.md](WRITING_GUIDE.md) — voice and tone for all prose

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; fails on bad frontmatter
npm run lint
```

## Publish an article

Add one `.mdx` file and commit. No code changes needed.

```
content/notes/pharma-eng/<slug>.mdx   → /notes/pharma-eng/<slug>
content/notes/gate-bt/<slug>.mdx      → /notes/gate-bt/<slug>
content/notes/sales-eng/<slug>.mdx    → /notes/sales-eng/<slug>
content/writing/<slug>.mdx            → /writing/<slug>
```

```mdx
---
title: "Why validation cost scales with release frequency"
date: "2026-08-28"
summary: "One sentence that makes someone want to read it."
tags: ["gmp", "validation"]
---

Body starts here.
```

`title`, `date`, and `summary` are required — the build fails without them.
`draft: true` keeps a file in the repo but out of production listings.
`updated: "2026-09-14"` renders a "last updated" stamp.

## Layout

```
src/app/          routes (App Router)
src/components/   shared UI — page shell, doc list, MDX renderer
src/lib/site.ts   nav, pillars, site metadata — the config surface
src/lib/content.ts  the only module that reads content/
content/          all long-form MDX
```

Design tokens live in [`src/app/globals.css`](src/app/globals.css). No component
hard-codes a color, font, or measure.
