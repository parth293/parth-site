import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Now",
  description: "What I am focused on at the moment.",
};

/**
 * PHASE 5 — placeholder. A /now page (nownownow.com convention):
 * short, dated, rewritten rather than appended to.
 */
export default function NowPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Updated periodically"
        title="Now"
        lede="What has my attention at the moment — reading, building, preparing for."
      />
      <div className="prose">
        <p className="text-ink-faint italic">
          Not written yet. This page ships in Phase 5.
        </p>
      </div>
    </PageShell>
  );
}
