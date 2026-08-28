import type { Product } from "./types";

/** Context an interviewer needs before the deal stories make sense. */
export const products: Product[] = [
  {
    name: "CLEEN",
    line: "Cleaning validation",
    what: "Validates that manufacturing equipment is free of drug residue between product campaigns — MACO limits, health-based exposure limits, worst-case risk assessment, sampling protocol design, audit-ready documentation.",
    hard: "The science is the product. Getting a limit calculation wrong is a regulatory finding, not a bug report.",
  },
  {
    name: "Electronic Logbooks",
    line: "Point-of-use compliance",
    what: "Turns paper equipment, area and process logbooks into structured digital records with automated interlocks — campaign checks, cleaning hold times, equipment validity — enforced at the moment of use.",
    hard: "Compliance logic sits inside the operational workflow, so non-compliance becomes impossible rather than merely detectable later.",
  },
  {
    name: "MES",
    line: "Manufacturing execution",
    what: "A no-code platform for digitalising batch manufacturing records and orchestrating end-to-end operations — a real-time digital twin of the facility.",
    hard: "A no-code builder is only as good as its ontology; the abstractions chosen decide what can ever be expressed.",
  },
  {
    name: "FDA Tracker",
    line: "Regulatory intelligence",
    what: "Ingests public FDA 483 observations and warning letters, classifies them by GMP subsystem, and surfaces aggregated intelligence so facilities can close gaps before an inspection.",
    hard: "Applied NLP on a regulated corpus where the enforcement patterns are real signal about where GMP systems fail in practice.",
  },
  {
    name: "AI Investigator",
    line: "Deviation investigation",
    what: "An autonomous multi-agent system over historical deviation data, QMS and MES records that co-pilots root cause analysis.",
    hard: "Most facilities have process experts but not investigation methodologists. The agent supplies the methodology layer.",
  },
];
