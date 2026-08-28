/**
 * Single source of truth for site-wide constants: metadata, navigation,
 * and the three notes pillars. Adding a pillar means adding it here —
 * routes, index pages, and nav all read from this file.
 */

export const site = {
  name: "Parth Ajmera",
  url: "https://parth-site.vercel.app", // TODO: swap for the real domain
  tagline:
    "Engineering rigor applied to regulated pharma — product, AI, and the compliance systems underneath.",
  email: "ajmera.parth8@gmail.com",
} as const;

export type PillarSlug = "pharma-eng" | "gate-bt" | "sales-eng";

export type Pillar = {
  slug: PillarSlug;
  title: string;
  /** One line, shown on the home grid and the /notes index. */
  summary: string;
  /** Longer framing for the section's own index page. */
  description: string;
};

export const pillars: readonly Pillar[] = [
  {
    slug: "pharma-eng",
    title: "Pharmaceutical Engineering",
    summary:
      "Explainers on the unit operations, thermodynamics, and process control behind how drugs actually get made.",
    description:
      "Working notes on pharmaceutical sciences from an engineering angle — mass and energy balances, unit operations, process validation, and the physical chemistry that governs them.",
  },
  {
    slug: "gate-bt",
    title: "GATE-BT Preparation",
    summary:
      "A strategy and syllabus breakdown for the GATE Biotechnology paper, written while preparing for it.",
    description:
      "How I am preparing for GATE-BT: syllabus decomposition, source selection, spaced revision, and problem-solving patterns. Written in public as it happens, not in retrospect.",
  },
  {
    slug: "sales-eng",
    title: "Technical Sales Engineering",
    summary:
      "What it takes to sell complex software into regulated industries — and the philosophy behind doing it honestly.",
    description:
      "Notes from six years selling and delivering GMP compliance software to pharma manufacturers: discovery, technical validation, procurement in regulated environments, and why the honest version wins.",
  },
] as const;

export const pillarBySlug = Object.fromEntries(
  pillars.map((p) => [p.slug, p]),
) as Record<PillarSlug, Pillar>;

export const nav = [
  { href: "/journey", label: "Journey" },
  { href: "/notes", label: "Notes" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/now", label: "Now" },
] as const;
