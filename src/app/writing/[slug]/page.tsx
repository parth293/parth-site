import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ArticleLayout } from "@/components/article";
import { Mdx } from "@/components/mdx";
import { getDoc, getWriting } from "@/lib/content";

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
    alternates: { canonical: doc.href },
    openGraph: {
      title: doc.title,
      description: doc.summary,
      type: "article",
      url: doc.href,
      publishedTime: doc.date,
      modifiedTime: doc.updated ?? doc.date,
    },
  };
}

export default async function WritingPage({ params }: Params) {
  const { slug } = await params;
  const doc = await getDoc("writing", slug);
  if (!doc) notFound();

  return (
    <PageShell>
      <ArticleLayout doc={doc}>
        <Mdx source={doc.body} />
      </ArticleLayout>
    </PageShell>
  );
}
