import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionRail, type RailItem } from "@/components/pitch/section-rail";
import { Section, TriColumn, TodoBadge } from "@/components/pitch/section";
import { companies, companyBySlug } from "@/lib/pitch/companies";
import { education, intro } from "@/lib/pitch/profile";
import { products } from "@/lib/pitch/products";
import { isTodo, stories } from "@/lib/pitch/stories";
import { company as leucine, roles } from "@/lib/pitch/timeline";

type Params = { params: Promise<{ company: string }> };

export function generateStaticParams() {
  return companies.map((c) => ({ company: c.slug }));
}

/** Unlisted by design — this carries per-employer research and client detail. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { company } = await params;
  const c = companyBySlug[company];
  return {
    title: c ? `Pitch · ${c.name}` : "Pitch",
    robots: { index: false, follow: false, nocache: true },
  };
}

const RAIL: RailItem[] = [
  { id: "who", label: "Who I am" },
  { id: "education", label: "Education" },
  { id: "timeline", label: "Roles & outcomes" },
  { id: "products", label: "What I built" },
  { id: "stories", label: "Deal stories" },
  { id: "context", label: "Your market" },
  { id: "close", label: "Where I fit" },
];

export default async function PitchPage({ params }: Params) {
  const { company } = await params;
  const target = companyBySlug[company];
  if (!target) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-10 sm:py-14">
      <header className="mb-12 pb-6 border-b border-rule-strong">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">{intro.name}</h1>
          <p className="label">
            Prepared for {target.name} · {target.role}
          </p>
        </div>
        <p className="measure mt-4 text-lg leading-relaxed text-ink-muted text-pretty">
          {intro.oneLiner}
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <SectionRail items={RAIL} />
        </aside>

        <div className="min-w-0 space-y-4">
          {/* 01 — Who I am */}
          <Section id="who" index={1} title="Who I am">
            <div className="measure space-y-4">
              {intro.frame.map((line) => (
                <p key={line} className="leading-relaxed text-ink-muted text-pretty">
                  {line}
                </p>
              ))}
            </div>
            <dl className="mt-7 grid gap-4 sm:grid-cols-3 border-t border-rule pt-5">
              <div>
                <dt className="label mb-1">Based in</dt>
                <dd className="text-[0.9375rem]">{intro.basedIn}</dd>
              </div>
              <div>
                <dt className="label mb-1">Trained as</dt>
                <dd className="text-[0.9375rem]">Pharmaceutical engineer</dd>
              </div>
              <div>
                <dt className="label mb-1">Six years at</dt>
                <dd className="text-[0.9375rem]">
                  {leucine.name} — {leucine.what}
                </dd>
              </div>
            </dl>
          </Section>

          {/* 02 — Education */}
          <Section
            id="education"
            index={2}
            title={education.degree}
            lede={`${education.institution}, ${education.location} · ${education.period}`}
          >
            <ul className="flex flex-wrap gap-x-2 gap-y-2 mb-8">
              {education.honours.map((h) => (
                <li
                  key={h}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] border border-rule-strong px-2 py-1"
                >
                  {h}
                </li>
              ))}
            </ul>

            <h3 className="label mb-3">Why this is not a B.Pharm</h3>
            <div className="overflow-x-auto mb-9">
              <table className="w-full text-[0.9375rem] border-collapse min-w-[34rem]">
                <thead>
                  <tr>
                    {["Dimension", "Standard B.Pharm", "This degree"].map((h) => (
                      <th
                        key={h}
                        className="label text-left border-b border-rule-strong pb-2 pr-4 font-normal"
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

            <details className="group border-t border-rule pt-4">
              <summary className="label cursor-pointer hover:text-accent transition-colors list-none">
                Coursework and lab work — open if asked ▸
              </summary>
              <div className="mt-6 grid gap-7 sm:grid-cols-2">
                {education.coursework.map((group) => (
                  <div key={group.group}>
                    <h4 className="text-[0.9375rem] font-semibold mb-1">{group.group}</h4>
                    {group.note ? (
                      <p className="text-[0.875rem] text-ink-faint mb-2 text-pretty">
                        {group.note}
                      </p>
                    ) : null}
                    <p className="text-[0.875rem] leading-relaxed text-ink-muted">
                      {group.subjects.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
              <h4 className="label mt-7 mb-3">Wet lab</h4>
              <ul className="grid gap-3 sm:grid-cols-2">
                {education.labs.map((lab) => (
                  <li key={lab.area} className="text-[0.875rem] leading-relaxed">
                    <span className="font-medium">{lab.area}</span>
                    <span className="text-ink-muted"> — {lab.work}</span>
                  </li>
                ))}
              </ul>
            </details>
          </Section>

          {/* 03 — Timeline */}
          <Section
            id="timeline"
            index={3}
            title="Roles, outcomes, skills"
            lede={`${leucine.name}, ${leucine.joined}. The company went from ${leucine.atJoining} to ${leucine.today} over that period.`}
          >
            <ol className="space-y-10">
              {roles.map((role, i) => (
                <li
                  key={role.phase}
                  className="grid gap-5 lg:grid-cols-[9rem_minmax(0,1fr)]"
                >
                  <div className="lg:border-r lg:border-rule lg:pr-5">
                    <p className="font-mono text-[0.6875rem] text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, "0")} · {role.period}
                    </p>
                    <h3 className="mt-1 text-[1.0625rem] font-semibold tracking-[-0.01em] text-balance">
                      {role.phase}
                    </h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-faint text-pretty">
                      {role.titles.join(" · ")}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="measure mb-5 leading-relaxed text-ink text-pretty">
                      {role.thesis}
                    </p>
                    <TriColumn
                      columns={[
                        { heading: "Jobs done", items: role.jobs },
                        { heading: "Outcomes", items: role.outcomes },
                        { heading: "Skills built", items: role.skills },
                      ]}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* 04 — Products */}
          <Section
            id="products"
            index={4}
            title="What I built"
            lede="Context for the stories that follow — the five product lines and what makes each one non-trivial."
          >
            <ul className="grid gap-px bg-rule border border-rule sm:grid-cols-2">
              {products.map((p) => (
                <li key={p.name} className="bg-paper p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em]">
                      {p.name}
                    </h3>
                    <span className="label shrink-0">{p.line}</span>
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted text-pretty">
                    {p.what}
                  </p>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-faint text-pretty border-l-2 border-rule pl-3">
                    {p.hard}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          {/* 05 — Stories */}
          <Section
            id="stories"
            index={5}
            title="How the deals actually ran"
            lede="Anonymised accounts, profiled richly enough to picture. Each one broken into the six stages so you can stop me at any of them."
          >
            <div className="space-y-10">
              {stories.map((story) => (
                <article key={story.slug} className="border-t border-rule-strong pt-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="label text-accent">{story.region}</span>
                    <span className="label">{story.product}</span>
                  </div>
                  <p className="measure font-medium leading-relaxed text-pretty">
                    {story.profile}
                  </p>
                  <p className="measure mt-2 leading-relaxed text-ink-muted text-pretty">
                    {isTodo(story.hook) ? <TodoBadge /> : story.hook}
                  </p>

                  <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                    {[
                      { k: "Why buy", v: story.whyBuy },
                      { k: "Why now", v: story.whyNow },
                      { k: "Why us", v: story.whyUs },
                    ].map(({ k, v }) => (
                      <div key={k}>
                        <dt className="label mb-1.5">{k}</dt>
                        <dd className="text-[0.9375rem] leading-relaxed text-ink-muted text-pretty">
                          {isTodo(v) ? <TodoBadge /> : v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ol className="mt-6 grid gap-px bg-rule border border-rule sm:grid-cols-2 lg:grid-cols-3">
                    {story.stages.map((s, i) => (
                      <li key={s.stage} className="bg-paper p-4">
                        <p className="label mb-1.5">
                          {String(i + 1).padStart(2, "0")} · {s.stage}
                        </p>
                        <p className="text-[0.875rem] leading-relaxed text-ink-muted text-pretty">
                          {isTodo(s.what) ? <TodoBadge /> : s.what}
                        </p>
                      </li>
                    ))}
                  </ol>

                  {story.outcome ? (
                    <p className="measure mt-4 text-[0.9375rem] leading-relaxed">
                      <span className="label mr-2">Outcome</span>
                      {isTodo(story.outcome) ? <TodoBadge /> : story.outcome}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </Section>

          {/* 06 — Their market */}
          <Section
            id="context"
            index={6}
            title={`How I read ${target.name}`}
            lede={target.industry}
          >
            <div className="space-y-8">
              {target.map.map((unit) => (
                <div key={unit.unit} className="border-t border-rule-strong pt-5">
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-balance">
                    {unit.unit}
                  </h3>
                  <p className="measure mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted text-pretty">
                    {unit.targetAccounts}
                  </p>
                  <div className="mt-5">
                    <TriColumn
                      columns={[
                        { heading: "Who you sell to", items: unit.personas },
                        { heading: "Their pain", items: unit.painPoints },
                        { heading: "What lands", items: unit.valueProps },
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 07 — Close */}
          <Section
            id="close"
            index={7}
            title="Where I think I fit"
            lede="This is a hypothesis, not a claim. I would rather be corrected here than be right in the abstract."
          >
            <ul className="measure space-y-3 mb-9">
              {target.contribution.map((c) => (
                <li key={c} className="leading-relaxed text-ink-muted text-pretty">
                  {c}
                </li>
              ))}
            </ul>
            <div className="border-t border-rule-strong pt-5">
              <h3 className="label mb-3">What I would like to ask you</h3>
              <ol className="measure space-y-2.5">
                {target.questions.map((q, i) => (
                  <li key={q} className="flex gap-3 leading-relaxed text-pretty">
                    <span className="font-mono text-[0.75rem] text-ink-faint tabular-nums shrink-0 pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
