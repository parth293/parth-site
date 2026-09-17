import type { Product } from "./types";

/** Context an interviewer needs before the deal stories make sense. */
export const products: Product[] = [
  {
    name: "CLEEN",
    line: "Cleaning validation",
    what: "Validates that manufacturing equipment is free of drug residue between product campaigns — MACO limits, health-based exposure limits, worst-case risk assessment, sampling protocol design, audit-ready documentation.",
    hard: "The science is the product. Getting a limit calculation wrong is a regulatory finding, not a bug report.",
    targetAccounts: [
      "Generic pharmaceutical manufacturers",
      "Innovator pharma manufacturers",
      "350+ facilities globally",
    ],
    targetPeople: ["Quality Director / Head of Quality Assurance", "Validation Lead"],
    outcomesAchieved: [
      "350+ facility implementations live globally",
      "TODO(parth): any other outcome metrics — e.g. audit findings avoided, migration volume, retention",
    ],
    costOfInaction:
      "Manual, paper/spreadsheet-based cleaning validation carries direct regulatory exposure — a wrong MACO or health-based exposure limit calculation, or an untraceable record, is an audit finding, not a fixable bug.",
    keyAccountsWon: ["Teva", "Cipla", "Dr. Reddy's", "Amneal", "Biocon"],
  },
  {
    name: "Electronic Logbooks",
    line: "Point-of-use compliance",
    what: "Turns paper equipment, area and process logbooks into structured digital records with automated interlocks — campaign checks, cleaning hold times, equipment validity — enforced at the moment of use.",
    hard: "Compliance logic sits inside the operational workflow, so non-compliance becomes impossible rather than merely detectable later.",
    targetAccounts: [
      "TODO(parth): facility/company types Logbooks is sold into",
    ],
    targetPeople: [
      "TODO(parth): buyer/user titles — e.g. Plant Head, QA Manager, shop-floor operators as end users",
    ],
    outcomesAchieved: [
      "TODO(parth): numbers-first results — e.g. facilities live, interlocks enforced, time saved",
    ],
    costOfInaction:
      "On paper, a compliance lapse — a missed cleaning hold time, an expired equipment status — is only caught retrospectively, after the batch has already moved forward, rather than prevented at the point of use.",
    keyAccountsWon: [
      "TODO(parth): 2–3 anonymized wins (or named, your call)",
    ],
  },
  {
    name: "MES",
    line: "Manufacturing execution",
    what: "A no-code platform for digitalising batch manufacturing records and orchestrating end-to-end operations — a real-time digital twin of the facility.",
    hard: "A no-code builder is only as good as its ontology; the abstractions chosen decide what can ever be expressed.",
    targetAccounts: [
      "TODO(parth): facility/company types MES is sold into",
    ],
    targetPeople: [
      "TODO(parth): buyer/user titles — e.g. VP Manufacturing, Plant Head, IT/Digital lead",
    ],
    outcomesAchieved: [
      "TODO(parth): numbers-first results",
    ],
    costOfInaction:
      "Without a digital MES, batch manufacturing records stay siloed on paper — plant leadership has no real-time visibility into operations until a batch is already complete.",
    keyAccountsWon: [
      "TODO(parth): 2–3 anonymized wins (or named, your call)",
    ],
  },
  {
    name: "FDA Tracker",
    line: "Regulatory intelligence",
    what: "Ingests public FDA 483 observations and warning letters, classifies them by GMP subsystem, and surfaces aggregated intelligence so facilities can close gaps before an inspection.",
    hard: "Applied NLP on a regulated corpus where the enforcement patterns are real signal about where GMP systems fail in practice.",
    targetAccounts: [
      "TODO(parth): facility/company types FDA Tracker is sold into",
    ],
    targetPeople: [
      "Quality professionals owning a specific GMP subsystem (cleaning validation, batch records, contamination control)",
      "Head of Regulatory Affairs / QA Director",
    ],
    outcomesAchieved: [
      "TODO(parth): numbers-first results — e.g. 483s/warning letters ingested, facilities using it",
    ],
    costOfInaction:
      "Without automated classification, a quality team either misses enforcement patterns relevant to their subsystem or spends hours manually reading every FDA 483 and warning letter — gaps get closed reactively, after an inspection, instead of before one.",
    keyAccountsWon: [
      "TODO(parth): 2–3 anonymized wins (or named, your call)",
    ],
  },
  {
    name: "AI Investigator",
    line: "Deviation investigation",
    what: "An autonomous multi-agent system over historical deviation data, QMS and MES records that co-pilots root cause analysis.",
    hard: "Most facilities have process experts but not investigation methodologists. The agent supplies the methodology layer.",
    targetAccounts: [
      "TODO(parth): facility/company types AI Investigator is sold into",
    ],
    targetPeople: [
      "Process experts running deviation investigations without a dedicated investigation methodologist",
      "Head of Quality / Investigation Lead",
    ],
    outcomesAchieved: [
      "TODO(parth): numbers-first results",
    ],
    costOfInaction:
      "Without a dedicated investigation methodologist, root cause investigations lean on process knowledge alone — weaker hypotheses, less audit-defensible conclusions.",
    keyAccountsWon: [
      "TODO(parth): 2–3 anonymized wins (or named, your call)",
    ],
  },
];
