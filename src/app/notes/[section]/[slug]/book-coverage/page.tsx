import Link from "next/link";
import { Section, Status } from "@/components/record";
import { getBookCoverageForNote, type CoverageLevel, type CoverageTopic } from "@/lib/book-coverage";
import type { PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string; slug: string }> };

const LEVEL: Record<CoverageLevel, { glyph: string; label: string; className: string }> = {
  full: { glyph: "●", label: "Full", className: "text-ink" },
  partial: { glyph: "◐", label: "Partial", className: "text-ink-muted" },
  none: { glyph: "○", label: "None", className: "text-ink-faint" },
};

function LevelBadge({ level }: { level: CoverageLevel }) {
  const { glyph, label, className } = LEVEL[level];
  return (
    <span className={`inline-flex shrink-0 items-baseline gap-1.5 font-mono text-xs ${className}`}>
      <span aria-hidden>{glyph}</span>
      <span className="uppercase tracking-[0.08em]">{label}</span>
    </span>
  );
}

function TopicRow({ topic }: { topic: CoverageTopic }) {
  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-sm text-ink">
          {topic.code} {topic.title}
        </span>
        <LevelBadge level={topic.level} />
      </div>
      <p className="mt-1 text-sm text-ink-muted">{topic.note}</p>
    </li>
  );
}

export default async function NoteBookCoveragePage({ params }: Params) {
  const { section, slug } = await params;
  const books = await getBookCoverageForNote(section as PillarSlug, slug);
  const basePath = `/notes/${section}/${slug}`;

  return (
    <Section
      number="1.0"
      label="Book coverage"
      note={
        <p>
          Judged against the syllabus at topic level, from each book&rsquo;s table of
          contents — a chapter heading makes an item plausible, not confirmed.
        </p>
      }
    >
      {books.length === 0 ? (
        <p className="text-ink-muted">No book has been checked against this syllabus yet.</p>
      ) : (
        <div className="space-y-10">
          {books.map((book) => (
            <div key={book.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule pb-3">
                <h2 className="font-mono text-sm font-medium text-ink">{book.title}</h2>
                <Status count={book.totals.full + book.totals.partial + book.totals.none} unit="topic" />
              </div>
              <p className="mt-2 font-mono text-xs text-ink-faint">
                {book.totals.full} full · {book.totals.partial} partial · {book.totals.none} none
              </p>

              <div className="mt-5 space-y-4">
                {book.sections.map((sec) => (
                  <details key={sec.code} open className="group">
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-baseline gap-2 font-mono text-sm text-ink">
                        <span className="text-accent transition-transform group-open:rotate-90">▸</span>
                        {sec.code}. {sec.title}
                      </span>
                      <span className="font-mono text-xs text-ink-faint shrink-0">
                        {sec.counts.full} full · {sec.counts.partial} partial · {sec.counts.none} none
                      </span>
                    </summary>

                    <ul className="mt-2 divide-y divide-rule border-l-2 border-rule pl-5">
                      {sec.topics.map((topic) => (
                        <TopicRow key={topic.code} topic={topic} />
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href={basePath}
        className="mt-8 inline-block font-mono text-xs text-accent hover:text-accent-dim transition-colors"
      >
        ← Back to notes
      </Link>
    </Section>
  );
}
