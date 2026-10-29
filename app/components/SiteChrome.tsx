"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import { services, policies, supportEmail } from "../site-content";
import { getAppLoginUrl } from "../lib/store-connection";
const resources=[["About Us","about"],["Policies","legal"],["Careers","career"],["Events","events"],["Help Center","help-center"],["News","news"]];
export function SiteHeader({comingSoon=false}:{comingSoon?:boolean}) {
 const [menu,setMenu]=useState(false);const headerRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  const dismiss=(event:KeyboardEvent|MouseEvent)=>{
   if(event instanceof KeyboardEvent?event.key!=="Escape":headerRef.current?.contains(event.target as Node))return;
   headerRef.current?.querySelectorAll("details[open]").forEach(detail=>detail.removeAttribute("open"));setMenu(false);
   if(event instanceof KeyboardEvent)headerRef.current?.querySelector<HTMLButtonElement>('button[aria-controls="main-navigation"]')?.focus();
  };
  document.addEventListener("keydown",dismiss);document.addEventListener("click",dismiss);
  return()=>{document.removeEventListener("keydown",dismiss);document.removeEventListener("click",dismiss)};
 },[]);
 useEffect(()=>{if(!menu)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous}},[menu]);
 const close=()=>{headerRef.current?.querySelectorAll("details[open]").forEach(d=>d.removeAttribute("open"));setMenu(false)};
 return <header className={styles.header} ref={headerRef}><a className={styles.logo} href="/" aria-label="ARINE home"><span className={styles.brandImage}><img src="/brand/arine-logo.png" alt="ARINE Ecosystem" width="2000" height="2000"/></span></a><nav aria-label="Main navigation" id="main-navigation" className={`${styles.nav} ${menu?styles.navOpen:""}`}><details className={styles.dropdown}><summary>FEATURES <span>⌄</span></summary><div className={styles.megaMenu}><span className={styles.menuLabel}>THE ARINE ECOSYSTEM</span>{services.map(({name,slug,comingSoon},i)=><a key={slug} href={`/services/${slug}`} onClick={close}><span className={styles.menuNumber}>{String(i+1).padStart(2,"0")}</span>{name}{comingSoon&&<small className={styles.comingSoon}>Coming Soon</small>}<span aria-hidden="true">↗</span></a>)}</div></details><details className={styles.dropdown}><summary>RESOURCES <span>⌄</span></summary><div className={styles.resourceMenu}>{resources.map(([name,path])=><a key={path} href={`/${path}`} onClick={close}>{name}<span aria-hidden="true">↗</span></a>)}</div></details><a href="/pricing" onClick={close}>PRICING</a><a href="/blogs" onClick={close}>BLOGS</a>{!comingSoon&&<a className={styles.mobileProfile} href={getAppLoginUrl(process.env.APP_WEBSITE)}>Sign in ↗</a>}</nav>{!comingSoon&&<a className={styles.profileButton} href={getAppLoginUrl(process.env.APP_WEBSITE)}>Sign in <span aria-hidden="true">↗</span></a>}<button className={styles.menuButton} onClick={()=>setMenu(!menu)} aria-label={menu?"Close navigation":"Open navigation"} aria-expanded={menu} aria-controls="main-navigation">{menu?"×":"☰"}</button></header>;
}
export function SiteFooter({comingSoon=false}:{comingSoon?:boolean}) {
 return <footer className={styles.footer}><div className={styles.footerBrand}><a className={styles.logo} href="/" aria-label="ARINE home"><span className={styles.brandImage}><img src="/brand/arine-logo.png" alt="ARINE Ecosystem" width="2000" height="2000" loading="lazy"/></span></a><p>Arine is building an AI-powered growth operating platform for D2C brands, freelancers and agencies.</p>{!comingSoon&&<a className={styles.email} href={`mailto:${supportEmail}`}>{supportEmail}</a>}<div className={styles.socials}><a href="https://www.instagram.com/arineecosystem/?hl=en" aria-label="Instagram">◎</a><a href="https://www.linkedin.com/in/arine-ecosystem-21a2623b9/" aria-label="LinkedIn">in</a><a href="https://www.youtube.com/@UCbfBXYKqtL9iIy3bIpfXRaw" aria-label="YouTube">▷</a></div></div><div><a className={styles.footerTitle} href="/features">FEATURES</a>{services.map(p=><a href={`/services/${p.slug}`} key={p.slug}>{p.name}</a>)}</div><div><span className={styles.footerTitle}>RESOURCES</span>{resources.map(([label,path])=><a key={path} href={`/${path}`}>{label}</a>)}<a href="/pricing">Pricing</a><a href="/blogs">Blogs</a></div><div><span className={styles.footerTitle}>LEGAL & SUPPORT</span>{policies.map(([label,path])=><a key={path} href={`/${path}`}>{label}</a>)}<a href="/legal">Trust & Legal Hub</a><a href="/help-center">Help Center</a></div><div className={styles.legal}><span>© {new Date().getUTCFullYear()} Arine Ecosystem Pvt. Ltd.</span><span>CONNECTED WORKFLOWS. CONSIDERED GROWTH.</span></div></footer>;
}
