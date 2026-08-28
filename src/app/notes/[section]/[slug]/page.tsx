import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Mdx } from "@/components/mdx";
import { formatDate, getDoc, getNotes } from "@/lib/content";
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { section, slug } = await params;
  const doc = await getDoc(section as PillarSlug, slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary,
    openGraph: { title: doc.title, description: doc.summary, type: "article" },
  };
}

export default async function NotePage({ params }: Params) {
  const { section, slug } = await params;
  const pillar = pillarBySlug[section as PillarSlug];
  if (!pillar) notFound();

  const doc = await getDoc(pillar.slug, slug);
  if (!doc) notFound();

  return (
    <PageShell>
      <article>
        <header className="mb-10 pb-8 border-b border-rule">
          <Link
            href={`/notes/${pillar.slug}`}
            className="label hover:text-accent transition-colors"
          >
            ← {pillar.title}
          </Link>
          <h1 className="mt-4 measure text-3xl sm:text-[2.25rem] font-semibold tracking-[-0.02em] leading-[1.15] text-balance">
            {doc.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <time dateTime={doc.date} className="label">{formatDate(doc.date)}</time>
            <span className="label">{doc.readingMinutes} min read</span>
            {doc.updated && doc.updated !== doc.date ? (
              <span className="label">Updated {formatDate(doc.updated)}</span>
            ) : null}
            {doc.tags?.map((tag) => (
              <span key={tag} className="label text-accent">#{tag}</span>
            ))}
          </div>
        </header>
        <Mdx source={doc.body} />
      </article>
    </PageShell>
  );
}
