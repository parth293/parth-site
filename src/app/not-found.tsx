import Link from "next/link";
import { PageShell, PageHeader } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="404 — Record not found"
        title="No entry here"
        lede="The link is wrong, or something moved. The sections below are the reliable way in."
      />
      <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.1em]">
        <Link href="/" className="text-ink-faint hover:text-accent transition-colors">Home</Link>
        <Link href="/notes" className="text-ink-faint hover:text-accent transition-colors">Notes</Link>
        <Link href="/writing" className="text-ink-faint hover:text-accent transition-colors">Writing</Link>
      </div>
    </PageShell>
  );
}
