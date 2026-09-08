import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The primitives of "The Controlled Record" — see DESIGN_BRIEF.md. These
 * compose inside PageShell (page-shell.tsx), which is the one page container.
 *
 * The rules these encode:
 *   - Section numbering is load-bearing navigation, not decoration.
 *   - Every value carries a label. A bare value is a bug.
 *   - Empty means AWAITING ENTRY, never a bare 0.
 *   - Accent means "this is a link." Nothing else gets it — not ordinals,
 *     not status, not section numbers. A colour that marks six unrelated
 *     things marks nothing (this was a two-round critic finding, not a
 *     guess — see the Phase 4 notes in REDESIGN_PLAN.md).
 *   - A margin note earns its keep with real, per-section content or it
 *     doesn't render at all. A persistent third grid column that's empty on
 *     most sections was the single most repeated critique of this system,
 *     so notes are a hanging annotation under the content, not a column.
 */

/**
 * A numbered section. `note`, when present, renders as a hanging annotation
 * under the content — not a side column, which stayed empty on every section
 * that didn't have three paragraphs of marginalia to fill it.
 */
export function Section({
  number,
  label,
  note,
  children,
  className = "",
}: {
  number: string;
  label: string;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`grid grid-cols-[3rem_minmax(0,1fr)] sm:grid-cols-[4rem_minmax(0,1fr)] gap-x-6 gap-y-3 border-t-[length:var(--line-heavy)] border-rule-strong pt-4 ${className}`}
    >
      <div className="flex items-baseline gap-3 sm:block">
        <span className="section-no relative top-px">{number}</span>
      </div>
      <div className="min-w-0">
        <p className="field-label">{label}</p>
        {children}
        {note ? (
          <div className="mt-5 max-w-md space-y-3 border-l-2 border-rule pl-3 font-mono text-xs leading-relaxed text-ink-faint">
            {note}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** A labelled field: the atom of a controlled document. */
export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="field-label">{label}</span>
      <div className="font-mono text-sm text-ink">{children}</div>
    </div>
  );
}

/**
 * Status of a collection — plain right-aligned mono, differentiated only by
 * ink weight, sitting on the title's baseline. Not boxed: a bordered pill on
 * every single row was flagged twice as the kind of decoration a component
 * library reaches for by default rather than a choice anyone made.
 */
export function Status({ count, unit = "entry" }: { count: number; unit?: string }) {
  if (count === 0) {
    return (
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
        Awaiting entry
      </span>
    );
  }
  return (
    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink">
      {String(count).padStart(2, "0")} {count === 1 ? unit : `${unit.replace(/y$/, "ie")}s`}
    </span>
  );
}

/**
 * A numbered figure. Captions state what the figure shows AND what it means.
 * Reserve this for content that actually rewards a figure — a distribution
 * or a series with enough real information in it — not applied reflexively
 * to every section that has numbers in it. A two-bit chart that restates a
 * sentence already on the page is worse than no figure.
 */
export function Figure({
  number,
  caption,
  children,
}: {
  number: number;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8">
      <div className="border border-rule bg-paper-raised p-4 sm:p-6">{children}</div>
      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-ink-faint">
        <span className="text-ink">Fig. {number}</span> — {caption}
      </figcaption>
    </figure>
  );
}

/** A document-style cross-reference — an underlined mono link, not a button. */
export function CrossRef({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-mono text-xs uppercase tracking-[0.1em] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
    >
      {children}
    </Link>
  );
}
