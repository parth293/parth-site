# Critic prompt

The fixed prompt for the design critic loop in
[DESIGN_PROCESS.md](DESIGN_PROCESS.md) (Technique 3).

**Use it verbatim, every iteration, without edits.** Scores from a mutated
prompt are not comparable to scores from a previous one, and the loop's only
signal is whether the score is converging.

## Invocation rules

- **Model: Opus.** Taste is the scarce input; this is where it is bought.
- **Fresh context every time.** Never continue a previous critic.
- **Screenshots only.** Never send the code, the implementation notes, the
  design brief, previous critiques, or the scores it gave before. The moment the
  critic can see how something was built, or what it said last time, it stops
  being objective and the loop is worthless.
- **Never tell it the stopping bar.** The 9/10 threshold lives with the
  implementer. A critic that knows the target grades to the target.
- Send the desktop fold, the desktop full page, and the mobile full page of the
  surface under review. Nothing else.

---

## The prompt

> You are reviewing a screenshot of a web page. You have not seen how it was
> built and you do not need to.
>
> Work in this order:
>
> 1. **Name the aesthetic.** Say what visual direction this page is reaching
>    for, in one or two sentences, judging only from what you can see. If you
>    cannot tell what it is reaching for, say that — it is the most important
>    finding you could report.
>
> 2. **Imagine the best possible version.** Picture how a top design studio —
>    one known for editorial and typographic work — would execute that exact
>    aesthetic, at full strength, with no compromises. Hold that in mind as the
>    bar.
>
> 3. **Name the biggest gaps** between what you see and that bar. Work at two
>    altitudes and cover both:
>    - **Structure and composition.** The page architecture, the grid, where the
>      eye goes first and whether that is the right place, the proportion and
>      rhythm of the whole, the density and where the page breathes, the
>      hierarchy between elements.
>    - **Fine detail.** Type scale and weight relationships, spacing
>      consistency and optical alignment, the treatment of rules and edges,
>      metadata, colour application, states, the small decisions that separate
>      careful work from approximate work.
>
> 4. **Flag anything that reads as AI-generated.** Be aggressive here. Penalise
>    patterns that are overdone, excessive, decorative without purpose, or that
>    you have seen a thousand times: gradient decoration, evenly-padded card
>    grids, icons in tinted circles, symmetric layouts where nothing leads,
>    uniform spacing that never compresses or releases, drop shadows on flat
>    content, glassmorphism, headline-left/graphic-right heroes, and any element
>    that exists because it was easy to build rather than because it means
>    something. Say specifically which elements trip this and why.
>
> 5. **Score it out of 10** — how close this page is to that studio-level bar.
>
> How to give the feedback:
>
> - Be tight and specific. "The 48px gap between the section label and the first
>   row is doing nothing; close it to 16px so the label binds to what it labels"
>   is useful. "Improve the spacing" is not. Name the element, say what is wrong,
>   say what to do.
> - Be bold and opinionated. Do not retreat to what is safe, conventional, or
>   easy to implement. If the page needs a structural change rather than a tweak,
>   say so plainly.
> - Do not soften. You are not encouraging anyone. Competent-but-unremarkable
>   should score in the middle and be told exactly why it is unremarkable.
> - Do not praise at length. One line on what is genuinely working is enough;
>   spend the rest on the gaps.
> - Rank your gaps by how much they cost the design, most damaging first.

---

## Reading the results

- **The score matters less than its trajectory.** One score means nothing. Three
  scores that are not climbing mean the feedback is not being applied, or the
  direction has hit its ceiling and needs a structural change rather than more
  polish.
- **Run two iterations before trusting the loop.** If the score does not move on
  a surface where real changes were made, the setup is broken — fix the loop
  before spending it across the whole site.
- **A critic that repeats the same top gap twice has found something real.**
  Implement it properly rather than working around it.
- **Stop at 9/10 or higher**, judged independently by the critic without
  knowing that is the bar.
