import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { CrossRef, Section, Status } from "@/components/record";
import { getAllDocs, getWriting } from "@/lib/content";
import { pillars, site } from "@/lib/site";

export default async function HomePage() {
  const [writing, all] = await Promise.all([getWriting(), getAllDocs()]);

  // Writing sits alongside the notes pillars as its own row.
  const collections = [
    ...pillars.map((p) => ({
      href: `/notes/${p.slug}`,
      title: p.title,
      summary: p.summary,
      count: all.filter((d) => d.collection === p.slug).length,
    })),
    {
      href: "/writing",
      title: "Writing",
      summary:
        "Essays and book notes on whatever I am thinking through — less structured than the notes, more opinionated.",
      count: writing.length,
    },
  ];

  const filled = collections.filter((c) => c.count > 0).length;
  const recent = all.slice(0, 5);

  return (
    <PageShell>
      <div className="space-y-14">
        <Section number="1.0" label="Identification">
          <h1 className="font-mono text-[length:var(--text-display)] font-medium tracking-[-0.01em] leading-[1.02] text-balance">
            {site.name}
          </h1>
          <p className="measure mt-5 text-lg leading-snug text-ink italic font-serif text-pretty">
            &ldquo;{site.tagline}&rdquo;
          </p>
          <p className="measure mt-5 leading-relaxed text-ink-muted text-pretty">
            Six years at{" "}
            <span className="font-mono text-[0.9em] text-ink">Leucine</span>, building and
            selling GMP compliance software to pharmaceutical manufacturers — from
            implementation specialist to Director of Strategic Initiatives. Trained as an
            engineer at{" "}
            <span className="font-mono text-[0.9em] text-ink">IIT BHU</span>. Currently
            working out what comes next, in public.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <CrossRef href="/resume">→ Resume</CrossRef>
            <CrossRef href="/journey">→ Full history</CrossRef>
          </div>
        </Section>

        <Section
          number="2.0"
          label="Collections on file"
          note={
            <>
              {filled} of {collections.length} collections carry an entry as of
              this revision. The rest are open, not closed.
            </>
          }
        >
          <h2 className="text-2xl font-semibold tracking-[-0.01em] mb-4">Notes &amp; writing</h2>
          <ul className="border-t border-rule-strong">
            {collections.map((c, i) => (
              <li key={c.href} className="border-b border-rule">
                <Link
                  href={c.href}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 sm:grid-cols-[3rem_1fr_auto]"
                >
                  <span className="font-mono text-xs text-ink-faint tabular-nums self-start pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink group-hover:text-accent transition-colors text-balance">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted text-pretty measure">
                      {c.summary}
                    </p>
                  </span>
                  <Status count={c.count} unit="piece" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          number="3.0"
          label="Revision history"
          note={<>Most recent entries across every collection, newest first.</>}
        >
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="text-2xl font-semibold tracking-[-0.01em]">Recently added</h2>
            <Link
              href="/writing"
              className="font-mono text-xs uppercase tracking-[0.1em] text-ink-faint hover:text-accent transition-colors shrink-0"
            >
              All writing →
            </Link>
          </div>
          <DocList
            docs={recent}
            showCollection
            emptyMessage="First pieces are being written. Check back shortly."
          />
        </Section>
      </div>
    </PageShell>
  );
}
