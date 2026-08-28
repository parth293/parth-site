import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Mdx } from "@/components/mdx";
import { formatDate, getDoc, getWriting } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const docs = await getWriting();
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDoc("writing", slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary,
    openGraph: { title: doc.title, description: doc.summary, type: "article" },
  };
}

export default async function WritingPage({ params }: Params) {
  const { slug } = await params;
  const doc = await getDoc("writing", slug);
  if (!doc) notFound();

  return (
    <PageShell>
      <article>
        <header className="mb-10 pb-8 border-b border-rule">
          <Link href="/writing" className="label hover:text-accent transition-colors">
            ← Writing
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
