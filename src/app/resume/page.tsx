import type { Metadata } from "next";
import { ResumeStyleSwitcher } from "@/components/resume/resume-style-switcher";
import { defaultResumeVariant } from "@/lib/resume/variants";
import styles from "@/components/resume/classical-resume.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description: "Web and A4-print resume — click Download PDF for an offline copy.",
};

export default function ResumePage() {
  return (
    <div className={styles.screen}>
      <ResumeStyleSwitcher data={defaultResumeVariant} />
    </div>
  );
}
