/**
 * Captures the Phase 1 explorations in `.design/explore/<dir>/` and builds a
 * comparison sheet. Grouped by surface rather than by direction — the decision
 * is "which home page wins", so all six homes need to sit side by side.
 *
 *   npm run shoot:explore
 *
 * Separate from shoot.mjs on purpose: that one screenshots the real site over
 * HTTP, this one screenshots disposable file:// sketches.
 */
import { readdir, readFile, rm, mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { chromium } from "playwright";

const ROOT = ".design/explore";
const OUT = ".design/explore/_shots";
const SURFACES = ["home", "article"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const entries = await readdir(ROOT, { withFileTypes: true });
const dirs = entries
  .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
  .map((e) => e.name)
  .sort();

if (dirs.length === 0) {
  console.error(`✗ No direction folders in ${ROOT}.`);
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const shots = [];
const briefs = {};

try {
  for (const dir of dirs) {
    try {
      briefs[dir] = await readFile(join(ROOT, dir, "BRIEF.md"), "utf8");
    } catch {
      briefs[dir] = "_No BRIEF.md written._";
    }

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
        colorScheme: "light",
        reducedMotion: "reduce",
      });
      const page = await context.newPage();

      for (const surface of SURFACES) {
        const file = resolve(ROOT, dir, `${surface}.html`);
        let ok = true;
        try {
          await page.goto(`file://${file}`, { waitUntil: "networkidle", timeout: 30_000 });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(250);
        } catch {
          ok = false;
        }
        if (!ok) {
          console.log(`  ${dir}/${surface} @${vp.name}  ✗ missing or failed to load`);
          continue;
        }

        const shot = join(OUT, `${dir}--${surface}--${vp.name}.png`);
        await page.screenshot({ path: shot, fullPage: true });

        // The fold decides whether anyone scrolls. Capture it separately.
        let fold = null;
        if (vp.name === "desktop") {
          fold = join(OUT, `${dir}--${surface}--fold.png`);
          await page.screenshot({ path: fold, fullPage: false });
        }

        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        const overflows = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        shots.push({ dir, surface, viewport: vp.name, shot, fold, height, overflows });
        console.log(
          `  ${dir.padEnd(14)} ${surface.padEnd(8)} ${vp.name.padEnd(8)} ${height}px` +
            (overflows ? "  ⚠ HORIZONTAL OVERFLOW" : ""),
        );
      }
      await context.close();
    }
  }

  await writeFile(join(OUT, "index.html"), sheet(shots, dirs, briefs));
  console.log(`\n✓ ${shots.length} frames → ${OUT}/index.html`);
  const bad = shots.filter((s) => s.overflows);
  if (bad.length) {
    console.log(`⚠ overflow: ${bad.map((b) => `${b.dir}/${b.surface}@${b.viewport}`).join(", ")}`);
  }
} finally {
  await browser.close();
}

function sheet(shots, dirs, briefs) {
  const pick = (dir, surface, viewport) =>
    shots.find((s) => s.dir === dir && s.surface === surface && s.viewport === viewport);
  const name = (f) => (f ? f.split("/").pop() : null);

  const row = (surface, viewport, key) => `
    <section>
      <h2>${surface} · ${viewport === "fold" ? "desktop, above the fold" : viewport}</h2>
      <div class="row">
        ${dirs
          .map((dir) => {
            const s = pick(dir, surface, viewport === "fold" ? "desktop" : viewport);
            const src = s ? name(key === "fold" ? s.fold : s.shot) : null;
            return `<figure>
              <figcaption>${dir}${s?.overflows ? ' <b class="warn">overflow</b>' : ""}</figcaption>
              ${src ? `<a href="${src}" target="_blank"><img src="${src}" alt="${dir} ${surface}"></a>` : `<div class="missing">missing</div>`}
            </figure>`;
          })
          .join("")}
      </div>
    </section>`;

  const briefBlocks = dirs
    .map(
      (dir) => `<article><h3>${dir}</h3><pre>${briefs[dir]
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")}</pre></article>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Phase 1 — six directions</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; padding: 2rem; background: #1c1c1a; color: #e8e6e0;
         font: 13px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; }
  h1 { font-size: 1rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 500; }
  h1 small { display:block; margin-top:.4rem; color:#8f8d86; letter-spacing:0; text-transform:none; }
  section { margin: 3rem 0; border-top: 1px solid #3a3934; padding-top: 1rem; }
  h2 { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 500; color:#c9c6bd; }
  .row { display: flex; gap: 1.25rem; align-items: flex-start; overflow-x: auto; padding-bottom: .75rem; }
  figure { margin: 0; flex: 0 0 auto; }
  figcaption { font-size: .7rem; color: #8f8d86; margin-bottom: .5rem; letter-spacing: .08em; text-transform: uppercase; }
  .warn { color: #e0745c; }
  img { display: block; max-height: 760px; width: auto; background: #fff; border: 1px solid #3a3934; }
  .missing { width: 200px; height: 120px; display: grid; place-items: center; color: #e0745c; border: 1px dashed #3a3934; }
  .briefs { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
  .briefs article { border: 1px solid #3a3934; padding: 1rem; }
  .briefs h3 { margin: 0 0 .75rem; font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: #c9c6bd; }
  pre { white-space: pre-wrap; margin: 0; color: #a8a59c; font-size: 12px; }
</style></head><body>
<h1>Phase 1 — six directions<small>${dirs.join(" · ")} · ${new Date().toString()}</small></h1>
${row("home", "fold", "fold")}
${row("home", "desktop", "full")}
${row("article", "desktop", "full")}
${row("home", "mobile", "full")}
${row("article", "mobile", "full")}
<section><h2>Direction briefs</h2><div class="briefs">${briefBlocks}</div></section>
</body></html>`;
}
