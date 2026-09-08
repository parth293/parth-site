import Link from "next/link";
import { Section, Status } from "@/components/record";
import { Mdx } from "@/components/mdx";
import { getWorkedExamplesForNote } from "@/lib/worked-examples";
import { renderInlineLine } from "@/lib/katex-html";
import type { PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string; slug: string }> };

export default async function NoteWorkedExamplesPage({ params }: Params) {
  const { section, slug } = await params;
  const examples = await getWorkedExamplesForNote(section as PillarSlug, slug);
  const basePath = `/notes/${section}/${slug}`;

  return (
    <Section number="1.0" label="Worked examples" note={<Status count={examples.length} unit="example" />}>
      {examples.length === 0 ? (
        <p className="text-ink-muted">No worked examples in this note yet.</p>
      ) : (
        <div className="space-y-6">
          {examples.map((ex, i) => (
            <div key={i} className="border border-rule bg-paper-raised p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h2
                  className="font-mono text-sm font-medium text-ink"
                  dangerouslySetInnerHTML={{ __html: renderInlineLine(ex.heading) }}
                />
                <Link
                  href={`${basePath}#${ex.headingSlug}`}
                  className="font-mono text-xs text-accent hover:text-accent-dim transition-colors shrink-0"
                >
                  In notes →
                </Link>
              </div>
              <div className="mt-3">
                <Mdx source={ex.body} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
