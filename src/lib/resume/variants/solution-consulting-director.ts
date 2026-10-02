import type { ResumeVariant } from "../types";

/**
 * Transcribed verbatim from the Classical-styled resume export Parth
 * produced outside this repo (Desktop/resumefiles) — wording is his, not
 * drafted here.
 */
export const solutionConsultingDirector: ResumeVariant = {
  slug: "solution-consulting-director",
  label: "Solution Consulting Director",
  name: "Parth Ajmera",
  tagline: "Digital Quality & Manufacturing Transformation · Strategy · Life Sciences Consulting",
  location: "Mumbai, India",
  phone: "+91 83699 40637",
  email: "ajmera.parth8@gmail.com",
  linkedin: { label: "in/parthajmera19", href: "https://linkedin.com/in/parthajmera19" },
  summary:
    "Pharmaceutical engineer with six years building and deploying GMP compliance software at Leucine, progressing from early hire to Solution Consulting Director. Has led digital quality transformation, spanning cleaning validation, electronic logbooks, MES and agentic AI, across 350+ regulated manufacturing facilities for Teva, Cipla, Dr. Reddy’s, Pfizer, Merck, Novartis, Viatris and Abbott. Pairs working fluency in 21 CFR Part 11 and GAMP 5 with product ownership, enterprise consulting and Chief of Staff experience reporting directly to the CEO during scale-up.",
  experience: [
    {
      company: "Leucine",
      period: "2020 – Present",
      title: "Solution Consulting Director",
      progression: [
        "Program Manager",
        "Product Manager",
        "Chief of Staff",
        "Solution Consultant",
        "Solution Consulting Director",
      ],
      stats: [
        { value: "15 → 115", label: "Team size" },
        { value: "$40K → $4.3M", label: "Revenue contribution" },
        { value: "350+", label: "GMP facilities live" },
      ],
      highlights: [
        {
          lead: "Digital quality transformation.",
          body: "Defined Leucine’s end-to-end methodology for deploying GMP software inside live, regulated manufacturing sites: legacy data migration, GAMP 5 validation, SOP revision and operator training. Led multi-site programmes from a pilot facility to the client’s wider network, harmonising quality policy across sites and reducing the typical deployment time from 9 to 3 months across 95+ rollouts in the US, Europe and India.",
        },
        {
          lead: "Strategy and operations.",
          body: "As Chief of Staff to the CEO, built the company’s operating infrastructure across sales, delivery, marketing, demand generation, customer support and revenue operations; ran annual planning and quarterly OKR reviews, and introduced AI-assisted reporting that gave leadership real-time visibility of the business.",
        },
        {
          lead: "Client-facing solution consulting.",
          body: "Built the pre-sales function from scratch: technical demonstrations, white papers and cybersecurity/IT evaluations. Led week-long, multi-stakeholder workshops at Merck Germany, Abbott Germany, Pfizer Kalamazoo, Estée Lauder UK and Revlon US through 6–18 month cycles spanning Quality, IT, Regulatory and Procurement, contributing to $1.8M in closed contract value from global pharmaceutical and cosmetics accounts.",
        },
        {
          lead: "Product leadership, 0→1.",
          body: "Owned the roadmap for CLEEN, cleaning-validation software now live at 350+ facilities, cutting cleaning-validation documentation effort by 85% and closing the gaps behind 87% of FDA observations tied to cleaning validation under the six-system inspection model. Built two further product lines from scratch: electronic logbooks with automated compliance interlocks, and a no-code MES on a pharma-manufacturing ontology.",
        },
        {
          lead: "Applied AI in GMP.",
          body: "Shipped two AI-native products, an FDA enforcement-intelligence tool and an investigation co-pilot for deviation root-cause analysis that cut investigation cycle time from 39 to 16 days, and directed agentic deployments for SOP gap and compliance monitoring, APQR generation, supplier quality and audit management.",
        },
        {
          lead: "Regulatory fluency.",
          body: "Learned 21 CFR Part 11, GAMP 5, PDA TR29/TR49 and MACO/HBEL from first principles, then spent two years translating regulatory and quality requirements into software specifications for product and engineering teams, building a dual fluency across pharmaceutical science, quality systems and software engineering.",
        },
      ],
    },
  ],
  education: [
    {
      institution: "IIT (BHU), Varanasi",
      period: "2016 – 2020",
      degree: "B.Tech, Pharmaceutical Engineering & Technology",
      honours: "Gold Medallist · CPI 9.25/10 · Aruna & Malviya Medal",
    },
  ],
};
