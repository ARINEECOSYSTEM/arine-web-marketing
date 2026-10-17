"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type ModalKind = "profile" | "demo" | "creative" | "call" | null;
const Arrow = () => <span aria-hidden="true">↗</span>;

function Modal({ kind, close }: { kind: ModalKind; close: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { if (!kind) return; const onKey = (event: KeyboardEvent) => event.key === "Escape" && close(); window.addEventListener("keydown", onKey); document.body.style.overflow = "hidden"; return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; }; }, [kind, close]);
  if (!kind) return null;
  const title = kind === "profile" ? "Build your growth profile" : kind === "creative" ? "Generate a creative" : kind === "call" ? "Schedule a strategy call" : "See ARINE in motion";
  return <div className={styles.modalBackdrop} role="presentation" onMouseDown={(e) => e.target === e.currentTarget && close()}><div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className={styles.closeButton} onClick={close} aria-label="Close modal">×</button><span className={styles.modalKicker}>{kind === "demo" ? "A TWO-MINUTE TOUR" : "ARINE ECOSYSTEM"}</span><h2 id="modal-title">{title}</h2>{kind === "demo" ? <><div className={styles.demoWindow}><div className={styles.demoTop}><span>ARINE / CAMPAIGNS</span><i /></div><div className={styles.demoBody}><div className={styles.playCircle}>▶</div><div><b>From signal to scale.</b><small>Research → create → optimise</small></div></div></div><p className={styles.modalNote}>Watch how one connected system turns your store data into better Meta campaigns.</p><button className={styles.primaryButton} onClick={close}>Got it <Arrow /></button></> : <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className={styles.modalForm}>{kind === "creative" ? <><label>Creative type<select defaultValue="UGC concept"><option>UGC concept</option><option>Product shot</option><option>Offer creative</option></select></label><label>Product name<input required placeholder="e.g. Cloud Skin Serum" /></label><label>Offer or message<input placeholder="e.g. Buy 1, get 1 free" /></label></> : <><label>Your name<input required placeholder="Aarush Mehta" /></label><label>Work email<input required type="email" placeholder="you@brand.com" /></label><label>{kind === "profile" ? "Store URL" : "Brand name"}<input required placeholder={kind === "profile" ? "https://yourstore.com" : "Your brand"} /></label>{kind === "call" && <label>Monthly ad spend<select defaultValue="$10k – $50k"><option>$5k – $10k</option><option>$10k – $50k</option><option>$50k+</option></select></label>}</>}{submitted ? <div className={styles.success}><strong>{kind === "creative" ? "Creative generated." : "You’re on the list."}</strong><span>We’ll take it from here. Keep an eye on your inbox.</span></div> : <button className={styles.primaryButton} type="submit">{kind === "creative" ? "Generate creative" : kind === "call" ? "Request a call" : "Create profile"} <Arrow /></button>}</form>}</div></div>;
}



function Donut({ values }: { values: number[] }) { const total = values.reduce((a, b) => a + b, 0) || 1; const radius = 74; const circumference = 2 * Math.PI * radius; const offsets = values.map((_, i) => values.slice(0, i).reduce((sum, value) => sum + (value / total) * circumference, 0)); return <div className={styles.donutWrap}><svg viewBox="0 0 190 190" className={styles.donut}><circle cx="95" cy="95" r={radius} fill="none" stroke="#eef0ed" strokeWidth="24" /><g transform="rotate(-90 95 95)">{values.map((value, i) => { const length = (value / total) * circumference; return <circle key={i} cx="95" cy="95" r={radius} fill="none" stroke={['#004c50', '#76a99d', '#8db8d0'][i]} strokeWidth="24" strokeDasharray={`${length} ${circumference - length}`} strokeDashoffset={-offsets[i]} />; })}</g><text x="95" y="92" textAnchor="middle" className={styles.donutValue}>Revenue</text><text x="95" y="110" textAnchor="middle" className={styles.donutSub}>mix</text></svg></div>; }

function CalculatorControl({ label, value, onChange, min, max, step, prefix, suffix, hint }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string; hint: string }) {
  const [draft, setDraft] = useState(String(value));
  const updateValue = (raw: string) => {
    setDraft(raw);
    const parsed = Number(raw);
    if (raw === "") {
      onChange(0);
    } else if (Number.isFinite(parsed)) {
      onChange(parsed);
    }
  };
  const commitValue = () => {
    const parsed = Number(draft);
    const next = draft === "" || !Number.isFinite(parsed)
      ? min
      : Math.min(max, Math.max(min, parsed));
    setDraft(String(next));
    onChange(next);
  };

  return (
    <div className={styles.control}>
      <div className={styles.controlHeading}>
        <label htmlFor={`calculator-${label.replaceAll(" ", "-").toLowerCase()}`}>{label}</label>
        <span>{hint}</span>
      </div>
      <div className={styles.numberField}>
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input
          id={`calculator-${label.replaceAll(" ", "-").toLowerCase()}`}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={draft}
          onChange={(event) => updateValue(event.target.value)}
          onBlur={commitValue}
        />
        {suffix && <span aria-hidden="true">{suffix}</span>}
      </div>
      <input
        className={styles.rangeInput}
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(event) => {
          const next = Number(event.target.value);
          setDraft(String(next));
          onChange(next);
        }}
      />
      <div className={styles.rangeLabels}><span>{prefix}{min.toLocaleString()}{suffix}</span><span>{prefix}{max.toLocaleString()}{suffix}</span></div>
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState<ModalKind>(null); const [url, setUrl] = useState(""); const [visitors, setVisitors] = useState(299000); const [conversion, setConversion] = useState(2.5); const [aov, setAov] = useState(80); const [repeat, setRepeat] = useState(0.2); const [mrr, setMrr] = useState(5000);
  const calc = useMemo(() => { const orders = visitors * conversion / 100; const sales = orders * aov; const repeatRevenue = sales * repeat; const monthly = sales + repeatRevenue + mrr; return { orders, sales, repeatRevenue, monthly, annual: monthly * 12, rpv: visitors > 0 ? monthly / visitors : 0 }; }, [visitors, conversion, aov, repeat, mrr]);
  const connect = (e: FormEvent) => { e.preventDefault(); if (url.trim()) setModal("profile"); }; const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
  const controls: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; step: number; hint: string; prefix?: string; suffix?: string }[] = [
    { label: "Monthly visitors", value: visitors, onChange: setVisitors, min: 50000, max: 500000, step: 1000, hint: "Store traffic", suffix: "" },
    { label: "Conversion rate", value: conversion, onChange: setConversion, min: 0.5, max: 6, step: 0.1, hint: "Visitors who order", suffix: "%" },
    { label: "Average order value", value: aov, onChange: setAov, min: 20, max: 250, step: 1, hint: "Average per order", prefix: "$" },
    { label: "Repeat purchase rate", value: repeat * 100, onChange: (value: number) => setRepeat(value / 100), min: 0, max: 80, step: 1, hint: "Returning customers", suffix: "%" },
    { label: "Monthly recurring revenue", value: mrr, onChange: setMrr, min: 0, max: 50000, step: 500, hint: "Existing monthly revenue", prefix: "$" },
  ];
  return <div className={styles.page}><main id="top">
    <section className={styles.hero}><div className={styles.heroCopy}><span className={styles.eyebrow}>META AUTOMATION</span><form className={styles.urlForm} onSubmit={connect}><input required aria-label="Store URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste your store URL" /><button type="submit" aria-label="Connect store"><span>→</span></button></form><h1>META <em>on Autopilot</em></h1><p>Research, launch and optimise Meta campaigns from one system.</p></div></section>
    <section className={styles.cardRail} id="products">
      <div className={styles.insightCard}><div className={styles.cardLabel}>● ● ● <b>LIVE</b></div><span className={styles.cardKicker}>CAMPAIGN PERFORMANCE</span><strong>82</strong><span>campaigns optimised</span><div className={styles.bars}>{[30,55,36,72,49,84,66,96].map((v,i)=><i key={i} style={{height:v+"%"}} />)}</div><div className={styles.cardCaption}><b>OPTIMISED 82 CAMPAIGNS</b><span>in 30 days</span></div></div>
      <div className={`${styles.insightCard} ${styles.roasCard}`}><span className={styles.cardKicker}>RETURN ON AD SPEND</span><strong><del>1.8x</del> <small>↗</small> 3.7x</strong><span>last 90 days</span><div className={styles.sparkline}><svg viewBox="0 0 280 180"><path d="M0,170 C70,170 135,140 175,115 S230,85 280,65" /></svg></div><div className={styles.cardCaption}><b>ROAS FROM 1.8X TO 3.7X</b><span>through structured testing</span></div></div>
      <div className={styles.insightCard}><div className={styles.cardLabel}>BRAND WORKSPACE <b>23 brands</b></div><div className={styles.brandList}>{["Aurea Skin","Kicks Lab","Brew & Co","Nordic Home"].map((brand,i)=><div key={brand}><span>● &nbsp; {brand}<small>{[32,21,14,9][i]} live</small></span><i style={{width:[78,64,35,22][i]+"%"}} /></div>)}</div><div className={styles.cardCaption}><b>130 CAMPAIGNS FOR 23 BRANDS</b><span>managed from one system</span></div></div>
      <div className={styles.insightCard}><div className={styles.creativeGrid}>{["ugc","serum","shoe","candle"].map((name,i)=><div key={name} style={{backgroundImage:`url(/reference/${name}.jpg)`}}><b>{String.fromCharCode(65+i)}</b><span>CTR {[3.8,3.2,2.7,2.4][i]}%</span></div>)}</div><div className={styles.cardCaption}><b>CREATIVES THAT CONVERT</b><span>built for continuous testing</span></div></div>
    </section>
    <section className={styles.engine} id="about"><div className={styles.sectionHead}><div><span className={styles.eyebrow}>BUILT IN, NOT BOLTED ON</span><h2>Creative Engine</h2><p>Create, test and improve creatives faster.</p></div><button className={styles.primaryButton} onClick={() => setModal("creative")}>Generate Creative</button></div>
      <div className={styles.engineGrid}>
        <div><h3>UGC CONTENT</h3><p>Creator-style hooks that stop the scroll.</p><article className={styles.photoCard}><Image className={styles.ugcPhoto} src="/reference/ugc.jpg" alt="Skincare creator holding a serum with a social ad preview" width={405} height={505} /><div className={styles.photoFooter}><span>UGC CONTENT</span><button onClick={()=>setModal("demo")} aria-label="Preview UGC">▷</button><span>Ⅱ &nbsp; ⌕</span></div></article></div>
        <div><h3>PRODUCT SHOTS</h3><p>Your product, shot like it is on a front page.</p><div className={styles.referenceProducts}>{[["serum","Hydra Glow Serum","$42",191,180],["shoe","Studio Runner","$128",191,199],["candle","Amber No. 4","$36",405,212]].map(([name,title,price,width,height])=><article key={name} className={styles.photoCard}><Image src={`/reference/${name}.jpg`} alt={`${title} product photo`} className={styles.productPhoto} width={Number(width)} height={Number(height)} /><div className={styles.photoFooter}><b>{title}</b><span>{price}</span></div></article>)}</div></div>
        <div><h3>SALES AND BOGO</h3><p>Offers that are built in half a second.</p><article className={styles.photoCard}><Image className={styles.coffeePhoto} src="/reference/coffee.jpg" alt="Coffee bags shown in a buy one get one offer ad preview" width={405} height={302} /><div className={styles.photoFooter}><span>SALES AND BOGO</span><button onClick={()=>setModal("demo")}>Preview</button></div></article><div className={styles.activateOffer}><div><small>ENDS SUNDAY</small><b>BUY 1 GET 1 — site wide</b></div><button onClick={()=>setModal("profile")}>Activate</button></div><blockquote className={styles.testimonial}><div>★★★★★</div><p>“ROAS went from 1.9x to 3.4x in six weeks — without adding a single person to the team.”</p><small>Meera S. · Aurea Skin</small><span>Sponsored</span></blockquote></div>
      </div>
    </section>
    <section className={styles.calculator} id="calculator"><div className={styles.calculatorInner}><div className={styles.calculatorHeading}><div><span className={styles.eyebrow}>GROWTH MODELLING</span><h2>Revenue &amp; Growth Calculator</h2><p>Adjust your store assumptions to see how small changes can shape your growth forecast.</p></div><span className={styles.liveLabel}><i /> LIVE FORECAST</span></div><div className={styles.metrics}><div><span>EST. MONTHLY REVENUE</span><b>{money(calc.monthly)}</b><small>Based on your inputs</small></div><div><span>ANNUAL RUN RATE</span><b>{money(calc.annual)}</b><small>Monthly revenue × 12</small></div><div><span>REVENUE PER VISITOR</span><b>${calc.rpv.toFixed(2)}</b><small>Estimated value per visitor</small></div><div><span>NEW ORDERS / MONTH</span><b>{Math.round(calc.orders).toLocaleString()}</b><small>Before repeat purchases</small></div></div><div className={styles.calcBox}><div className={styles.chartSide}><div className={styles.chartHeading}><div><span>REVENUE BREAKDOWN</span><h3>Monthly revenue mix</h3></div><span className={styles.chartTotal}>{money(calc.monthly)}</span></div><div className={styles.chartContent}><Donut values={[calc.sales, calc.repeatRevenue, mrr]} /><div className={styles.legend}><span><i />New sales revenue <b>{money(calc.sales)}</b></span><span><i />Repeat revenue <b>{money(calc.repeatRevenue)}</b></span><span><i />Monthly recurring revenue <b>{money(mrr)}</b></span></div></div></div><div className={styles.controls}><div className={styles.controlsHeading}><div><h3>Your assumptions</h3><p>Enter a value or use the slider to adjust.</p></div><span>5 INPUTS</span></div>{controls.map((control) => <CalculatorControl key={control.label} {...control} />)}</div></div></div></section>
    <section className={styles.comparison}><div className={styles.sectionHead}><div><span className={styles.eyebrow}>THE HONEST COMPARISON</span><h2>Why <em>ARINE?</em></h2><p>One system. More control. Less coordination.</p></div></div><div className={styles.compareTable}><div className={styles.compareHeader}><span>TRADITIONAL APPROACH</span><strong>ARINE META AUTOMATION</strong></div>{[["Multiple people coordinating","One connected system"],["Manual research and setup","Strategy supported by data"],["Weeks before launch","Campaigns live in days"],["Manual reporting","Automated reporting"],["Periodic optimisation","Continuous optimisation"],["Calls, chats and scattered updates","One dashboard"],["Hiring more people to scale","Same team, higher output"],["Scattered knowledge","Connected data"]].map(row => <div className={styles.compareRow} key={row[0]}><span><i>×</i>{row[0]}</span><strong><i>✓</i>{row[1]}</strong></div>)}</div></section>
    <section className={styles.finalCta}><h2>Run Meta Ads with <em>less manual work.</em></h2><p>Connect the store, set the direction and let ARINE handle the repetitive work<br /> behind better campaign execution.</p><div><button className={styles.lightButton} onClick={() => setModal("profile")}>Start with ARINE</button><button className={styles.ctaLink} onClick={() => setModal("call")}>Schedule a strategy call</button></div></section></main>
    {modal && <Modal key={modal} kind={modal} close={() => setModal(null)} />}</div>;
}
