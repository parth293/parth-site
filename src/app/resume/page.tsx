import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Field, Section } from "@/components/record";
import { education, intro } from "@/lib/pitch/profile";
import { products } from "@/lib/pitch/products";
import { company, roles } from "@/lib/pitch/timeline";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Structured resume — education, experience, and selected work.",
};

/**
 * Renders from the same verified data as /journey and the interview pitch
 * (src/lib/pitch/*), so the web page, the eventual PDF, and the pitch can
 * never drift apart. No PDF exists yet — that is stated plainly below rather
 * than linking a file that 404s.
 */
export default function ResumePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Curriculum vitae"
        title="Resume"
        lede="Education, experience, and selected work — the structured version of the journey."
      />

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border border-rule bg-paper-raised px-5 py-4">
        <p className="font-mono text-xs text-ink-faint">
          <span className="label mr-2">PDF version</span>
          Not yet generated — <a href={`mailto:${site.email}`}>email {site.email}</a> for one
          in the meantime.
        </p>
      </div>

      <div className="space-y-14">
        <Section number="1.0" label="Summary">
          <div className="prose">
            <p>{intro.oneLiner}</p>
          </div>
        </Section>

        <Section
          number="2.0"
          label="Experience"
          note={
            <>
              {company.name} — {company.what}
              <br />
              {company.joined}
              <br />
              {company.atJoining} → {company.today}
            </>
          }
        >
          <h2 className="text-xl font-semibold tracking-[-0.01em] mb-4">{company.name}</h2>
          <ol className="space-y-8">
            {[...roles].reverse().map((role) => (
              <li key={role.phase} className="border-t border-rule pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold tracking-[-0.01em]">{role.titles.join(" / ")}</h3>
                  <span className="label">{role.period}</span>
                </div>
                <p className="mt-1.5 measure text-sm text-ink-muted leading-relaxed">
                  {role.thesis}
                </p>
                <ul className="mt-3 space-y-1 text-sm leading-relaxed text-ink">
                  {role.jobs.map((j) => (
                    <li key={j} className="pl-4 relative">
                      <span className="absolute left-0 text-ink-faint font-mono">—</span>
                      {j}
                    </li>
                  ))}
                </ul>
                {role.skills.length > 0 ? (
                  <p className="mt-3 font-mono text-xs text-ink-faint leading-relaxed">
                    {role.skills.join(" · ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </Section>

        <Section number="3.0" label="Education">
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <Field label="Degree">{education.degree}</Field>
            <Field label="Institution">
              {education.institution}, {education.location}
            </Field>
            <Field label="Period">{education.period}</Field>
            <Field label="Honours">{education.honours.join(", ")}</Field>
          </div>
        </Section>

        <Section number="4.0" label="Selected work" note={<>Products shipped at {company.name}.</>}>
          <ul className="border-t-[length:var(--line-heavy)] border-rule-strong">
            {products.map((p) => (
              <li key={p.name} className="border-b border-rule py-5 grid gap-1 sm:grid-cols-[10rem_1fr]">
                <div>
                  <p className="font-semibold tracking-[-0.005em]">{p.name}</p>
                  <p className="label mt-0.5">{p.line}</p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-ink-muted">{p.what}</p>
                  <p className="mt-1.5 text-xs text-ink-faint leading-relaxed italic">{p.hard}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}
