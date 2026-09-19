"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { label: string; suffix: string };

const ALWAYS: Tab = { label: "Notes", suffix: "" };
const OPTIONAL: Record<"keyPoints" | "formulas" | "workedExamples" | "topics" | "bookCoverage", Tab> = {
  keyPoints: { label: "Key points", suffix: "/key-points" },
  formulas: { label: "Formulas", suffix: "/formulas" },
  workedExamples: { label: "Worked examples", suffix: "/worked-examples" },
  topics: { label: "Topics", suffix: "/topics" },
  bookCoverage: { label: "Book coverage", suffix: "/book-coverage" },
};

export type NoteTabAvailability = {
  keyPoints: boolean;
  formulas: boolean;
  workedExamples: boolean;
  topics: boolean;
  bookCoverage: boolean;
};

/**
 * The views available for a single note. "Notes" always shows; the rest only
 * appear when the note actually has that kind of content, so a syllabus
 * reference or a past-paper note doesn't carry three permanently-empty tabs.
 */
export function NoteTabs({
  basePath,
  available,
}: {
  basePath: string;
  available: NoteTabAvailability;
}) {
  const pathname = usePathname();

  const tabs: Tab[] = [
    ALWAYS,
    ...(available.topics ? [OPTIONAL.topics] : []),
    ...(available.keyPoints ? [OPTIONAL.keyPoints] : []),
    ...(available.formulas ? [OPTIONAL.formulas] : []),
    ...(available.workedExamples ? [OPTIONAL.workedExamples] : []),
    ...(available.bookCoverage ? [OPTIONAL.bookCoverage] : []),
  ];

  if (tabs.length === 1) return null;

  return (
    <nav aria-label="Note sections" className="mb-10 -mt-2">
      <ul className="flex flex-wrap gap-x-6 border-b border-rule">
        {tabs.map((tab) => {
          const href = `${basePath}${tab.suffix}`;
          const active = pathname === href;
          return (
            <li key={tab.suffix}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`-mb-px inline-block border-b-[length:var(--line-heavy)] pb-2.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-faint hover:text-accent"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
