import Link from "next/link";
import { formatDate, type Doc } from "@/lib/content";

/**
 * The one way articles are listed anywhere on the site — /notes/*,
 * /writing, and the home page's latest-writing block all use this.
 * Each row is a record entry: a mono ID column, then the entry itself.
 */
export function DocList({
  docs,
  emptyMessage = "Awaiting entry.",
  showCollection = false,
}: {
  docs: Doc[];
  emptyMessage?: string;
  showCollection?: boolean;
}) {
  if (docs.length === 0) {
    return (
      <p className="measure border-t border-rule pt-5 text-ink-faint font-mono text-sm">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="border-t-[length:var(--line-heavy)] border-rule-strong">
      {docs.map((doc, i) => (
        <li key={doc.href} className="border-b border-rule">
          <Link
            href={doc.href}
            className="group grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 sm:grid-cols-[3rem_1fr]"
          >
            <span className="font-mono text-xs text-ink-faint tabular-nums pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <time dateTime={doc.date} className="label">
                  {formatDate(doc.date)}
                </time>
                {showCollection ? (
                  <span className="label">{doc.collection}</span>
                ) : null}
                <span className="label">{doc.readingMinutes} min</span>
                {doc.updated && doc.updated !== doc.date ? (
                  <span className="label">Updated {formatDate(doc.updated)}</span>
                ) : null}
              </div>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink group-hover:text-accent transition-colors text-balance">
                {doc.title}
              </h3>
              <p className="measure mt-1.5 text-ink-muted leading-relaxed text-pretty">
                {doc.summary}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
