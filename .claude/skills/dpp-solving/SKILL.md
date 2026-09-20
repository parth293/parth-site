---
name: dpp-solving
description: Protocol for when Parth is working through a DPP (daily practice problems) / practice paper on his own and sends over a question he got stuck on. Trigger whenever he pastes or describes a practice-paper question and asks for help, or says he's stuck on a question from a DPP/paper he's solving. Covers: solve the question, check whether the site's notes already had what was needed, and if not, explain the answer first and then update the notes with the missing concept plus a worked example. Not for full past-paper transcription runs (see the GATE past-papers memory for that separate batch workflow).
---

# DPP solving protocol

Parth solves DPP/practice-paper questions himself. When he gets stuck, he
sends the question here. The goal isn't just "give the answer" — it's
closing the loop between his practice and the reference notes on the site,
so the next person (including future-him) who hits the same gap finds it
already covered.

## Steps, in order

1. **Solve the question.** Work through it properly — show the reasoning,
   not just the final letter/value. If any step is genuinely uncertain
   (ambiguous wording, a borderline convention), say so explicitly rather
   than asserting a clean answer with hidden doubt.
2. **Find the note that should cover this.** Identify which existing note
   the question's topic belongs to — check `content/notes/bioprocess-eng/`
   first (pillars are listed in `src/lib/site.ts`), or the relevant pillar
   if the topic sits elsewhere (e.g. `pharma-eng`). Read that note before
   concluding anything about what it does or doesn't cover.
3. **Check whether the note already had what was needed to solve it.**
   - **If yes** — just point to the section/equation that covers it when
     explaining the answer. No content change needed.
   - **If no** (missing concept, wrong/incomplete formula, or a distinction
     the note doesn't draw) — this is a real gap, not just "the question
     was hard."
4. **When there's a gap: explain the answer in chat first**, in full,
   before touching any file. Parth is trying to learn the concept, not just
   get an edit — understanding comes before the note gets updated.
5. **Then update the note** to add the missing concept, in the same pass:
   - Follow [BIOPROCESS_ENG_GUIDE.md](../../../BIOPROCESS_ENG_GUIDE.md)
     exactly for anything in that pillar — one-line definition, mechanism,
     equations with every symbol/unit defined directly beneath (no
     paragraph between the `$$` block and its bullet list — that breaks
     the Formulas-tab extraction), tables for anything easily confused.
   - Add the question itself as a **worked example**: a
     `#### Worked example: <what it's testing>` heading with
     `**Question.**`, a `**Solution.**` with numbered steps, and a closing
     `**Answer:**` line — matching the shape already used in these notes
     (see `fluid-mechanics.mdx` or `mass-transfer.mdx` for the pattern).
   - Only add standard, correct textbook material to close the gap — never
     invent a fact, constant, or classification Parth hasn't confirmed. If
     something needed is genuinely uncertain, flag it and ask rather than
     guessing (per [CLAUDE.md](../../../CLAUDE.md)'s no-fabrication rule).
   - This is the one case where adding unrequested textbook facts to these
     notes is expected, not a violation of the usual "write only what he
     dictated" rule — Parth asked for this explicitly as the standing DPP
     protocol (2026-09-20).
6. **Don't ask for confirmation on repeat runs.** This is the standing
   process for every DPP question from here on — just follow it. Only stop
   to ask if it's genuinely ambiguous which note/pillar the topic belongs
   to, or a fact needed to close the gap can't be sourced confidently.

## What this is not

- Not the batch GATE-past-paper transcription workflow (solving/publishing
  a whole official paper as its own note under `pharma-eng`) — that has its
  own separate, established process. This skill is for one-off questions
  from Parth's own practice as he works through a DPP.
- Not a reason to rewrite or restructure a note beyond what's needed to
  close the specific gap — add the missing piece, don't redo the section.
