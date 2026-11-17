(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let uid=0;

/* ---------- icons ---------- */
const ICON={
 grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
 coin:'<circle cx="12" cy="12" r="9"/><path d="M14.500 9.500c-.5-1-1.500-1.500-2.500-1.500-1.500 0-2.500.8-2.500 2s1 1.700 2.500 2 2.500.8 2.500 2-1 2-2.500 2c-1 0-2-.5-2.500-1.500M12 6.500V8M12 16v1.500"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 meta:'<path d="M12 12c-1.8-2.4-3.4-3.5-5.2-3.5a3.5 3.5 0 000 7c1.8 0 3.4-1.1 5.2-3.5zm0 0c1.8 2.4 3.4 3.5 5.2 3.5a3.5 3.5 0 000-7c-1.8 0-3.4 1.1-5.2 3.5z"/>',
 google:'<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20"/>',
 creative:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 16v4M16.5 18h4"/>',
 crm:'<circle cx="9" cy="8" r="3"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><circle cx="17" cy="9" r="2.2"/><path d="M16 14c2.8.2 4.5 2 4.5 5"/>',
 store:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V7a3 3 0 016 0v1"/>',
 seo:'<path d="M3 17l6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
 geo:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18-3-3-3-15 0-18z"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 chev:'<path d="M6 9l6 6 6-6"/>',
 cal:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
 pin:'<path d="M12 21s7-6.2 7-11a7 7 0 00-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18-3-3-3-15 0-18z"/>',
 brief:'<rect x="3.5" y="7" width="17" height="12" rx="3"/><path d="M9 7V5.5A1.5 1.5 0 0110.500 4h3A1.5 1.5 0 0115 5.500V7M3.500 12.500h17"/>',
 shield:'<path d="M12 3l7 3v5c0 4.500-3 8-7 10-4-2-7-5.500-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
 chat:'<path d="M5 6h14a1 1 0 011 1v8a1 1 0 01-1 1h-8l-4 3.500V16H5a1 1 0 01-1-1V7a1 1 0 011-1z"/>',
 play:'<circle cx="12" cy="12" r="9"/><path d="M10 8.500l5.500 3.500-5.500 3.500z"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',
 link:'<path d="M10 14a4 4 0 005.700 0l3-3a4 4 0 00-5.700-5.700l-1 1M14 10a4 4 0 00-5.700 0l-3 3a4 4 0 005.700 5.700l1-1"/>',
 bolt:'<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
 loop:'<path d="M4 12a8 8 0 0114-5.300L20 9M20 4v5h-5M20 12a8 8 0 01-14 5.300L4 15M4 20v-5h5"/>',
 search:'<circle cx="11" cy="11" r="6.500"/><path d="M16 16l4.500 4.500"/>',
 heart:'<path d="M12 20s-7.500-4.500-7.500-10A4.200 4.200 0 0112 7.500 4.200 4.200 0 0119.500 10c0 5.500-7.500 10-7.500 10z"/>',
 mail:'<rect x="3.500" y="5.500" width="17" height="13" rx="3"/><path d="M4 8l8 5.500L20 8"/>',
 book:'<path d="M5 5.500A1.500 1.500 0 016.500 4H19v15H6.500A1.500 1.500 0 005 20.500z"/><path d="M5 19.500V5.500M9 8h6"/>',
 phone:'<rect x="7" y="3" width="10" height="18" rx="3"/><path d="M11 18h2"/>',
};
const ic=(n,c='')=>`<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;

const LOGO=`<img class="lg" src="${IMG.logo}" alt="ARINE Ecosystem" width="150" height="69">`;

/* ---------- content model ---------- */
const MODS=[
 {id:'meta',name:'Meta Automation',tint:'sky',icon:'meta',card:'Ads that adjust themselves.',
  h:['Meta ads,','~tuned','while you sleep.'],sub:'Budgets, audiences and bids adjusted around the clock.',
  bens:[{n:27,p:'−',s:'%',t:'Lower cost per sale',d:'Spend moves to what converts.'},{n:48,s:'h',t:'Earlier fatigue alerts',d:'Tired ads get swapped early.'},{n:24,s:'/7',t:'Hourly checks',d:'Nothing waits for Monday.'}],
  steps:[['Connect','Link your ad account.'],['Set guardrails','Pick targets and limits.'],['Let it run','Read one digest a day.']]},
 {id:'google',name:'Google Automation',tint:'sun',icon:'google',card:'Search and Shopping, steady.',
  h:['Google Ads,','without the','~busywork.'],sub:'Search, Shopping and Performance Max on one steady hand.',
  bens:[{n:18,p:'−',s:'%',t:'Wasted spend',d:'Weak queries blocked daily.'},{n:99,s:'%',t:'Feed items approved',d:'Product feed fixes itself.'},{n:12,s:' min',t:'Weekly review',d:'Down from half a day.'}],
  steps:[['Connect','Link Ads and Merchant Center.'],['Add margins','Targets follow real profit.'],['Review','Approve or let it act.']]},
 {id:'creative',name:'Creative Engine',tint:'peach',icon:'creative',card:'Hooks and visuals, on repeat.',
  h:['Creative that','keeps up with','~your ads.'],sub:'Hooks, visuals and variations, made and tested for you.',
  bens:[{n:40,s:'+',t:'Variations a week',d:'All from one idea.'},{n:3.2,dec:1,s:'%',t:'Top creative CTR',d:'Winners guide the next batch.'},{n:100,s:'%',t:'On brand',d:'Your fonts, colours and tone.'}],
  steps:[['Share the brand','Logo, colours, tone.'],['Pick an idea','One product, one angle.'],['Ship winners','Tests run automatically.']]},
 {id:'crm',name:'CRM',tint:'mint',icon:'crm',card:'Every customer, remembered.',
  h:['Know every customer.','Message them','~well.'],sub:'Segments, journeys and replies across WhatsApp, email and SMS.',
  bens:[{n:3,s:'x',t:'Repeat orders',d:'Journeys that bring people back.'},{n:2,s:' min',t:'Average reply',d:'Replies drafted and routed.'},{n:5,t:'Live segments',d:'Updated with every order.'}],
  steps:[['Import','Bring in your store data.'],['Choose a journey','Start from a template.'],['Watch it work','See repeat orders grow.']]},
 {id:'store',name:'Store Management',tint:'lav',icon:'store',card:'Stock and orders, handled.',
  h:['Your store,','~quietly','looked after.'],sub:'Stock, orders and listings handled before they become problems.',
  bens:[{n:96,s:'%',t:'In-stock rate',d:'Reorder alerts come early.'},{n:5,s:' min',t:'Order sync',d:'Orders reach your team fast.'},{n:1200,s:'+',t:'Listings kept fresh',d:'Titles, prices and tags.'}],
  steps:[['Connect','Shopify, WooCommerce and more.'],['Set rules','Reorder points and lead times.'],['Stay ahead','Alerts only when it matters.']]},
 {id:'seo',name:'SEO Automation',tint:'aqua',icon:'seo',card:'Search growth that compounds.',
  h:['Search growth that','~compounds.'],sub:'Audits, content and links, handled in a steady rhythm.',
  bens:[{n:164,s:'%',t:'Organic clicks',d:'Eight weeks in.'},{n:312,t:'Issues fixed',d:'Speed, links and schema.'},{n:12,t:'Briefs a month',d:'Ready to publish.'}],
  steps:[['Audit','A full crawl, in minutes.'],['Fix and brief','Issues fixed, pages briefed.'],['Track','Ranks and clicks, weekly.']]},
 {id:'geo',name:'GEO Automation',tint:'rose',icon:'geo',card:'Be the answer AI gives.',
  h:['Be the answer','AI','~gives.'],sub:'Get your brand cited in AI answers, not only ranked in search.',
  bens:[{n:4,s:'x',t:'More AI citations',d:'Pages AI can quote.'},{n:38,s:'%',t:'Share of answer',d:'Against three rivals.'},{n:7,t:'Daily checks',d:'Across AI assistants.'}],
  steps:[['Track','See where AI mentions you.'],['Rewrite','Make pages easy to quote.'],['Compare','Watch your share grow.']]},
 {id:'cfo',name:'Virtual CFO',tint:'sand',icon:'coin',card:'Cash and margins, clear.',
  h:['Your finances,','~clear','every day.'],sub:'Cash flow, margins and forecasts, reviewed for you.',
  bens:[{n:90,s:' days',t:'Cash forecast',d:'See your runway before it gets tight.'},{n:3.5,dec:1,s:' pts',t:'Margin recovered',d:'Find the costs that quietly eat profit.'},{n:2,s:' hrs',t:'Monthly close',d:'Down from two days.'}],
  steps:[['Connect','Bank, books and store.'],['Review','A monthly report in plain words.'],['Plan','Budgets and forecasts that update.']]},
 {id:'enterprise',name:'Enterprise',tint:'teal',icon:'grid',card:'Every tool, working as one.',
  h:['Every tool.','One','~dashboard.'],sub:'All your tools working together to grow revenue.',
  bens:[{n:9,t:'Tools in sync',d:'All sharing one set of data.'},{n:34,s:'%',t:'Revenue growth',d:'When every channel acts together.'},{n:1,t:'Source of truth',d:'One set of numbers for everyone.'}],
  steps:[['Connect everything','Ads, store, books and inbox.'],['Set shared goals','Revenue, margin and cash.'],['Run as one','Tools coordinate on their own.']]},
];
const RES=[
 ['about','About us','Who we are','info','sky'],['events','Events','Meet the team','cal','sun'],['careers','Careers','Join us','brief','mint'],
 ['policy','Policy','Privacy and terms','shield','lav'],['support','Support','Talk to our team','chat','aqua'],['help','Help Centre','Guides, tutorials and FAQs','book','sun'],['creators','Creators','Make content, get paid','play','peach']];

/* ---------- helpers ---------- */
const H=parts=>{let i=0;return parts.map(p=>{const em=p[0]==='~',t=em?p.slice(1):p;return t.split(' ').map(w=>`<span class="w${em?' em':''}"><span style="--i:${i++}">${w}</span></span>`).join(' ')}).join(' ')};
const num=(n,o={})=>`<span data-count="${n}" data-dec="${o.dec||0}" data-pre="${o.p||''}" data-suf="${o.s||''}"${o.from!=null?` data-from="${o.from}"`:''}>${(o.p||'')+(o.dec?(+n).toFixed(o.dec):(+n).toLocaleString('en-US'))+(o.s||'')}</span>`;
const smooth=p=>{let d=`M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c,t=.17;d+=`C${(b[0]+(c[0]-a[0])*t).toFixed(1)},${(b[1]+(c[1]-a[1])*t).toFixed(1)} ${(c[0]-(e[0]-b[0])*t).toFixed(1)},${(c[1]-(e[1]-b[1])*t).toFixed(1)} ${c[0].toFixed(1)},${c[1].toFixed(1)}`}return d};
const chart=({data,labels,ticks,min,max,fmt=v=>v,valFmt})=>{
 const W=480,Ht=210,L=38,R=16,T=26,B=26,id='g'+(++uid);
 const x=i=>L+(W-L-R)*i/(data.length-1),y=v=>T+(Ht-T-B)*(1-(v-min)/(max-min));
 const pts=data.map((v,i)=>[x(i),y(v)]),d=smooth(pts),last=pts[pts.length-1];
 return `<svg class="chart" viewBox="0 0 ${W} ${Ht}" role="img" aria-label="Trend chart rising from ${fmt(data[0])} to ${fmt(data[data.length-1])}">
 <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14264A" stop-opacity=".16"/><stop offset="1" stop-color="#14264A" stop-opacity="0"/></linearGradient></defs>
 ${ticks.map(t=>`<line class="gl" x1="${L}" x2="${W-R}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}"/><text class="tk" x="${L-8}" y="${(y(t)+4).toFixed(1)}" text-anchor="end">${fmt(t)}</text>`).join('')}
 ${labels.map((l,i)=>`<text class="tk" x="${x(i).toFixed(1)}" y="${Ht-6}" text-anchor="middle">${l}</text>`).join('')}
 <path class="ar" d="${d}L${last[0].toFixed(1)},${y(min).toFixed(1)}L${pts[0][0].toFixed(1)},${y(min).toFixed(1)}Z" fill="url(#${id})"/>
 <path class="ln" pathLength="1" d="${d}"/>
 <circle class="pt" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="5.5"/>
 <text class="vl" x="${last[0].toFixed(1)}" y="${(last[1]-14).toFixed(1)}" text-anchor="end">${(valFmt||fmt)(data[data.length-1])}</text></svg>`};
const rows=items=>`<div class="rows">${items.map((r,i)=>`<div class="row" style="--d:${i}"><span class="rl">${r.l}</span><span class="bar"><i class="${r.tone||''}" style="--w:${r.v}%"></i></span>${r.tag?`<span class="pill ${r.pill||''}">${r.tag}</span>`:`<span class="pill">${r.t}</span>`}</div>`).join('')}</div>`;

/* ---------- shell ---------- */
const navHTML=()=>`<div class="ann" id="ann" role="region" aria-label="Offer"><p><span class="ann-dot"></span><b>New:</b> start with <b>200 free credits</b> when you sign up. <a href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Claim credits ${ic('arrow')}</a></p><button class="ann-x" aria-label="Close offer banner" data-ann-x>${ic('x')}</button></div>
<div class="wrap nav-in">
 <a class="logo" href="#home" aria-label="ARINE home">${LOGO}</a>
 <nav class="nl-wrap" aria-label="Main">
  <button class="nl" data-m="features" aria-expanded="false" aria-haspopup="true">Features ${ic('chev')}</button>
  <a class="nl" data-r="pricing" href="#pricing">Pricing</a>
  <button class="nl" data-m="resources" aria-expanded="false" aria-haspopup="true">Resources ${ic('chev')}</button>
  <a class="nl" data-r="blog" href="#blog">Blog</a>
 </nav>
 <a class="btn btn-dark sm" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Sign up</a>
 <button class="burger" aria-label="Menu" aria-expanded="false"><span></span></button>
</div>
<div class="mega" data-for="features"><div class="wrap mega-in cols3">${MODS.map(m=>`<a class="mi t-${m.tint}" href="#${m.id}" data-r="${m.id}"><i>${ic(m.icon)}</i><span><b>${m.name}</b><small>${m.card}</small></span></a>`).join('')}</div></div>
<div class="mega" data-for="resources"><div class="wrap mega-in">${RES.map(r=>`<a class="mi t-${r[4]}" href="#${r[0]}" data-r="${r[0]}"><i>${ic(r[3])}</i><span><b>${r[1]}</b><small>${r[2]}</small></span></a>`).join('')}</div></div>`;
const mmHTML=()=>`<h4>Features</h4>${MODS.map(m=>`<a href="#${m.id}">${ic(m.icon)}${m.name}</a>`).join('')}<h4>Company</h4><a href="#pricing">${ic('seo')}Pricing</a><a href="#blog">${ic('book')}Blog</a>${RES.map(r=>`<a href="#${r[0]}">${ic(r[3])}${r[1]}</a>`).join('')}<div style="margin-top:28px"><a class="btn btn-dark" style="display:flex;border:0" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Sign up</a></div>`;
const POLL=[['Privacy Policy','Privacy'],['Terms of Service','Terms'],['Data Deletion','Data deletion'],['Refund & Cancellation','Refunds'],['Cookie Policy','Cookies'],['Trust & Legal Hub','Privacy']];
const SOC=[
 ['Instagram','https://www.instagram.com/arineecosystem/','<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>'],
 ['Facebook','https://www.facebook.com/profile.php?id=61594060736422','<path d="M13.5 21v-7.6h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.7V21z" fill="currentColor"/>'],
 ['YouTube','https://youtube.com/@arine-ecosystem?si=jVu8Jj9Zk0rF6C0b','<path d="M21 8.2c-.2-.9-.9-1.5-1.8-1.7C17.7 6.2 12 6.2 12 6.2s-5.7 0-7.2.3c-.9.2-1.6.8-1.8 1.7C2.7 9.7 2.7 12 2.7 12s0 2.3.3 3.8c.2.9.9 1.5 1.8 1.7 1.5.3 7.2.3 7.2.3s5.7 0 7.2-.3c.9-.2 1.6-.8 1.8-1.7.3-1.5.3-3.8.3-3.8s0-2.3-.3-3.8z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10.2 9.4v5.2l4.4-2.6z" fill="currentColor"/>'],
 ['LinkedIn','https://www.linkedin.com/in/arine-ecosystem-21a2623b9/','<rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-3.1c0-1.5 1-2.4 2.2-2.4s1.8.8 1.8 2.3V16M11.5 10.5V16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>']];
const footHTML=()=>`<div class="wrap"><div class="fg2">
 <div class="fb"><a class="logo" href="#home" aria-label="ARINE home">${LOGO}</a><p>Arine is building an AI-powered growth operating platform for D2C brands, freelancers and agencies.</p><a class="mail" href="mailto:arine.soem@gmail.com">arine.soem@gmail.com</a><div class="soc" aria-label="ARINE on social media">${SOC.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener noreferrer" aria-label="ARINE on ${s[0]}" title="${s[0]}"><svg viewBox="0 0 24 24" aria-hidden="true">${s[2]}</svg></a>`).join('')}</div></div>
 <div class="fc3"><h4>Features</h4>${MODS.map(m=>`<a href="#${m.id}">${m.name}</a>`).join('')}</div>
 <div class="fc3"><h4>Resources</h4><a href="#about">About Us</a><a href="#policy">Policies</a><a href="#careers">Careers</a><a href="#events">Events</a><a href="#help">Help Centre</a><a href="#creators">Creators</a><a href="#pricing">Pricing</a><a href="#blog">Blogs</a></div>
 <div class="fc3"><h4>Legal &amp; Support</h4>${POLL.map(p=>`<a href="#policy" data-pol-open="${p[1]}">${p[0]}</a>`).join('')}<a href="#help">Help Centre</a></div></div>
 <div class="fl"><span>© 2026 ARINE Ecosystem. All rights reserved.</span></div></div>`;
const band=()=>`<section class="wrap sec sm"><div class="band an"><div class="sunbg"></div><h2 class="h2">${H(['Ready','when','you are.'])}</h2><p class="rv">Start with 200 free credits. Connect your first account in minutes.</p><div class="rv" style="--d:1"><a class="btn btn-white" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Claim 200 free credits</a></div></div></section>`;

window.A={$,$$,reduce,ic,ICON,LOGO,MODS,RES,H,num,chart,rows,navHTML,mmHTML,footHTML,band,uid:()=>++uid};
})();
