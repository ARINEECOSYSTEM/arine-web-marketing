import Link from "next/link";
import Image from "next/image";
import styles from "./SiteChrome.module.css";

const navigation = [
  ["Services", "/services"],
  ["Guide", "/guide"],
  ["Resources", "/resources"],
  ["Pricing", "/pricing"],
] as const;

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/" aria-label="ARINE home">
        <Image src="/arine-logo.png" alt="ARINE Ecosystem" width={305} height={136} priority />
      </Link>
      <nav className={styles.navigation} aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </nav>
      <Link className={styles.signUp} href="/pricing#plans">Sign Up</Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <Link className={styles.logo} href="/" aria-label="ARINE home">
          <Image src="/arine-logo.png" alt="ARINE Ecosystem" width={305} height={136} />
        </Link>
        <p>Growth infrastructure for D2C brands. Research, strategy, execution, and optimisation in one connected system.</p>
      </div>
      <div className={styles.footerColumn}>
        <strong>EXPLORE</strong>
        {navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </div>
      <div className={styles.footerColumn}>
        <strong>RESOURCES</strong>
        <Link href="/resources/about">About</Link>
        <Link href="/resources/policies">Policies</Link>
        <Link href="/resources/careers">Careers</Link>
        <Link href="/resources/events">Events</Link>
      </div>
      <div className={styles.footerColumn}>
        <strong>GET IN TOUCH</strong>
        <a href="mailto:support@arineecosystem.com">support@arineecosystem.com</a>
      </div>
      <div className={styles.legal}>
        <span>© 2026 Arine Ecosystem Pvt. Ltd.</span>
        <span>GROWTH INFRASTRUCTURE, NOT AGENCY SERVICES.</span>
      </div>
    </footer>
  );
}
