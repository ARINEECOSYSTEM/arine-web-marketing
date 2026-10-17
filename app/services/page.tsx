import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Services | ARINE Ecosystem",
  description: "Explore ARINE's connected growth services for D2C brands.",
};

const services = [
  ["Meta Automation", "Plan, launch, and optimise Meta campaigns through a connected, data-informed workflow."],
  ["Creative Engine", "Develop and test campaign concepts, product imagery, and creator-style creative."],
  ["Search Engine Automation", "Coordinate search campaigns and uncover opportunities across your product catalogue."],
  ["Online Store Management", "Keep your storefront, product information, and merchandising work moving together."],
  ["CRM", "Connect customer journeys and lifecycle communications with your growth activity."],
  ["SEO", "Build a clear foundation for discoverability through technical and on-page search optimisation."],
  ["GEO", "Prepare useful, well-structured brand information for discovery in generative search experiences."],
  ["Operations", "Bring recurring growth operations, workflows, and reporting into one coordinated system."],
] as const;

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>CONNECTED GROWTH SERVICES</span>
        <h1>One ecosystem.<br /><em>Every growth lever.</em></h1>
        <p>Bring campaign execution, creative, customer experience, and operations together in one growth system.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>WHAT WE DO</span>
          <h2>Services built to work together</h2>
          <p>Start with the capability you need and connect more of your growth workflow over time.</p>
        </div>
        <div className={styles.grid}>
          {services.map(([name, description], index) => (
            <article className={styles.card} key={name} id={name.toLowerCase().replaceAll(" ", "-")}>
              <span className={styles.number}>0{index + 1}</span>
              <h2>{name}</h2>
              <p>{description}</p>
              <Link className={styles.cardLink} href="/pricing">Explore plans →</Link>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.band}>
        <h2>Build your growth stack around your goals.</h2>
        <p>Tell us what you are working on and we can help you find a place to start.</p>
        <Link className={styles.button} href="/pricing">View pricing</Link>
      </section>
    </div>
  );
}
