/**
 * Guards against the failure that shipped once already: if the Tailwind
 * import is missing or content detection breaks, the build still succeeds
 * and every page renders as unstyled HTML. Utilities are not optional —
 * assert a few load-bearing ones actually made it into the output.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// Turbopack and webpack emit stylesheets to different subdirectories, so
// walk .next/static rather than hard-coding either one.
const STATIC_DIR = ".next/static";

async function findCss(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await findCss(full)));
    else if (entry.name.endsWith(".css")) out.push(full);
  }
  return out;
}
const REQUIRED = [
  ".bg-paper",
  ".text-ink",
  ".border-rule",
  ".font-serif",
  ".label",
  ".measure",
  ".prose",
];

let files;
try {
  files = await findCss(STATIC_DIR);
} catch {
  console.error(`✗ No ${STATIC_DIR} directory — did the build run?`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`✗ No stylesheet emitted anywhere under ${STATIC_DIR}.`);
  process.exit(1);
}

const css = (
  await Promise.all(files.map((f) => readFile(f, "utf8")))
).join("\n");

const missing = REQUIRED.filter((sel) => !css.includes(sel));

if (missing.length > 0) {
  console.error(
    `✗ Stylesheet is missing ${missing.length} required selector(s): ${missing.join(", ")}\n` +
      `  Most likely cause: \`@import "tailwindcss";\` is missing from src/app/globals.css,\n` +
      `  or Tailwind is no longer scanning src/. The site will render unstyled.`,
  );
  process.exit(1);
}

console.log(`✓ Stylesheet OK — ${REQUIRED.length} selectors present in ${(css.length / 1024) | 0}KB.`);
