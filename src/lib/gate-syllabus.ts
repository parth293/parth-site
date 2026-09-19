import { getDoc } from "./content";
import type { PillarSlug } from "./site";

/**
 * Parses a syllabus-shaped note (see content/notes/gate-eng/gate-bt-syllabus.mdx)
 * into its full section → topic → item structure, so a tagged past-paper
 * note can show human-readable labels and the complete syllabus (including
 * items no question has hit yet) instead of just the codes that happen to
 * appear in tags. Depends on that file's convention: `## N. Section`,
 * `### N.M Topic`, `- N.M.K Item text`.
 */

export type SyllabusItem = { code: string; title: string };
export type SyllabusTopic = { code: string; title: string; items: SyllabusItem[] };
export type SyllabusSection = { code: string; title: string; topics: SyllabusTopic[] };

export type SyllabusEntry = {
  code: string;
  itemTitle: string;
  topicCode: string;
  topicTitle: string;
  sectionCode: string;
  sectionTitle: string;
};

const SECTION_HEADING = /^##\s+(\d+)\.\s+(.+)$/;
const TOPIC_HEADING = /^###\s+(\d+\.\d+)\s+(.+)$/;
const ITEM_BULLET = /^-\s+(\d+\.\d+\.\d+)\s+(.+)$/;

function parseSyllabusTree(body: string): SyllabusSection[] {
  const sections: SyllabusSection[] = [];
  let section: SyllabusSection | undefined;
  let topic: SyllabusTopic | undefined;

  for (const line of body.split("\n")) {
    const sectionMatch = line.match(SECTION_HEADING);
    if (sectionMatch) {
      const [, code, title] = sectionMatch;
      section = { code, title, topics: [] };
      sections.push(section);
      topic = undefined;
      continue;
    }
    const topicMatch = line.match(TOPIC_HEADING);
    if (topicMatch && section) {
      const [, code, title] = topicMatch;
      topic = { code, title, items: [] };
      section.topics.push(topic);
      continue;
    }
    const itemMatch = line.match(ITEM_BULLET);
    if (itemMatch && topic) {
      const [, code, title] = itemMatch;
      topic.items.push({ code, title });
    }
  }

  return sections;
}

/** `ref` is "pillar/slug", e.g. "gate-eng/gate-bt-syllabus". */
export async function getSyllabusTree(ref: string): Promise<SyllabusSection[]> {
  const [pillar, slug] = ref.split("/");
  const doc = await getDoc(pillar as PillarSlug, slug);
  if (!doc) return [];
  return parseSyllabusTree(doc.body);
}

/** Flattens a syllabus tree into a code → entry lookup, for label resolution. */
export function flattenSyllabusTree(sections: SyllabusSection[]): Map<string, SyllabusEntry> {
  const lookup = new Map<string, SyllabusEntry>();
  for (const section of sections) {
    for (const topic of section.topics) {
      for (const item of topic.items) {
        lookup.set(item.code, {
          code: item.code,
          itemTitle: item.title,
          topicCode: topic.code,
          topicTitle: topic.title,
          sectionCode: section.code,
          sectionTitle: section.title,
        });
      }
    }
  }
  return lookup;
}

export async function getSyllabusLookup(ref: string): Promise<Map<string, SyllabusEntry>> {
  return flattenSyllabusTree(await getSyllabusTree(ref));
}
