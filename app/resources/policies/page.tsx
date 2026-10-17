import type { Metadata } from "next";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Policies | ARINE Ecosystem",
  description: "Contact ARINE for current policy and compliance information.",
};

const documents = ["Privacy Policy", "Terms of Service", "Data Deletion", "Refund & Cancellation", "Cookie Policy"];

export default function PoliciesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>POLICIES & COMPLIANCE</span>
        <h1>Clear information.<br /><em>Responsible growth.</em></h1>
        <p>We want it to be easy to find the policies that apply when you explore or use ARINE.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>Policy documents</h2>
          <p>For the latest official policy text, contact our team. We will share the current documents relevant to your request.</p>
        </div>
        <ul className={styles.list}>{documents.map((document) => <li key={document}><strong>{document}</strong></li>)}</ul>
        <p className={styles.prose}>Please do not rely on this index as a substitute for the applicable policy documents. For questions, email <a href="mailto:support@arineecosystem.com">support@arineecosystem.com</a>.</p>
      </section>
    </div>
  );
}
