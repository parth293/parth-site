import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Field, Section } from "@/components/record";
import { education, intro } from "@/lib/pitch/profile";
import { products } from "@/lib/pitch/products";
import { company, roles } from "@/lib/pitch/timeline";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Structured resume — education and experience, product by product.",
};

/**
 * Renders from the same verified data as /journey and the interview pitch
 * (src/lib/pitch/*), so the web page, the eventual PDF, and the pitch can
 * never drift apart. No PDF exists yet — that is stated plainly below rather
 * than linking a file that 404s.
 */
/** Titles condensed to one per phase (the last title held during that
 *  phase), paired with its period — no new facts, just `roles` compressed
 *  into a single scannable line. Full per-phase detail stays at /journey. */
const rolesHeld = roles
  .map((role) => `${role.titles[role.titles.length - 1]} (${role.period})`)
  .join(" → ");

export default function ResumePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Curriculum vitae"
        title="Resume"
        lede="Education and experience, product by product — the structured version of the journey."
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
          <Field label="Roles held" className="mb-8">
            {rolesHeld}
          </Field>
          <ol className="space-y-8 border-t-[length:var(--line-heavy)] border-rule-strong">
            {products.map((p) => (
              <li key={p.name} className="border-b border-rule pt-5 pb-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold tracking-[-0.01em]">{p.name}</h3>
                  <span className="label">{p.line}</span>
                </div>
                <p className="mt-1.5 measure text-sm text-ink-muted leading-relaxed">{p.what}</p>
                <p className="mt-1.5 text-xs text-ink-faint leading-relaxed italic">{p.hard}</p>
                <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  <Field label="Target accounts">{p.targetAccounts.join(" · ")}</Field>
                  <Field label="Target people">{p.targetPeople.join(" · ")}</Field>
                  <Field label="Outcomes achieved">{p.outcomesAchieved.join(" · ")}</Field>
                  <Field label="Cost of inaction">{p.costOfInaction}</Field>
                  <Field label="Key accounts won" className="sm:col-span-2">
                    {p.keyAccountsWon.join(" · ")}
                  </Field>
                </div>
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
      </div>
    </PageShell>
  );
}
