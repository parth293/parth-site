import GithubSlugger from "github-slugger";
import { getDoc } from "./content";
import { getSyllabusTree, type SyllabusSection } from "./gate-syllabus";
import type { PillarSlug } from "./site";

/**
 * Pulls per-question syllabus tags out of a tagged past-paper note for its
 * "Topics" tab. Depends on the convention: a `#### Q<n> — <marks> mark(s),
 * <type>` question heading, followed (before the next heading) by a
 * `{/* syllabus: <code>[, <code>] *\/}` comment — one or more comma-separated
 * codes, or the literal "general-aptitude" for questions outside the
 * syllabus tree.
 */

export type TaggedQuestion = {
  heading: string;
  headingSlug: string;
  tags: string[];
  marks: number;
};

const TAG_COMMENT = /^\{\/\*\s*syllabus:\s*([^*]+?)\s*\*\/\}$/;
const MARKS_IN_HEADING = /(\d+)\s*marks?/i;

function extractTaggedQuestions(body: string): TaggedQuestion[] {
  const lines = body.split("\n");
  const slugger = new GithubSlugger();
  const questions: TaggedQuestion[] = [];

  let heading = "";
  let headingSlug = "";
  let marks = 0;

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,4}\s+(.+)$/);
    if (headingMatch) {
      heading = headingMatch[1].trim();
      headingSlug = slugger.slug(heading);
      marks = Number(heading.match(MARKS_IN_HEADING)?.[1] ?? 0);
      continue;
    }

    const tagMatch = line.trim().match(TAG_COMMENT);
    if (tagMatch && heading) {
      const tags = tagMatch[1].split(",").map((t) => t.trim()).filter(Boolean);
      if (tags.length > 0) questions.push({ heading, headingSlug, tags, marks });
    }
  }

  return questions;
}

export async function getSyllabusTagsForNote(
  pillar: PillarSlug,
  slug: string,
): Promise<TaggedQuestion[]> {
  const doc = await getDoc(pillar, slug);
  if (!doc) return [];
  return extractTaggedQuestions(doc.body);
}

export type ItemCoverage = { code: string; title: string; count: number; marks: number };
export type TopicCoverage = { code: string; title: string; count: number; marks: number; items: ItemCoverage[] };
export type SectionCoverage = { code: string; title: string; count: number; marks: number; topics: TopicCoverage[] };

export type CoverageTree = {
  taggedQuestions: number;
  taggedMarks: number;
  sections: SectionCoverage[];
  /** Tags with no numeric syllabus code (e.g. "general-aptitude"), by raw tag. */
  flat: { tag: string; count: number; marks: number }[];
};

const NUMERIC_CODE = /^\d+\.\d+\.\d+$/;

/**
 * Rolls per-question tags up against the FULL syllabus tree — every
 * section/topic/item appears even at zero count, so gaps ("what hasn't
 * come up yet") are visible, not just what's already tagged. Counts both
 * questions and marks at every level, since a handful of 2-mark questions
 * can outweigh a longer tail of 1-mark ones.
 */
export function buildCoverageTree(
  questions: TaggedQuestion[],
  syllabus: SyllabusSection[],
): CoverageTree {
  const itemStats = new Map<string, { count: number; marks: number }>();
  const flatMap = new Map<string, { count: number; marks: number }>();

  for (const q of questions) {
    for (const tag of q.tags) {
      const bucket = NUMERIC_CODE.test(tag) ? itemStats : flatMap;
      const prev = bucket.get(tag) ?? { count: 0, marks: 0 };
      bucket.set(tag, { count: prev.count + 1, marks: prev.marks + q.marks });
    }
  }

  const sections: SectionCoverage[] = syllabus.map((section) => {
    const topics: TopicCoverage[] = section.topics.map((topic) => {
      const items: ItemCoverage[] = topic.items.map((item) => {
        const stats = itemStats.get(item.code) ?? { count: 0, marks: 0 };
        return { code: item.code, title: item.title, ...stats };
      });
      const count = items.reduce((sum, i) => sum + i.count, 0);
      const marks = items.reduce((sum, i) => sum + i.marks, 0);
      return { code: topic.code, title: topic.title, count, marks, items };
    });
    const count = topics.reduce((sum, t) => sum + t.count, 0);
    const marks = topics.reduce((sum, t) => sum + t.marks, 0);
    return { code: section.code, title: section.title, count, marks, topics };
  });

  const flat = [...flatMap.entries()]
    .map(([tag, stats]) => ({ tag, ...stats }))
    .sort((a, b) => b.marks - a.marks);

  const taggedQuestions = questions.length;
  const taggedMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  return { taggedQuestions, taggedMarks, sections, flat };
}

export async function getCoverageTreeForNote(
  pillar: PillarSlug,
  slug: string,
  syllabusRef?: string,
): Promise<CoverageTree> {
  const questions = await getSyllabusTagsForNote(pillar, slug);
  const syllabus = syllabusRef ? await getSyllabusTree(syllabusRef) : [];
  return buildCoverageTree(questions, syllabus);
}
