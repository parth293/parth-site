import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "The narrative version: engineering at IIT BHU, six years at Leucine, and what comes next.",
};

/**
 * PHASE 2 — placeholder. Structure is here; the narrative is not written yet.
 * Prose for this page must follow WRITING_GUIDE.md.
 */
export default function JourneyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Background"
        title="Journey"
        lede="The narrative version of the resume — what I studied, what I built, and why the next step looks the way it does."
      />
      <div className="prose">
        <p className="text-ink-faint italic">
          Not written yet. This page ships in Phase 2.
        </p>
        <h2>IIT BHU — Pharmaceutical Engineering</h2>
        <p className="text-ink-faint italic">Placeholder.</p>
        <h2>Leucine — six years, four roles</h2>
        <p className="text-ink-faint italic">Placeholder.</p>
        <h2>What I am looking for next</h2>
        <p className="text-ink-faint italic">Placeholder.</p>
      </div>
    </PageShell>
  );
}
