import { formatDate, type Doc } from "@/lib/content";

/**
 * Shared article furniture for /writing/[slug] and /notes/[section]/[slug].
 *
 * The section trail (Notes / <pillar>, or Writing) lives once, in the sticky
 * SiteHeader breadcrumb — repeating it here as a second back-link duplicated
 * the same fact three times on a single page. Reading time and the raw
 * collection slug are gone for the same reason: neither told the reader
 * anything the title and breadcrumb didn't already. Publish date moves to a
 * footer — it dates the note without competing with the title for attention.
 */
export function ArticleHeader({ doc }: { doc: Doc }) {
  return (
    <header className="mb-10 pb-8 border-b-[length:var(--line-heavy)] border-rule-strong">
      <h1 className="measure font-serif text-[clamp(2.5rem,5.5vw,3.75rem)] font-semibold tracking-[-0.02em] leading-[1.05] text-balance">
        {doc.title}
      </h1>
      {doc.tags?.length ? (
        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {doc.tags.map((tag) => (
            <span key={tag} className="label">#{tag}</span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

/** Publish/update date, at the bottom — a record-keeping fact, not a headline. */
export function ArticleFooter({ doc }: { doc: Doc }) {
  return (
    <footer className="mt-14 pt-6 border-t border-rule flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <time dateTime={doc.date} className="label">Published {formatDate(doc.date)}</time>
      {doc.updated && doc.updated !== doc.date ? (
        <time dateTime={doc.updated} className="label">Updated {formatDate(doc.updated)}</time>
      ) : null}
    </footer>
  );
}

export function ArticleLayout({ doc, children }: { doc: Doc; children: React.ReactNode }) {
  return (
    <article>
      <ArticleHeader doc={doc} />
      {children}
      <ArticleFooter doc={doc} />
    </article>
  );
}
