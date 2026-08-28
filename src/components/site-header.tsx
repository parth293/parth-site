import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-5">
          <Link
            href="/"
            className="text-[0.9375rem] font-semibold tracking-tight text-ink hover:text-accent transition-colors"
          >
            {site.name}
          </Link>
          <nav aria-label="Main">
            <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.08em]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-faint hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
