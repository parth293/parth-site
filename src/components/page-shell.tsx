/** Standard page container. Every route wraps its content in this. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 py-14 sm:py-20">
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
    <header className="mb-12">
      {eyebrow ? <p className="label mb-3">{eyebrow}</p> : null}
      <h1 className="text-3xl sm:text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.1] text-balance">
        {title}
      </h1>
      {lede ? (
        <p className="measure mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
          {lede}
        </p>
      ) : null}
    </header>
  );
}
