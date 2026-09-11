"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Notes", suffix: "" },
  { label: "Key points", suffix: "/key-points" },
  { label: "Formulas", suffix: "/formulas" },
  { label: "Worked examples", suffix: "/worked-examples" },
] as const;

/** The four fixed views for a single note — Notes / Key points / Formulas / Worked examples. */
export function NoteTabs({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Note sections" className="mb-10 -mt-2">
      <ul className="flex flex-wrap gap-x-6 border-b border-rule">
        {TABS.map((tab) => {
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
