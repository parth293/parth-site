"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Closes the record. Kept to the same field grammar as the header.
 *
 * `entryCount` is the live, real number of published pieces across every
 * collection — computed server-side in layout.tsx via getAllDocs(). It's
 * this site's answer to a refrain like Snowpiercer's "1001 cars long": not
 * a fixed, mythic number, but a real one that keeps changing, because the
 * record is never finished.
 */
export function SiteFooter({ entryCount }: { entryCount: number }) {
  // The pitch is screen-shared in interviews; site nav is a distraction there.
  if (usePathname()?.startsWith("/pitch")) return null;

  return (
    <footer className="border-t-[length:var(--line-heavy)] border-rule-strong mt-20">
      <div className="mx-auto w-full max-w-[var(--container)] px-5 sm:px-8 py-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="font-mono text-xs text-ink-faint">
            <span className="label mr-2.5">End of record</span>
            {entryCount} {entryCount === 1 ? "entry" : "entries"} filed · ©{" "}
            {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.1em]">
            <a
              href={`mailto:${site.email}`}
              className="text-ink-faint hover:text-accent transition-colors"
            >
              Email
            </a>
            <Link href="/now" className="text-ink-faint hover:text-accent transition-colors">
              Now
            </Link>
            <Link
              href="/writing/colophon"
              className="text-ink-faint hover:text-accent transition-colors"
            >
              Colophon
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
