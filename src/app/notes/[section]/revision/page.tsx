import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Section } from "@/components/record";
import { Mdx } from "@/components/mdx";
import { renderMath, renderInlineLine } from "@/lib/katex-html";
import { getNotes } from "@/lib/content";
import { getFormulasForNote } from "@/lib/formulas";
import { getKeyPointsForNote } from "@/lib/key-points";
import { pillarBySlug, pillars, type PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string }> };
type SearchParams = { searchParams: Promise<{ show?: string }> };

export function generateStaticParams() {
  return pillars.map((p) => ({ section: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { section } = await params;
  const pillar = pillarBySlug[section as PillarSlug];
  if (!pillar) return {};
  return {
    title: `${pillar.title} — Revision sheet`,
    description: `Every formula and key point across ${pillar.title}, in one scroll.`,
  };
}

export default async function RevisionSheetPage({ params, searchParams }: Params & SearchParams) {
  const { section } = await params;
  const { show } = await searchParams;
  const onlyVeryImportant = show === "very-important";
  const pillar = pillarBySlug[section as PillarSlug];
  if (!pillar) notFound();

  const docs = await getNotes(pillar.slug);
  const groups = await Promise.all(
    docs.map(async (doc) => {
      const keyPoints = await getKeyPointsForNote(pillar.slug, doc.slug);
      const allFormulas = await getFormulasForNote(pillar.slug, doc.slug);
      return { doc, keyPoints, allFormulas };
    }),
  );

  const veryImportantCount = groups.reduce(
    (n, g) => n + g.allFormulas.filter((f) => f.importance === "very-important").length,
    0,
  );
  const basePath = `/notes/${pillar.slug}/revision`;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Notes"
        title={`${pillar.title} — Revision sheet`}
        lede="Every formula and key point across this section, in one scroll — for the daily pass, not the first read."
      />

      {veryImportantCount > 0 ? (
        <div className="mb-10 flex items-baseline gap-4">
          <Link
            href={basePath}
            aria-current={!onlyVeryImportant ? "page" : undefined}
            className={`font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent ${
              !onlyVeryImportant ? "text-ink" : "text-ink-faint"
            }`}
          >
            All
          </Link>
          <Link
            href={`${basePath}?show=very-important`}
            aria-current={onlyVeryImportant ? "page" : undefined}
            className={`font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent ${
              onlyVeryImportant ? "text-ink" : "text-ink-faint"
            }`}
          >
            Very important ({veryImportantCount})
          </Link>
        </div>
      ) : null}

      <div className="space-y-16">
        {groups.map(({ doc, keyPoints, allFormulas }, i) => {
          const formulas = onlyVeryImportant
            ? allFormulas.filter((f) => f.importance === "very-important")
            : allFormulas;
          const showKeyPoints = keyPoints.length > 0 && !onlyVeryImportant;

          if (formulas.length === 0 && !showKeyPoints) return null;

          return (
            <Section
              key={doc.slug}
              number={`${i + 1}.0`}
              label={doc.title}
              note={
                <Link href={doc.href} className="text-accent hover:text-accent-dim transition-colors">
                  Full note →
                </Link>
              }
            >
              {showKeyPoints ? (
                <div className="mb-8">
                  <p className="field-label mb-3">Key points</p>
                  <ul className="space-y-2">
                    {keyPoints.map((p, pi) => (
                      <li key={pi} className="flex gap-3 text-sm text-ink-muted [&_p]:m-0">
                        <span className="font-mono text-xs text-ink-faint shrink-0 pt-0.5">
                          {String(pi + 1).padStart(2, "0")}
                        </span>
                        <Mdx source={p.text} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {formulas.length > 0 ? (
                <div className="space-y-5">
                  {formulas.map((f, fi) => (
                    <div
                      key={fi}
                      className={`border bg-paper-raised p-5 ${
                        f.importance === "very-important"
                          ? "border-[length:var(--line-heavy)] border-rule-strong"
                          : "border-rule"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-4 flex-wrap">
                        <h3
                          className="font-mono text-sm font-medium text-ink"
                          dangerouslySetInnerHTML={{ __html: renderInlineLine(f.heading) }}
                        />
                        {f.importance === "very-important" ? (
                          <span className="font-mono text-[length:var(--text-2xs)] font-medium uppercase tracking-[0.1em] text-ink">
                            Very important
                          </span>
                        ) : null}
                      </div>
                      <div
                        className="mt-3 [&_.katex-display]:m-0 [&_.katex-display]:border-0 [&_.katex-display]:bg-transparent [&_.katex-display]:p-0 overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: renderMath(f.latex, true) }}
                      />
                      {f.vars.length > 0 ? (
                        <ul className="mt-4 space-y-1.5 text-sm text-ink-muted border-t border-rule pt-3">
                          {f.vars.map((v, vi) => (
                            <li key={vi} dangerouslySetInnerHTML={{ __html: renderInlineLine(v) }} />
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </Section>
          );
        })}
      </div>
    </PageShell>
  );
}
