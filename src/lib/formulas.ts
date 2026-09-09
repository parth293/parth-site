import GithubSlugger from "github-slugger";
import { getDoc } from "./content";
import type { PillarSlug } from "./site";

/**
 * Pulls every display equation ($$...$$) out of a single note for that
 * note's "Formulas" tab — see BIOPROCESS_ENG_GUIDE.md's equation format,
 * which this depends on: a heading, then a $$ block, then a bullet list of
 * "$symbol$ — definition, unit" lines directly underneath. Written against
 * that convention rather than a general LaTeX-in-Markdown parser.
 */

export type Importance = "important" | "very-important";

export type Formula = {
  /** Nearest preceding heading (##, ###, or ####) — used as the formula's name. */
  heading: string;
  /** Anchor id matching what rehype-slug assigns that heading in the article. */
  headingSlug: string;
  latex: string;
  /** Raw "$symbol$ — definition" lines from the bullet list beneath the equation. */
  vars: string[];
  /** Set via a `{/* importance: very-important *\/}` comment before the equation. Defaults to "important". */
  importance: Importance;
  noteTitle: string;
  noteHref: string;
};

const IMPORTANCE_COMMENT = /^\{\/\*\s*importance:\s*(very-important|important)\s*\*\/\}$/;

function extractFormulas(body: string, noteTitle: string, noteHref: string): Formula[] {
  const lines = body.split("\n");
  const slugger = new GithubSlugger();
  const formulas: Formula[] = [];

  let heading = "";
  let headingSlug = "";
  let importance: Importance = "important";

  for (let i = 0; i < lines.length; i++) {
    const headingMatch = lines[i].match(/^#{2,4}\s+(.+)$/);
    if (headingMatch) {
      heading = headingMatch[1].trim();
      headingSlug = slugger.slug(heading);
      importance = "important";
      continue;
    }

    const importanceMatch = lines[i].trim().match(IMPORTANCE_COMMENT);
    if (importanceMatch) {
      importance = importanceMatch[1] as Importance;
      continue;
    }

    if (lines[i].trim() !== "$$") continue;

    const eqLines: string[] = [];
    let j = i + 1;
    while (j < lines.length && lines[j].trim() !== "$$") {
      eqLines.push(lines[j]);
      j++;
    }
    const latex = eqLines.join("\n").trim();

    let k = j + 1;
    while (k < lines.length && lines[k].trim() === "") k++;

    const vars: string[] = [];
    while (k < lines.length && /^-\s+\$/.test(lines[k].trim())) {
      let bullet = lines[k].trim().replace(/^-\s+/, "");
      k++;
      while (k < lines.length && /^\s{2,}\S/.test(lines[k])) {
        bullet += " " + lines[k].trim();
        k++;
      }
      vars.push(bullet);
    }

    formulas.push({ heading, headingSlug, latex, vars, importance, noteTitle, noteHref });
    i = j;
  }

  return formulas;
}

/** Scoped to one note — powers that note's "Formulas" tab. */
export async function getFormulasForNote(pillar: PillarSlug, slug: string): Promise<Formula[]> {
  const doc = await getDoc(pillar, slug);
  if (!doc) return [];
  return extractFormulas(doc.body, doc.title, doc.href);
}
