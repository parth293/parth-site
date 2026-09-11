import GithubSlugger from "github-slugger";
import { getDoc, getNotes } from "./content";
import type { PillarSlug } from "./site";

/**
 * Pulls the closing "Key points" bullet list out of a note for a
 * standalone flashcard-style review view. See BIOPROCESS_ENG_GUIDE.md for
 * the section convention this depends on: a "## Key points" heading
 * followed by a bullet list, each item a standalone recallable fact.
 */

export type KeyPoint = {
  /** Raw markdown text of one bullet item (bold/math intact, no leading "- "). */
  text: string;
  noteTitle: string;
  noteHref: string;
  /** Anchor id matching what rehype-slug assigns the "Key points" heading in the article. */
  headingSlug: string;
};

const KEY_POINTS_HEADING = /^(#{2,4})\s+Key points\s*$/i;

function extractKeyPoints(body: string, noteTitle: string, noteHref: string): KeyPoint[] {
  const lines = body.split("\n");
  const slugger = new GithubSlugger();
  const points: KeyPoint[] = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(KEY_POINTS_HEADING);
    if (!match) continue;

    const level = match[1].length;
    const headingSlug = slugger.slug("Key points");

    let j = i + 1;
    while (j < lines.length) {
      const nextHeading = lines[j].match(/^(#{2,4})\s+/);
      if (nextHeading && nextHeading[1].length <= level) break;

      if (/^-\s+\S/.test(lines[j])) {
        let text = lines[j].trim().replace(/^-\s+/, "");
        let k = j + 1;
        while (k < lines.length && /^\s{2,}\S/.test(lines[k])) {
          text += " " + lines[k].trim();
          k++;
        }
        points.push({ text, noteTitle, noteHref, headingSlug });
        j = k;
        continue;
      }
      j++;
    }
    i = j - 1;
  }

  return points;
}

export async function getKeyPoints(pillar: PillarSlug): Promise<KeyPoint[]> {
  const docs = await getNotes(pillar);
  return docs.flatMap((doc) => extractKeyPoints(doc.body, doc.title, doc.href));
}

/** Scoped to one note — powers that note's "Key points" tab. */
export async function getKeyPointsForNote(pillar: PillarSlug, slug: string): Promise<KeyPoint[]> {
  const doc = await getDoc(pillar, slug);
  if (!doc) return [];
  return extractKeyPoints(doc.body, doc.title, doc.href);
}
