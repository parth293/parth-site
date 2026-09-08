"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { nav, site } from "@/lib/site";

/**
 * The document control bar plus navigation. The top strip is the header block
 * of a controlled document — identifier, revision, effective date, page — and
 * it is what tells a visitor within one second what kind of object this is.
 */
export function SiteHeader({ docId, rev }: { docId?: string; rev?: string }) {
  const pathname = usePathname();

  // The pitch is screen-shared in interviews; site nav is a distraction there.
  if (pathname?.startsWith("/pitch")) return null;

  const effective = new Date().toISOString().slice(0, 10);

  return (
    <header className="border-b border-rule">
      <div className="bg-paper-raised border-b border-rule">
        <div className="mx-auto w-full max-w-[var(--container)] px-5 sm:px-8">
          <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-1 py-2.5">
            <div className="flex items-baseline gap-2.5">
              <dt className="label text-[length:var(--text-2xs)]">Document</dt>
              <dd className="font-mono text-xs text-ink">
                {docId ?? `${site.name} — Personal Record`}
              </dd>
            </div>
            <div className="flex items-baseline gap-2.5">
              <dt className="label text-[length:var(--text-2xs)]">Rev</dt>
              <dd className="font-mono text-xs text-ink tabular-nums">{rev ?? "04"}</dd>
            </div>
            <div className="hidden sm:flex items-baseline gap-2.5">
              <dt className="label text-[length:var(--text-2xs)]">Effective</dt>
              <dd className="font-mono text-xs text-ink tabular-nums">
                <time dateTime={effective}>{effective}</time>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[var(--container)] px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-4">
          <Link
            href="/"
            className="font-mono text-sm font-medium uppercase tracking-[0.12em] text-ink hover:text-accent transition-colors"
          >
            {site.name}
          </Link>
          <nav aria-label="Main">
            <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              {nav.map((item, i) => {
                const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <li key={item.href} className="flex items-baseline gap-1.5">
                    <span className="font-mono text-[length:var(--text-2xs)] tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent ${
                        active ? "text-ink" : "text-ink-faint"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
