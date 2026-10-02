import type { ResumeVariant } from "../types";
import { solutionConsultingDirector } from "./solution-consulting-director";

/** Add a new variant file and list it here — the switcher and /resume/[slug] route both read from this array. */
export const resumeVariants: readonly ResumeVariant[] = [solutionConsultingDirector];

export const defaultResumeVariant = resumeVariants[0];

export function getResumeVariant(slug: string): ResumeVariant | undefined {
  return resumeVariants.find((variant) => variant.slug === slug);
}
