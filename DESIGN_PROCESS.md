# Design Process

How design work gets done in this repo, for agents and for me. Adapted from
Anshu Chimala's process for directing AI design teams (12 years leading design
and prototyping R&D at Apple), bound to the constraints in
[PROJECT_PLAN.md](PROJECT_PLAN.md).

[PROJECT_PLAN.md](PROJECT_PLAN.md) governs structure and code.
[WRITING_GUIDE.md](WRITING_GUIDE.md) governs prose. This file governs *how the
visual work is produced* — the procedure, not the outcome.

> **Capture note.** The source article was captured through the Discover and
> Define stages in full; the Deliver stage was truncated mid-section. What is
> recorded here for Deliver is the headline principle plus what this project
> already knows about shipping. Extend it when the rest is available.

---

## The premise: why AI design defaults to slop

An LLM is a next-token predictor. At every decision point — a color, a layout,
a type scale — it emits the *most likely* token given everything before it.
Averaged over millions of examples and RLHF ratings that reward the choice which
offends no one, the output converges on the mean of all design ever published.
That is the definition of design-by-committee.

Good design is the opposite operation. It starts from a feeling, commits to a
point of view, and earns memorability by making a choice most people would not
have made. It bends rules deliberately.

So the whole job is: **push the model off its mean, then hold it to a quality bar
it cannot grade itself against.** Everything below is a mechanism for one of
those two things.

The failure mode is diagnostic, not moral. If a surface looks generic, the cause
is almost always that no force was applied to move the model off center — not
that the model "can't design."

---

## Stage 1 — Discover: explore before committing

Go broad before going deep. The expensive mistake is deepening the first
direction that appears, because the first direction is by construction the most
average one.

### Technique 1 — Seed strings inject real variance

Asking for variety does not produce variety. "Make it unique," "surprise me,"
"choose at random" all produce *tokens that sound random* while the underlying
distribution is unchanged — same palette, same structure, often the same
metaphors. The model cannot be random; it can only predict.

Variance has to come from outside the model. Technique (String Seed of Thought,
Sakana AI): generate an actual random string in the shell, then derive the
creative direction from it.

```
1. Generate a long random alphanumeric string with a shell command.
2. Derive the creative direction from it — palette, layout, type, density,
   rhythm. Read past the surface: subpatterns, repeats, runs, numeric values,
   whatever suggests something.
3. Bring that direction to life with judgment. The seed picks the direction;
   craft still decides quality.
4. Never surface the string in the artifact. It is private inspiration.
```

Run this N times in parallel and the outputs genuinely diverge — different
palettes, type systems, structures. No two runs land in the same place. That is
the point: these are directions *only this run* could have produced.

### Technique 2 — Prompt with far more ambition than feels reasonable

The other way off the mean is a specific, opinionated vision the model can
execute against instead of inventing decisions token by token. Bring outside
taste: a video game, an interior-design movement, an instrument panel, a
printing tradition, an art installation — then say how it should bend the work.

Vague prompts return the mean. Ambitious ones return an attempt at something.

**Finding directions worth asking for**, without laundering AI's own averages
back into the work:

1. **Ask for a long list of thin ideas.** High-level, one line each, deliberately
   underspecified. Breadth, not depth. The list is fuel for *my* imagination,
   not a menu to pick from.
2. **React to the ones that catch.** Visualize a favorite, then say precisely
   what I want and what repels me — "tactile, clicky, satisfying; but
   skeuomorphic reads tacky, avoid that; gray gradients are boring, this needs
   texture; can it hold color and still feel like a control panel?" The taste
   enters *here*.
3. **Iterate until sharp, then have it write the build prompt.**

Pasting AI's ideas back into AI produces something anyone could have gotten.
Steering it produces something only I could have.

**Try the ideas that sound bad.** "There's no way this works" is a signal you
are off the mean, which is where the good stuff is. Cheap to throw away. Keep
the prompts that failed and re-run them against newer models — a prompt that was
too ambitious for one generation is often exactly right for the next.

---

## Stage 2 — Define: give the direction a personality

Even a well-seeded first pass usually still leans on stale skeletons — nav bar
across the top, headline left with a CTA under it, graphic right. Promising
direction, generic execution. This stage is where a direction becomes an
identity.

### Technique 3 — Critic subagents, in a positive feedback loop

An agent cannot objectively review its own design. It has read its own code,
its own rationale, its own previous iterations; it is anchored to sunk effort
and cannot zoom out. So the implementer does not get to decide when the work is
good enough. A **separate critic** does, in a **fresh context**, looking at
**screenshots only** — no code, no implementation notes, no prior critiques.

Loop shape:

```
1. Screenshot the current surface.
2. Invoke the critic fresh, with the image alone.
3. It identifies the aesthetic the design is reaching for, imagines how a top
   studio would execute that aesthetic, and names the biggest gaps.
4. It scores /10 against that studio bar.
5. Implementer applies the feedback. Repeat.
```

Instructions the critic must carry:

- Judge overall structure and composition **and** the fine details.
- Actively penalize anything that reads as overdone, excessive, or obviously
  AI-generated.
- Tight, specific, actionable feedback. No vague prose.
- Be bold and opinionated. Do not retreat to what is safe or easy.

Stopping criterion lives with the implementer, never the critic — the critic
must not know the bar it is being used to clear, or it will grade to it.

**Setup rules that decide whether the loop works:**

| | |
| --- | --- |
| **Bad criteria** | "Judge if this is beautiful and not AI-generated." Too subjective; scores swing run to run. |
| **OK criteria** | "Identify the aesthetic, imagine a top studio's execution, judge the gap." Mushy, but a consistent framework and a stable bar. |
| **Best criteria** | "Here are five images: four professional references and one screenshot of ours. Rank them by polish and taste." Concrete, objective, visually grounded. |

- **Give reference images.** Screenshots of work I admire, or concept art. Frame
  them as a **baseline or moodboard, not a target** — the critic should not push
  toward copying them.
  *Project decision: this site runs without references, on the OK-criteria
  framework. Do not go looking for a moodboard. The cost is less objective
  scoring, paid for by a verbatim-fixed critic prompt and by checking that scores
  converge before trusting the loop.*
- **Tune the stopping criteria.** An ungoverned critic never says yes and the
  implementer burns tokens forever trying to please it. Run one or two
  iterations first, confirm the score is actually converging, then extend.
- **Use the same critic prompt every iteration**, or the scores are not
  comparable.
- **Split models by role.** Big model as critic — more parameters generally means
  better taste and a wider idea distribution — cheap fast model as implementer.
  The critic makes few, high-leverage calls, so it stays a small share of tokens
  and cost while supplying the judgment. Do not go *too* small on the
  implementer; it still has to execute a direction well.

### Technique 4 — Texture the model will not reach for on its own

Coding agents write code, so they reach for code-native decoration: gradients,
geometric shapes, CSS patterns. Those are among the strongest tells of an
AI-generated design. Real imagery, generated figures, shaders, and 3D effects
signal effort beyond the surface — and models under-use them badly unless told
to, even when the tooling is right there.

Instruct explicitly, and verify the result **frame by frame in a browser** — not
by assuming the markup implies the render.

*(This project's variant: an engineering-notebook aesthetic wants plotted
figures, diagrams, and technical plates more than photographic imagery. Same
principle — reach past what CSS makes easy — different medium. See the plan for
which route we take.)*

---

## Stage 3 — Deliver: polish and cut

Headline principle: **polish away the sloppy rough edges and concentrate effort
on the elements that carry the design.** A design is judged by its weakest
visible detail, and most of its impact comes from a small number of moments.

*(Source truncated here — extend this section when the rest is captured.)*

Project-specific delivery bar, already learned:

- Verify the **rendered output**, at every breakpoint. A 200 and a green build
  are not evidence the page is right.
- The `check:css` guard exists because unstyled HTML once shipped with a passing
  build. Extend `REQUIRED` in [scripts/check-css.mjs](scripts/check-css.mjs)
  whenever a new load-bearing utility or class becomes structural.

---

## How this binds to this project

The process above maximizes distinctiveness. [PROJECT_PLAN.md](PROJECT_PLAN.md)
constrains the aesthetic: technical-editorial, near-neutral, one accent, serif
body, mono metadata, no gradient heroes, no animation flourishes. These are not
in conflict — the exploration techniques apply **inside** the constraint
envelope, and a constraint is precisely what makes exploration produce identity
rather than noise.

**Fixed. Exploration does not touch these:**

- Light-only, warm near-white paper, near-black ink, one restrained accent.
- Serif for reading, mono for metadata and labels.
- Reading measure held around 65–75 characters for long-form.
- No gradient hero, no scroll-jacking, no decorative motion, no multi-color
  palette, no SaaS marketing register.
- Every value comes from a token in `globals.css`. Exploration output that
  hard-codes a hex is a sketch, not a shippable component.

**Open to exploration. These are conventions, not requirements:**

- Page architecture and composition — the centered single column is a default,
  not a decision anyone made.
- Grid, rule system, and how structure is drawn.
- Density, vertical rhythm, and where the page is deliberately quiet.
- Type scale, weight contrast, and how far mono is pushed as a display face.
- Exact hues and temperature within the neutral-plus-one-accent rule.
- Figure, plate, and diagram treatment.
- The specific character of hover, focus, and state — restraint is required,
  blandness is not.

**Any exploration that wants to break something in the fixed list is a
proposal.** Present it as one and let me decide. Do not quietly ship it.

---

## Anti-slop checklist

Concrete tells to design against, and for the critic to penalize on sight:

- Purple/indigo/violet gradient anything. Gradient text headlines.
- Hero as headline-left / illustration-right, CTA pair beneath.
- A three-up grid of rounded cards with an icon in a tinted circle.
- Glassmorphic floating nav pill. Heavy drop shadows on flat content.
- Generic geometric sans used for everything, at one weight, evenly spaced.
- Uniform padding everywhere — no compression, no release, no hierarchy of space.
- Section headers in the shape "Everything you need to ___."
- Emoji as bullets or section icons. Badge pills announcing features.
- Perfectly symmetric layouts where nothing leads the eye.
- Decoration that exists because CSS made it easy, not because it means anything.

---

## Working rules

- **Verify renders, not markup.** Screenshot it. Look at it. Every breakpoint.
- **Explorations are disposable; the brief is not.** Sketches live outside the
  app and get thrown away. What survives is the written design brief and the
  token layer.
- **Save the prompts, including the failures.** Re-run them when models improve.
- **The critic sees pixels, never code.** The moment it sees implementation, it
  stops being objective and the loop is worthless.
