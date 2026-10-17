import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Guide & Blog | ARINE Ecosystem",
  description: "Practical guides to creative testing, campaign workflows, and ecommerce growth.",
};

const guides = [
  {
    id: "campaign-testing",
    category: "CAMPAIGN WORKFLOWS",
    title: "A practical framework for testing paid social campaigns",
    intro: "A useful test begins with a clear question. Define the audience, message, and outcome you want to learn about before changing several things at once.",
    points: [
      "Write down one hypothesis for each test and choose a primary metric before launch.",
      "Change a limited number of variables so results are easier to interpret.",
      "Give each test enough time and budget to produce a useful signal for your business.",
      "Record what you learned, including tests that did not meet expectations.",
    ],
  },
  {
    id: "creative-testing",
    category: "CREATIVE",
    title: "Turn creative iteration into a repeatable process",
    intro: "Creative testing works best as a learning loop, not a one-off asset request. Use customer questions and product benefits to build distinct concepts.",
    points: [
      "Collect customer language from reviews, support conversations, and research.",
      "Give each concept a clear hook, benefit, and reason to believe.",
      "Adapt the core idea to the placement and format rather than resizing one asset everywhere.",
      "Use performance and qualitative feedback together when deciding what to develop next.",
    ],
  },
  {
    id: "growth-metrics",
    category: "GROWTH PLANNING",
    title: "Choose ecommerce metrics that answer real questions",
    intro: "A dashboard is useful when it helps your team make a decision. Start with the question, then select the smallest set of metrics that can answer it.",
    points: [
      "Separate leading indicators, such as clicks, from business outcomes, such as revenue.",
      "Review conversion rate alongside average order value and repeat purchasing.",
      "Compare like-for-like time periods and note changes in spend, promotions, and seasonality.",
      "Treat attribution as a decision aid and check it against your broader business reporting.",
    ],
  },
];

export default function GuidePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>THE ARINE GUIDE</span>
        <h1>Ideas for <em>smarter growth.</em></h1>
        <p>Practical notes on campaign workflows, creative testing, and the systems behind sustainable ecommerce growth.</p>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>LATEST GUIDES</span>
          <h2>Learn, test, improve</h2>
          <p>Use these starting points to make your next growth decision more deliberate.</p>
        </div>
        <div className={styles.grid}>
          {guides.map((guide) => (
            <article className={styles.card} key={guide.id}>
              <span className={styles.number}>{guide.category}</span>
              <h2>{guide.title}</h2>
              <p>{guide.intro}</p>
              <Link className={styles.cardLink} href={`#${guide.id}`}>Read guide ↓</Link>
            </article>
          ))}
        </div>
        <div className={styles.prose}>
          {guides.map((guide) => (
            <article className={styles.articleSection} id={guide.id} key={guide.id}>
              <span className={styles.eyebrow}>{guide.category}</span>
              <h2>{guide.title}</h2>
              <p>{guide.intro}</p>
              <ul>{guide.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.band}>
        <h2>Put your next idea into action.</h2>
        <p>Explore the services ARINE brings together for growing brands.</p>
        <Link className={styles.button} href="/services">Explore services</Link>
      </section>
    </div>
  );
}
