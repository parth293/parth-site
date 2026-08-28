import type { Role } from "./types";

export const company = {
  name: "Leucine",
  url: "https://leucine.ai",
  what: "AI-powered GMP compliance software for pharmaceutical manufacturers.",
  joined: "2020, as roughly employee 15",
  /** Company-level context. Stated as company trajectory, not personal credit. */
  atJoining: "~15 people · ~$40K ARR",
  today: "~115 people · ~$4.3M ARR",
};

export const roles: Role[] = [
  {
    phase: "Implementation",
    titles: ["Program Manager"],
    period: "Year 1–2",
    thesis:
      "Make cleaning validation software actually work inside live pharmaceutical facilities — which meant learning the science and the regulation from scratch.",
    jobs: [
      "Deployed CLEEN, the cleaning validation product, into real GMP facilities",
      "Migrated cleaning validation programs out of paper binders, Word documents and spreadsheets into structured, traceable records",
      "Worked directly with quality directors through their evaluation and rollout",
    ],
    outcomes: [
      "Data migrations completed without introducing findings — in a GMP system every migrated data point carries a regulatory consequence",
      "Became the person clients escalated to on both the product and the underlying validation science",
    ],
    skills: [
      "21 CFR Part 11 — electronic records and signatures",
      "GAMP 5 — computerised system validation",
      "PDA Technical Report 29 — cleaning validation science",
      "MACO and health-based exposure limits, worst-case product selection, sampling protocol design",
      "Defending a technical position to a QA director who is deciding whether to trust you",
    ],
  },
  {
    phase: "Quality assurance",
    titles: ["Program Manager", "Product Manager"],
    period: "Year 2–3",
    thesis:
      "Systematically find the places where the software and the regulation diverged, and close them.",
    jobs: [
      "Documented structured defect reports from real facility edge cases",
      "Fed regulatory gaps back into the development cycle",
      "Acted as the translation layer between GMP requirements and engineering",
    ],
    outcomes: [
      "A defect pipeline sourced from live regulated environments rather than from internal test cases",
      "Product behaviour brought into line with what an inspector would actually expect",
    ],
    skills: [
      "Holding a regulatory framework and a software specification in mind simultaneously and spotting the divergence",
      "Writing defects that engineers can act on and auditors would accept",
    ],
  },
  {
    phase: "Product management",
    titles: ["Product Manager", "Senior Product Manager"],
    period: "Year 3–4",
    thesis:
      "Move from fixing what was wrong to defining what should exist.",
    jobs: [
      "Ran discovery with pharmaceutical quality professionals and translated it into specifications",
      "Wrote PRDs, user stories and roadmap against jobs-to-be-done framing",
      "Owned the feedback loop between facilities and the development team",
    ],
    outcomes: [
      "A specification process that survived contact with both regulated users and software engineers",
    ],
    skills: [
      "Structured product methodology — JTBD, PRDs, roadmapping",
      "The uncommon combination: deep GMP domain knowledge plus the ability to specify software against it",
    ],
  },
  {
    phase: "Head of product",
    titles: ["Product Head"],
    period: "Year 4–5",
    thesis:
      "Own the roadmap, then widen the product surface from one validated workflow to the whole facility.",
    jobs: [
      "Took full ownership of the product roadmap",
      "Designed and built the Electronic Logbooks product with automated compliance interlocks",
      "Expanded scope again into a no-code Manufacturing Execution System, including the ontology that models facility entities and their relationships",
    ],
    outcomes: [
      "CLEEN in production across 350+ facilities globally",
      "Logbooks shipped as a compliance-enforcement system, not a digitisation exercise — the interlock makes non-compliance impossible at the point of use rather than detectable afterwards",
      "An MES capable of digitalising any batch manufacturing record, functioning as a digital twin of facility operations",
    ],
    skills: [
      "Platform and abstraction design — in a no-code product the ontology you pick determines what can ever be expressed",
      "Carrying a multi-product roadmap in a regulated market",
    ],
  },
  {
    phase: "GTM & delivery",
    titles: ["Solution Consulting Director"],
    period: "Concurrent",
    thesis:
      "At this company size, whoever owns the product also owns whether it gets bought and whether it lands.",
    jobs: [
      "Defined the sales methodology from the ground up for a 6–18 month, multi-stakeholder regulated sale",
      "Built the pre-sales engineering function — structured discovery, calibrated technical demos, solution white papers, cybersecurity and IT infrastructure evaluations",
      "Personally led week-long on-site workshops with multi-functional stakeholder teams at global pharma and consumer-health manufacturers across Germany, the UK and the US",
      "Defined the delivery methodology: GAMP 5 validation in the customer's environment, legacy data migration, SOP updates, user training, and the paper-to-digital cultural transition — all while the facility kept manufacturing under GMP",
      "Built HubSpot-based pipeline and delivery tracking so leadership had accurate deal and implementation visibility",
    ],
    outcomes: [
      "A repeatable pre-sales motion in a market where the buyer needs regulatory defensibility before product capability",
      "Implementations delivered consistently and traceably, producing audit-ready documentation as a by-product",
    ],
    skills: [
      "Enterprise sales across quality, IT, regulatory affairs, validation, procurement and executive sponsors — each with different evaluation criteria",
      "Designing a workshop that moves a whole stakeholder group toward a decision",
      "Change management inside a live regulated facility",
    ],
  },
  {
    phase: "AI products & strategy",
    titles: ["Chief of Staff", "Director, Strategic Initiatives"],
    period: "Present",
    thesis:
      "Build AI-native products on top of the data infrastructure the previous five years produced, and give the leadership team an operating system.",
    jobs: [
      "Built FDA Tracker — ingesting public 483 observations and warning letters, extracting structure from unstructured PDFs, classifying findings by GMP subsystem",
      "Built AI Investigator — a multi-agent system over historical deviation data, QMS and MES that acts as a root cause analysis co-pilot",
      "Built the founder's office function: AI-powered sales and delivery administration surfacing the right information to the sales and delivery VPs without manual reporting overhead",
    ],
    outcomes: [
      "Quality professionals get only the enforcement intelligence relevant to their subsystem instead of reading every warning letter",
      "Process experts can run audit-defensible investigations without a dedicated investigation methodologist — the system supplies the methodology layer",
    ],
    skills: [
      "Applied NLP and multi-agent systems on regulated datasets",
      "Identifying where LLMs genuinely change the product, versus where they are decoration",
      "Operating-cadence design for a scaling leadership team",
    ],
  },
];
