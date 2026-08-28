"use client";

import { useEffect, useState } from "react";

export type RailItem = { id: string; label: string };

/**
 * Sticky section navigation for the pitch. The point is live use: when an
 * interviewer interrupts and asks to go deeper on something, you jump
 * straight there instead of scrolling past everything in between.
 */
export function SectionRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Bias toward the top third so the active item matches what is being read.
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sections" className="sticky top-8">
      <p className="label mb-3">Sections</p>
      <ol className="space-y-1.5">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-baseline gap-2.5 text-[0.8125rem] leading-snug transition-colors ${
                  isActive ? "text-accent" : "text-ink-faint hover:text-ink"
                }`}
              >
                <span className="font-mono text-[0.6875rem] tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={isActive ? "font-medium" : ""}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
