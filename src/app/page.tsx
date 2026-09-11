import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/record";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <PageShell>
      <Section number="1.0" label="Identification">
        <h1 className="font-mono text-[length:var(--text-display)] font-medium tracking-[-0.01em] leading-[1.02] text-balance">
          {site.name}
        </h1>
        <p className="measure mt-5 leading-relaxed text-ink-muted text-pretty">
          Six years at{" "}
          <span className="font-mono text-[0.9em] text-ink">Leucine</span>, building and
          selling GMP compliance software to pharmaceutical manufacturers — from
          implementation specialist to Director of Strategic Initiatives. Trained as an
          engineer at{" "}
          <span className="font-mono text-[0.9em] text-ink">IIT BHU</span>. Currently
          working out what comes next, in public.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Resume →
          </Link>
          <Link
            href="/journey"
            className="font-mono text-xs uppercase tracking-[0.1em] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
          >
            Full history →
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
