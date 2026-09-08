import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Section } from "@/components/record";
import { education, intro } from "@/lib/pitch/profile";
import { company, roles } from "@/lib/pitch/timeline";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "The narrative version: engineering at IIT BHU, six years at Leucine, and what comes next.",
};

/**
 * Narrated from the verified data in src/lib/pitch/* — the same facts that
 * back the interview pitch and will back /resume. No fact here is invented;
 * where something is missing it says so rather than guessing. See
 * WRITING_GUIDE.md for voice and CLAUDE.md's no-fabrication rule.
 */
export default function JourneyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Background"
        title="Journey"
        lede="The narrative version of the resume — what I studied, what I built, and why the next step looks the way it does."
      />

      <div className="space-y-14">
        <Section
          number="1.0"
          label="Education"
          note={
            <>
              {education.institution}
              <br />
              {education.location}
              <br />
              {education.period}
            </>
          }
        >
          <h2 className="text-xl font-semibold tracking-[-0.01em] mb-1">
            {education.degree}
          </h2>
          <p className="label mb-5">
            {education.honours.join(" · ")}
          </p>
          <div className="prose">
            <p>
              {education.degree} at {education.institution} sits closer to chemical
              engineering than to pharmacy — mass and heat transfer, thermodynamics,
              numerical methods, applied to pharmaceutical systems. {education.contrast[0].mine},
              which is the part a straight pharmacy degree does not carry. The pharmaceutical
              sciences — pharmacology, biopharmaceutics, formulation — are carried in full
              alongside it, not traded away for the engineering half.
            </p>
            <p>
              Where the two halves meet is manufacturing and process: dosage formulation
              design, manufacturing practice, pharmaceutical analysis — the coursework that
              pointed directly at what I ended up building software for.
            </p>
          </div>
        </Section>

        <Section
          number="2.0"
          label="Leucine — six years, six phases"
          note={
            <>
              {company.what}
              <br />
              Joined {company.joined}.
              <br />
              At joining: {company.atJoining}
              <br />
              Today: {company.today}
            </>
          }
        >
          <div className="prose">
            <p>
              I joined Leucine in {company.joined.split(",")[0]}, when it was roughly{" "}
              {company.atJoining}. Six years later it is {company.today}. What follows is
              what changed in between, phase by phase — several of them ran concurrently
              rather than in strict sequence.
            </p>
          </div>

          <ol className="mt-8 space-y-10">
            {roles.map((role) => (
              <li key={role.phase} className="border-t border-rule pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">
                    {role.titles.join(" / ")}
                  </h3>
                  <span className="label">{role.period}</span>
                </div>
                <p className="measure text-ink-muted leading-relaxed mb-3 text-pretty">
                  {role.thesis}
                </p>
                <ul className="prose">
                  {role.jobs.map((j) => (
                    <li key={j}>{j}</li>
                  ))}
                </ul>
                {role.outcomes.length > 0 ? (
                  <div className="mt-4 measure border-l-2 border-accent bg-paper-raised px-4 py-3">
                    <p className="field-label mb-1.5">What it produced</p>
                    <ul className="text-sm leading-relaxed text-ink-muted space-y-1">
                      {role.outcomes.map((o) => (
                        <li key={o}>— {o}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </Section>

        <Section number="3.0" label="What comes next">
          <div className="prose">
            <p>{intro.frame[2]}</p>
            <p>
              {intro.frame[0]} {intro.frame[1]}
            </p>
            <p className="text-ink-faint italic">
              I am currently working out the specific next step in public — see{" "}
              <a href="/now">/now</a> for what has my attention at the moment.
            </p>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
