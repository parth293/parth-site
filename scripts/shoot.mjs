/**
 * Screenshot harness. The design process in DESIGN_PROCESS.md runs on rendered
 * pixels, not on markup — a critic that sees code stops being objective, and a
 * green build has already once shipped an unstyled site. This is how any surface
 * gets looked at.
 *
 *   npm run shoot                      # builds nothing; serves .next, captures all
 *   npm run shoot -- --url http://localhost:3000   # reuse a running dev server
 *   npm run shoot -- --only home,article           # capture a subset
 *
 * Output: .design/shots/<viewport>/<label>.png plus a contact sheet at
 * .design/shots/index.html. The whole directory is disposable and gitignored.
 */
import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const OUT = ".design/shots";
const PORT = 3100;

/** Every surface the redesign touches. Label doubles as the filename. */
const ROUTES = [
  { label: "home",          path: "/",                        title: "Home" },
  { label: "journey",       path: "/journey",                 title: "Journey" },
  { label: "resume",        path: "/resume",                  title: "Resume" },
  { label: "now",           path: "/now",                     title: "Now" },
  { label: "notes",         path: "/notes",                   title: "Notes index" },
  { label: "notes-pharma",  path: "/notes/pharma-eng",        title: "Pillar — Pharmaceutical Engineering" },
  { label: "notes-bioproc", path: "/notes/bioprocess-eng",    title: "Pillar — Bioprocess Engineering" },
  { label: "notes-gate",    path: "/notes/gate-bt",           title: "Pillar — GATE-BT" },
  { label: "notes-sales",   path: "/notes/sales-eng",         title: "Pillar — Sales Engineering" },
  { label: "writing",       path: "/writing",                 title: "Writing index" },
  { label: "article",       path: "/writing/colophon",        title: "Article — Colophon" },
  { label: "pitch",         path: "/pitch/example",           title: "Pitch (unlisted)" },
  { label: "not-found",     path: "/no-such-page-exists",     title: "404" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet",  width: 834,  height: 1112 },
  { name: "mobile",  width: 390,  height: 844 },
];

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

async function waitForServer(url, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status === 404) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

const only = arg("--only")?.split(",").map((s) => s.trim());
const routes = only ? ROUTES.filter((r) => only.includes(r.label)) : ROUTES;
if (routes.length === 0) {
  console.error(`✗ --only matched no routes. Known: ${ROUTES.map((r) => r.label).join(", ")}`);
  process.exit(1);
}

let baseUrl = arg("--url") ?? process.env.SHOOT_URL;
let server;

if (baseUrl) {
  if (!(await waitForServer(baseUrl, 5_000))) {
    console.error(`✗ Nothing responding at ${baseUrl}.`);
    process.exit(1);
  }
  console.log(`→ Using running server at ${baseUrl}`);
} else {
  baseUrl = `http://localhost:${PORT}`;
  console.log(`→ Starting \`next start\` on ${PORT} (run \`npm run build\` first if this hangs)`);
  server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "ignore", "inherit"],
  });
  if (!(await waitForServer(baseUrl))) {
    server.kill();
    console.error("✗ Server never became ready. Is there a production build in .next?");
    process.exit(1);
  }
}

await rm(OUT, { recursive: true, force: true });
const browser = await chromium.launch();
const captured = [];

try {
  for (const vp of VIEWPORTS) {
    await mkdir(join(OUT, vp.name), { recursive: true });
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    for (const route of routes) {
      const url = `${baseUrl}${route.path}`;
      const res = await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      // Webfonts decide half the design; capturing before they swap is a lie.
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);

      const file = join(OUT, vp.name, `${route.label}.png`);
      await page.screenshot({ path: file, fullPage: true });

      // The fold is its own design problem — worth a separate frame.
      let fold = null;
      if (vp.name === "desktop") {
        fold = join(OUT, vp.name, `${route.label}--fold.png`);
        await page.screenshot({ path: fold, fullPage: false });
      }

      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );

      captured.push({ ...route, viewport: vp.name, file, fold, height, overflows, status: res?.status() ?? 0 });
      console.log(
        `  ${vp.name.padEnd(7)} ${route.label.padEnd(14)} ${res?.status()}  ${height}px` +
          (overflows ? "  ⚠ HORIZONTAL OVERFLOW" : ""),
      );
    }
    await context.close();
  }

  await writeFile(join(OUT, "index.html"), contactSheet(captured, baseUrl));
  const bad = captured.filter((c) => c.overflows);
  console.log(`\n✓ ${captured.length} frames → ${OUT}/index.html`);
  if (bad.length > 0) {
    console.log(`⚠ ${bad.length} frame(s) scroll horizontally: ${[...new Set(bad.map((b) => `${b.label}@${b.viewport}`))].join(", ")}`);
  }
} finally {
  await browser.close();
  server?.kill();
}

/** Single page showing every route across every viewport, for eyeballing. */
function contactSheet(shots, base) {
  const byRoute = new Map();
  for (const s of shots) {
    if (!byRoute.has(s.label)) byRoute.set(s.label, []);
    byRoute.get(s.label).push(s);
  }

  const sections = [...byRoute.entries()]
    .map(([label, frames]) => {
      const meta = frames[0];
      const cells = frames
        .map(
          (f) => `
        <figure>
          <figcaption>${f.viewport} · ${f.height}px${f.overflows ? ' · <b class="warn">overflow</b>' : ""}</figcaption>
          <a href="${f.viewport}/${label}.png" target="_blank"><img src="${f.viewport}/${label}.png" alt="${label} at ${f.viewport}"></a>
        </figure>`,
        )
        .join("");
      return `
      <section>
        <h2>${meta.title} <code>${meta.path}</code> <span class="status">${meta.status}</span></h2>
        <div class="row">${cells}</div>
      </section>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Contact sheet — ${new Date().toISOString().slice(0, 16).replace("T", " ")}</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; padding: 2rem; background: #1c1c1a; color: #e8e6e0;
         font: 14px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
  h1 { font-size: 1rem; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; }
  h1 small { display: block; margin-top: .4rem; color: #8f8d86; letter-spacing: 0; text-transform: none; }
  section { margin: 3rem 0; border-top: 1px solid #3a3934; padding-top: 1rem; }
  h2 { font-size: .8rem; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
  h2 code { color: #8f8d86; text-transform: none; letter-spacing: 0; margin-left: .5rem; }
  .status { color: #8f8d86; float: right; }
  .row { display: flex; gap: 1.5rem; align-items: flex-start; overflow-x: auto; padding-bottom: .5rem; }
  figure { margin: 0; flex: 0 0 auto; }
  figcaption { font-size: .7rem; color: #8f8d86; margin-bottom: .5rem; letter-spacing: .06em; text-transform: uppercase; }
  .warn { color: #e0745c; }
  img { display: block; max-height: 620px; width: auto; background: #fff; border: 1px solid #3a3934; }
</style></head>
<body>
<h1>Contact sheet<small>${base} · ${new Date().toString()} · ${shots.length} frames</small></h1>
${sections}
</body></html>`;
}
