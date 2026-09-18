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
  transcript: [
    {
      year: "Year 1",
      period: "2016–17",
      note: "Engineering foundation year.",
      subjects: [
        { name: "Biology", grade: "A" },
        { name: "Chemistry I", grade: "A" },
        { name: "Engineering Mathematics I", grade: "A-" },
        { name: "Essentials of Biochemistry", grade: "B" },
        { name: "Basics of Pharmaceutical Sciences", grade: "B-" },
        { name: "Computer Programming", grade: "A-" },
        { name: "Engineering Thermodynamics", grade: "B" },
        { name: "Physics II — Electromagnetics", grade: "A-" },
        { name: "Manufacturing Practice I & II" },
      ],
    },
    {
      year: "Year 2",
      period: "2017–18",
      subjects: [
        { name: "Human Physiology", grade: "A-" },
        { name: "Probability and Statistics", grade: "A" },
        { name: "Physical Pharmaceutics", grade: "A*" },
        { name: "Pharmaceutical Chemistry", grade: "A-" },
        { name: "Heat and Mass Transfer", grade: "A-" },
        { name: "Bioorganic and Medicinal Chemistry", grade: "A" },
        { name: "General Pharmacology", grade: "A*" },
        { name: "General Pharmacognosy", grade: "A" },
        { name: "Pharmaceutical Analysis", grade: "A" },
        { name: "Exploratory Project (PH-291)", grade: "A" },
      ],
    },
    {
      year: "Year 3",
      period: "2018–19",
      subjects: [
        { name: "Microbiology and Biotechnology", grade: "A" },
        { name: "Pharmaceutical Technology", grade: "A" },
        { name: "General Pharmacotherapeutics", grade: "A" },
        { name: "Natural Drugs and Excipients", grade: "A" },
        { name: "Numerical Solution of PDEs", grade: "B" },
        { name: "Integrative Intelligence: Cognition and Learning", grade: "A*" },
        { name: "Pharmaceutical Jurisprudence", grade: "A*" },
        { name: "Chemistry of Synthetic Drugs", grade: "B" },
        { name: "Neuropharmacology", grade: "A*" },
        { name: "Fundamentals of Microbiology", grade: "B" },
        { name: "UG Project-I (PH-392)", grade: "A" },
        { name: "Industrial Training (Summer)", grade: "S" },
      ],
    },
    {
      year: "Year 4",
      period: "2019–20",
      note: "Final semester SPI 10.00.",
      subjects: [
        { name: "Pharmaceutical Instrumental Analysis", grade: "A-" },
        { name: "Biopharmaceutics", grade: "A*" },
        { name: "Applied Pharmacology", grade: "A*" },
        { name: "Sensor Science and Technology", grade: "A-" },
        { name: "Entrepreneurship, Mind, Behaviour and Action", grade: "A-" },
        { name: "UG Project-II (PH-491)", grade: "A" },
        { name: "Dosage Formulation Design", grade: "A" },
        { name: "Analytical Pharmacognosy", grade: "A" },
        { name: "Materials for Biomedical Application", grade: "A" },
        { name: "Finance and Economics for Engineers", grade: "A" },
      ],
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
