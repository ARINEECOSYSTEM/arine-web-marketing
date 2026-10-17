import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Pricing | ARINE Ecosystem",
  description: "Choose an ARINE plan, from a 15-day free trial to enterprise.",
};

const plans = [
  { name: "Free Trial", price: "₹0", interval: "for 15 days", detail: "Explore ARINE and find the right workflow for your team.", action: "Start free trial", href: "mailto:support@arineecosystem.com?subject=ARINE%2015-day%20free%20trial" },
  { name: "Starter", price: "₹3,000", interval: "/ month", credits: "1,200 credits / month", detail: "A practical starting point for teams building a repeatable growth workflow.", action: "Choose Starter", href: "mailto:support@arineecosystem.com?subject=ARINE%20Starter%20plan" },
  { name: "Growth", price: "₹15,000", interval: "/ month", credits: "8,000 credits / month", detail: "More room to coordinate ongoing campaigns, creative, and optimisation.", action: "Choose Growth", href: "mailto:support@arineecosystem.com?subject=ARINE%20Growth%20plan" },
  { name: "Enterprise", price: "Let's talk", interval: "", detail: "A plan shaped around your organisation, workflows, and requirements.", action: "Schedule a call", href: "mailto:support@arineecosystem.com?subject=ARINE%20Enterprise%20inquiry" },
] as const;

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>SIMPLE, TRANSPARENT PLANS</span>
        <h1>Choose your <em>growth plan.</em></h1>
        <p>Start with a 15-day free trial, then pick a monthly plan that fits the way your team works.</p>
      </section>
      <section className={styles.section} id="plans">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>PRICING IN INR</span>
          <h2>Find the right place to start</h2>
          <p>Credit allocations shown for paid plans are monthly.</p>
        </div>
        <div className={styles.pricingGrid}>
          {plans.map((plan) => (
            <article className={`${styles.priceCard} ${plan.name === "Growth" ? styles.featured : ""}`} key={plan.name}>
              <h2>{plan.name}</h2>
              <div className={styles.price}>{plan.price} <small>{plan.interval}</small></div>
              {"credits" in plan && <div className={styles.credits}>{plan.credits}</div>}
              <p>{plan.detail}</p>
              <Link className={plan.name === "Growth" ? styles.buttonDark : styles.button} href={plan.href}>{plan.action}</Link>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.band}>
        <h2>Need a plan for a larger team?</h2>
        <p>Talk with us about your workflows and requirements.</p>
        <a className={styles.button} href="mailto:support@arineecosystem.com?subject=ARINE%20Enterprise%20inquiry">Schedule an enterprise call</a>
      </section>
    </div>
  );
}
