import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import styles from "../page.module.css";
export default function Layout({ children }: { children: React.ReactNode }) { return <div className={styles.page}><SiteHeader />{children}<SiteFooter /></div>; }
