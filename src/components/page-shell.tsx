/** Standard page container — a Record, per DESIGN_BRIEF.md. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[var(--container)] px-5 sm:px-8 py-8 sm:py-10">
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-14 pb-8 border-b-[length:var(--line-heavy)] border-rule-strong">
      {eyebrow ? <p className="label mb-3">{eyebrow}</p> : null}
      <h1 className="font-mono text-[length:var(--text-display)] font-medium tracking-[-0.01em] leading-[1.05] text-balance">
        {title}
      </h1>
      {lede ? (
        <p className="measure mt-5 text-lg leading-relaxed text-ink-muted text-pretty font-serif">
          {lede}
        </p>
      ) : null}
    </header>
  );
}
