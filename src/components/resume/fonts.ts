import { Cormorant_Garamond, Lora, Source_Sans_3 } from "next/font/google";

/** Shared across every resume surface (the document itself, the knowledge base tab) so the font isn't fetched/declared twice. */

export const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--resume-font-heading",
  display: "swap",
});

export const bodyFont = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--resume-font-body",
  display: "swap",
});

/** Only applied under the "sans" style — reviewer feedback that body copy reads easier as sans-serif. */
export const sansFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--resume-font-sans",
  display: "swap",
});

export const resumeFontVariables = `${headingFont.variable} ${bodyFont.variable} ${sansFont.variable}`;
