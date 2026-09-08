import Link from "next/link";
import { Section, Status } from "@/components/record";
import { getFormulasForNote } from "@/lib/formulas";
import { renderMath, renderInlineLine } from "@/lib/katex-html";
import type { PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string; slug: string }> };
type SearchParams = { searchParams: Promise<{ show?: string }> };

export default async function NoteFormulasPage({ params, searchParams }: Params & SearchParams) {
  const { section, slug } = await params;
  const { show } = await searchParams;
  const onlyVeryImportant = show === "very-important";

  const allFormulas = await getFormulasForNote(section as PillarSlug, slug);
  const veryImportantCount = allFormulas.filter((f) => f.importance === "very-important").length;
  const formulas = onlyVeryImportant
    ? allFormulas.filter((f) => f.importance === "very-important")
    : allFormulas;

  const basePath = `/notes/${section}/${slug}`;

  return (
    <Section number="1.0" label="Equations" note={<Status count={formulas.length} unit="formula" />}>
      {veryImportantCount > 0 ? (
        <div className="mb-5 flex items-baseline gap-4">
          <Link
            href={`${basePath}/formulas`}
            aria-current={!onlyVeryImportant ? "page" : undefined}
            className={`font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent ${
              !onlyVeryImportant ? "text-ink" : "text-ink-faint"
            }`}
          >
            All
          </Link>
          <Link
            href={`${basePath}/formulas?show=very-important`}
            aria-current={onlyVeryImportant ? "page" : undefined}
            className={`font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent ${
              onlyVeryImportant ? "text-ink" : "text-ink-faint"
            }`}
          >
            Very important ({veryImportantCount})
          </Link>
        </div>
      ) : null}

      {formulas.length === 0 ? (
        <p className="text-ink-muted">
          {onlyVeryImportant
            ? "No formulas tagged very-important yet."
            : "No formulas in this note yet."}
        </p>
      ) : (
        <div className="space-y-6">
          {formulas.map((f, i) => (
            <div
              key={i}
              className={`border bg-paper-raised p-5 sm:p-6 ${
                f.importance === "very-important"
                  ? "border-[length:var(--line-heavy)] border-rule-strong"
                  : "border-rule"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div className="flex items-baseline gap-3">
                  <h2
                    className="font-mono text-sm font-medium text-ink"
                    dangerouslySetInnerHTML={{ __html: renderInlineLine(f.heading) }}
                  />
                  {f.importance === "very-important" ? (
                    <span className="font-mono text-[length:var(--text-2xs)] font-medium uppercase tracking-[0.1em] text-ink">
                      Very important
                    </span>
                  ) : null}
                </div>
                <Link
                  href={`${basePath}#${f.headingSlug}`}
                  className="font-mono text-xs text-accent hover:text-accent-dim transition-colors shrink-0"
                >
                  In notes →
                </Link>
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
      )}
    </Section>
  );
}
