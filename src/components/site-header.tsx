"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { nav, site, pillarBySlug, type PillarSlug } from "@/lib/site";

type Crumb = { label: string; href: string };

/** On an article beneath a notes pillar or under /writing, the section trail above the title. */
function breadcrumbTrail(pathname: string | null): Crumb[] | null {
  const parts = pathname?.split("/").filter(Boolean) ?? [];

  if (parts[0] === "notes" && parts.length >= 3) {
    const pillar = pillarBySlug[parts[1] as PillarSlug];
    if (!pillar) return null;
    return [
      { label: "Notes", href: "/notes" },
      { label: pillar.title, href: `/notes/${pillar.slug}` },
    ];
  }

  if (parts[0] === "writing" && parts.length >= 2) {
    return [{ label: "Writing", href: "/writing" }];
  }

  return null;
}

export function SiteHeader() {
  const pathname = usePathname();

  // The pitch is screen-shared in interviews; site nav is a distraction there.
  if (pathname?.startsWith("/pitch")) return null;

  const trail = breadcrumbTrail(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md backdrop-saturate-150">
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

      {trail ? (
        <div className="border-t border-rule">
          <div className="mx-auto w-full max-w-[var(--container)] px-5 sm:px-8">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-2">
              <span aria-hidden="true" className="label">←</span>
              {trail.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 ? <span aria-hidden="true" className="label">/</span> : null}
                  <Link href={crumb.href} className="label hover:text-accent transition-colors">
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
