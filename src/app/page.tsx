import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { getAllDocs, getWriting } from "@/lib/content";
import { pillars, site } from "@/lib/site";

export default async function HomePage() {
  const [writing, all] = await Promise.all([getWriting(), getAllDocs()]);

  // The fourth pillar alongside the three notes sections.
  const cards = [
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

  return (
    <PageShell>
      <section className="mb-20">
        <h1 className="measure text-3xl sm:text-[2.75rem] font-semibold tracking-[-0.025em] leading-[1.1] text-balance">
          {site.name}
        </h1>
        <p className="measure mt-5 text-lg sm:text-xl leading-relaxed text-ink-muted text-pretty">
          {site.tagline}
        </p>
        <p className="measure mt-4 leading-relaxed text-ink-muted text-pretty">
          Six years at{" "}
          <span className="font-mono text-[0.9em] text-ink">Leucine</span>, building and
          selling GMP compliance software to pharmaceutical manufacturers — from
          implementation specialist to Director of Strategic Initiatives. Trained as an
          engineer at{" "}
          <span className="font-mono text-[0.9em] text-ink">IIT BHU</span>. Currently
          working out what comes next, in public.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/resume"
            className="font-mono text-[0.7rem] uppercase tracking-[0.08em] border border-rule-strong px-4 py-2.5 text-ink hover:border-accent hover:text-accent transition-colors"
          >
            Read the resume
          </Link>
          <Link
            href="/journey"
            className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint hover:text-accent transition-colors"
          >
            Or the longer story →
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="label mb-5">What I am working on here</h2>
        <div className="grid gap-px bg-rule sm:grid-cols-2 border border-rule">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-paper p-6 hover:bg-paper-raised transition-colors"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink group-hover:text-accent transition-colors text-balance">
                  {card.title}
                </h3>
                <span className="label shrink-0">
                  {card.count} {card.count === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted text-pretty">
                {card.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <h2 className="label">Recently added</h2>
          <Link
            href="/writing"
            className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint hover:text-accent transition-colors"
          >
            All writing →
          </Link>
        </div>
        <DocList
          docs={all.slice(0, 5)}
          showCollection
          emptyMessage="First pieces are being written. Check back shortly."
        />
      </section>
    </PageShell>
  );
}
