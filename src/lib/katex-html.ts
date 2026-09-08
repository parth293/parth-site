import katex from "katex";

/** Server-side KaTeX rendering for plain strings pulled out of MDX (headings, bullet lines) — not run through the MDX pipeline, so `$...$` needs rendering by hand. */

export function renderMath(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode });
  } catch {
    return latex;
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** A line with inline "$...$" math mixed into plain text: render the math parts, escape the rest. */
export function renderInlineLine(text: string): string {
  return text
    .split(/(\$[^$]+\$)/g)
    .map((part) =>
      part.startsWith("$") && part.endsWith("$") && part.length > 1
        ? renderMath(part.slice(1, -1), false)
        : escapeHtml(part),
    )
    .join("");
}
