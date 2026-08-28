import type { Company } from "./types";

/**
 * PER-INTERVIEW research. One entry per company you are interviewing with.
 * Copy the `example` entry, rename the slug, and rewrite it — this is the
 * section that does the most work in the room, and it must be specific.
 *
 * URL: /pitch/<slug>
 */

const example: Company = {
  slug: "example",
  name: "Example Biotech",
  role: "Solution Consultant / Enterprise",
  industry:
    "Describe the industry as you understand it — where the money moves, what the regulatory pressure is, what is changing right now.",
  map: [
    {
      unit: "Product or business line one",
      targetAccounts:
        "Which accounts this is sold into — size, geography, segment.",
      personas: [
        "Persona — their actual title",
        "Persona — the one who blocks",
        "Persona — the economic buyer",
      ],
      painPoints: [
        "The pain in their words, not yours",
        "The pain they will not say out loud",
      ],
      valueProps: [
        "What would make this persona lean forward",
        "The proof they will ask for",
      ],
    },
  ],
  contribution: [
    "Where your experience maps onto a problem they actually have.",
    "Be specific about which part of your background applies, and which does not.",
  ],
  questions: [
    "How accurate is this read of your market?",
    "Where in this picture do you most need help right now?",
  ],
};

export const companies: Company[] = [example];

export const companyBySlug = Object.fromEntries(
  companies.map((c) => [c.slug, c]),
) as Record<string, Company>;
