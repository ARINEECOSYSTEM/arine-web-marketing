import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "About ARINE | ARINE Ecosystem",
  description: "Learn about the ARINE growth ecosystem.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>ABOUT ARINE</span>
        <h1>Growth infrastructure,<br /><em>not more busywork.</em></h1>
        <p>ARINE brings research, strategy, execution, and optimisation into one connected ecosystem for D2C brands.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>One connected way to work</h2>
          <p>Growth work often spans campaigns, creative, customer experience, and daily operations. ARINE is designed to help teams bring those moving parts into a more coordinated workflow.</p>
        </div>
        <div className={styles.resourceGrid}>
          <article className={styles.callout}><h2>Make work connected</h2><p>Keep the decisions, execution, and learning behind growth closer together.</p></article>
          <article className={styles.callout}><h2>Give teams more clarity</h2><p>Build repeatable processes that help teams understand what is happening and what to do next.</p></article>
        </div>
      </section>
      <section className={styles.band}>
        <h2>See how the ecosystem fits together.</h2>
        <p>Explore the capabilities ARINE brings to a brand&apos;s growth workflow.</p>
        <Link className={styles.button} href="/services">Explore services</Link>
      </section>
    </div>
  );
}
