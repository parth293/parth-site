import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-faint">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <div className="flex gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors">
              Email
            </a>
            <Link href="/now" className="hover:text-accent transition-colors">
              Now
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
