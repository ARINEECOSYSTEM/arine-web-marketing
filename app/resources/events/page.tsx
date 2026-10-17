import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Events | ARINE Ecosystem",
  description: "Updates about ARINE events and learning sessions.",
};

export default function EventsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>ARINE EVENTS</span>
        <h1>Good ideas grow <em>together.</em></h1>
        <p>Find conversations and learning opportunities around ecommerce growth, marketing systems, and creative work.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.callout}>
          <h2>Event updates coming soon</h2>
          <p>There are no events listed here yet. Check back for future announcements, or browse the guide in the meantime.</p>
          <Link className={styles.cardLink} href="/guide">Read the guide →</Link>
        </div>
      </section>
    </div>
  );
}
