"use client";

import { useMemo, useState } from "react";
import type { SectionCoverage } from "@/lib/syllabus-tags";

/**
 * A two-level interactive "icicle" (linear treemap) of marks coverage:
 * one bar segmented by section, and a second bar — driven by whichever
 * section is selected — segmented by that section's topics. Segment width
 * is proportional to marks, not question count, since a few 2-mark
 * questions can outweigh a longer tail of 1-mark ones. Click a segment to
 * drill in; the legend below always states the exact numbers, so the bar
 * is a way to *see* proportion at a glance, not the only source of truth.
 */

type FlatBucket = { tag: string; count: number; marks: number };

const PALETTE_STEPS = 6;

function Segment({
  label,
  marks,
  pct,
  selected,
  index,
  onClick,
}: {
  label: string;
  marks: number;
  pct: number;
  selected: boolean;
  index: number;
  onClick: () => void;
}) {
  const step = index % PALETTE_STEPS;
  const tint = 0.14 + step * 0.11;
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${label} — ${marks} ${marks === 1 ? "mark" : "marks"}`}
      className={`h-9 min-w-[3px] shrink-0 border-r border-paper text-left transition-colors first:border-l-0 ${
        selected ? "bg-accent text-paper" : "hover:brightness-95 text-ink"
      }`}
      style={{
        width: `${pct}%`,
        backgroundColor: selected
          ? undefined
          : `color-mix(in oklab, var(--ink) ${tint * 100}%, var(--paper-raised))`,
      }}
    >
      {pct > 6 ? (
        <span className="block truncate px-2 font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.06em]">
          {label}
        </span>
      ) : null}
    </button>
  );
}

export function CoverageIcicle({
  sections,
  flat,
  totalMarks,
}: {
  sections: SectionCoverage[];
  flat: FlatBucket[];
  totalMarks: number;
}) {
  const withMarks = sections.filter((s) => s.marks > 0);
  const defaultSection = withMarks[0]?.code ?? sections[0]?.code ?? null;
  const [selectedSection, setSelectedSection] = useState<string | null>(defaultSection);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const section = sections.find((s) => s.code === selectedSection) ?? null;
  const topics = useMemo(
    () => (section ? [...section.topics].sort((a, b) => Number(a.code.split(".")[1]) - Number(b.code.split(".")[1])) : []),
    [section],
  );
  const topic = topics.find((t) => t.code === selectedTopic) ?? null;

  if (totalMarks === 0) return null;

  return (
    <div className="mb-8 border border-rule bg-paper-raised p-4 sm:p-5">
      <p className="field-label mb-3">Where the {totalMarks} tagged marks come from</p>

      <div className="flex w-full overflow-hidden border border-rule">
        {sections
          .filter((s) => s.marks > 0)
          .map((s, i) => (
            <Segment
              key={s.code}
              index={i}
              label={`${s.code}. ${s.title}`}
              marks={s.marks}
              pct={(s.marks / totalMarks) * 100}
              selected={s.code === selectedSection}
              onClick={() => {
                setSelectedSection(s.code === selectedSection ? null : s.code);
                setSelectedTopic(null);
              }}
            />
          ))}
        {flat
          .filter((f) => f.marks > 0)
          .map((f, i) => (
            <Segment
              key={f.tag}
              index={sections.length + i}
              label={f.tag.replace(/-/g, " ")}
              marks={f.marks}
              pct={(f.marks / totalMarks) * 100}
              selected={selectedSection === `flat:${f.tag}`}
              onClick={() => {
                setSelectedSection(selectedSection === `flat:${f.tag}` ? null : `flat:${f.tag}`);
                setSelectedTopic(null);
              }}
            />
          ))}
      </div>

      {section && section.marks > 0 ? (
        <>
          <div className="mt-1.5 flex w-full overflow-hidden border border-rule">
            {topics
              .filter((t) => t.marks > 0)
              .map((t, i) => (
                <Segment
                  key={t.code}
                  index={i}
                  label={`${t.code} ${t.title}`}
                  marks={t.marks}
                  pct={(t.marks / section.marks) * 100}
                  selected={t.code === selectedTopic}
                  onClick={() => setSelectedTopic(t.code === selectedTopic ? null : t.code)}
                />
              ))}
          </div>

          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule pt-3 font-mono text-xs text-ink-muted">
            <span>
              <span className="text-ink">{section.code}. {section.title}</span> — {section.count}{" "}
              {section.count === 1 ? "question" : "questions"}, {section.marks} marks
            </span>
            {topic ? (
              <span>
                <span className="text-ink">{topic.code} {topic.title}</span> — {topic.count}{" "}
                {topic.count === 1 ? "question" : "questions"}, {topic.marks} marks
              </span>
            ) : (
              <span className="text-ink-faint">Click a topic segment above for its breakdown</span>
            )}
          </div>
        </>
      ) : selectedSection?.startsWith("flat:") ? (
        <div className="mt-3 border-t border-rule pt-3 font-mono text-xs text-ink-muted">
          <span className="text-ink capitalize">
            {selectedSection.replace("flat:", "").replace(/-/g, " ")}
          </span>{" "}
          sits outside the syllabus tree, so it has no further topic breakdown.
        </div>
      ) : null}
    </div>
  );
}
