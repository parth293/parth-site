import type { QuestionHeading } from "@/lib/questions";

/** A compact jump-to-question grid for a solved past-paper note. */
export function QuestionNav({ questions }: { questions: QuestionHeading[] }) {
  if (questions.length === 0) return null;

  return (
    <nav
      aria-label="Jump to question"
      className="mb-8 border border-rule bg-paper-raised p-4 sm:p-5"
    >
      <p className="field-label mb-3">Jump to question</p>
      <ul className="flex flex-wrap gap-1.5">
        {questions.map((q) => (
          <li key={q.num}>
            <a
              href={`#${q.headingSlug}`}
              className="inline-flex h-7 min-w-7 items-center justify-center border border-rule px-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
            >
              {q.num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
