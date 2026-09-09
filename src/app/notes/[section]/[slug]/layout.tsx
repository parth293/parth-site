import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ArticleHeader, ArticleFooter } from "@/components/article";
import { NoteTabs } from "@/components/note-tabs";
import { getDoc, getNotes } from "@/lib/content";
import { pillarBySlug, pillars, type PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string; slug: string }> };

export async function generateStaticParams() {
  const groups = await Promise.all(
    pillars.map(async (p) => {
      const docs = await getNotes(p.slug);
      return docs.map((d) => ({ section: p.slug, slug: d.slug }));
    }),
  );
  return groups.flat();
}

export default async function NoteLayout({
  params,
  children,
}: Params & { children: React.ReactNode }) {
  const { section, slug } = await params;
  const pillar = pillarBySlug[section as PillarSlug];
  if (!pillar) notFound();

  const doc = await getDoc(pillar.slug, slug);
  if (!doc) notFound();

  return (
    <PageShell>
      <article>
        <ArticleHeader doc={doc} />
        <NoteTabs basePath={`/notes/${pillar.slug}/${slug}`} />
        {children}
        <ArticleFooter doc={doc} />
      </article>
    </PageShell>
  );
}
