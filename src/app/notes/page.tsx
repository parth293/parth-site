import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { Section } from "@/components/record";
import { getAllDocs, getNotes } from "@/lib/content";
import { pillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Three evolving bodies of notes: pharmaceutical engineering, bioprocess engineering, and GTM engineering.",
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

      <div className="space-y-14">
        <Section number="1.0" label="Sections on file">
          <ul className="space-y-3">
            {sections.map(({ pillar, docs }, i) => (
              <li key={pillar.slug}>
                <Link
                  href={`/notes/${pillar.slug}`}
                  className="group flex items-center justify-between gap-6 border border-rule px-6 py-7 transition-colors hover:border-ink hover:bg-ink sm:px-8 sm:py-9"
                >
                  <span className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-xs text-ink-faint tabular-nums transition-colors group-hover:text-paper/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-semibold tracking-[-0.01em] text-balance sm:text-2xl">
                      {pillar.title.endsWith(" Engineering") ? (
                        <>
                          <span className="text-subject transition-colors group-hover:text-paper">
                            {pillar.title.slice(0, -" Engineering".length)}
                          </span>{" "}
                          <span className="text-ink transition-colors group-hover:text-paper">
                            Engineering
                          </span>
                        </>
                      ) : (
                        <span className="text-ink transition-colors group-hover:text-paper">
                          {pillar.title}
                        </span>
                      )}
                    </h2>
                  </span>
                  <span className="flex items-center gap-4 shrink-0 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint transition-colors group-hover:text-paper/70">
                    {docs.length === 0 ? "Awaiting entry" : `${String(docs.length).padStart(2, "0")} notes`}
                    <span className="text-base transition-colors group-hover:text-paper" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section number="2.0" label="Recently added across all sections">
          <DocList docs={recent} showCollection emptyMessage="No notes published yet." />
        </Section>
      </div>
    </PageShell>
  );
}
