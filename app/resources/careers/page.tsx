import type { Metadata } from "next";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Careers | ARINE Ecosystem",
  description: "Get in touch with ARINE about career opportunities.",
};

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>CAREERS AT ARINE</span>
        <h1>Help build <em>what&apos;s next.</em></h1>
        <p>We are interested in meeting thoughtful people who care about building useful tools and better ways of working.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>Start a conversation</h2>
          <p>Tell us a little about your experience, what kind of work interests you, and how you would like to contribute.</p>
        </div>
        <a className={styles.buttonDark} href="mailto:support@arineecosystem.com?subject=Career%20inquiry">Get in touch about careers</a>
      </section>
    </div>
  );
}
