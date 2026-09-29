import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="ARINE home">ARINE<span>↗</span></Link>
        <span className={styles.headerNote}>Independent thinking. Shared ambition.</span>
        <a className={styles.navLink} href="#approach">Our approach <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.copy}>
            <p className={styles.eyebrow}><span /> Your D2C growth operating partner</p>
            <h1 id="hero-heading">Big ambition.<br />Real growth.<br /><em>Built together.</em></h1>
            <p className={styles.description}>You built a brand worth believing in. We work alongside you to turn its next chapter into lasting growth—from strategy to everyday execution.</p>
            <a href="#approach" className={styles.cta}>Discover the ARINE approach <span aria-hidden="true">↗</span></a>
            <p className={styles.caption}>In the details. In your corner. In it together.</p>
          </div>
          <div className={styles.artwork} aria-hidden="true">
            <div className={styles.artworkTop}><span>THE NEXT CHAPTER</span><span>↗</span></div>
            <div className={styles.orbit} />
            <div className={styles.orbitInner} />
            <div className={styles.growthArrow} />
            <div className={styles.artworkTitle}>Good brands.<br />Greater possibilities.</div>
            <div className={styles.artworkBottom}><span>STRATEGY × EXECUTION</span><span>ARINE</span></div>
          </div>
        </section>
        <section id="approach" className={styles.approach} aria-labelledby="approach-heading">
          <div className={styles.approachIntro}><p className={styles.eyebrow}>A shared direction</p><h2 id="approach-heading">One partner.<br />The bigger picture.</h2></div>
          <div className={styles.approachItem}><span>01 / FIND THE FOCUS</span><h3>Clarity before scale.</h3><p>Align your brand, customer, and commercial goals around what matters next.</p></div>
          <div className={styles.approachItem}><span>02 / MAKE IT HAPPEN</span><h3>Strategy into action.</h3><p>Bring acquisition, conversion, and retention into one connected growth plan.</p></div>
          <div className={styles.approachItem}><span>03 / KEEP BUILDING</span><h3>Learn. Refine. Grow.</h3><p>Stay close to the numbers, build on what works, and move forward together.</p></div>
        </section>
      </main>
    </div>
  );
}
