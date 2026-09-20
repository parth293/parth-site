import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell, PageHeader } from "@/components/page-shell";
import { DocList } from "@/components/doc-list";
import { Section, Status } from "@/components/record";
import { getNotes, type Doc } from "@/lib/content";
import { getFormulasForNote } from "@/lib/formulas";
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

  // Bioprocess-eng notes are built to be scanned for a formula fast — see
  // BIOPROCESS_ENG_GUIDE.md. Surface each note's Formulas tab right on the
  // list, not just inside the article, for every note that has one.
  let formulaHrefBySlug: Map<string, string> | null = null;
  if (pillar.slug === "bioprocess-eng") {
    const entries = await Promise.all(
      docs.map(async (doc) => {
        const formulas = await getFormulasForNote(pillar.slug, doc.slug);
        return [doc.slug, formulas.length > 0] as const;
      }),
    );
    formulaHrefBySlug = new Map(
      entries.filter(([, hasFormulas]) => hasFormulas).map(([slug]) => [slug, `/notes/${pillar.slug}/${slug}/formulas`]),
    );
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Notes" title={pillar.title} lede={pillar.description} />
      <p className="mb-14 -mt-8 font-mono text-sm">
        <Link
          href={`/notes/${pillar.slug}/revision`}
          className="text-accent hover:text-accent-dim transition-colors"
        >
          Revision sheet →
        </Link>
      </p>
      <Section
        number="1.0"
        label="Entries"
        note={<Status count={docs.length} unit="note" />}
      >
        <DocList
          docs={docs}
          emptyMessage="This section is set up but not yet seeded. Articles land here as they get written."
          getSecondaryLink={
            formulaHrefBySlug
              ? (doc: Doc) => {
                  const href = formulaHrefBySlug!.get(doc.slug);
                  return href ? { href, label: "Formulas" } : null;
                }
              : undefined
          }
        />
      </Section>
    </PageShell>
  );
}
