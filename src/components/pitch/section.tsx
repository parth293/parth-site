export function Section({
  id,
  index,
  title,
  lede,
  children,
}: {
  id: string;
  index: number;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 pt-14 first:pt-0">
      <header className="mb-7 pb-4 border-b border-rule">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.6875rem] text-ink-faint tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.02em] leading-tight text-balance">
            {title}
          </h2>
        </div>
        {lede ? (
          <p className="measure mt-3 leading-relaxed text-ink-muted text-pretty">
            {lede}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

/** The three columns an interviewer screens on: job, outcome, skill. */
export function TriColumn({
  columns,
}: {
  columns: { heading: string; items: string[] }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {columns.map((col) => (
        <div key={col.heading}>
          <h4 className="label mb-2.5 pb-2 border-b border-rule">{col.heading}</h4>
          <ul className="space-y-2">
            {col.items.map((item) => (
              <li
                key={item}
                className="text-[0.9375rem] leading-relaxed text-ink-muted text-pretty"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Flags placeholder content so nothing unfinished gets screen-shared by accident. */
export function TodoBadge() {
  return (
    <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-accent border border-accent/40 bg-accent-tint px-1.5 py-0.5">
      To write
    </span>
  );
}
