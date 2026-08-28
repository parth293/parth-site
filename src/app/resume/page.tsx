import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Resume",
  description: "Structured resume — education, experience, and selected work.",
};

/**
 * PHASE 2 — placeholder. The web resume renders from structured data
 * (add src/lib/resume.ts) so the page and the PDF never drift apart.
 * Drop the PDF at public/parth-ajmera-resume.pdf.
 */
export default function ResumePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Curriculum vitae"
        title="Resume"
        lede="Education, experience, and selected work. A PDF version will be linked here."
      />
      <div className="prose">
        <p className="text-ink-faint italic">
          Not written yet. This page ships in Phase 2.
        </p>
        <h2>Experience</h2>
        <p className="text-ink-faint italic">Placeholder.</p>
        <h2>Education</h2>
        <p className="text-ink-faint italic">Placeholder.</p>
        <h2>Selected work</h2>
        <p className="text-ink-faint italic">Placeholder.</p>
      </div>
    </PageShell>
  );
}
