import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { getDoc } from "@/lib/content";
import type { PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { section, slug } = await params;
  const doc = await getDoc(section as PillarSlug, slug);
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

export default async function NotePage({ params }: Params) {
  const { section, slug } = await params;
  const doc = await getDoc(section as PillarSlug, slug);
  if (!doc) notFound();

  return <Mdx source={doc.body} />;
}
