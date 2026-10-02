import type { ResumeStyle, ResumeVariant } from "@/lib/resume/types";
import { resumeFontVariables } from "./fonts";
import styles from "./classical-resume.module.css";

/** Splits "15 → 115" so the arrow alone can take the accent color, matching the source export. */
function StatValue({ value }: { value: string }) {
  const parts = value.split(" → ");
  if (parts.length !== 2) return <>{value}</>;
  return (
    <>
      {parts[0]} <span className={styles.statArrow}>&#8594;</span> {parts[1]}
    </>
  );
}

export function ClassicalResume({
  data,
  style = "classical",
}: {
  data: ResumeVariant;
  style?: ResumeStyle;
}) {
  return (
    <div data-style={style} className={`${styles.page} ${resumeFontVariables}`}>
      <header className={styles.header}>
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.tagline}>{data.tagline}</p>
        <div className={styles.contact}>
          <span>{data.location}</span>
          <span className={styles.dot}>&middot;</span>
          <span>{data.phone}</span>
          <span className={styles.dot}>&middot;</span>
          <a href={`mailto:${data.email}`}>{data.email}</a>
          <span className={styles.dot}>&middot;</span>
          <a href={data.linkedin.href}>{data.linkedin.label}</a>
        </div>
      </header>

      <section className={styles.section}>
        <h6 className={`${styles.sectionTitle} ${styles.sectionTitleFirst}`}>Summary</h6>
        <p className={styles.summary}>{data.summary}</p>
      </section>

      {data.experience.map((role) => (
        <section key={role.company} className={styles.section}>
          <h6 className={styles.sectionTitle}>Professional Experience</h6>
          <div className={styles.roleRow}>
            <h3 className={styles.companyName}>{role.company}</h3>
            <span className={styles.period}>{role.period}</span>
          </div>
          <p className={styles.roleTitle}>{role.title}</p>
          {role.progression ? (
            <p className={styles.progression}>{role.progression.join(" → ")}</p>
          ) : null}

          <div className={styles.stats}>
            {role.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>
                  <StatValue value={stat.value} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.highlights}>
            {role.highlights.map((h) => (
              <p key={h.lead}>
                <span className={styles.highlightLead}>{h.lead}</span> {h.body}
              </p>
            ))}
          </div>
        </section>
      ))}

      {data.education.map((edu) => (
        <section key={edu.institution} className={`${styles.section} ${styles.sectionTight}`}>
          <h6 className={styles.sectionTitle}>Education</h6>
          <div className={styles.roleRow}>
            <h3 className={styles.institutionName}>{edu.institution}</h3>
            <span className={styles.period}>{edu.period}</span>
          </div>
          <p className={styles.degree}>{edu.degree}</p>
          <p className={styles.honours}>{edu.honours}</p>
        </section>
      ))}
    </div>
  );
}
