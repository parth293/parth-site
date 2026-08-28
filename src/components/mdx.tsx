import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

/**
 * Renders an MDX body with the site's plugin pipeline. Styling lives in
 * the `.prose` block in globals.css, not here — keep this file about
 * the transform, not the look.
 */
export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                { theme: "github-light" }, // light-only site; see globals.css
              ],
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "append",
                  properties: { className: "heading-anchor", ariaHidden: true, tabIndex: -1 },
                  content: { type: "text", value: "#" },
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
