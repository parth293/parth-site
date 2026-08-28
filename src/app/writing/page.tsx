import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { getWriting } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and book notes — general, evolving, opinionated.",
};

export default async function WritingIndexPage() {
  const docs = await getWriting();

  return (
    <PageShell>
      <PageHeader
        eyebrow="Essays & book notes"
        title="Writing"
        lede="Less structured than the notes sections. Things I am thinking through, books I have read closely, arguments I want to make properly."
      />
      <DocList
        docs={docs}
        emptyMessage="Nothing published yet. The first essays are in progress."
      />
    </PageShell>
  );
}
