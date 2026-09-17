import GithubSlugger from "github-slugger";
import { getDoc } from "./content";
import type { PillarSlug } from "./site";

/**
 * Pulls numbered "Q<n>" question headings out of a solved past-paper note,
 * for a "jump to question" navigator. Depends on the convention this note
 * type uses: a `#### Q<n> — ...` heading per question.
 */

export type QuestionHeading = {
  num: number;
  headingSlug: string;
};

const QUESTION_HEADING = /^#{2,4}\s+Q(\d+)\b.*$/;

function extractQuestionHeadings(body: string): QuestionHeading[] {
  const slugger = new GithubSlugger();
  const questions: QuestionHeading[] = [];

  for (const line of body.split("\n")) {
    const match = line.match(QUESTION_HEADING);
    if (!match) continue;
    const heading = line.replace(/^#{2,4}\s+/, "").trim();
    questions.push({ num: Number(match[1]), headingSlug: slugger.slug(heading) });
  }

  return questions;
}

export async function getQuestionHeadingsForNote(
  pillar: PillarSlug,
  slug: string,
): Promise<QuestionHeading[]> {
  const doc = await getDoc(pillar, slug);
  if (!doc) return [];
  return extractQuestionHeadings(doc.body);
}
