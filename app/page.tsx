"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { SiteHeader, SiteFooter } from "./components/SiteChrome";
import { normalizeAppWebsite, normalizeStoreUrl } from "./lib/store-connection";

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
      <div className={styles.rangeLabels}><span>{prefix}{min.toLocaleString("en-US")}{suffix}</span><span>{prefix}{max.toLocaleString("en-US")}{suffix}</span></div>
    </div>
  );
}

export default function Home() {
 const [url, setUrl] = useState("");
 const [connectError, setConnectError] = useState("");
 const [isConnecting, setIsConnecting] = useState(false);
 useEffect(() => {
   const resetConnection = () => setIsConnecting(false);
   window.addEventListener("pageshow", resetConnection);
   return () => window.removeEventListener("pageshow", resetConnection);
 }, []); const [visitors, setVisitors] = useState(299000); const [conversion, setConversion] = useState(2.5); const [aov, setAov] = useState(80); const [repeat, setRepeat] = useState(0.2); const [mrr, setMrr] = useState(5000);
  const calc = useMemo(() => { const orders = visitors * conversion / 100; const sales = orders * aov; const repeatRevenue = sales * repeat; const monthly = sales + repeatRevenue + mrr; return { orders, sales, repeatRevenue, monthly, annual: monthly * 12, rpv: visitors > 0 ? monthly / visitors : 0 }; }, [visitors, conversion, aov, repeat, mrr]);
  const connect = (event: FormEvent<HTMLFormElement>) => {
    try {
      if (url.trim()) normalizeStoreUrl(url);
      setConnectError("");
      setIsConnecting(true);
      // Keep the native GET submission: it works before hydration and without JavaScript.
    } catch (error) {
      event.preventDefault();
      setConnectError(error instanceof Error ? error.message : "Enter a valid store URL.");
    }
  };
  const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
  const controls: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; step: number; hint: string; prefix?: string; suffix?: string }[] = [
    { label: "Monthly visitors", value: visitors, onChange: setVisitors, min: 50000, max: 500000, step: 1000, hint: "Store traffic", suffix: "" },
    { label: "Conversion rate", value: conversion, onChange: setConversion, min: 0.5, max: 6, step: 0.1, hint: "Visitors who order", suffix: "%" },
    { label: "Average order value", value: aov, onChange: setAov, min: 20, max: 250, step: 1, hint: "Average per order", prefix: "$" },
    { label: "Repeat purchase rate", value: repeat * 100, onChange: (value: number) => setRepeat(value / 100), min: 0, max: 80, step: 1, hint: "Returning customers", suffix: "%" },
    { label: "Monthly recurring revenue", value: mrr, onChange: setMrr, min: 0, max: 50000, step: 500, hint: "Existing monthly revenue", prefix: "$" },
  ];
  return <div className={styles.page}><a href="#main-content" className={styles.skipLink}>Skip to content</a><SiteHeader /><main id="top"><div id="main-content" tabIndex={-1} />
    <section className={styles.hero}><div className={styles.heroCopy}><form id="store-connect" className={styles.urlForm} action="/connect" method="get" onSubmit={connect}><input name="website" aria-label="Store URL" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} maxLength={2048} aria-invalid={Boolean(connectError)} aria-describedby={connectError ? "store-url-error" : undefined} value={url} onChange={(e) => {setUrl(e.target.value);setConnectError("");setIsConnecting(false);}} placeholder="Paste your store URL" /><button type="submit" disabled={isConnecting}>{isConnecting ? "Connecting…" : "Connect"} <span aria-hidden="true">→</span></button></form>{connectError && <p id="store-url-error" className={styles.connectError} role="alert">{connectError}</p>}<h1>META<br /><span>on <em>Autopilot</em></span><span className={styles.heroPeriod}>.</span></h1><p>Research, launch and optimise Meta campaigns from one system.</p></div></section>
    <div className={styles.railIntro}><span>FROM INSIGHT TO IMPACT</span><span>A considered campaign workflow</span></div><section className={styles.cardRail} id="products">{[["01","Research","Understand your product, audience and campaign context."],["02","Plan","Bring strategy, message and creative direction together."],["03","Prepare","Develop campaign assets and review the details."],["04","Review","Keep approval and spending decisions with your team."]].map(([number,title,text])=><article key={number} className={styles.workflowCard}><span>{number} / WORKFLOW</span><h2>{title}</h2><p>{text}</p><a href="/services/meta-automation">Explore Meta Automation ↗</a></article>)}</section>
    <section className={styles.engine} id="about"><div className={styles.sectionHead}><div><span className={styles.eyebrow}>BUILT IN, NOT BOLTED ON</span><h2>Creative Engine</h2><p>Create, test and improve creatives faster.</p></div><a className={styles.primaryButton} href={normalizeAppWebsite(process.env.APP_WEBSITE)}>Generate Creative</a></div>
      <p className={styles.exampleNote}>Illustrative creative concepts and sample customer scenarios.</p><div className={styles.engineGrid}>
        <div><h3>UGC CONTENT</h3><p>Creator-style hooks that stop the scroll.</p><article className={styles.photoCard}><div className={styles.ugcPhoto} style={{backgroundImage:"url(/reference/ugc.jpg)"}}><div className={styles.photoCopy}><b>The 4-week skin reset</b><small>UGC Hook · Reel</small></div></div><div className={styles.photoFooter}><span>UGC CONTENT</span><a href="/services/creative-engine" aria-label="Explore the creative workflow">↗</a><span>Ⅱ &nbsp; ⌕</span></div></article></div>
        <div><h3>PRODUCT SHOTS</h3><p>Your product, shot like it is on a front page.</p><div className={styles.referenceProducts}>{[["serum","Hydra Glow Serum","$42"],["shoe","Studio Runner","$128"],["candle","Amber No. 4","$36"]].map(([name,title,price])=><article key={name} className={styles.photoCard}><div style={{backgroundImage:`url(/reference/${name}.jpg)`}} className={styles.productPhoto}/><div className={styles.photoFooter}><b>{title}</b><span>{price}</span></div></article>)}</div></div>
        <div><h3>SALES AND BOGO</h3><p>Offers that are built in half a second.</p><article className={styles.photoCard}><div className={styles.coffeePhoto} style={{backgroundImage:"url(/reference/coffee.jpg)"}}><div className={styles.photoCopy}><b>Slow-roast blend</b><small>$24 · 2 for $24</small></div></div><div className={styles.photoFooter}><span>SALES AND BOGO</span><a href="/services/creative-engine">Preview</a></div></article><div className={styles.creativeNote}><span>CREATIVE WORKFLOW</span><p>Organize ideas. Review the details. Prepare for your campaign.</p><a href="/services/creative-engine">Explore Creative Engine ↗</a></div></div>
      </div>
    </section>
    <section className={styles.calculator} id="calculator"><div className={styles.calculatorInner}><div className={styles.calculatorHeading}><div><span className={styles.eyebrow}>GROWTH MODELLING</span><h2>Revenue &amp; Growth Calculator</h2><p>Adjust your store assumptions to see how small changes can shape your growth forecast.</p></div><span className={styles.liveLabel}><i /> SCENARIO FORECAST</span></div><div className={styles.metrics}><div><span>EST. MONTHLY REVENUE</span><b>{money(calc.monthly)}</b><small>Based on your inputs</small></div><div><span>ANNUAL RUN RATE</span><b>{money(calc.annual)}</b><small>Monthly revenue × 12</small></div><div><span>REVENUE PER VISITOR</span><b>${calc.rpv.toFixed(2)}</b><small>Estimated value per visitor</small></div><div><span>NEW ORDERS / MONTH</span><b>{Math.round(calc.orders).toLocaleString("en-US")}</b><small>Before repeat purchases</small></div></div><div className={styles.calcBox}><div className={styles.chartSide}><div className={styles.chartHeading}><div><span>REVENUE BREAKDOWN</span><h3>Monthly revenue mix</h3></div><span className={styles.chartTotal}>{money(calc.monthly)}</span></div><div className={styles.chartContent}><Donut values={[calc.sales, calc.repeatRevenue, mrr]} /><div className={styles.legend}><span><i />New sales revenue <b>{money(calc.sales)}</b></span><span><i />Repeat revenue <b>{money(calc.repeatRevenue)}</b></span><span><i />Monthly recurring revenue <b>{money(mrr)}</b></span></div></div></div><div className={styles.controls}><div className={styles.controlsHeading}><div><h3>Your assumptions</h3><p>Enter a value or use the slider to adjust.</p></div><span>5 INPUTS</span></div>{controls.map((control) => <CalculatorControl key={control.label} {...control} />)}</div></div></div></section>
    <section className={styles.comparison} id="guide"><div className={styles.sectionHead}><div><span className={styles.eyebrow}>THE HONEST COMPARISON</span><h2>Why <em>ARINE?</em></h2><p>One system. More control. Less coordination.</p></div></div><div className={styles.compareTable}><div className={styles.compareHeader}><span>TRADITIONAL APPROACH</span><strong>ARINE META AUTOMATION</strong></div>{[["Multiple people coordinating","One connected system"],["Manual research and setup","Strategy supported by data"],["Manual setup and review","Campaign objects created paused for review"],["Manual reporting","Automated reporting"],["Scattered performance context","Connected performance context"],["Calls, chats and scattered updates","One dashboard"],["Hiring more people to scale","Same team, higher output"],["Scattered knowledge","Connected data"]].map(row => <div className={styles.compareRow} key={row[0]}><span><i>×</i>{row[0]}</span><strong><i>✓</i>{row[1]}</strong></div>)}</div></section>
    <section className={styles.finalCta}><h2>Run Meta Ads with <em>less manual work.</em></h2><p>Connect the store, set the direction and let ARINE handle the repetitive work<br /> behind better campaign execution.</p><div><a className={styles.ctaLink} href="mailto:arine.soem@gmail.com?subject=Strategy%20call">Schedule a strategy call</a></div></section></main>
    <SiteFooter /></div>;
}
