/**
 * Data model for the interview pitch — the narration surface used during
 * "tell me about yourself".
 *
 * The split that matters: everything in `profile`, `timeline`, `products`,
 * and `stories` is STABLE — it describes Parth and does not change between
 * interviews. Everything in `Company` is PER-INTERVIEW research and gets a
 * new file each time. Never merge the two.
 */

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  /** Standing, rank, medals — the things that are hard to claim without proof. */
  honours: string[];
  /** Grouped coursework. Grouping is thematic, not chronological — an
   *  interviewer scanning this wants to see capability areas, not semesters. */
  coursework: { group: string; note: string; subjects: string[] }[];
  labs: { area: string; work: string }[];
  /** The B.Tech-vs-B.Pharm argument, which is the actual differentiator. */
  contrast: { dimension: string; bpharm: string; mine: string }[];
};

export type Role = {
  /** Short label for the timeline rail. */
  phase: string;
  /** Formal title(s) held during this phase. */
  titles: string[];
  period: string;
  /** One line framing what this phase was fundamentally about. */
  thesis: string;
  /** The three axes an interviewer screens on. */
  jobs: string[];
  outcomes: string[];
  skills: string[];
};

export type Product = {
  name: string;
  line: string;
  what: string;
  /** Why it is technically or scientifically non-trivial. */
  hard: string;
};

/** The six stages of an enterprise sales cycle, as run in regulated pharma. */
export type DealStage =
  | "Discovery"
  | "Demo"
  | "Workshop"
  | "Business case"
  | "Decision"
  | "Contracting";

export type Story = {
  slug: string;
  /** Anonymised but richly profiled — the reader should be able to picture
   *  the account without it being named. */
  profile: string;
  region: string;
  product: string;
  /** The one-line hook: what made this deal interesting or hard. */
  hook: string;
  /** Compact framing an interviewer can scan before you narrate. */
  whyBuy?: string;
  whyNow?: string;
  whyUs?: string;
  stages: { stage: DealStage; what: string }[];
  outcome?: string;
};

/** Per-interview research. One file per company. */
export type Company = {
  slug: string;
  name: string;
  /** Shown at the top so you can confirm you are on the right deck. */
  role: string;
  industry: string;
  /** Company-level or product-level market map. */
  map: {
    unit: string;
    targetAccounts: string;
    personas: string[];
    painPoints: string[];
    valueProps: string[];
  }[];
  /** Where you believe you can contribute — the close. */
  contribution: string[];
  /** The questions you hand back to the interviewer. */
  questions: string[];
};
