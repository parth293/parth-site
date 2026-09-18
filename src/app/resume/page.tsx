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

          <div className="mt-8 overflow-x-auto">
            <p className="label mb-3">Why this is not a B.Pharm</p>
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr>
                  {["Dimension", "Standard B.Pharm", "This degree"].map((h) => (
                    <th
                      key={h}
                      className="label border-b border-rule-strong pb-2 pr-4 text-left font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {education.contrast.map((row) => (
                  <tr key={row.dimension}>
                    <td className="border-b border-rule py-2.5 pr-4 align-top font-medium">
                      {row.dimension}
                    </td>
                    <td className="border-b border-rule py-2.5 pr-4 align-top text-ink-faint">
                      {row.bpharm}
                    </td>
                    <td className="border-b border-rule py-2.5 align-top text-ink-muted">
                      {row.mine}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <details className="group mt-8 border-t border-rule pt-4">
            <summary className="label cursor-pointer list-none transition-colors hover:text-accent">
              Full academic record — coursework, labs, transcript ▸
            </summary>

            <div className="mt-6 grid gap-7 sm:grid-cols-2">
              {education.coursework.map((group) => (
                <div key={group.group}>
                  <h4 className="text-[0.9375rem] font-semibold mb-1">{group.group}</h4>
                  {group.note ? (
                    <p className="mb-2 text-sm text-ink-faint text-pretty">{group.note}</p>
                  ) : null}
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {group.subjects.join(" · ")}
                  </p>
                </div>
              ))}
            </div>

            <h4 className="label mb-3 mt-8">Wet lab exposure</h4>
            <ul className="grid gap-3 sm:grid-cols-2">
              {education.labs.map((lab) => (
                <li key={lab.area} className="text-sm leading-relaxed">
                  <span className="font-medium">{lab.area}</span>
                  <span className="text-ink-muted"> — {lab.work}</span>
                </li>
              ))}
            </ul>

            <h4 className="label mb-3 mt-8">Semester-by-semester transcript</h4>
            <div className="space-y-6">
              {education.transcript.map((yr) => (
                <div key={yr.year}>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.06em] text-ink-faint">
                    {yr.year} · {yr.period}
                    {yr.note ? <span className="text-ink-muted"> — {yr.note}</span> : null}
                  </p>
                  <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {yr.subjects.map((s) => (
                      <li
                        key={s.name}
                        className="flex items-baseline justify-between gap-3 text-sm leading-relaxed"
                      >
                        <span className="text-ink-muted">{s.name}</span>
                        {s.grade ? (
                          <span className="font-mono text-xs text-ink-faint">{s.grade}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </Section>
      </div>
    </PageShell>
  );
}
