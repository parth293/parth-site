# Writing Guide

> **Draft — needs Parth's edit.** Claude wrote this from the positioning in
> [PROJECT_PLAN.md](PROJECT_PLAN.md). It is a starting hypothesis about voice,
> not a settled one. Correct it before it hardens.

Governs all prose on this site: notes, essays, journey copy, page ledes,
resume bullets. [PROJECT_PLAN.md](PROJECT_PLAN.md) governs structure and code.

## The voice in one line

An engineer who has spent six years in the room where regulated pharma software
actually gets bought, built, and validated — explaining things plainly to
someone smart who has not been in that room.

## Who I am writing for

Assume a reader who is **technically literate but not a specialist in this
domain**. They can follow a mass balance or a system design. They do not know
what a deviation is, why Annex 11 matters, or what makes a pharma QA director
say no.

So: never explain what a derivative is. Always explain what CSV means the first
time, and mean *computer system validation*, not comma-separated values.

## Non-negotiables

**Write from specifics.** A claim earns its place by carrying a number, a
mechanism, or a named case. "Enterprise sales in pharma is slow" is filler.
"A QA director will not sign off on software they cannot re-validate after an
upgrade, which puts a 6–9 month clock on every release" is writing.

**Say the mechanism, not the vibe.** If something works, say why it works. The
value of an engineering background is that you can go one level down. Go there.

**Concede the real objection.** Every argument worth making has a strong version
of the counterargument. State it in its strongest form, then answer it. Writing
that only beats up weak opponents reads as marketing.

**Prefer the concrete noun.** "Batch record" over "documentation artifact."
"The plant in Vizag" over "a client site."

**Own the uncertainty.** "I think," "I have seen this twice, which is not
enough to generalize," "I do not know why this works" are all better than false
confidence. The GATE-BT notes especially are written *while* preparing — that is
the honest and more useful frame.

## Banned

These do not appear on this site:

- LinkedIn voice. No "thrilled to share," no "here's the thing," no one-line
  paragraphs stacked for drama, no rhetorical question as a section opener.
- Consultant abstractions: *leverage, synergies, unlock value, best-in-class,
  end-to-end, holistic, journey* (except the page title), *space* as in "the
  compliance space."
- LLM tells: *delve, tapestry, testament to, it's not just X — it's Y, in
  today's fast-paced world,* and the three-item rule-of-three used as decoration.
- Hype punctuation. No em-dash pileups, no exclamation marks, no bold used as
  shouting.
- Fake humility ("just a few thoughts") and fake authority ("the definitive
  guide").
- Statistics without a source. If the number is a guess, say it is a guess.

## Mechanics

- **Sentences** vary in length; a short one lands a point after two long ones.
  Default to active voice. Passive is fine when the actor genuinely does not
  matter, which in regulated industry is more often than usual.
- **Paragraphs** run 2–5 sentences. One-sentence paragraphs are a tool, used
  perhaps twice per piece.
- **Headings** are descriptive, not clever. "Why validation cost scales with
  release frequency" beats "The validation trap."
- **First person** throughout. This is a personal site; "we" is dishonest.
- **British/Indian spelling** is fine, but be consistent within a piece.
- **Numbers**: spell out under ten in prose; use numerals for all measurements,
  dates, and money.
- **Jargon**: define on first use, in-line, in six words or fewer. If it takes
  more, it deserves its own paragraph.

## Openings

The first two sentences decide whether anyone reads the third. Start with the
specific thing — a case, a number, a wrong belief you held. Never start with
definitional throat-clearing ("Pharmaceutical manufacturing is a complex
industry...") or with what the piece is about ("In this post I will...").

Good openings for this site look like:

- "The first time I watched a batch get rejected, the reason was a signature."
- "GATE-BT has a syllabus problem: it is broad enough that coverage is the wrong
  strategy."
- "Most technical sales advice assumes the buyer can say yes. In pharma, nobody
  can say yes alone."

## Endings

Stop when the argument is done. No summary paragraph restating what was just
read, no "in conclusion," no call to action. If a piece is genuinely unfinished,
say what would change your mind or what you plan to find out next — that is a
real ending for a digital garden.

## Per-section notes

**`/notes/pharma-eng`** — Explainers. Assume curiosity, not background. Lead
with the physical intuition, then the math. Diagrams and worked numbers beat
prose descriptions of equations.

**`/notes/gate-bt`** — Written in real time, not in retrospect. Present tense.
Include what is not working. This section's credibility comes from being
unfinished; do not clean it up into a success story.

**`/writing`** — More opinionated, more room to argue. Book notes state what the
book got wrong, not just what it said.

**`/journey` and `/resume`** — The hardest to keep honest. Every role gets a
concrete artifact: what shipped, what it replaced, who used it. Title inflation
is worse than under-selling. No adjectives about yourself — let the specifics do
it.

## The test before publishing

1. Would I say this sentence out loud to a smart colleague?
2. Does every paragraph carry a fact, a mechanism, or an argument?
3. Have I stated the strongest objection?
4. Is there a number, a name, or a case in the first three sentences?
5. Did I cut the summary paragraph at the end?
