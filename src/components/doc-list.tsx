import Link from "next/link";
import { formatDate, type Doc } from "@/lib/content";

/**
 * The one way articles are listed anywhere on the site — /notes/*,
 * /writing, and the home page's latest-writing block all use this.
 */
export function DocList({
  docs,
  emptyMessage = "Nothing published here yet.",
  showCollection = false,
}: {
  docs: Doc[];
  emptyMessage?: string;
  showCollection?: boolean;
}) {
  if (docs.length === 0) {
    return (
      <p className="measure text-ink-faint italic">{emptyMessage}</p>
    );
  }

  return (
    <ul className="border-t border-rule">
      {docs.map((doc) => (
        <li key={doc.href} className="border-b border-rule">
          <Link href={doc.href} className="group block py-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <time dateTime={doc.date} className="label">
                {formatDate(doc.date)}
              </time>
              {showCollection ? (
                <span className="label text-accent">{doc.collection}</span>
              ) : null}
              <span className="label">{doc.readingMinutes} min</span>
              {doc.updated && doc.updated !== doc.date ? (
                <span className="label">Updated {formatDate(doc.updated)}</span>
              ) : null}
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink group-hover:text-accent transition-colors text-balance">
              {doc.title}
            </h3>
            <p className="measure mt-1.5 text-ink-muted leading-relaxed text-pretty">
              {doc.summary}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
