import type { Education } from "./types";

export const intro = {
  name: "Parth Ajmera",
  /** TODO(parth): confirm current base + any relocations worth naming. */
  basedIn: "India",
  oneLiner:
    "Pharmaceutical engineer who spent six years turning GMP compliance from paper into software — building the products and selling them to the quality directors who have to defend them to regulators.",
  frame: [
    "I am an engineer by training, in a discipline that sits closer to chemical engineering than to pharmacy — mass and heat transfer, thermodynamics, numerical methods, applied to pharmaceutical systems.",
    "I spent six years at Leucine going from employee fifteen to Director of Strategic Initiatives, which in a company that size meant owning the product and the way it got sold and delivered at the same time.",
    "The through-line is that I can hold the regulation and the software in my head at once, and translate in both directions.",
  ],
};

export const education: Education = {
  degree: "B.Tech, Pharmaceutical Engineering and Technology",
  institution: "Indian Institute of Technology (BHU)",
  location: "Varanasi, India",
  period: "2016–2020",
  honours: [
    "Department First Rank",
    "Gold Medal",
    "CPI 9.25 / 10",
    "Final semester SPI 10.00",
  ],
  coursework: [
    {
      group: "Engineering & mathematics core",
      note: "The part a pharmacy degree does not carry.",
      subjects: [
        "Engineering Mathematics I",
        "Probability and Statistics",
        "Numerical Solution of PDEs",
        "Engineering Thermodynamics",
        "Heat and Mass Transfer",
        "Computer Programming",
        "Physics II — Electromagnetics",
        "Sensor Science and Technology",
      ],
    },
    {
      group: "Pharmaceutical sciences",
      note: "The part an engineering degree does not carry.",
      subjects: [
        "Physical Pharmaceutics",
        "Pharmaceutical Chemistry",
        "Bioorganic and Medicinal Chemistry",
        "General Pharmacology",
        "Neuropharmacology",
        "Applied Pharmacology",
        "Biopharmaceutics",
        "General Pharmacotherapeutics",
        "Human Physiology",
        "General Pharmacognosy",
        "Analytical Pharmacognosy",
        "Chemistry of Synthetic Drugs",
        "Natural Drugs and Excipients",
      ],
    },
    {
      group: "Manufacturing & process",
      note: "Where the two halves meet — and what I ended up building software for.",
      subjects: [
        "Pharmaceutical Technology",
        "Dosage Formulation Design",
        "Manufacturing Practice I & II",
        "Pharmaceutical Analysis",
        "Pharmaceutical Instrumental Analysis",
        "Microbiology and Biotechnology",
        "Materials for Biomedical Application",
        "Pharmaceutical Jurisprudence",
      ],
    },
    {
      group: "Business & systems",
      note: "",
      subjects: [
        "Entrepreneurship, Mind, Behaviour and Action",
        "Finance and Economics for Engineers",
        "Integrative Intelligence: Cognition and Learning",
      ],
    },
  ],
  labs: [
    {
      area: "Pharmaceutical Technology",
      work: "Tablet manufacture, granulation, compression, coating, capsule filling — how process parameters move product quality.",
    },
    {
      area: "Physical Pharmaceutics",
      work: "Dissolution testing, solubility studies, viscosity measurement, particle size analysis.",
    },
    {
      area: "Pharmaceutical Analysis",
      work: "UV-Vis spectroscopy, HPLC, titrimetry — drug quantification methods.",
    },
    {
      area: "Pharmacology",
      work: "Dose–response curves and isolated tissue preparations.",
    },
    {
      area: "Microbiology",
      work: "Sterility testing, microbial enumeration, aseptic technique.",
    },
    {
      area: "Organic synthesis",
      work: "Synthetic chemistry and characterisation.",
    },
  ],
  contrast: [
    {
      dimension: "Mathematics",
      bpharm: "Limited",
      mine: "ODEs, PDEs, numerical methods, probability and statistics at IIT rigour",
    },
    {
      dimension: "Engineering science",
      bpharm: "Largely absent",
      mine: "Thermodynamics, heat and mass transfer, materials science",
    },
    {
      dimension: "Computation",
      bpharm: "Minimal",
      mine: "Programming and numerical methods as core coursework",
    },
    {
      dimension: "Pharmaceutical science",
      bpharm: "Core strength",
      mine: "Carried in full — pharmacology, biopharmaceutics, formulation",
    },
    {
      dimension: "Orientation",
      bpharm: "Pharmacy practice and drug quality",
      mine: "Engineering principles applied to pharmaceutical systems",
    },
  ],
};
