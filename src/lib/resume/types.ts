/**
 * Structured source for the printable resume(s) rendered at /resume. Adding
 * a variant means adding a new file under variants/ with this shape and
 * registering it in variants/index.ts — no component or route code changes.
 */

/**
 * Visual treatment of the Classical template — same content, different
 * color/weight styling. The first three mirror the exports Parth had
 * already made by hand outside this repo: a gold screen look, a
 * black-ink-forced print look, and a bolder gold look. "sans" is a
 * readability-focused variant from reviewer feedback (Akshi Jhawar,
 * 2026-01-10): sans-serif body copy, and a tinted strip behind each of the
 * three broad section headings so they're easier to scan.
 */
export type ResumeStyle = "classical" | "print-safe" | "bold" | "sans";

export const resumeStyles: readonly { id: ResumeStyle; label: string }[] = [
  { id: "classical", label: "Gold" },
  { id: "print-safe", label: "Print-safe" },
  { id: "bold", label: "Bold" },
  { id: "sans", label: "Sans" },
];

export type ResumeStat = {
  value: string;
  label: string;
};

export type ResumeHighlight = {
  lead: string;
  body: string;
};

export type ResumeExperience = {
  company: string;
  period: string;
  title: string;
  /** Titles held en route to `title`, oldest first. Omit if there was none. */
  progression?: string[];
  stats: ResumeStat[];
  highlights: ResumeHighlight[];
};

export type ResumeEducation = {
  institution: string;
  period: string;
  degree: string;
  honours: string;
};

export type ResumeVariant = {
  /** URL-safe id — becomes /resume/[slug] once more than one variant exists. */
  slug: string;
  /** Shown in a variant switcher once there is more than one. */
  label: string;
  name: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  linkedin: { label: string; href: string };
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
};
