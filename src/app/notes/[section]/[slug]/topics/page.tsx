import Link from "next/link";
import { Section, Status } from "@/components/record";
import { CoverageIcicle } from "@/components/coverage-icicle";
import { getDoc } from "@/lib/content";
import { getCoverageTreeForNote } from "@/lib/syllabus-tags";
import type { PillarSlug } from "@/lib/site";

type Params = { params: Promise<{ section: string; slug: string }> };

function Bar({ marks, max }: { marks: number; max: number }) {
  const pct = max > 0 && marks > 0 ? Math.max((marks / max) * 100, 4) : 0;
  return (
    <div className="h-2 w-full max-w-40 border border-rule bg-paper-sunken">
      <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Counts({ count, marks }: { count: number; marks: number }) {
  if (count === 0) {
    return <span className="font-mono text-xs text-ink-faint shrink-0">not asked yet</span>;
  }
  return (
    <span className="font-mono text-xs text-ink-faint shrink-0">
      {count} {count === 1 ? "question" : "questions"} · {marks} {marks === 1 ? "mark" : "marks"}
    </span>
  );
}

export default async function NoteTopicsPage({ params }: Params) {
  const { section, slug } = await params;
  const pillar = section as PillarSlug;

  const doc = await getDoc(pillar, slug);
  const tree = await getCoverageTreeForNote(pillar, slug, doc?.syllabusRef);

  const sectionMaxMarks = Math.max(1, ...tree.sections.map((s) => s.marks));
  const basePath = `/notes/${section}/${slug}`;

  return (
    <Section
      number="1.0"
      label="Topics covered"
      note={
        <>
          <Status count={tree.taggedQuestions} unit="question" />
          <span className="ml-2">· {tree.taggedMarks} marks tagged so far</span>
        </>
      }
    >
      {tree.sections.length === 0 && tree.flat.length === 0 ? (
        <p className="text-ink-muted">No questions tagged to a syllabus item yet.</p>
      ) : (
        <div className="space-y-6">
          <CoverageIcicle sections={tree.sections} flat={tree.flat} totalMarks={tree.taggedMarks} />

          {tree.sections.map((sec) => (
            <details key={sec.code} open className="group">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="flex items-baseline gap-2 font-mono text-sm text-ink">
                  <span className="text-accent transition-transform group-open:rotate-90">▸</span>
                  {sec.code}. {sec.title}
                </span>
                <Counts count={sec.count} marks={sec.marks} />
              </summary>

              <div className="mt-2 pl-5">
                <Bar marks={sec.marks} max={sectionMaxMarks} />
              </div>

              <div className="mt-4 space-y-3 border-l-2 border-rule pl-5">
                {sec.topics.map((topic) => (
                  <details key={topic.code} className="group/topic">
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-baseline gap-2 font-mono text-xs text-ink-muted">
                        <span className="text-ink-faint transition-transform group-open/topic:rotate-90">▸</span>
                        {topic.code} {topic.title}
                      </span>
                      <Counts count={topic.count} marks={topic.marks} />
                    </summary>

                    <div className="mt-1.5 pl-5">
                      <Bar marks={topic.marks} max={sec.marks} />
                    </div>

                    <ul className="mt-2 space-y-1 pl-5">
                      {topic.items.map((item) => (
                        <li
                          key={item.code}
                          className={`flex items-baseline justify-between gap-4 font-mono text-[length:var(--text-2xs)] ${
                            item.count === 0 ? "text-ink-faint/70" : "text-ink-faint"
                          }`}
                        >
                          <span>
                            {item.code} — {item.title}
                          </span>
                          <span className="shrink-0">
                            {item.count === 0 ? "—" : `${item.count}× · ${item.marks}m`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </details>
          ))}

          {tree.flat.length > 0 ? (
            <div>
              <p className="field-label">Outside the syllabus tree</p>
              <ul className="mt-2 space-y-1.5">
                {tree.flat.map((f) => (
                  <li key={f.tag} className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-sm text-ink capitalize">
                      {f.tag.replace(/-/g, " ")}
                    </span>
                    <Counts count={f.count} marks={f.marks} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      <Link
        href={basePath}
        className="mt-8 inline-block font-mono text-xs text-accent hover:text-accent-dim transition-colors"
      >
        ← Back to notes
      </Link>
    </Section>
  );
}
