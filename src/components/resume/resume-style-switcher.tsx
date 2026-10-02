"use client";

import { useState } from "react";
import { resumeStyles, type ResumeStyle, type ResumeVariant } from "@/lib/resume/types";
import { ClassicalResume } from "./classical-resume";
import { DownloadResumeButton } from "./download-resume-button";
import styles from "./classical-resume.module.css";

export function ResumeStyleSwitcher({ data }: { data: ResumeVariant }) {
  const [style, setStyle] = useState<ResumeStyle>("classical");

  return (
    <>
      <div className={`${styles.actions} ${styles.noPrint}`}>
        <label className={styles.styleSelectWrap}>
          <span className={styles.styleSelectLabel}>Style</span>
          <select
            className={styles.styleSelect}
            value={style}
            onChange={(e) => setStyle(e.target.value as ResumeStyle)}
          >
            {resumeStyles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <DownloadResumeButton />
      </div>
      <ClassicalResume data={data} style={style} />
    </>
  );
}
