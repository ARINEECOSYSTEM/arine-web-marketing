import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Resources | ARINE Ecosystem",
  description: "Find out about ARINE, explore policies, careers, and events.",
};

const resources = [
  ["About ARINE", "Learn about the growth ecosystem and the work it brings together.", "/resources/about"],
  ["Policies", "Find the current status of ARINE's privacy, terms, and other policy information.", "/resources/policies"],
  ["Careers", "Get in touch if you are interested in working with the ARINE team.", "/resources/careers"],
  ["Events", "Find updates about upcoming ARINE events and sessions.", "/resources/events"],
] as const;

export default function ResourcesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>ARINE RESOURCES</span>
        <h1>More about <em>what we do.</em></h1>
        <p>Explore the people, policies, opportunities, and events around the ARINE ecosystem.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.grid}>
          {resources.map(([title, description, href], index) => (
            <article className={styles.card} key={href}>
              <span className={styles.number}>RESOURCE 0{index + 1}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <Link className={styles.cardLink} href={href}>Explore {title.toLowerCase()} →</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
