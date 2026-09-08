import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { Section, Status } from "@/components/record";
import { getAllDocs, getNotes } from "@/lib/content";
import { pillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Four evolving bodies of notes: pharmaceutical engineering, bioprocess engineering, GATE-BT preparation, and technical sales engineering.",
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
        lede="Four sections that grow over time rather than getting finished. Each has its own way of thinking; none of them is a tutorial series."
      />

      <div className="space-y-14">
        <Section number="1.0" label="Sections on file">
          <ul className="border-t-[length:var(--line-heavy)] border-rule-strong">
            {sections.map(({ pillar, docs }, i) => (
              <li key={pillar.slug} className="border-b border-rule">
                <Link
                  href={`/notes/${pillar.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 sm:grid-cols-[3rem_1fr_auto]"
                >
                  <span className="font-mono text-xs text-ink-faint tabular-nums self-start pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink group-hover:text-accent transition-colors text-balance">
                      {pillar.title}
                    </h2>
                    <p className="measure mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted text-pretty">
                      {pillar.summary}
                    </p>
                  </span>
                  <Status count={docs.length} unit="note" />
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
