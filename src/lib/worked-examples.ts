import GithubSlugger from "github-slugger";
import { getDoc, getNotes } from "./content";
import type { PillarSlug } from "./site";

/**
 * Pulls every "Worked example" subsection out of a pillar's notes for a
 * standalone practice view. Unlike formulas.ts, this doesn't parse
 * structure — it just captures the raw MDX between a heading whose text
 * starts with "Worked example" and the next heading of the same or
 * shallower level, then hands that fragment back to <Mdx> to render. See
 * BIOPROCESS_ENG_GUIDE.md for the heading convention this depends on.
 */

export type WorkedExample = {
  /** The full heading text, e.g. "Worked example: reading n off a log-log plot". */
  heading: string;
  /** Anchor id matching what rehype-slug assigns that heading in the article. */
  headingSlug: string;
  /** Raw MDX between the heading and the next same-or-shallower heading. */
  body: string;
  noteTitle: string;
  noteHref: string;
};

const WORKED_EXAMPLE_HEADING = /^(#{2,4})\s+(Worked example.*)$/i;

function extractWorkedExamples(body: string, noteTitle: string, noteHref: string): WorkedExample[] {
  const lines = body.split("\n");
  const slugger = new GithubSlugger();
  const examples: WorkedExample[] = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(WORKED_EXAMPLE_HEADING);
    if (!match) continue;

    const level = match[1].length;
    const heading = match[2].trim();
    const headingSlug = slugger.slug(heading);

    const bodyLines: string[] = [];
    let j = i + 1;
    while (j < lines.length) {
      const nextHeading = lines[j].match(/^(#{2,4})\s+/);
      if (nextHeading && nextHeading[1].length <= level) break;
      bodyLines.push(lines[j]);
      j++;
    }

    examples.push({
      heading,
      headingSlug,
      body: bodyLines.join("\n").trim(),
      noteTitle,
      noteHref,
    });
    i = j - 1;
  }

  return examples;
}

export async function getWorkedExamples(pillar: PillarSlug): Promise<WorkedExample[]> {
  const docs = await getNotes(pillar);
  return docs.flatMap((doc) => extractWorkedExamples(doc.body, doc.title, doc.href));
}

/** Scoped to one note — powers that note's "Worked examples" tab. */
export async function getWorkedExamplesForNote(pillar: PillarSlug, slug: string): Promise<WorkedExample[]> {
  const doc = await getDoc(pillar, slug);
  if (!doc) return [];
  return extractWorkedExamples(doc.body, doc.title, doc.href);
}
