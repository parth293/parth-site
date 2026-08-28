import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { PillarSlug } from "./site";

/**
 * Filesystem-backed MDX collections. Publishing = add a .mdx file with
 * valid frontmatter + git commit. Every listing page and article page
 * reads through this module — do not read `content/` directly elsewhere.
 *
 * Layout on disk:
 *   content/notes/<pillar>/<slug>.mdx
 *   content/writing/<slug>.mdx
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type Frontmatter = {
  title: string;
  /** ISO date, e.g. "2026-08-28". Drives ordering and the visible date. */
  date: string;
  summary: string;
  tags?: string[];
  /** Set to true to keep a file in the repo but out of listings. */
  draft?: boolean;
  /** ISO date; shown as "last updated" when newer than `date`. */
  updated?: string;
};

export type Doc = Frontmatter & {
  slug: string;
  /** "writing" or the pillar slug. */
  collection: "writing" | PillarSlug;
  /** Route to the rendered article. */
  href: string;
  /** Raw MDX body, frontmatter stripped. */
  body: string;
  readingMinutes: number;
};

function assertFrontmatter(data: Record<string, unknown>, file: string): Frontmatter {
  const missing = (["title", "date", "summary"] as const).filter((k) => !data[k]);
  if (missing.length > 0) {
    throw new Error(`${file}: missing frontmatter field(s): ${missing.join(", ")}`);
  }
  if (Number.isNaN(Date.parse(String(data.date)))) {
    throw new Error(`${file}: frontmatter \`date\` is not a parseable date: ${String(data.date)}`);
  }
  return data as Frontmatter;
}

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}

async function readCollection(dir: string, collection: Doc["collection"], hrefBase: string): Promise<Doc[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return []; // Collection has no articles yet.
  }

  const docs = await Promise.all(
    entries
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data, content } = matter(raw);
        const fm = assertFrontmatter(data, path.join(collection, file));
        const slug = file.replace(/\.mdx$/, "");
        return {
          ...fm,
          slug,
          collection,
          href: `${hrefBase}/${slug}`,
          body: content,
          readingMinutes: readingMinutes(content),
        } satisfies Doc;
      }),
  );

  return docs
    .filter((d) => !d.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getNotes(pillar: PillarSlug): Promise<Doc[]> {
  return readCollection(path.join(CONTENT_ROOT, "notes", pillar), pillar, `/notes/${pillar}`);
}

export function getWriting(): Promise<Doc[]> {
  return readCollection(path.join(CONTENT_ROOT, "writing"), "writing", "/writing");
}

/** Every doc across every collection, newest first. Powers "recently added". */
export async function getAllDocs(): Promise<Doc[]> {
  const { pillars } = await import("./site");
  const groups = await Promise.all([
    getWriting(),
    ...pillars.map((p) => getNotes(p.slug)),
  ]);
  return groups.flat().sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getDoc(
  collection: Doc["collection"],
  slug: string,
): Promise<Doc | undefined> {
  const docs = collection === "writing" ? await getWriting() : await getNotes(collection);
  return docs.find((d) => d.slug === slug);
}

/** Formats an ISO date as "28 Aug 2026" — stable across locales. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
