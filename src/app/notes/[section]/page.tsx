import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, PageHeader } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { getNotes } from "@/lib/content";
import { pillarBySlug, pillars, type PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return pillars.map((p) => ({ section: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { section } = await params;
  const pillar = pillarBySlug[section as PillarSlug];
  if (!pillar) return {};
  return { title: pillar.title, description: pillar.description };
}

export default async function NotesSectionPage({ params }: Params) {
  const { section } = await params;
  const pillar = pillarBySlug[section as PillarSlug];
  if (!pillar) notFound();

  const docs = await getNotes(pillar.slug);

  return (
    <PageShell>
      <PageHeader eyebrow="Notes" title={pillar.title} lede={pillar.description} />
      <DocList
        docs={docs}
        emptyMessage="This section is set up but not yet seeded. Articles land here as they get written."
      />
    </PageShell>
  );
}
