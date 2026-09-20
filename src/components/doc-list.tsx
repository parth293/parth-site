import Link from "next/link";
import type { Doc } from "@/lib/content";

/**
 * The one way articles are listed anywhere on the site — /notes/*,
 * /writing, and cross-collection listings all use this. One line per
 * entry, deliberately: a mono ID, the title, and nothing else — a date or
 * a summary is one click away on the article itself, not repeated here.
 * The one sanctioned exception is `getSecondaryLink`, which a caller can
 * use to surface a second, specific route per entry (e.g. bioprocess-eng's
 * per-note Formulas tab) without turning this into a general metadata row.
 */
export function DocList({
  docs,
  emptyMessage = "Awaiting entry.",
  showCollection = false,
  getSecondaryLink,
}: {
  docs: Doc[];
  emptyMessage?: string;
  showCollection?: boolean;
  getSecondaryLink?: (doc: Doc) => { href: string; label: string } | null;
}) {
  if (docs.length === 0) {
    return (
      <p className="measure border-t border-rule pt-5 text-ink-faint font-mono text-sm">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="max-w-2xl">
      {docs.map((doc, i) => {
        const secondary = getSecondaryLink?.(doc) ?? null;
        return (
          <li key={doc.href} className="border-t border-rule first:border-t-0">
            <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-3 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-xs text-ink-faint tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex min-w-0 items-baseline justify-between gap-3">
                <Link href={doc.href} className="group flex min-w-0 items-baseline gap-3">
                  {showCollection ? (
                    <span className="label shrink-0">{doc.collection}</span>
                  ) : null}
                  <h3 className="truncate text-lg font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                    {doc.title}
                  </h3>
                  {doc.draft ? <span className="label shrink-0">private</span> : null}
                </Link>
                {secondary ? (
                  <Link
                    href={secondary.href}
                    className="shrink-0 font-mono text-xs text-ink-faint transition-colors hover:text-accent"
                  >
                    {secondary.label} →
                  </Link>
                ) : null}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
