import type { Story } from "./types";

/**
 * ⚠️ TODO(parth) — THE STAGES ARE BLANK ON PURPOSE.
 *
 * The account profiles below are anonymised from real engagements you named.
 * The stage-by-stage narrative is the part only you have. Fill each `what`
 * with what actually happened — who was in the room, what you asked, what
 * changed their mind, what nearly killed the deal.
 *
 * Keep them anonymised. A profile rich enough to picture is the goal; a
 * named customer on a page you send to a prospective employer is not.
 */

const TODO = "TODO — fill in.";

export const stories: Story[] = [
  {
    slug: "innovator-de",
    profile:
      "Top-tier global innovator pharma. German headquarters, multi-site manufacturing network, mature quality organisation with an established validation function.",
    region: "Germany",
    product: "Cleaning validation",
    hook: "TODO — the one line that makes this deal worth hearing about.",
    whyBuy: TODO,
    whyNow: TODO,
    whyUs: TODO,
    stages: [
      { stage: "Discovery", what: TODO },
      { stage: "Demo", what: TODO },
      { stage: "Workshop", what: TODO },
      { stage: "Business case", what: TODO },
      { stage: "Decision", what: TODO },
      { stage: "Contracting", what: TODO },
    ],
    outcome: TODO,
  },
  {
    slug: "diversified-healthcare-de",
    profile:
      "Global diversified healthcare manufacturer. European site, broad product portfolio spanning regulated and consumer lines, centralised IT with strict infrastructure review.",
    region: "Germany",
    product: "Cleaning validation",
    hook: "TODO",
    whyBuy: TODO,
    whyNow: TODO,
    whyUs: TODO,
    stages: [
      { stage: "Discovery", what: TODO },
      { stage: "Demo", what: TODO },
      { stage: "Workshop", what: TODO },
      { stage: "Business case", what: TODO },
      { stage: "Decision", what: TODO },
      { stage: "Contracting", what: TODO },
    ],
    outcome: TODO,
  },
  {
    slug: "cosmetics-global",
    profile:
      "Global cosmetics and personal care manufacturer. A different regulatory regime from pharma — the compliance argument had to be rebuilt rather than reused.",
    region: "UK / US",
    product: "Cleaning validation",
    hook: "TODO — what changes when the buyer is not under GMP?",
    whyBuy: TODO,
    whyNow: TODO,
    whyUs: TODO,
    stages: [
      { stage: "Discovery", what: TODO },
      { stage: "Demo", what: TODO },
      { stage: "Workshop", what: TODO },
      { stage: "Business case", what: TODO },
      { stage: "Decision", what: TODO },
      { stage: "Contracting", what: TODO },
    ],
    outcome: TODO,
  },
  {
    slug: "large-cap-us-site",
    profile:
      "Top-5 global innovator pharma, large US manufacturing site. Long-tenured quality staff who have evaluated every vendor in the category.",
    region: "United States",
    product: "TODO — which product line?",
    hook: "TODO",
    whyBuy: TODO,
    whyNow: TODO,
    whyUs: TODO,
    stages: [
      { stage: "Discovery", what: TODO },
      { stage: "Demo", what: TODO },
      { stage: "Workshop", what: TODO },
      { stage: "Business case", what: TODO },
      { stage: "Decision", what: TODO },
      { stage: "Contracting", what: TODO },
    ],
    outcome: TODO,
  },
];

/** True when a field still holds placeholder text — drives the UI warning. */
export const isTodo = (s?: string) => !s || s.startsWith("TODO");
