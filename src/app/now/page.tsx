import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Section } from "@/components/record";

export const metadata: Metadata = {
  title: "Now",
  description: "What I am focused on at the moment.",
};

/**
 * PHASE 5 content — an honest, marked placeholder rather than invented
 * biography. Rewritten in place when updated, per the nownownow.com
 * convention; not appended to.
 */
export default function NowPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Updated periodically"
        title="Now"
        lede="What has my attention at the moment — reading, building, preparing for."
      />
      <Section number="1.0" label="Awaiting entry">
        <p className="measure text-ink-faint font-mono text-sm leading-relaxed">
          Not written yet. This page is rewritten in place, not appended to, so it
          stays honest about the current moment rather than a scrolling log.
        </p>
      </Section>
    </PageShell>
  );
}
