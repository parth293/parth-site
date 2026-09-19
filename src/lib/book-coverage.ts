import { getDoc } from "./content";
import { getSyllabusTree, type SyllabusSection } from "./gate-syllabus";
import type { PillarSlug } from "./site";

/**
 * Pulls reference-book-vs-syllabus tables out of a syllabus-shaped note for
 * its "Book coverage" tab. Depends on the convention: a "## Book coverage"
 * heading, then one `### <Book title>` heading per book, each followed by a
 * table with columns `| Code | Topic | Coverage | Notes |` where Code is a
 * syllabus topic code (`N.M`) and Coverage is `Full`, `Partial`, or `None`.
 * Coverage is judged at topic granularity, not item — a table of contents
 * can't reliably resolve finer than that.
 */

export type CoverageLevel = "full" | "partial" | "none";

export type CoverageTopic = {
  code: string;
  title: string;
  level: CoverageLevel;
  note: string;
};

export type CoverageSection = {
  code: string;
  title: string;
  topics: CoverageTopic[];
  counts: Record<CoverageLevel, number>;
};

export type BookCoverage = {
  title: string;
  sections: CoverageSection[];
  totals: Record<CoverageLevel, number>;
};

type RawTag = { code: string; level: CoverageLevel; note: string };
type RawBook = { title: string; tags: Map<string, RawTag> };

const BOOK_COVERAGE_HEADING = /^##\s+Book coverage\s*$/i;
const ANY_H2 = /^##\s+/;
const BOOK_TITLE_HEADING = /^###\s+(.+)$/;
const TABLE_ROW = /^\|\s*(\d+\.\d+)\s*\|\s*(.+?)\s*\|\s*(Full|Partial|None)\s*\|\s*(.+?)\s*\|\s*$/i;

function parseRawBooks(body: string): RawBook[] {
  const lines = body.split("\n");
  const books: RawBook[] = [];
  let inSection = false;
  let current: RawBook | undefined;

  for (const line of lines) {
    if (BOOK_COVERAGE_HEADING.test(line)) {
      inSection = true;
      continue;
    }
    if (!inSection) continue;
    if (ANY_H2.test(line)) {
      inSection = false;
      continue;
    }

    const titleMatch = line.match(BOOK_TITLE_HEADING);
    if (titleMatch) {
      current = { title: titleMatch[1].trim(), tags: new Map() };
      books.push(current);
      continue;
    }

    const rowMatch = line.match(TABLE_ROW);
    if (rowMatch && current) {
      const [, code, , level, note] = rowMatch;
      current.tags.set(code, { code, level: level.toLowerCase() as CoverageLevel, note });
    }
  }

  return books;
}

function buildCoverage(raw: RawBook, syllabus: SyllabusSection[]): BookCoverage {
  const zeroCounts = (): Record<CoverageLevel, number> => ({ full: 0, partial: 0, none: 0 });
  const totals = zeroCounts();

  const sections: CoverageSection[] = syllabus.map((section) => {
    const counts = zeroCounts();
    const topics: CoverageTopic[] = section.topics.map((topic) => {
      const tag = raw.tags.get(topic.code);
      const level = tag?.level ?? "none";
      counts[level]++;
      totals[level]++;
      return {
        code: topic.code,
        title: topic.title,
        level,
        note: tag?.note ?? "Not in the table of contents.",
      };
    });
    return { code: section.code, title: section.title, topics, counts };
  });

  return { title: raw.title, sections, totals };
}

export async function getBookCoverageForNote(
  pillar: PillarSlug,
  slug: string,
): Promise<BookCoverage[]> {
  const doc = await getDoc(pillar, slug);
  if (!doc) return [];

  const rawBooks = parseRawBooks(doc.body);
  if (rawBooks.length === 0) return [];

  const syllabus = doc.syllabusRef ? await getSyllabusTree(doc.syllabusRef) : [];
  return rawBooks.map((raw) => buildCoverage(raw, syllabus));
}
