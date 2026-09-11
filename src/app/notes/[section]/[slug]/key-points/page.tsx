import Link from "next/link";
import { Section, Status } from "@/components/record";
import { Mdx } from "@/components/mdx";
import { getKeyPointsForNote } from "@/lib/key-points";
import type { PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string; slug: string }> };

export default async function NoteKeyPointsPage({ params }: Params) {
  const { section, slug } = await params;
  const points = await getKeyPointsForNote(section as PillarSlug, slug);
  const basePath = `/notes/${section}/${slug}`;
  const headingSlug = points[0]?.headingSlug;

  return (
    <Section number="1.0" label="Key points" note={<Status count={points.length} unit="point" />}>
      {points.length === 0 ? (
        <p className="text-ink-muted">No key points in this note yet.</p>
      ) : (
        <>
          {headingSlug ? (
            <Link
              href={`${basePath}#${headingSlug}`}
              className="mb-5 inline-block font-mono text-xs text-accent hover:text-accent-dim transition-colors"
            >
              In notes →
            </Link>
          ) : null}
          <ol className="space-y-3">
            {points.map((p, i) => (
              <li key={i} className="flex gap-4 border border-rule bg-paper-raised p-4 sm:p-5">
                <span className="font-mono text-xs text-ink-faint shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 text-sm text-ink-muted [&_p]:m-0">
                  <Mdx source={p.text} />
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </Section>
  );
}
