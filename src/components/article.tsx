import Link from "next/link";
import { formatDate, type Doc } from "@/lib/content";

/**
 * Shared article furniture for /writing/[slug] and /notes/[section]/[slug].
 *
 * Metadata renders as one inline row under the title rather than a side
 * rail. A permanent margin column cost width that reference-dense notes
 * (tables, equations, definition lists) need more than a repeated
 * read-time figure justifies — flagged directly against the Bioprocess
 * Engineering fluid-mechanics note, which is exactly that kind of page.
 */
/** The title/date/tags block shared by every article shape — plain header, or header plus tabs. */
export function ArticleHeader({
  doc,
  backHref,
  backLabel,
}: {
  doc: Doc;
  backHref: string;
  backLabel: string;
}) {
  return (
    <header className="mb-10 pb-8 border-b-[length:var(--line-heavy)] border-rule-strong">
      <Link href={backHref} className="label hover:text-accent transition-colors">
        {backLabel}
      </Link>
      <h1 className="mt-4 measure font-serif text-[clamp(2.5rem,5.5vw,3.75rem)] font-semibold tracking-[-0.02em] leading-[1.05] text-balance">
        {doc.title}
      </h1>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="label">{doc.collection}</span>
        <time dateTime={doc.date} className="label">{formatDate(doc.date)}</time>
        <span className="label">{doc.readingMinutes} min read</span>
        {doc.updated && doc.updated !== doc.date ? (
          <span className="label">Updated {formatDate(doc.updated)}</span>
        ) : null}
        {doc.tags?.map((tag) => (
          <span key={tag} className="label">#{tag}</span>
        ))}
      </div>
    </header>
  );
}

export function ArticleLayout({
  doc,
  backHref,
  backLabel,
  children,
}: {
  doc: Doc;
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <ArticleHeader doc={doc} backHref={backHref} backLabel={backLabel} />
      {children}
    </article>
  );
}
