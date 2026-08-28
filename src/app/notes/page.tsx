import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { getAllDocs, getNotes } from "@/lib/content";
import { pillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Three evolving bodies of notes: pharmaceutical engineering, GATE-BT preparation, and technical sales engineering.",
};

export default async function NotesIndexPage() {
  const sections = await Promise.all(
    pillars.map(async (pillar) => ({ pillar, docs: await getNotes(pillar.slug) })),
  );
  const all = await getAllDocs();
  const recent = all.filter((d) => d.collection !== "writing").slice(0, 5);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Digital garden"
        title="Notes"
        lede="Three sections that grow over time rather than getting finished. Each has its own way of thinking; none of them is a tutorial series."
      />

      <div className="space-y-10 mb-20">
        {sections.map(({ pillar, docs }) => (
          <section key={pillar.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-xl font-semibold tracking-[-0.01em]">
                <Link href={`/notes/${pillar.slug}`} className="text-ink hover:text-accent transition-colors">
                  {pillar.title}
                </Link>
              </h2>
              <span className="label">
                {docs.length} {docs.length === 1 ? "note" : "notes"}
              </span>
            </div>
            <p className="measure mt-2 leading-relaxed text-ink-muted text-pretty">
              {pillar.summary}
            </p>
            <Link
              href={`/notes/${pillar.slug}`}
              className="inline-block mt-3 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint hover:text-accent transition-colors"
            >
              Enter section →
            </Link>
          </section>
        ))}
      </div>

      <section>
        <h2 className="label mb-5">Recently added across all sections</h2>
        <DocList docs={recent} showCollection emptyMessage="No notes published yet." />
      </section>
    </PageShell>
  );
}
