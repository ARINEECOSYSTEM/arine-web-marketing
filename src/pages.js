(()=>{
'use strict';
const {ic,ICON,LOGO,MODS,RES,H,num,chart,rows,band}=A;
const state={plan:'Grow'};
A.state=state;
const fine='';
const W8=['W1','W2','W3','W4','W5','W6','W7','W8'];

/* ---------- form helper ---------- */
const field=f=>{const id='f-'+f.n;
 const inp=f.t==='select'?`<select id="${id}" name="${f.n}"${f.req?' required':''}>${f.o.map(o=>`<option${o===f.v?' selected':''}>${o}</option>`).join('')}</select>`
  :f.t==='file'?`<input id="${id}" name="${f.n}" type="file" accept=".pdf,.doc,.docx"${f.req?' required':''}>`
  :f.t==='area'?`<textarea id="${id}" name="${f.n}"${f.req?' required':''}></textarea>`
  :`<input id="${id}" name="${f.n}" type="${f.t||'text'}" autocomplete="${f.ac||'off'}"${f.req?' required':''}${f.ph?` placeholder="${f.ph}"`:''}>`;
 return `<div class="fld"><label for="${id}">${f.l}</label>${inp}<span class="msg">${f.t==='email'?'Enter a valid email.':f.t==='tel'?'Enter a valid phone number.':'This field is needed.'}</span></div>`};
const form=(id,fields,btn)=>`<form class="form" id="${id}" novalidate${/^(ct|job)-form$/.test(id)?' data-mail':''}>${fields.map(field).join('')}<button class="btn btn-dark" type="submit" style="margin-top:6px">${btn}</button></form>`;

/* ---------- visuals per feature ---------- */
const seg=a=>a.map((v,i)=>`<i class="${i===a.length-1?'x':''}" style="--w:${v}%;--d:${i}"></i>`).join('');
const VIZ={
meta:()=>`<div class="vz2">
 <div class="card"><div class="card-h">ROAS<span>Last 8 weeks</span></div>${chart({data:[2.1,2.2,2.0,2.6,2.9,3.1,3.0,3.5],labels:W8,ticks:[2,3,4],min:1.5,max:4,fmt:v=>v+'x'})}</div>
 <div class="card"><div class="card-h">Ad sets<span>Today</span></div>${rows([
  {l:'Lookalike 2%',v:82,tag:'Scale',pill:'ok'},{l:'Retarget 7 days',v:64,tag:'Hold'},{l:'Broad, 25 to 34',v:38,tag:'Hold'},{l:'Interest: fitness',v:14,tag:'Pause',pill:'bad',tone:'bad'}])}</div></div>`,
google:()=>`<div class="vz2">
 <div class="card"><div class="card-h">Where spend goes<span>Same budget</span></div>
  <div class="sk-l"><span>Before</span><span>${num(22,{s:'% wasted'})}</span></div><div class="stack">${seg([34,26,18,22])}</div>
  <div class="sk-l" style="margin-top:22px"><span>With ARINE</span><span>${num(4,{s:'% wasted'})}</span></div><div class="stack">${seg([38,32,26,4])}</div>
  <div class="legend" style="margin-top:20px"><span><i style="--c:#14264A"></i>Search</span><span><i style="--c:#4D6AA8"></i>Shopping</span><span><i style="--c:#9DB0D9"></i>Performance Max</span><span><i style="--c:#E8503E"></i>Wasted</span></div></div>
 <div class="card"><div class="card-h">Search terms<span>This week</span></div>
  <div class="q"><span class="t">linen shirt men</span><span class="pill ok">Keep</span></div>
  <div class="q no" style="--d:0"><span class="t">free linen shirt pattern</span><span class="pill bad">Blocked</span></div>
  <div class="q"><span class="t">buy linen shirt online</span><span class="pill ok">Keep</span></div>
  <div class="q no" style="--d:1"><span class="t">how to wash linen</span><span class="pill bad">Blocked</span></div>
  <div class="q"><span class="t">summer shirts india</span><span class="pill ok">Keep</span></div></div></div>`,
creative:()=>{const P=[['#FFE7DD','#FFCDB9','#F26B52'],['#E6EEFC','#C8D8F6','#4D6AA8'],['#FFF1D1','#FFE2A0','#E9A23B'],['#DFF3EA','#BFE6D4','#3FA77A'],['#ECE8FA','#D5CCF2','#7C6CC4'],['#FBE5EE','#F6C8DA','#D9638F'],['#DDF1F5','#BDE3EC','#3C9DB5'],['#FFE7DD','#FFD6C6','#14264A']];
 const X=[18,40,12,34,22,44,16,30],Y=[14,20,30,10,26,12,32,18],R=[38,52,30,45,40,34,50,28],C=[1.8,2.1,1.4,3.2,2.4,1.9,2.2,1.6];
 return `<div class="card"><div class="flow"><span style="--d:0">Hook</span>${ic('arrow')}<span style="--d:1">Visual</span>${ic('arrow')}<span style="--d:2">Test</span>${ic('arrow')}<span style="--d:3">Winner</span></div>
 <div class="tiles">${P.map((p,i)=>`<div class="tile${i===3?' win':''}" style="--a:${p[0]};--b:${p[1]};--c:${p[2]};--x:${X[i]}%;--y:${Y[i]}%;--r:${R[i]}%;--d:${i}">${i===3?'<span class="wb">Winner</span>':''}<small>CTR ${C[i].toFixed(1)}%</small></div>`).join('')}</div></div>`},
crm:()=>{const S=[['Repeat',38,'#14264A'],['At risk',26,'#E8503E'],['New',24,'#9DB0D9'],['VIP',12,'#4D6AA8']];let o=0;
 const segs=S.map((s,i)=>{const r=`<circle class="seg" cx="50" cy="50" r="38" pathLength="100" style="--l:${s[1]-1.4};--o:${o};--d:${i};stroke:${s[2]}"/>`;o+=s[1];return r}).join('');
 return `<div class="vz2"><div class="card"><div class="card-h">Customers by segment<span>Live</span></div>
 <div class="donut-w"><div class="donut"><svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="38"/>${segs}</svg><div class="c"><b>${num(12.4,{dec:1,s:'k'})}</b><small>customers</small></div></div>
 <div class="rows">${S.map(s=>`<div style="display:flex;justify-content:space-between;font-size:14px"><span class="legend" style="margin:0"><span><i style="--c:${s[2]}"></i>${s[0]}</span></span><b style="font-family:var(--f-head)">${s[1]}%</b></div>`).join('')}</div></div></div>
 <div class="card"><div class="card-h">Win-back journey<span>Automatic</span></div><div class="tl">
  <div><b>Order delivered</b><small>Day 0</small></div>
  <div><b>How's the fit?</b><small>Day 3</small><span class="pill ok">WhatsApp</span></div>
  <div><b>Back in stock</b><small>Day 14</small><span class="pill">Email</span></div>
  <div><b>A small thank you</b><small>Day 30</small><span class="pill warn">SMS</span></div></div></div></div>`},
store:()=>`<div class="vz2">
 <div class="card"><div class="card-h">Stock<span>Today</span></div>${rows([
  {l:'Linen shirt',v:82,tag:'82%'},{l:'Cotton tee',v:55,tag:'55%'},{l:'Denim jacket',v:23,tone:'warn',tag:'Low',pill:'warn'},{l:'Canvas tote',v:9,tone:'bad',tag:'Reorder in 4 days',pill:'bad pulse'}])}</div>
 <div class="card"><div class="card-h">Orders today<span>Placed to delivered</span></div>${rows([
  {l:'Placed',v:100,t:num(128)},{l:'Packed',v:88,t:num(112)},{l:'Shipped',v:75,t:num(96)},{l:'Delivered',v:63,t:num(81)}])}</div></div>`,
seo:()=>{const K=[['linen shirts men',14,3],['summer shirts india',22,8],['organic cotton tee',9,2],['kurta set online',31,12]];
 return `<div class="vz2"><div class="card"><div class="card-h">Organic clicks<span>Last 8 weeks</span></div>${chart({data:[1.2,1.3,1.6,1.9,2.4,3.1,3.8,4.6],labels:W8,ticks:[0,2,4],min:0,max:5,fmt:v=>v+'k'})}</div>
 <div class="card"><div class="card-h">Keywords<span>Position</span></div>${K.map(k=>`<div class="kw"><span>${k[0]}</span><span class="mute">${k[1]}</span><span class="arrow">${ic('arrow')}</span><b class="pos">${num(k[2],{from:k[1]})}</b><span class="pill ok">+${k[1]-k[2]}</span></div>`).join('')}</div></div>`},
geo:()=>`<div class="vz2"><div class="card"><div class="card-h">An AI answer<span>Sample</span></div>
 <div class="bubble">Best linen shirts to buy online?</div>
 <div class="ai">Top picks for linen shirts: <mark>Your Brand</mark> for heavyweight linen, then Brand B and Brand C for lighter weaves.
  <div class="src"><span style="--d:0">Your site</span><span style="--d:1">Review guide</span><span style="--d:2">Fashion blog</span></div></div></div>
 <div class="card"><div class="card-h">Share of answer<span class="pill ok">+9 pts this month</span></div>${rows([
  {l:'Your brand',v:38,t:num(38,{s:'%'})},{l:'Brand B',v:29,tone:'g',t:'29%'},{l:'Brand C',v:21,tone:'g',t:'21%'},{l:'Brand D',v:12,tone:'g',t:'12%'}])}</div></div>`
};

VIZ.cfo=()=>`<div class="vz2">
 <div class="card"><div class="card-h">Cash balance<span>Last 8 weeks</span></div>${chart({data:[42,45,41,52,58,55,63,71],labels:W8,ticks:[40,55,70],min:35,max:75,fmt:v=>'$'+v+'k'})}</div>
 <div class="card"><div class="card-h">Contribution margin<span>By channel</span></div>${rows([{l:'Meta',v:34,tag:'34%'},{l:'Google',v:41,tag:'41%'},{l:'Organic',v:72,tag:'72%',pill:'ok'},{l:'Repeat',v:68,tag:'68%',pill:'ok'}])}</div></div>`;
const HUB=[['meta','Meta'],['google','Google'],['creative','Creative'],['crm','CRM'],['store','Store'],['seo','SEO'],['geo','GEO'],['coin','CFO']];
VIZ.enterprise=()=>{const pts=HUB.map((h,i)=>{const a=(-90+i*45)*Math.PI/180;return [50+Math.cos(a)*37,50+Math.sin(a)*37]});
 return `<div class="vz2"><div class="card"><div class="card-h">One dashboard<span>Live</span></div><div class="hub"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${pts.map(p=>`<line x1="50" y1="50" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}"/>`).join('')}</svg>
 ${HUB.map((h,i)=>`<div class="hn" style="left:${pts[i][0].toFixed(1)}%;top:${pts[i][1].toFixed(1)}%;--d:${i}"><i>${ic(h[0])}</i><span>${h[1]}</span></div>`).join('')}
 <div class="hubc"><b>${num(34,{p:'+',s:'%'})}</b><small>revenue growth</small></div></div></div>
 <div class="card"><div class="card-h">Coordinated actions<span>Today</span></div><div class="tl">
 <div><b>Canvas tote runs low</b><small>09:02</small><span class="pill t">Store</span></div>
 <div><b>Ads for the tote paused</b><small>09:03</small><span class="pill t">Meta</span></div>
 <div><b>Waitlist messaged</b><small>09:05</small><span class="pill t">CRM</span></div>
 <div><b>Cash plan updated for reorder</b><small>09:06</small><span class="pill t">CFO</span></div></div></div></div>`};
A.VIZ=VIZ;

const feature=id=>{const m=MODS.find(x=>x.id===id),i=MODS.indexOf(m),nx=MODS[(i+1)%MODS.length];
 return `<section class="wrap pt"><div class="fh t-${m.tint}"><div>
  <span class="chip rv">${ic(m.icon)}${m.name}</span>
  <h1 class="h1 sm an">${H(m.h)}</h1><p class="lead rv" style="--d:3">${m.sub}</p>
  <div class="cta-row rv" style="--d:4"><a class="btn btn-dark" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Sign up</a><a class="link" href="#pricing">See pricing ${ic('arrow')}</a></div><p class="offer rv" style="--d:5">${ic('check')}Start with 200 free credits</p></div>
  <div class="an">${VIZ[id]()}${fine}</div></div></section>
 <section class="wrap sec sm"><div class="tiles3">${m.bens.map((b,k)=>`<div class="bt rv" style="--d:${k}"><b class="n">${num(b.n,b)}</b><h3 class="h3">${b.t}</h3><p>${b.d}</p></div>`).join('')}</div></section>
 <section class="wrap sec sm"><span class="eyebrow rv">How it works</span><div class="steps an">${m.steps.map((s,k)=>`<div class="stp rv" style="--d:${k}"><i>${k+1}</i><h3 class="h3">${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div></section>
 <section class="wrap sec sm"><a class="nextm rv" href="#${nx.id}"><div><small>Next</small><b>${nx.name}</b></div>${ic('arrow')}</a></section>${band()}`};

/* ---------- home ---------- */
const rays=(()=>{let s='';for(let i=0;i<36;i++){const a=i*10*Math.PI/180,r1=122,r2=r1+(i%3===0?64:36);s+=`<path d="M${(200+Math.cos(a)*r1).toFixed(1)} ${(290+Math.sin(a)*r1).toFixed(1)}L${(200+Math.cos(a)*r2).toFixed(1)} ${(290+Math.sin(a)*r2).toFixed(1)}" stroke="#14264A" stroke-opacity="${i%3===0?.28:.16}" stroke-width="1.4" stroke-linecap="round"/>`}return s})();
const STAGES=[['Connect','Link your ads, store and analytics.','7','sources linked','link'],['Decide','ARINE reads the numbers and picks the next move.','12','moves queued','seo'],['Act','Budgets, bids, stock and messages update on their own.','9','actions taken','bolt'],['Learn','Every result feeds the next decision.','+0.4x','ROAS lift','creative']];
const nodes=STAGES.map((s,i)=>{const a=(-90+i*90)*Math.PI/180,x=220+Math.cos(a)*150,y=220+Math.sin(a)*150,ly=i===0?y-38:i===2?y+46:y+4,lx=i===1?x+46:i===3?x-46:x,anch=i===1?'start':i===3?'end':'middle';
 return `<g class="nd${i?'':' on'}"><circle cx="${x}" cy="${y}" r="26"/><g transform="translate(${x-12} ${y-12})">${ICON[s[4]]}</g><text x="${i===1?x+38:i===3?x-38:x}" y="${i===1||i===3?y+5:ly}" style="text-anchor:${anch}">${s[0]}</text></g>`}).join('');
const CITIES=[['Mumbai','Asia/Kolkata'],['New York','America/New_York'],['London','Europe/London'],['Dubai','Asia/Dubai'],['Singapore','Asia/Singapore'],['Sydney','Australia/Sydney'],['Toronto','America/Toronto']];
const TICKS=Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<path class="tick" d="M${(50+Math.sin(a)*40).toFixed(1)} ${(50-Math.cos(a)*40).toFixed(1)}L${(50+Math.sin(a)*(i%3?43:46)).toFixed(1)} ${(50-Math.cos(a)*(i%3?43:46)).toFixed(1)}"/>`}).join('');

/* ---------- new home sections ---------- */
const HALT={"h_tube":"Skincare product tube with water droplets","h_woman":"Shopper carrying fashion brand shopping bags","h_plant":"Plant in a woven basket, home decor","h_cloth":"Apparel on mannequins in a fashion store","h_bags":"Packaged coffee bags from a D2C food brand","h_box":"Customer unboxing a branded e-commerce package","h_ware":"E-commerce warehouse with stacked shipping boxes"};
const HF=[ // [image, left, top, right, bottom, width, aspect, depth, mobile-left, mobile-top, mobile-right, mobile-bottom, mobile-w]
 ['h_tube','20%','15%','','',92,'1/1',18],
 ['h_woman','62%','8%','','',176,'360/250',26],
 ['h_plant','','28%','5%','',92,'300/420',14],
 ['h_cloth','9%','45%','','',96,'1/1',22],
 ['h_bags','24%','','','9%',104,'4/3',30],
 ['h_box','47%','','','7%',108,'4/3',16],
 ['h_ware','','','16%','9%',104,'360/440',24]];
const HERO=`<section class="wrap hero hero2"><div class="hbox" data-hbox>
 ${HF.map((f,i)=>`<figure class="hf f${i+1}" style="${f[1]?`left:${f[1]};`:''}${f[2]?`top:${f[2]};`:''}${f[3]?`right:${f[3]};`:''}${f[4]?`bottom:${f[4]};`:''}--w:${f[5]}px;--ar:${f[6]};--dp:${f[7]};--d:${i}"><img src="${IMG[f[0]]}" alt="${HALT[f[0]]}" decoding="async" width="${f[5]}" height="${Math.round(f[5]/f[6].split('/').reduce((a,b)=>a/b))}" decoding="async"></figure>`).join('')}
 <div class="hk k1" style="--d:0"><i></i><div><small>ROAS</small><b>3.8×</b></div></div><div class="hk k2" style="--d:1"><i></i><div><small>CAC this week</small><b>−27%</b></div></div><div class="hk k3" style="--d:2"><i></i><div><small>Stock alert</small>2 SKUs running low</div></div>
 <div class="hc"><form class="url" id="url-form" novalidate><input id="url" type="text" inputmode="url" autocomplete="url" spellcheck="false" placeholder="Paste website link here" aria-label="Your store link"><button class="go2" type="submit" aria-label="Get started">${ic('arrow')}</button></form>
 <p class="hsup" id="url-msg" role="status" data-def="Connect your first account in minutes.">Connect your first account in minutes.</p></div></div>
 <h1 class="h1 an hl">${H(['Run your D2C growth','on','~autopilot.'])}</h1><p class="hl-s rv" style="--d:3">Ads, creative, CRM, store, SEO and finance, working as one AI system. Start with 200 free credits.</p></section>`;

const VID=[
 {id:'meta',label:'META Automation',title:'ROAS 7X',bd:'#FFC8CB',img:'p_meta'},
 {id:'google',label:'Google Automation',title:'Ranking top',bd:'#C9EEF3',img:'p_google'},
 {id:'crm',label:'CRM Automation',title:'Repeat orders',bd:'#CBEBDD',gen:'crm'},
 {id:'store',label:'Store Automation',title:'Sales on autopilot',bd:'#9BDCE8',img:'p_store'},
 {id:'cfo',label:'Finance Management',title:'Profit, clearly',bd:'#F2E2B1',gen:'cfo'},
 {id:'seo',label:'SEO Automation',title:'Page one',bd:'#DCD3F6',gen:'seo'}];
const VIDSRC={meta:'',google:'',crm:'',store:'',cfo:'',seo:''}; // add a video file URL here to play a real video in the pop-up
const GEN={
 crm:()=>`<div class="gv t-mint"><div class="card sm"><div class="tl"><div><b>Order delivered</b><small>Day 0</small></div><div><b>How's the fit?</b><small>Day 3</small><span class="pill ok">WhatsApp</span></div><div><b>Back in stock</b><small>Day 14</small><span class="pill">Email</span></div></div></div></div>`,
 cfo:()=>`<div class="gv t-sand"><div class="card sm"><div class="card-h">Cash balance<span>8 weeks</span></div>${chart({data:[42,45,41,52,58,55,63,71],labels:['W1','','','W4','','','','W8'],ticks:[40,55,70],min:35,max:75,fmt:v=>'$'+v+'k'})}</div></div>`,
 seo:()=>`<div class="gv t-lav"><div class="card sm">${[['linen shirts men',14,3],['summer shirts india',22,8],['organic cotton tee',9,2]].map(k=>`<div class="kw"><span>${k[0]}</span><span class="mute">${k[1]}</span><b class="pos">${num(k[2],{from:k[1]})}</b></div>`).join('')}</div></div>`};
const REEL=[
 ['meta','Meta Automation','Ads that optimise themselves','Budgets move to the winners every day, and tired creatives are swapped before they cost you.',{v:'−27%',l:'Lower cost per sale'},'p_meta','meta'],
 ['google','Google Automation','Search and Shopping, always tuned','Wasted queries are blocked daily and your product feed fixes itself, so more of your budget reaches buyers.',{v:'−18%',l:'Wasted spend'},'p_google','google'],
 ['creative','Creative Engine','A week of creative in an hour','Hooks, visuals and copy in your brand style, tested automatically, with winners repeated.',{v:'40+',l:'Variations a week'},'','creative'],
 ['crm','CRM','Customers who come back','Live segments and journeys across WhatsApp, email and SMS bring buyers back at the right moment.',{v:'3×',l:'Repeat orders'},'','crm'],
 ['store','Store Management','Stock and orders, handled','Reorder alerts arrive early and listings stay fresh, so you stop losing sales to stock-outs.',{v:'96%',l:'In-stock rate'},'p_store','store'],
 ['seo','SEO Automation','Search growth that compounds','Audits, fixes and content briefs on a steady rhythm, with rankings tracked every week.',{v:'+164%',l:'Organic clicks'},'','seo'],
 ['geo','GEO Automation','Be the answer AI gives','See where AI assistants mention you and make your pages easy to quote.',{v:'4×',l:'More AI citations'},'','geo'],
 ['cfo','Virtual CFO','Profit, clearly','Cash, margins and forecasts reviewed for you, in plain words, every day.',{v:'90 days',l:'Cash forecast'},'','cfo'],
 ['enterprise','Enterprise','Every tool, one dashboard','All of it working together on one set of numbers to grow revenue.',{v:'+34%',l:'Revenue growth'},'','enterprise']];
const CAROUSEL=`<section class="wrap sec sm" data-reel><div class="rl-h"><div><span class="eyebrow rv">The output</span><h2 class="h2 an" style="max-width:15ch">${H(['Watch your growth','~run itself.'])}</h2></div><p class="rv" style="--d:2;color:var(--ink2);margin:0;max-width:34ch">One reel. Every tool. See what you get after connecting ARINE.</p></div>
 <div class="reel rv" style="--d:1"><div class="rl-bar"><span class="dots"><i></i><i></i><i></i></span><b data-rt>${REEL[0][1]}</b><em data-rc>0:00 / 0:${String(REEL.length*6).padStart(2,'0')}</em></div>
  <div class="rl-stage">${REEL.map((r,i)=>`<div class="rs${i?'':' on'}" data-i="${i}"><div class="rs-t"><span class="rs-n">${String(i+1).padStart(2,'0')} / ${String(REEL.length).padStart(2,'0')}</span><h3>${r[2]}</h3><p>${r[3]}</p><div class="rs-s"><b>${r[4].v}</b><span>${r[4].l}</span></div></div><div class="rs-v">${A.VIDSRC&&A.VIDSRC[r[0]]?`<video src="${A.VIDSRC[r[0]]}" muted playsinline loop></video>`:`<div class="an">${VIZ[r[6]]()}</div>`}</div></div>`).join('')}</div>
  <div class="rl-ctl"><button class="rl-pp" data-rpp aria-label="Pause">${ic('play')}</button><div class="rseg">${REEL.map(()=>`<span><i></i></span>`).join('')}</div></div></div>
 <div class="rl-chap">${REEL.map((r,i)=>`<button class="rc${i?'':' on'}" data-go="${i}">${r[5]?`<img src="${IMG[r[5]]}" alt="" loading="lazy" decoding="async">`:`<span class="rc-i">${ic(MODS.find(m=>m.id===r[0]).icon)}</span>`}<span><b>${r[1]}</b><small>${r[4].v} · ${r[4].l}</small></span></button>`).join('')}</div></section>`;

const CALC=`<section class="wrap sec"><span class="eyebrow rv">Calculator</span><h2 class="h2 an" style="max-width:14ch">${H(['See your','growth','~ahead.'])}</h2>
 <div class="calc an" data-calc><div class="cc-l"><div class="cur" data-cur><button class="on" data-c="INR">₹ INR</button><button data-c="USD">$ USD</button></div>
 <div class="cf"><label for="c-rev">Monthly revenue <b data-v="rev"></b></label><input id="c-rev" type="range" min="0" max="100" value="45"></div>
 <div class="cf"><label for="c-ads">Ad spend, share of revenue <b data-v="ads"></b></label><input id="c-ads" type="range" min="5" max="50" value="25"></div>
 <div class="cf"><label for="c-rep">Revenue from repeat customers <b data-v="rep"></b></label><input id="c-rep" type="range" min="5" max="60" value="20"></div></div>
 <div class="cc-r"><small class="mute">Extra revenue with ARINE</small><div class="amt2"><span data-out="extra">0</span><small>a month</small></div>
 <div class="cg"></div><div class="legend"><span><i style="--c:#C2C9D6"></i>Without ARINE</span><span><i style="--c:#0C3341"></i>With ARINE</span></div>
 <div class="rows">${[['Ads','r1'],['Repeat orders','r2'],['Search and AI','r3']].map((r,i)=>`<div class="row" style="--d:${i}"><span class="rl">${r[0]}</span><span class="bar"><i data-bar="${r[1]}" style="--w:0%"></i></span><span class="pill" data-out="${r[1]}">+0</span></div>`).join('')}</div>
 <div class="cc-f"><div><small>Revenue growth</small><b data-out="pct">+0%</b></div><div><small>Added over 12 months</small><b data-out="year">0</b></div></div>
 <p class="fine" style="margin:0">Estimates are based on typical D2C averages. Your results will vary.</p></div></div></section>`;

const WHYR=[['Multiple people coordinating','One connected system'],['Manual research and setup','Strategy supported by data'],['Manual setup and review','Campaign objects created paused for review'],['Manual reporting','Automated reporting'],['Scattered performance context','Connected performance context'],['Calls, chats and scattered updates','One dashboard'],['Hiring more people to scale','Same team, higher output'],['Scattered knowledge','Connected data']];
const WHY=`<section class="wrap sec"><h2 class="h2 an" style="margin-bottom:36px">${H(['Why','ARINE'])}</h2><div class="why"><div class="why-t an"><div class="wh"><span>Traditional approach</span><span>ARINE Meta Automation</span></div>${WHYR.map((r,i)=>`<div class="wr" style="--d:${i}"><span>${ic('x')}${r[0]}</span><span>${ic('check')}${r[1]}</span></div>`).join('')}</div></div></section>`;

const LEAD=`<section class="wrap sec sm" data-contact><div class="band lead an"><div class="sunbg"></div><div class="lead-l"><h2 class="h2">${H(['Ready','when','you are.'])}</h2><p class="rv">Tell us a little. We will reach out.</p><span class="chipw" data-url-chip hidden></span></div>
 <div class="lead-card rv" id="lead-box">${form('lead-form',[{n:'name',l:'Name',req:1,ac:'name'},{n:'org',l:'Organisation name <span class="mute">(if you are a company)</span>',ac:'organization'},{n:'email',l:'Email',t:'email',req:1,ac:'email'},{n:'phone',l:'Phone number',t:'tel',req:1,ac:'tel'}],'Submit')}</div></div></section>`;
A.VID=VID;A.VIDSRC=VIDSRC;


const home=()=>`
${HERO}${CAROUSEL}

<div class="ticker" aria-label="Connects with"><div class="tk-track">${[0,1].map(()=>`<span>Meta Ads</span><span>Google Ads</span><span>GA4</span><span>Search Console</span><span>Shopify</span><span>WooCommerce</span><span>WhatsApp Business</span><span>Merchant Center</span>`).join('')}</div></div>

<section class="wrap sec sm"><span class="eyebrow rv">Overview</span><h2 class="h2 an" style="max-width:16ch;margin-bottom:40px">${H(['One workspace.','Every channel.'])}</h2>
 <div class="dash-wrap"><div class="dash scale" data-scale><div class="d-side"><div class="d-dots"><i></i><i></i><i></i></div>
  <div class="d-it on">${ic('loop')}Overview</div>${MODS.map(m=>`<div class="d-it">${ic(m.icon)}${m.name.replace(' Automation','')}</div>`).join('')}</div>
  <div class="d-main an"><div class="kpis"><div class="kpi"><small>Revenue</small><b>${num(48.2,{dec:1,p:'$',s:'k'})}</b><em>+12%</em></div><div class="kpi"><small>ROAS</small><b>${num(3.8,{dec:1,s:'x'})}</b><em>+0.4</em></div><div class="kpi"><small>Orders</small><b>${num(1284)}</b><em>+9%</em></div></div>
  <div class="d-row"><div class="d-card"><h5>Blended ROAS<span class="mute" style="font-weight:400">8 weeks</span></h5>${chart({data:[2.4,2.5,2.4,2.9,3.1,3.3,3.4,3.8],labels:W8,ticks:[2,3,4],min:1.8,max:4.2,fmt:v=>v+'x'})}</div>
  <div class="d-card"><h5>Today</h5><div class="act">
   <div style="--d:0"><i></i><span>Moved $240 to Lookalike 2%<small>Meta · 09:12</small></span></div>
   <div style="--d:1"><i></i><span>Blocked 6 wasted search terms<small>Google · 08:40</small></span></div>
   <div style="--d:2"><i></i><span>Sent 140 win-back messages<small>CRM · 08:05</small></span></div>
   <div style="--d:3"><i></i><span>Reorder alert: Canvas tote<small>Store · 07:30</small></span></div></div></div></div></div></div>
 ${fine}</div></section>

${CALC}

<section class="story" aria-label="How ARINE works"><div class="wrap story-in"><div>
 <span class="eyebrow">How it works</span><div class="st-wrap">${STAGES.map((s,i)=>`<div class="st${i?'':' on'}"><small>Step ${i+1} of 4</small><h2 class="h2">${s[0]}.</h2><p class="lead" style="margin-top:16px">${s[1]}</p></div>`).join('')}</div>
 <div class="pg">${STAGES.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div></div>
 <div class="story-v"><svg viewBox="0 0 440 440" role="img" aria-label="A four step loop: connect, decide, act, learn"><circle class="ring-b" cx="220" cy="220" r="150"/><circle class="ring-p" cx="220" cy="220" r="150" pathLength="100"/>${nodes}</svg>
 <div class="core">${STAGES.map((s,i)=>`<div class="cr${i?'':' on'}"><b>${s[2]}</b><span>${s[3]}</span></div>`).join('')}</div></div></div></section>

<section class="wrap sec"><div class="hours"><div><span class="eyebrow rv">Time back</span><h2 class="h2 an">${H(['Get your','week back.'])}</h2>
 <div class="big2 rv" style="--d:2"><s>${num(38,{s:'h'})}</s>${num(9,{s:'h'})}<small>a week</small></div></div>
 <div class="card an" style="box-shadow:none;background:var(--paper)">${[['Reporting',12,1],['Budget checks',10,2],['Creative',9,3],['Replies',7,3]].map((r,i)=>`<div class="hr-row"><b>${r[0]}</b><div class="hb"><span class="bar"><i class="g" style="--w:${r[1]/12*100}%;--d:${i}"></i></span>${r[1]}h</div><div class="hb"><span class="bar"><i class="bad" style="--w:${r[2]/12*100}%;--d:${i+1}"></i></span>${r[2]}h</div></div>`).join('')}${fine}</div></div></section>

${WHY}
${LEAD}`;

/* ---------- pricing ---------- */
/* pricing: snapshot of https://development.arineecosystem.com/api/public/pricing (updated 2026-11-04); refreshed live on page load */
A.PRICE_API='https://development.arineecosystem.com/api/public/pricing';
A.PRICE={currency:'INR',updatedAt:'2026-11-04T05:00:30.051Z',
 plans:[{id:'starter',name:'Starter',description:'For a brand starting to test what works.',badge:null,contactSales:false,credits:{base:1500,bonus:0,perMonth:1500},monthly:{price:2999},annual:{price:32989,perMonth:2749,savings:2999}},
  {id:'growth',name:'Growth',description:'For brands running campaigns every week.',badge:null,contactSales:false,credits:{base:5000,bonus:500,perMonth:5500},monthly:{price:9999},annual:{price:109989,perMonth:9166,savings:9999}},
  {id:'scale',name:'Scale',description:'For brands scaling spend across many campaigns.',badge:null,contactSales:false,credits:{base:7500,bonus:1000,perMonth:8500},monthly:{price:14999},annual:{price:164989,perMonth:13749,savings:14999}},
  {id:'enterprise',name:'Enterprise',description:'Custom pricing, credits, billing cycle and features.',badge:null,contactSales:true,credits:{base:0,bonus:0,perMonth:0},monthly:null,annual:null}],
 topUps:[{id:'pack-500',price:1000,credits:500},{id:'pack-1250',price:2500,credits:1250},{id:'pack-2500',price:5000,credits:2500},{id:'pack-5000',price:10000,credits:5000}],
 customTopUp:{minimum:1000,maximum:500000,creditsPerRupee:.5}};
const inr=v=>Math.round(v).toLocaleString('en-IN'),cur=c=>c==='INR'?'₹':(c||'')+' ';
const LOGIN='https://app.arineecosystem.com/login';
const yes=ic('check'),no='<span class="no">—</span>';
const CMP=[['Ad accounts','1','3','10'],['Meta Automation',yes,yes,yes],['Google Automation',yes,yes,yes],['Creative Engine','20 a month','100 a month','Unlimited'],['CRM contacts','2,500','25,000','250,000'],['Store Management',no,yes,yes],['SEO Automation','Basic',yes,yes],['GEO Automation',no,yes,yes],['Virtual CFO',no,'Monthly report',yes],['Support','Email','Priority chat','Dedicated partner']];
const acc=(q,a,x='')=>`<div class="acc ${x}"><button aria-expanded="false">${q}${ic('plus')}</button><div class="acc-b"><div><p>${a}</p></div></div></div>`;
const pricing=()=>{const P=A.PRICE,S=cur(P.currency),pl=P.plans||[],paid=pl.filter(x=>x.monthly),ct=P.customTopUp,
 save=paid.length&&paid.every(x=>x.annual&&x.annual.savings===x.monthly.price)?'1 month free':'Save more',
 cr=x=>x.credits&&x.credits.perMonth?`<div class="pl-cr"><b>${inr(x.credits.perMonth)}</b><span>credits / month</span>${x.credits.bonus?`<em>${inr(x.credits.base)} + ${inr(x.credits.bonus)} bonus</em>`:`<em>${inr(x.credits.base)} base credits</em>`}</div>`:`<div class="pl-cr"><b>Custom</b><span>credits</span><em>Sized to your brands and volume</em></div>`;
 return `<section class="wrap ph"><span class="eyebrow rv">Pricing</span><h1 class="h1 sm an" style="max-width:16ch">${H(['Simple,','credit-based','~pricing.'])}</h1><p class="lead rv" style="--d:3">Start with 200 free credits. Then pick a plan, get monthly credits, and top up whenever you need more. All prices in ${P.currency==='INR'?'Indian rupees':P.currency}.</p>
 <div class="tg rv" style="--d:4" data-tg data-y="0"><i></i><button class="on" data-bill="m">Monthly</button><button data-bill="y">Yearly<em>${save}</em></button></div></section>
<section class="wrap"><div class="plans p4">${pl.map((x,i)=>`<div class="plan rv${x.badge?' pop':''}${x.contactSales?' ent':''}" style="--d:${i}"><div class="nm">${x.name}${x.badge?`<span class="badge">${x.badge}</span>`:''}</div>
 ${x.monthly?`<div class="pr">${S}<span data-price data-inr data-m="${x.monthly.price}" data-y="${x.annual?x.annual.perMonth:x.monthly.price}">${inr(x.monthly.price)}</span><small>/ month</small></div>
 <div class="pl-bill" data-bnote data-m="Billed monthly" data-y="Billed ${S}${x.annual?inr(x.annual.price):''} yearly · save ${S}${x.annual?inr(x.annual.savings):''}">Billed monthly</div>`:`<div class="pr pr-c">Custom</div><div class="pl-bill">Pricing, billing cycle and features built around you</div>`}
 <p>${x.description}</p>${cr(x)}
 ${x.contactSales?`<a class="btn btn-dark" href="#support">Contact sales</a>`:`<a class="btn btn-line" href="${LOGIN}" target="_blank" rel="noopener" data-plan="${x.name}">Choose ${x.name}</a>`}</div>`).join('')}</div>
 <p class="fine" style="text-align:center;margin-top:20px">Prices in ${P.currency}. Yearly plans include one month free. Pricing last updated ${new Date(P.updatedAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}.</p></section>

<section class="wrap sec"><span class="eyebrow rv">Credits</span><h2 class="h2 an" style="max-width:16ch">${H(['Need more?','~Top up','anytime.'])}</h2><p class="rv" style="--d:2;color:var(--ink2);margin:16px 0 36px;max-width:46ch">Add credits to any plan with a pack, or choose your own amount.</p>
 <div class="tu">${(P.topUps||[]).map((t,i)=>`<div class="tu-c rv" style="--d:${i}"><span class="tu-k">Pack ${String(i+1).padStart(2,'0')}</span><b>${inr(t.credits)}</b><span>credits</span><div class="tu-p">${S}${inr(t.price)}</div></div>`).join('')}</div>
 ${ct?`<div class="tu-x rv" data-ctu data-min="${ct.minimum}" data-max="${ct.maximum}" data-rate="${ct.creditsPerRupee}"><div><span class="eyebrow">Custom top-up</span><h3 class="h3" style="margin:12px 0 6px">Choose any amount</h3><p>From ${S}${inr(ct.minimum)} to ${S}${inr(ct.maximum)}. You get ${ct.creditsPerRupee} credits for every rupee.</p></div>
  <div class="tu-in"><label for="ctu-amt">Amount</label><div class="tu-f"><span>${S}</span><input id="ctu-amt" type="number" inputmode="numeric" min="${ct.minimum}" max="${ct.maximum}" step="500" value="${Math.max(ct.minimum,5000)}"></div><input class="range" type="range" min="${ct.minimum}" max="${Math.min(ct.maximum,100000)}" step="500" value="${Math.max(ct.minimum,5000)}" aria-label="Top-up amount"><p class="tu-o">You get <b data-ctu-out>${inr(Math.max(ct.minimum,5000)*ct.creditsPerRupee)}</b> credits</p><p class="tu-e" data-ctu-err></p></div></div>`:''}</section>

<section class="wrap sec"><h2 class="h2 an" style="margin-bottom:36px">${H(['Compare plans.'])}</h2><div class="cmp-w rv"><table class="cmp"><thead><tr><th></th>${pl.map(x=>`<th>${x.name}</th>`).join('')}</tr></thead><tbody>
 ${[['Monthly price',x=>x.monthly?S+inr(x.monthly.price):'Custom'],['Yearly price',x=>x.annual?S+inr(x.annual.price):'Custom'],['Yearly, per month',x=>x.annual?S+inr(x.annual.perMonth):'Custom'],['Yearly savings',x=>x.annual?S+inr(x.annual.savings):'—'],['Base credits / month',x=>x.contactSales?'Custom':inr(x.credits.base)],['Bonus credits / month',x=>x.contactSales?'Custom':x.credits.bonus?'+'+inr(x.credits.bonus):'—'],['Total credits / month',x=>x.contactSales?'Custom':'<b>'+inr(x.credits.perMonth)+'</b>']].map(r=>`<tr><td>${r[0]}</td>${pl.map(x=>`<td>${r[1](x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>

<section class="wrap sec sm"><div class="split" style="align-items:start"><h2 class="h2 an">${H(['Good','questions.'])}</h2><div class="rv">${acc('Is there a free trial?','Instead of a trial, every new account gets 200 free credits to use on any ARINE tool. When they run out, choose a plan or buy a top-up.')}${acc('How does pricing work?','Each plan gives you a set number of credits every month. When you need more, buy a top-up pack or choose a custom amount.')}${acc('How does yearly billing work?',paid.length?`Pay yearly and get one month free. For example, ${paid[1]?paid[1].name:paid[0].name} is ${S}${inr((paid[1]||paid[0]).annual.price)} a year instead of ${S}${inr((paid[1]||paid[0]).monthly.price*12)}.`:'Talk to us about yearly billing.')}${acc('What are bonus credits?','Some plans include bonus credits on top of the base credits, added every month.')}${ct?acc('How do top-ups work?',`Choose a pack or any amount from ${S}${inr(ct.minimum)} to ${S}${inr(ct.maximum)}. Custom top-ups give ${ct.creditsPerRupee} credits per rupee.`):''}${acc('What does Enterprise include?','Custom pricing, credits, billing cycle and features for larger brands and agencies. Contact our team to set it up.')}</div></div></section>${band()}`};

/* ---------- sign up ---------- */
const signup=()=>`<section class="wrap su"><div class="su-l"><div><span class="eyebrow rv">Sign up</span><h1 class="h1 sm an" style="font-size:clamp(34px,4.6vw,54px)">${H(['Create your','~workspace.'])}</h1><p class="lead rv" style="--d:2;margin-top:14px">Start with 200 free credits. Use them on any ARINE tool.</p></div>
 <div class="rv su-cta" style="--d:3"><a class="btn btn-dark" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Claim 200 free credits</a><a class="link" href="#pricing">See plans ${ic('arrow')}</a></div></div></div>
 <div class="su-r"><svg class="sunsvg" viewBox="0 0 400 220" aria-hidden="true"><g clip-path="url(#above2)"><circle cx="200" cy="200" r="120" fill="url(#sg2)"/></g><path d="M-20 200.5H420" stroke="#14264A" stroke-opacity=".25"/><defs><linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B8EA1"/><stop offset="1" stop-color="#A6D6DE"/></linearGradient><clipPath id="above2"><rect x="-20" y="0" width="440" height="200"/></clipPath></defs></svg>
 <ul><li>${ic('check')}200 free credits to start</li><li>${ic('check')}Connect in about 10 minutes</li><li>${ic('check')}Turn tools on one at a time</li><li>${ic('check')}Upgrade when you are ready</li></ul></div></section>`;

/* ---------- help centre ---------- */
const HELP=[
 {id:'start',t:'Getting started',ic:'bolt',tint:'sky',d:'Create your account, claim your free credits and set up your workspace.',g:[
  ['Create your ARINE account','Go to app.arineecosystem.com and sign up with your work email.|Verify your email address.|Add your brand name, website and main market.|Your 200 free credits are added to your account automatically.'],
  ['Set up your workspace','Add your brand kit: logo, colours, fonts and tone of voice.|Invite team members and choose what each person can see and do.|Set your goals, such as target ROAS, CAC or monthly revenue.'],
  ['Choose which tools to turn on','You do not need every tool on day one.|Start with the channel that matters most, for example Meta or Google.|Add CRM, store, SEO, GEO and finance tools when you are ready.']]},
 {id:'connect',t:'Connecting your accounts',ic:'link',tint:'mint',d:'Link Meta, Google, your store and your messaging channels.',g:[
  ['Connect your Meta ad account','Open Settings, then Connections.|Choose Meta and sign in with the Facebook account that manages your Business Manager.|Select the ad account, page and pixel you want ARINE to use.|Approve the requested permissions. You can disconnect at any time.'],
  ['Connect Google Ads and Merchant Center','Open Settings, then Connections, and choose Google.|Sign in with the Google account that has access to your Google Ads account.|Select your Google Ads account and, for Shopping, your Merchant Center account.'],
  ['Connect Shopify or WooCommerce','Open Settings, then Connections, and choose your store platform.|For Shopify, approve the ARINE app on your store.|For WooCommerce, follow the on-screen steps to add your store URL and keys.|Products, orders and customers sync automatically after connecting.']]},
 {id:'credits',t:'Credits and billing',ic:'coin',tint:'sand',d:'How credits work, plans, top-ups and invoices.',g:[
  ['How credits work','Every new account starts with 200 free credits.|Paid plans add a set number of credits every month, and some include bonus credits.|Credits are used when ARINE runs tasks for you across its tools.|You can see your balance and usage in Billing at any time.'],
  ['Buy more credits','Open Billing and choose Top up.|Pick a credit pack or enter a custom amount.|Credits are added to your balance once the payment is confirmed.'],
  ['Change or cancel your plan','Open Settings, then Billing.|Choose a new plan to upgrade or downgrade.|To cancel, choose Cancel plan. See our Refund and Cancellation policy for details.']]},
 {id:'ads',t:'Meta and Google automation',ic:'meta',tint:'peach',d:'Launch, optimise and report on your ad campaigns.',g:[
  ['Launch your first campaign','Pick a product and a goal, such as sales or leads.|Review the research, audiences and budget that ARINE suggests.|Review the ads, then approve to publish.'],
  ['Set guardrails and approvals','Open the campaign settings and set daily and total budget limits.|Choose whether ARINE acts automatically or suggests changes for your approval.|You can switch any tool to suggest-only at any time.'],
  ['Read your performance report','Open Reports to see spend, ROAS, CAC and results by campaign.|Use the date filter to compare periods.|Export any report as a PDF or spreadsheet.']]},
 {id:'growth',t:'Creative, CRM and store',ic:'creative',tint:'lav',d:'Create ads, run customer journeys and manage your store.',g:[
  ['Create ad creatives','Open Creative Engine and choose a product.|Pick an angle or let ARINE suggest hooks.|Review the variations and approve the ones you want to use.'],
  ['Start a customer journey','Open CRM and choose Journeys.|Pick a template, such as welcome, abandoned cart or win-back.|Review the messages and turn the journey on.'],
  ['Set reorder alerts','Open Store and choose Inventory.|Add reorder points and supplier lead times for your products.|ARINE alerts you before stock runs out.']]},
 {id:'search',t:'SEO, GEO and finance',ic:'seo',tint:'aqua',d:'Grow search traffic, AI visibility and keep your numbers clear.',g:[
  ['Run a site audit','Open SEO and choose Audit.|Connect Google Search Console for the best results.|Review the issues by priority and approve fixes.'],
  ['Track AI answers with GEO','Open GEO and add your brand, products and competitors.|ARINE checks how AI assistants answer questions in your category.|Review suggested page changes before they go live.'],
  ['Get your monthly finance report','Open Virtual CFO and connect your bank, books and store.|Your report is prepared each month in plain words.|Use the cash forecast to plan budgets and stock.']]},
 {id:'account',t:'Account, data and security',ic:'shield',tint:'rose',d:'Team access, privacy and data deletion.',g:[
  ['Manage your team','Open Settings, then Team.|Invite people by email and choose their role.|Remove access at any time.'],
  ['Disconnect an account','Open Settings, then Connections.|Choose the account and select Disconnect.|Stored access tokens for that connection are revoked and deleted.'],
  ['Delete your data','You can request deletion of your data at any time.|See our Data Deletion policy for the steps and timelines.']]}];
const TUT=[['Your first 10 minutes on ARINE','Sign up, claim 200 free credits and connect your first channel.','start'],['Launch a Meta campaign with ARINE','From product to approved ads, step by step.','ads'],['Fix your Google Shopping feed','Find and fix disapproved products.','connect'],['Build an abandoned-cart journey','Win back shoppers on WhatsApp and email.','growth'],['Run your first SEO audit','Find and fix the issues that matter most.','search'],['Understand your credits','Plans, bonus credits and top-ups explained.','credits']];
const HFAQ=[['What is ARINE?','ARINE is an AI growth operating system for D2C and e-commerce brands. It brings Meta and Google ads, creative, CRM, store management, SEO, GEO and finance into one dashboard.'],['How many free credits do I get?','Every new account gets 200 free credits to try any ARINE tool.'],['Do I need a card to sign up?','You can sign up and use your free credits first. You only add payment details when you choose a plan or buy a top-up.'],['Which stores and ad platforms do you support?','Shopify and WooCommerce stores, Meta ads and Google Ads, with more on the way.'],['Will ARINE change my budgets without asking?','Only inside the limits you set. You can switch any tool to suggest-only.'],['Is my data safe?','ARINE only uses the data you connect, and you can disconnect or request deletion at any time. See our Privacy Policy.'],['How do I contact support?','Use Chat with us on the Support page. We reply within 24 hours on working days.']];
const help=()=>`<section class="wrap ph2"><span class="eyebrow rv">Help Centre</span><h1 class="h1 sm an" style="max-width:14ch">${H(['Guides, tutorials','and','~answers.'])}</h1><p class="lead rv" style="--d:3">Everything you need to set up ARINE, connect your accounts and get results.</p>
 <div class="srch rv" style="--d:4">${ic('search')}<input id="hq" type="search" placeholder="Search guides and FAQs" aria-label="Search the Help Centre"></div></section>
<section class="wrap sec sm" style="padding-top:0"><div class="tiles3 hc-cat">${HELP.map((c,i)=>`<a class="bt tint t-${c.tint} rv" style="--d:${i%3}" href="#help" data-to="#h-${c.id}"><span class="ico-t">${ic(c.ic)}</span><h2 class="h3" style="margin-top:18px">${c.t}</h2><p>${c.d}</p><small class="hc-n">${c.g.length} guides</small></a>`).join('')}</div></section>
<section class="wrap sec sm" id="h-guides"><span class="eyebrow rv">Guides</span><h2 class="h2 an" style="margin-bottom:28px">${H(['Step-by-step','~guides.'])}</h2>
 ${HELP.map(c=>`<div class="hc-g" id="h-${c.id}" data-hs><h3 class="hc-h">${ic(c.ic)}${c.t}</h3>${c.g.map(g=>`<div class="acc" data-hs-i><button aria-expanded="false">${g[0]}${ic('plus')}</button><div class="acc-b"><div><ol class="hc-ol">${g[1].split('|').map(s=>`<li>${s}</li>`).join('')}</ol></div></div></div>`).join('')}</div>`).join('')}
 <p class="empty" id="hq-none">Nothing found. <a href="#support" data-to="#contact">Send us your query</a>.</p></section>
<section class="wrap sec sm"><span class="eyebrow rv">Tutorials</span><h2 class="h2 an" style="margin-bottom:28px">${H(['Learn by','~doing.'])}</h2>
 <div class="tiles3">${TUT.map((t,i)=>{const c=HELP.find(x=>x.id===t[2]);return `<a class="bt tint t-${c.tint} rv hc-t" style="--d:${i%3}" href="#help" data-to="#h-${c.id}"><span class="hc-k">Tutorial ${String(i+1).padStart(2,'0')}</span><h3 class="h3">${t[0]}</h3><p>${t[1]}</p><span class="link">Open guide ${ic('arrow')}</span></a>`}).join('')}</div></section>
<section class="wrap sec sm"><div class="split" style="align-items:start"><div><span class="eyebrow rv">FAQs</span><h2 class="h2 an">${H(['Frequently asked','~questions.'])}</h2></div><div class="rv" id="hfaq">${HFAQ.map(f=>`<div data-hs-i class="hfi">${acc(f[0],f[1])}</div>`).join('')}</div></div></section>
<section class="wrap sec sm"><div class="band an"><div class="sunbg"></div><h2 class="h2">${H(['Still need','help?'])}</h2><p class="rv">Send us your query. We reply within 24 hours on working days.</p><div class="rv" style="--d:1"><a class="btn btn-white" href="#support" data-to="#contact">Chat with us</a></div></div></section>`;
/* ---------- resources ---------- */
const about=()=>`<section class="wrap ph2"><span class="eyebrow rv">About us</span><h1 class="h1 sm an" style="max-width:16ch">${H(['Building the operating system for','~D2C','growth.'])}</h1><p class="lead rv" style="--d:4">We believe growing an e-commerce business shouldn't mean managing hundreds of tasks, tools and disconnected systems.</p><p class="rv" style="--d:5;margin:0;color:var(--ink2);max-width:58ch">ARINE brings research, marketing, operations, analytics and business intelligence together into one ecosystem, helping founders spend less time managing and more time growing.</p></section>

<section class="wrap sec sm"><div class="split" style="align-items:start"><div><span class="eyebrow rv">Our story</span><h2 class="h2 an">${H(['We saw a problem.','So we built a','~solution.'])}</h2></div>
 <div class="rv" style="display:grid;gap:16px;color:var(--ink2)"><p style="margin:0">After working with 150+ D2C brands and managing 1,500+ marketing campaigns, from emerging startups to enterprise e-commerce businesses, we started noticing a pattern.</p><p style="margin:0">Many promising brands reached a certain stage and struggled to grow further. Some early-stage D2C businesses even struggled to survive their first 6 to 8 months.</p><p style="margin:0">The problem wasn't always the product. It wasn't necessarily the market or the audience. The problem was the absence of a system.</p></div></div></section>

<section class="wrap sec sm"><div class="tiles3">${[[150,'+','D2C brands','Worked with, from startups to enterprise.','sky'],[1500,'+','Marketing campaigns','Managed across those brands.','peach'],[1,'','Connected system','The missing piece we set out to build.','mint']].map((t,i)=>`<div class="bt tint t-${t[4]} rv" style="--d:${i}"><b class="n">${num(t[0],{s:t[1]})}</b><h3 class="h3">${t[2]}</h3><p>${t[3]}</p></div>`).join('')}</div></section>

<section class="wrap sec sm"><div class="split" style="align-items:start"><div><span class="eyebrow rv">The pattern</span><h2 class="h2 an">${H(['Founders were stuck in','repetitive','~work.'])}</h2><p class="rv" style="--d:3;color:var(--ink2);margin:18px 0 0;max-width:44ch">In the middle of all this, something important was getting neglected: the founder's ability to understand the business, analyse performance and make the right decisions.</p></div>
 <div><div class="mk an">${['Managing marketing campaigns and advertising','Handling operations and customer relationships','Finding and managing the right people','Tracking finances and business performance','Switching between multiple software and reporting tools','Coordinating different teams and business functions'].map((c,i)=>`<span style="--d:${i}">${c}</span>`).join('')}</div>
 <p class="rv" style="margin:28px 0 0;color:var(--ink2)">Businesses didn't just need another tool to perform individual tasks. They needed an integrated system that could connect different functions, understand business performance and help them make better decisions. That's where ARINE began.</p></div></div></section>

<section class="wrap sec"><span class="eyebrow rv">What we are building</span><h2 class="h2 an" style="max-width:18ch">${H(['Meet ARINE. Your D2C Growth','~Operating','System.'])}</h2>
 <p class="lead rv" style="--d:3;margin-top:18px;max-width:52ch">ARINE is built to work alongside your business, from understanding your market and products to executing growth strategies, monitoring performance and identifying opportunities. One platform. One source of truth. One system to grow.</p>
 <div class="tiles3" style="margin-top:44px">${[['Research','Markets, products and competitors.','search','sky'],['Plan and execute','Marketing strategies, from idea to launch.','brief','peach'],['Automate','Advertising and repetitive workflows.','bolt','sun'],['Monitor','Sales, performance and business metrics.','seo','mint'],['Understand customers','Behaviour and funnel performance.','crm','lav'],['Find opportunities','Spot them and recommend improvements.','creative','aqua']].map((t,i)=>`<div class="bt tint t-${t[3]} rv" style="--d:${i%3}"><span class="ico-t">${ic(t[2])}</span><h3 class="h3" style="margin-top:18px">${t[0]}</h3><p>${t[1]}</p></div>`).join('')}</div>
 <p class="rv" style="margin:28px 0 0;color:var(--ink2);max-width:60ch">Instead of switching between fragmented tools and manually compiling reports, founders get a connected view of their business and actionable insights to move forward.</p></section>

<section class="wrap sec sm"><span class="eyebrow rv">Our philosophy</span><h2 class="h2 an" style="max-width:20ch">${H(['Founders should focus on decisions, not','~repetitive','tasks.'])}</h2>
 <p class="rv" style="--d:3;color:var(--ink2);margin:18px 0 36px;max-width:58ch">We believe technology should simplify business, not make it more complicated. A founder shouldn't have to spend hours collecting numbers, switching dashboards or coordinating repetitive activities just to understand what's happening in their business.</p>
 <div class="cstps">${[['Automate','The repetitive.','bolt','sky'],['Understand','The numbers.','seo','sun'],['Improve','The decisions.','check','mint'],['Grow','The business.','loop','peach']].map((s,i)=>`<div class="cs t-${s[3]} rv" style="--d:${i}">${ic(s[2])}<div><h3 class="h3">${s[0]}</h3><p>${s[1]}</p></div></div>`).join('')}</div>
 <p class="rv" style="margin:28px 0 0;color:var(--ink2);max-width:58ch">We want to give founders the infrastructure, intelligence and automation they need to build sustainable businesses.</p></section>

<section class="wrap sec"><div class="split" style="align-items:start"><div><span class="eyebrow rv">Our journey</span><h2 class="h2 an">${H(['From experience to an','~ecosystem.'])}</h2></div>
 <div class="card an"><div class="tl">
  <div><b>The Beginning</b><small>September 2025</small><br><small>ARINE began with a vision to solve the operational and growth challenges faced by D2C businesses.</small></div>
  <div><b>Understanding the Gaps</b><br><small>Our experience across 150+ D2C brands and 1,500+ campaigns helped us identify the challenges that prevent businesses from scaling efficiently.</small></div>
  <div><b>Building the Ecosystem</b><br><small>We started developing an integrated growth platform, beginning with marketing automation and expanding towards a connected business operating system.</small></div>
  <div><b>Growing Together</b><br><small>Today, we work shoulder to shoulder with e-commerce businesses, building technology that helps them simplify operations and make better growth decisions.</small></div></div></div></div></section>

<section class="wrap sec sm"><div class="split" style="align-items:start"><div class="note rv"><p>We don't just want to help businesses run. We want to build the infrastructure that helps them grow.</p><div class="sig"><i></i><span><b>Aarush Chotaliya</b>Founder, ARINE Ecosystem</span></div><small class="mute" style="font-size:13px">Also from DENQ Digital, an ecommerce and marketplace growth agency (<a href="https://denqdigital.com" target="_blank" rel="noopener" style="text-decoration:underline">denqdigital.com</a>)</small></div>
 <div class="rv" style="display:grid;gap:14px;color:var(--ink2)"><span class="eyebrow" style="margin-bottom:0">A message from the founder</span><p style="margin:0">Hi, I'm Aarush, the founder of ARINE Ecosystem. I have spent most of my professional journey understanding D2C businesses, e-commerce marketing and what actually drives growth.</p><p style="margin:0">Having worked on more than 1,500 marketing campaigns and alongside 150+ D2C brands, I've experienced the challenges businesses face at different stages of growth. One thing became increasingly clear to me: businesses don't struggle only because of a lack of marketing or resources. They struggle because everything operates in silos.</p><p style="margin:0">I started ARINE with the intention of changing that. I wanted to build something that goes beyond automating individual tasks: a system that understands how a business operates, connects its data, helps identify opportunities and makes decision-making easier.</p><p style="margin:0">We are still building, learning and improving every day. And our vision remains the same: to stand alongside D2C founders as a technology and growth partner.</p></div></div></section>

<section class="wrap sec"><span class="eyebrow rv">Our vision</span><h2 class="h2 an" style="max-width:20ch">${H(['An ecosystem for every e-commerce business that plans to','~grow.'])}</h2>
 <p class="lead rv" style="--d:3;margin-top:20px;max-width:58ch">We envision a future where businesses don't need dozens of disconnected tools and manual processes to operate. Where technology understands the business, automation handles repetitive work, and founders have the clarity to make better decisions.</p>
 <p class="rv" style="--d:4;margin:18px 0 0;font:600 18px var(--f-head);letter-spacing:-.01em">Infrastructure built for those who plan to grow.</p></section>
<section class="wrap sec sm"><a class="nextm rv" href="#careers"><div><small>Come build with us</small><b>Careers</b></div>${ic('arrow')}</a></section>`;

const EVENTS=[
 ['03','Dec','D2C Growth Evening','Mumbai','In person','7:00 PM IST','An evening of short talks and open questions.','peach'],
 ['11','Dec','Meta Ads Clinic','Online','Online','4:00 PM IST','Bring an account. Leave with a plan.','sky'],
 ['21','Jan','Selling into the UAE','Dubai','In person','6:30 PM GST','What works for D2C brands in the Gulf.','sun'],
 ['09','Feb','GEO 101','Online','Online','5:00 PM IST','How AI assistants choose which brands to quote.','rose'],
 ['26','Feb','Cross-border D2C Roundtable','Singapore','In person','6:00 PM SGT','A small table of founders, no slides.','mint'],
 ['18','Mar','Creative Engine Live','Online','Online','3:00 PM IST','Watch a week of creative made in an hour.','lav']];
const events=()=>`<section class="wrap ph2"><span class="eyebrow rv">Events</span><h1 class="h1 sm an" style="max-width:12ch">${H(['Come say','~hello.'])}</h1><p class="lead rv" style="--d:2">Workshops, clinics and small dinners.</p></section>
<section class="wrap sec sm" style="padding-top:0"><div class="fl-c rv" data-evf>${['All','In person','Online'].map((f,i)=>`<button class="fc2${i?'':' on'}" data-f="${f}">${f}</button>`).join('')}</div>
 <div style="margin-top:28px">${EVENTS.map((e,i)=>`<div class="ev t-${e[7]} rv" style="--d:${i%3}" data-type="${e[4]}"><div class="d"><small>${e[1]}</small><b>${e[0]}</b></div><div><h2 class="h3">${e[2]}</h2><p><span>${ic('pin')}${e[3]}</span><span>${ic('cal')}${e[5]}</span></p><p style="margin-top:6px">${e[6]}</p></div><button class="btn btn-line sm" data-save>Save a seat</button></div>`).join('')}</div></section>`;

const JD=[
 {t:'Full-stack Software Developer',d:'Engineering',loc:'Mumbai · Hybrid or Remote',type:'Full-time',exp:'3+ years',
  about:'Build the platform that connects ad accounts, stores, CRMs and inboxes into one automated growth system for D2C brands.',
  do:['Design and build features across the web app, APIs and background jobs.','Integrate Meta, Google, Shopify, WooCommerce and WhatsApp APIs.','Own services end to end: build, test, ship, monitor.','Work with product and design to turn ideas into simple, fast interfaces.','Keep the codebase secure, tested and easy to change.'],
  need:['3+ years building production web apps with React or Next.js and Node.js or Python.','Strong SQL and API design skills (REST, webhooks, queues).','Experience with cloud hosting, CI/CD and monitoring.','Clear written communication and a habit of finishing what you start.'],
  nice:['Experience with ad-tech, e-commerce or marketing platforms.','Experience with LLM or automation workflows.','Early-stage or SaaS product experience.']},
 {t:'Performance Marketing Expert, D2C',d:'Growth',loc:'Mumbai · Remote India',type:'Full-time',exp:'3+ years',
  about:'Run and shape the playbooks that ARINE automates. You will manage paid growth for D2C brands and help turn what works into product.',
  do:['Plan, launch and optimise Meta and Google campaigns for D2C and e-commerce brands.','Own CAC, ROAS and contribution margin targets across accounts.','Run creative testing and report on what wins and why.','Build dashboards, weekly reviews and clear client updates.','Work with the product team to turn winning playbooks into automations.'],
  need:['3+ years managing Meta and Google Ads for D2C or e-commerce brands.','Proven results with budgets of ₹5 lakh+ a month or equivalent.','Strong in GA4, Shopify analytics and unit economics.','Clear communicator who can explain results to founders.'],
  nice:['Experience with CRO, email or WhatsApp marketing.','Experience with international markets (UAE, UK, USA, Singapore).','Familiarity with marketing automation tools.']},
 {t:'Sales Expert, SaaS',d:'Sales',loc:'Mumbai · Remote India',type:'Full-time',exp:'2+ years',
  about:'Bring ARINE to D2C founders, growth teams and agencies. You will own the journey from first conversation to signed customer.',
  do:['Find, qualify and speak with D2C brands, agencies and e-commerce teams.','Run product demos and discovery calls focused on business outcomes.','Own the pipeline in the CRM and forecast monthly revenue.','Work with marketing and product on feedback, pricing and positioning.','Support onboarding so customers get a win in week one.'],
  need:['2+ years selling SaaS or digital services, ideally to e-commerce or marketing buyers.','Track record of meeting or beating targets.','Excellent English communication, spoken and written.','Comfortable with outbound, demos and follow-up.'],
  nice:['Experience selling marketing, ad-tech or e-commerce tools.','Experience with HubSpot or a similar CRM.','Network among D2C founders or agencies.']},
 {t:'SaaS UI/UX Developer',d:'Design',loc:'Mumbai · Hybrid or Remote',type:'Full-time',exp:'2+ years',
  about:'Design and build calm, clear interfaces for complex automation. You will shape how brands see and control their growth system.',
  do:['Design and prototype dashboards, flows and settings in Figma.','Build polished, accessible interfaces in React and CSS.','Create and maintain a consistent design system.','Run quick usability tests and improve what you learn.','Work closely with engineers to ship fast and keep quality high.'],
  need:['2+ years designing and building SaaS or dashboard products.','Strong Figma skills and a portfolio of shipped work.','Hands-on front-end skills: HTML, CSS and React or similar.','Good eye for typography, spacing, motion and data visualisation.'],
  nice:['Experience with data-heavy dashboards or charts.','Experience with design tokens and component libraries.','Basic motion design skills.']}];
const ROLES=JD;
const careers=()=>`<section class="wrap ph2"><span class="eyebrow rv">Careers</span><h1 class="h1 sm an" style="max-width:15ch">${H(['A small team doing','~careful','work.'])}</h1><p class="lead rv" style="--d:3">Four open roles. Real ownership from day one.</p></section>
<section class="wrap sec sm"><div class="perks">${[['Small team','Everyone ships','crm','sky'],['Ownership','Your area, your call','bolt','sun'],['Learning budget','Books, courses, travel','book','mint'],['Flexible hours','Results over clocks','loop','lav']].map((p,i)=>`<div class="bt tint t-${p[3]} rv" style="--d:${i};padding:24px"><span class="ico-t">${ic(p[2])}</span><h2 class="h3" style="margin-top:18px">${p[0]}</h2><p>${p[1]}</p></div>`).join('')}</div></section>
<section class="wrap sec sm"><div class="fl-c rv" data-rf>${['All','Engineering','Growth','Sales','Design'].map((f,i)=>`<button class="fc2${i?'':' on'}" data-f="${f}">${f}</button>`).join('')}</div>
 <div style="margin-top:24px">${JD.map(r=>`<div class="acc rv" data-dept="${r.d}"><button class="rl-h" aria-expanded="false"><span><b>${r.t}</b><small>${r.d} · ${r.loc} · ${r.type}</small></span>${ic('plus')}</button><div class="acc-b"><div class="jd"><p>${r.about}</p><div class="jd-m"><span>${ic('brief')}${r.exp} experience</span><span>${ic('pin')}${r.loc}</span></div>
  <h3>What you will do</h3><ul>${r.do.map(x=>`<li>${x}</li>`).join('')}</ul><h3>What you bring</h3><ul>${r.need.map(x=>`<li>${x}</li>`).join('')}</ul><h3>Nice to have</h3><ul>${r.nice.map(x=>`<li>${x}</li>`).join('')}</ul>
  <a class="btn btn-dark sm" href="#careers" data-apply="${r.t}" style="margin-top:8px">Apply for this role</a></div></div></div>`).join('')}</div></section>
<section class="wrap sec sm" id="apply-job"><div class="apply"><div><span class="eyebrow rv">Apply</span><h2 class="h2 an">${H(['Join the','~team.'])}</h2><p class="lead rv" style="--d:2;margin-top:14px">Share a few details and your resume. We read every application and reply to shortlisted candidates.</p></div>
 <div class="rv" id="job-box">${form('job-form',[{n:'name',l:'Full name',req:1,ac:'name'},{n:'email',l:'Email',t:'email',req:1,ac:'email'},{n:'phone',l:'Phone number',t:'tel',req:1,ac:'tel'},{n:'role',l:'Role applying for',t:'select',o:JD.map(r=>r.t)},{n:'experience',l:'Years of experience',req:1,ph:'e.g. 4'},{n:'location',l:'Current location',req:1,ac:'address-level2'},{n:'link',l:'LinkedIn or portfolio link <span class="mute">(optional)</span>',t:'url',ac:'url'},{n:'resume',l:'Resume <span class="mute">(PDF or Word, up to 5 MB)</span>',t:'file',req:1},{n:'note',l:'Anything you would like us to know <span class="mute">(optional)</span>',t:'area'}],'Submit application')}</div></div></section>`;

const POL={
 Privacy:[
  ['Who we are and what this policy covers','Arine Ecosystem Pvt Ltd ("Arine") is the controller of account, billing and website data. For store, campaign and customer data you connect to Arine, we act as a processor or service provider on your behalf.'],
  ['Data we collect and why','We collect Google sign-in details; Meta account and campaign data, Facebook Page and Instagram identifiers and Meta access tokens; Shopify and WooCommerce store data; content you upload or generate; billing data handled through PayU; usage logs; and the messages you send to support. We use this data to run the service you ask for. We do not sell personal information or Meta Platform Data, and we do not use customer content or Meta data to train our own general-purpose AI models.'],
  ['Facebook and Meta integration','Campaigns created by Arine are created paused. You control activation and spend. The pages_read_engagement permission is used only for Page identity and engagement context.'],
  ['Service providers and connected platforms','We rely on hosting and infrastructure providers, Cloudflare, Apify, Pollinations and OpenRouter, PayU for payments, and the platforms you connect: Google, Meta, and Shopify or WooCommerce.'],
  ['How long we keep data','We keep data only as long as needed for the purposes above. Logs are normally kept for up to 90 days, financial records for up to 8 years, and backups for up to 90 days.'],
  ['Your choices and rights','You can ask to access, correct, export, restrict or object to our use of your data, to delete it, or to withdraw your consent. Email arine.soem@gmail.com with the subject "Privacy Request."'],
  ['Legal bases, security and children','We process data to provide the service, under contract, with your consent, and for legitimate business and legal reasons. Data is protected in transit with HTTPS and access tokens are encrypted. Arine is intended for people aged 18 and over.'],
  ['Changes and contact','We will post updates here with a revised "Last updated" date. For questions, contact arine.soem@gmail.com.']],
 Terms:[
  ['The service','Arine helps you plan, create and manage ad campaigns, including Meta ads, and can connect to your Shopify or WooCommerce store. You must be 18 or older and authorized to act for your business.'],
  ['Accounts and connected services','You are responsible for your login and everything done under it. Connect only accounts you own or are authorized to manage. Meta, Google and store features remain subject to those providers\' own terms.'],
  ['Meta campaigns','Arine creates campaigns paused. You decide whether to activate them and set the budgets, and you bear the ad spend. Review everything before activation. Arine does not guarantee ad approval or results.'],
  ['Credits, payments and refunds','Paid plans include credits. Credits have no cash value and expire. One credit buys one unit of eligible processing, and some actions use several units. Credits are restored for verified failed generations. Used credits and ad spend are generally non-refundable.'],
  ['Content and output','You keep ownership of your content and may use generated output for lawful business purposes. AI output can be inaccurate and may not be copyrightable, so review it before you use it.'],
  ['Acceptable use','Do not use Arine for illegal, deceptive, discriminatory or prohibited ads, for scraping, for bypassing security, or to access accounts without authorization. We may suspend access or remove content to protect users or to enforce these terms.'],
  ['Cancellation and closure','You can cancel a paid plan before renewal and keep access until the end of the paid period. Disconnecting Meta revokes and deletes the stored token. Closing your account triggers data deletion, except for records we must keep by law.'],
  ['Intellectual property','Arine owns the service, software, brand and documentation.'],
  ['Disclaimers','The service and AI output are provided "as is" and "as available." Output is not legal, tax or financial advice.'],
  ['Liability and indemnity','Arine excludes indirect and consequential damages, and its total liability is capped at the amount you paid in the previous 12 months. You indemnify Arine against third-party claims arising from your content, campaigns or violations of these terms.'],
  ['Governing law and changes','Indian law applies, with exclusive jurisdiction in the courts of Mumbai, subject to mandatory consumer rights. We may update these terms, and continued use means you accept them. Contact: arine.soem@gmail.com.']],
 'Data deletion':[
  ['Delete your Arine account and data','No sign-in is needed and requests are free. Email arine.soem@gmail.com with the subject "Data Deletion Request," your registered email and your business or account name. Please do not send passwords, payment card details or Meta access tokens.'],
  ['Disconnect Meta only','Disconnecting Meta revokes and deletes the stored Meta access token. It does not delete your full account, campaign records or store data.'],
  ['What we delete','Account and profile data, brand data, Shopify or WooCommerce data and tokens, Meta data, uploaded and generated images, and chats and campaign content.'],
  ['Timing and records we must retain','Once we verify your request, covered data is removed from active systems within 30 days. Backups may persist for up to 90 days. Invoices, payment, tax and compliance records may be kept for up to 8 years, or longer if the law requires.']],
 Refunds:[
  ['7-day guarantee','First-time subscribers on monthly or annual plans can request a full refund within 7 days of their first paid purchase.'],
  ['Cancelling','Cancel in your dashboard under Settings and Billing, then Subscription Management. Cancelling stops automatic renewals. Your workflows and integrations stay active until the end of the current billing period.'],
  ['Refund eligibility','Renewals from day 8 onward are non-refundable. Annual plans cancelled within 14 days receive a full refund minus one month\'s standard fee. Downtime beyond the 2-hour SLA breach qualifies for pro-rated credits or a refund. WhatsApp and SMS API overages that have already been sent are non-refundable.'],
  ['Refund timelines','Refunds go to the original payment method only. International cards take 5 to 10 business days, UPI 24 to 48 hours, netbanking and cards 5 to 7 business days, and cross-border transactions 5 to 7 business days.'],
  ['How to request a refund','Email billing support with your account email, invoice ID and the reason. Please contact support before filing a chargeback. Unjustified chargebacks may lead to account termination.']],
 Cookies:[
  ['What are cookies?','Cookies are small files stored on your device that help a site work, stay secure and remember your choices.'],
  ['Strictly necessary and authentication cookies','These keep you signed in and the service secure. The service cannot work without them.'],
  ['Payment and fraud prevention cookies','Our payment providers (Stripe, Razorpay and Dodo) set cookies to process payments and to detect fraud.'],
  ['Analytics and performance cookies','These help us understand how the site is used so we can improve it.'],
  ['Preferences and functional cookies','These remember settings such as your preferences.'],
  ['How to control and opt out of cookies','You can control cookies in your browser settings, including Chrome, Firefox and Safari. A Google Analytics opt-out add-on is also available. Blocking essential or payment cookies may prevent you from logging in or cause billing failures.']]};
const POLT={Privacy:'Privacy Policy',Terms:'Terms of Service','Data deletion':'Data Deletion',Refunds:'Refund and Cancellation',Cookies:'Cookie Policy'};
const POLD={Privacy:'Arine Ecosystem Pvt Ltd · Last updated September 20, 2026',Terms:'Arine Ecosystem Pvt Ltd · Last updated September 20, 2026','Data deletion':'Last updated September 20, 2026',Refunds:'Arine Ecosystem Pvt Ltd',Cookies:'Arine Ecosystem Pvt Ltd'};
A.POLT=POLT;A.POLD=POLD;

const policy=()=>`<section class="wrap ph2"><span class="eyebrow rv">Policy</span><h1 class="h1 sm an">${H(['Clear','~terms.'])}</h1></section>
<section class="wrap sec sm" style="padding-top:0"><div class="pol"><div class="pol-nav rv">${Object.keys(POL).map((k,i)=>`<button class="${k===(state.pol||'Privacy')?'on':''}" data-pol="${k}">${k}</button>`).join('')}</div><div class="pol-c" id="pol-c"></div></div></section>`;
A.POL=POL;

const FAQ=[['How do I connect my ad accounts?','Open Settings, choose Connections, and sign in to Meta or Google. It takes a few minutes.'],['Will ARINE change my budgets without asking?','Only inside the limits you set. You can also switch any tool to suggest-only.'],['Which stores do you support?','Shopify and WooCommerce today. More are on the way.'],['Can I use ARINE with my agency?','Yes. Invite your agency as a team member with the access you choose.'],['How are creatives made?','From your brand kit and product feed. You approve before anything goes live.'],['What is GEO?','Generative engine optimisation. It helps AI assistants find and quote your brand.'],['Can I export my reports?','Yes. Export any report as a PDF or spreadsheet.'],['How do I cancel?','Settings, Billing, Cancel. No forms, no calls.']];
const support=()=>`<section class="wrap ph2"><span class="eyebrow rv">Support</span><h1 class="h1 sm an" style="max-width:12ch">${H(['How can we','~help?'])}</h1>
 <div class="srch rv" style="--d:3">${ic('search')}<input id="sq" type="search" placeholder="Search help" aria-label="Search help"></div></section>
<section class="wrap sec sm" style="padding-top:0"><div class="chn">${[['Chat with us','Send us your query. We reply within 24 hours on working days.','chat','sky','#support','data-to="#contact"'],['Help Centre','Guides, tutorials and answers for every tool.','book','sun','#help','']].map((c,i)=>`<a class="bt tint t-${c[3]} rv" style="--d:${i}" href="${c[4]}" ${c[5]}><span class="ico-t">${ic(c[2])}</span><h2 class="h3" style="margin-top:18px">${c[0]}</h2><p>${c[1]}</p></a>`).join('')}</div></section>
<section class="wrap sec sm"><h2 class="h2 an" style="margin-bottom:28px">${H(['Common questions.'])}</h2><div id="faq" class="rv">${FAQ.map(f=>acc(f[0],f[1])).join('')}</div><p class="empty" id="faq-none">Nothing found. Send us a message below.</p><div class="cta-row rv"><a class="link" href="#help">Browse the Help Centre ${ic('arrow')}</a></div></section>
<section class="wrap sec sm" id="contact"><div class="apply"><div><span class="eyebrow rv">Chat with us</span><h2 class="h2 an">${H(['Send us your','~query.'])}</h2><p class="lead rv" style="--d:2;margin-top:14px">Share your query below. Our team will connect with you within 24 hours on working days.</p></div>
 <div class="rv" id="ct-box">${form('ct-form',[{n:'name',l:'Name',req:1,ac:'name'},{n:'email',l:'Email',t:'email',req:1,ac:'email'},{n:'phone',l:'Phone number <span class="mute">(optional)</span>',t:'tel',ac:'tel'},{n:'topic',l:'Topic',t:'select',o:['Getting started','Billing','A tool is not working','Something else']},{n:'msg',l:'Message',t:'area',req:1}],'Send message')}</div></div></section>`;

const creators=()=>`<section class="wrap ph2"><span class="eyebrow rv">Creators</span><h1 class="h1 sm an" style="max-width:14ch">${H(['Make content brands','actually','~use.'])}</h1><p class="lead rv" style="--d:3">Get paid briefs from D2C brands. Create, deliver, get paid.</p><div class="cta-row rv" style="--d:4;margin-top:6px"><a class="btn btn-dark" href="#creators" data-scroll="apply">Apply now</a></div></section>
<section class="wrap sec sm"><div class="cstps">${[['Get a brief','Clear goals, product and examples.','book','sky'],['Create','Film it your way, on your phone.','play','peach'],['Review','Quick feedback, one round.','chat','mint'],['Get paid','Paid on approval, every week.','bolt','sun']].map((s,i)=>`<div class="cs t-${s[3]} rv" style="--d:${i}">${ic(s[2])}<div><h2 class="h3">${s[0]}</h2><p>${s[1]}</p></div></div>`).join('')}</div></section>
<section class="wrap sec sm"><div class="est t-lav" data-est><div><span class="eyebrow rv">Estimate</span><h2 class="h2 an">${H(['What could','you earn?'])}</h2><div class="amt rv" style="--d:2">$<span data-amt>450</span></div><p class="fine" style="margin:0">A month, before fees. Example rates only.</p></div>
 <div class="ctl rv" style="--d:2"><div><label for="vids">Videos a month <b data-vl>10</b></label><input id="vids" type="range" min="2" max="30" value="10"></div>
 <div><label>Your level</label><div class="seg2" data-lv><button class="on" data-rate="45">Rising</button><button data-rate="60">Pro</button><button data-rate="90">Partner</button></div></div></div></div></section>
<section class="wrap sec" data-apply><div class="apply"><div><span class="eyebrow rv">Apply</span><h2 class="h2 an">${H(['Tell us','about','~you.'])}</h2><p class="lead rv" style="--d:3;margin-top:14px">We review applications every week.</p></div>
 <div class="rv" id="cr-box">${form('cr-form',[{n:'name',l:'Name',req:1,ac:'name'},{n:'email',l:'Email',t:'email',req:1,ac:'email'},{n:'handle',l:'Main handle',req:1,ph:'@yourname'},{n:'platform',l:'Platform',t:'select',o:['Instagram','YouTube','TikTok','Other']}],'Apply')}</div></div></section>`;


/* ---------- Meta Automation landing page ---------- */
const META_STEPS=[['Research','search','Study your store, products, competitors and audience before any budget is spent.','sky'],['Strategy','seo','Turn research into a campaign plan: objectives, audiences, budgets and funnel structure.','sun'],['Creatives','creative','Generate Meta ad creatives, ad copy and variations from your brand and product feed.','peach'],['Launch','bolt','Build campaigns, ad sets and ads in your Meta account. Everything is created paused for your review.','mint'],['Reporting','grid','Automated Meta Ads reporting: spend, ROAS, CPA and creative results on one dashboard.','lav'],['Optimisation','loop','Shift budgets, pause weak ad sets and scale winners, inside the limits you set.','aqua']];
const META_FAQ=[
 ['What is ARINE Meta Automation?','ARINE Meta Automation is an AI tool for Facebook and Instagram ads. It researches your brand, plans campaigns, generates creatives and copy, launches ads, and reports and optimises performance from one dashboard.'],
 ['Who is Meta Automation for?','D2C and e-commerce brands, performance marketers, freelancers and agencies who want to run Meta ads with less manual work.'],
 ['What do I need to connect?','Your Meta ad account, Facebook Page and Instagram account, plus your Shopify or WooCommerce store. Most brands connect in about 10 minutes.'],
 ['How does the one-command launch work?','Describe your goal in plain language. ARINE researches, builds the strategy, creates the creatives and copy, and prepares the campaign in your Meta ad account for review.'],
 ['How are ad creatives and ad copy made?','From your brand kit and product feed. You review and approve every creative before anything goes live.'],
 ['Will ARINE spend my budget without approval?','No. Campaigns are created paused. You decide when to activate them and you set the budgets.'],
 ['Can I limit or switch off automation?','Yes. Set guardrails for budgets and targets, or switch any tool to suggest-only.'],
 ['Does ARINE guarantee results?','No tool can guarantee ad results. ARINE helps you decide faster, test more and waste less, and your results depend on your product, offer and market.']];
const metaPage=()=>{
 const P=A.POSTS||[],pick=['how-to-create-meta-ad-account','how-to-create-a-meta-ads-account-beginners-guide','how-to-reduce-cac-without-increasing-ad-spend'].map(s=>P.find(x=>x.slug===s)).filter(Boolean);
 const kc=(q,i)=>`<a class="bc t-${q.tint} rv" style="--d:${i}" href="#blog-${q.slug}"><span class="bc-c pat${i%3}"><em>${q.cat}</em></span><div class="bc-b"><h3 class="h3">${q.title}</h3><p>${q.ex}</p><small>${q.date} · ${q.read} read</small></div></a>`;
 return `<section class="wrap pt"><div class="fh t-sky"><div>
  <span class="chip rv">${ic('meta')}Meta Automation</span>
  <h1 class="h1 sm an">${H(['META on','~Autopilot'])}</h1><p class="lead rv" style="--d:3">Automate your Facebook and Instagram ads, from research to ROAS, with one command.</p>
  <div class="cta-row rv" style="--d:4"><a class="btn btn-dark" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Sign up</a><a class="link" href="#pricing">See pricing ${ic('arrow')}</a></div><p class="offer rv" style="--d:5">${ic('check')}Start with 200 free credits</p></div>
  <div class="an">${VIZ.meta()}${fine}</div></div></section>

<section class="wrap sec"><span class="eyebrow rv">What ARINE automates</span><h2 class="h2 an" style="max-width:16ch">${H(['Meta ads automation,','end to','~end.'])}</h2>
 <div class="an" style="margin:32px 0 36px"><div class="flow" style="margin:0">${META_STEPS.map((s,i)=>(i?ic('arrow'):'')+`<span style="--d:${i}">${s[0]}</span>`).join('')}</div></div>
 <div class="tiles3">${META_STEPS.map((s,i)=>`<div class="bt tint t-${s[3]} rv" style="--d:${i%3}"><span class="ico-t">${ic(s[1])}</span><h3 class="h3" style="margin-top:18px">${s[0]}</h3><p>${s[2]}</p></div>`).join('')}</div></section>

<section class="wrap sec sm"><span class="eyebrow rv">How it works</span><h2 class="h2 an" style="max-width:18ch">${H(['Three steps to Meta ads on','~autopilot.'])}</h2>
 <div class="steps an">${[['Connect assets','Link your Meta ad account, Facebook Page, Instagram account and online store.'],['One command','Tell ARINE your goal in plain words. It researches, plans, builds and queues the campaign for review.'],['Grow','Approve and launch. ARINE reports and optimises every day while you stay in control.']].map((s,k)=>`<div class="stp rv" style="--d:${k}"><i>${k+1}</i><h3 class="h3">${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div></section>

<section class="wrap sec"><span class="eyebrow rv">Business outcomes</span><h2 class="h2 an" style="max-width:16ch">${H(['Fewer hours.','Better','~ROAS.'])}</h2>
 <div class="perks" style="margin-top:36px">${[[{n:29,s:'h'},'Time savings','Hours saved each week. Research, setup and reporting run in the background.','sky'],[{n:3.8,dec:1,s:'x'},'ROAS focus','Budgets move to the campaigns that return the most on ad spend.','peach'],[{n:1},'One dashboard','Spend, ROAS, CPA and creative results for every Meta campaign in one view.','mint'],[{n:27,p:'−',s:'%'},'Efficiency','Lower cost per sale as weak ad sets are paused before they waste budget.','sun']].map((o,i)=>`<div class="bt tint t-${o[3]} rv" style="--d:${i}"><b class="n">${num(o[0].n,o[0])}</b><h3 class="h3">${o[1]}</h3><p>${o[2]}</p></div>`).join('')}</div>${fine}</section>

<section class="wrap sec sm"><div class="split"><div><span class="eyebrow rv">Creative intelligence</span><h2 class="h2 an">${H(['Creative','~intelligence','built in.'])}</h2>
 <p class="rv" style="--d:3;color:var(--ink2);margin:18px 0 0;max-width:46ch">ARINE generates Meta ad creatives, ad copy and variations from your brand kit and product feed, then learns which hooks win and uses them in the next batch.</p>
 <div class="mk an">${['Creative generation','Ad copy','Variations','Winner tracking'].map((c,i)=>`<span style="--d:${i}">${c}</span>`).join('')}</div></div>
 <div class="an">${VIZ.creative()}</div></div></section>

<section class="wrap sec"><span class="eyebrow rv">Why ARINE</span><h2 class="h2 an" style="max-width:18ch">${H(['Why brands choose ARINE for Meta','~ads.'])}</h2>
 <div class="tiles3" style="margin:36px 0">${[['Built for D2C','Made for e-commerce brands, from first launch to scale.','store','sky'],['You stay in control','Campaigns are created paused. You approve activation and budget.','shield','mint'],['One connected system','Meta sits beside creative, CRM, store, SEO and finance.','grid','lav']].map((t,i)=>`<div class="bt tint t-${t[3]} rv" style="--d:${i}"><span class="ico-t">${ic(t[2])}</span><h3 class="h3" style="margin-top:18px">${t[0]}</h3><p>${t[1]}</p></div>`).join('')}</div>
 <div class="why"><div class="why-t an"><div class="wh"><span>Traditional approach</span><span>ARINE Meta Automation</span></div>${WHYR.map((r,i)=>`<div class="wr" style="--d:${i}"><span>${ic('x')}${r[0]}</span><span>${ic('check')}${r[1]}</span></div>`).join('')}</div></div></section>

<section class="sec sm" style="padding-bottom:clamp(24px,4vw,48px)"><div class="wrap rail-h"><div><span class="eyebrow rv">Video testimonials</span><h2 class="h2 an" style="max-width:16ch">${H(['Hear from the','people','~running ads.'])}</h2></div></div>
 <div class="rail vrail">${[['Performance marketer','#FFC8CB','sky'],['D2C founder','#C9EEF3','mint'],['D2C founder','#DCD3F6','lav']].map(v=>`<div class="vc" style="--bd:${v[1]}"><span class="vmedia"><div class="gv t-${v[2]}"><div class="card sm" style="text-align:center"><span style="display:block;width:56px;height:56px;border-radius:50%;background:var(--paper);margin:0 auto 12px"></span><b>${v[0]}</b><br><small class="mute">Video testimonial</small></div></div><span class="vt">Coming soon</span></span><span class="vl">${v[0]}</span></div>`).join('')}</div></section>

<section class="wrap sec"><div class="split" style="align-items:start"><div><span class="eyebrow rv">FAQs</span><h2 class="h2 an">${H(['Meta automation','~questions.'])}</h2><p class="rv" style="--d:3;color:var(--ink2);margin:18px 0 0;max-width:36ch">About the product, integrations, execution and control.</p></div>
 <div class="rv">${META_FAQ.map(f=>acc(f[0],f[1])).join('')}</div></div></section>

<section class="wrap sec sm"><span class="eyebrow rv">Knowledge centre</span><h2 class="h2 an" style="margin-bottom:32px">${H(['Meta Ads','~knowledge','centre.'])}</h2><div class="bgrid three">${pick.map(kc).join('')}</div>
 <div class="cta-row rv"><a class="link" href="#blog">Read all articles ${ic('arrow')}</a></div></section>

<section class="wrap sec sm"><div class="band an"><div class="sunbg"></div><h2 class="h2">${H(['Put Meta ads on','autopilot.'])}</h2><p class="rv">Connect your first account in minutes.</p><div class="rv" style="--d:1"><a class="btn btn-white" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Sign up</a></div></div></section>
${LEAD}`};
A.pages={home,pricing,signup,about,events,careers,policy,support,help,creators,...Object.fromEntries(MODS.map(m=>[m.id,()=>feature(m.id)]))};
A.pages.meta=metaPage;
/* ---------- feature landing pages (same structure as Meta) ---------- */
const S=(a,b,c,d)=>[a,b,c,d];
const LAND={
google:{h:['Google Ads on','~Autopilot'],lead:'Automate Search, Shopping and Performance Max, from feed to ROAS, with one command.',
 flowH:['Google Ads automation,','end to','~end.'],
 flow:[S('Research','search','Study keywords, products, competitors and search intent before budget is spent.','sun'),S('Feed','store','Clean and enrich your Merchant Center product feed so more items get approved and shown.','mint'),S('Campaigns','bolt','Build Search, Shopping and Performance Max campaigns with structure that follows your margins.','sky'),S('Creatives','creative','Write ad copy, headlines and assets from your brand kit and top-selling products.','peach'),S('Optimise','loop','Block wasted queries, shift budgets and adjust bids around the clock.','lav'),S('Report','info','See spend, ROAS and profit by campaign in one clear dashboard.','aqua')],
 howH:['Three steps to Google Ads on','~autopilot.'],how:[['Connect assets','Link Google Ads, Merchant Center and your online store.'],['Add your margins','Set targets that follow real profit, not just revenue.'],['Review and grow','Approve changes or let ARINE act within your guardrails.']],
 outH:['Less waste.','Better','~ROAS.'],out:[[{n:18,p:'−',s:'%'},'Wasted spend','Weak search queries are blocked daily before they drain budget.','sun'],[{n:99,s:'%'},'Feed approved','Product feed issues are found and fixed automatically.','mint'],[{n:12,s:' min'},'Weekly review','Down from half a day of manual checks.','sky'],[{n:1},'One dashboard','Search, Shopping and Performance Max results in one view.','lav']],
 sec:{e:'Shopping feed intelligence',h:['Product feed','~intelligence','built in.'],p:'ARINE audits your Merchant Center feed, fixes titles, attributes and disapprovals, and uses margin data to decide which products deserve more Google Shopping budget.',chips:['Feed audit','Title fixes','Margin-based bids','Disapproval alerts'],viz:'store'},
 whyH:['Why brands choose ARINE for Google','~Ads.'],why:[['Margin aware','Targets follow profit, so budget goes to products that pay back.','coin','sun'],['You stay in control','Changes can be reviewed first, with guardrails on budgets and bids.','shield','mint'],['One connected system','Google sits beside Meta, creative, CRM, store, SEO and finance.','grid','lav']],whyCol:'ARINE Google Automation',
 tH:['Hear from the','people','~running ads.'],tR:['Performance marketer','D2C founder','D2C founder'],
 faqH:['Google automation','~questions.'],faq:[['What is ARINE Google Automation?','ARINE Google Automation is an AI tool for Google Ads. It researches keywords, fixes your product feed, builds Search, Shopping and Performance Max campaigns, and optimises and reports from one dashboard.'],['Who is it for?','D2C and e-commerce brands, performance marketers, freelancers and agencies that want to run Google Ads with less manual work.'],['What do I need to connect?','Your Google Ads account, Google Merchant Center and your Shopify or WooCommerce store.'],['Does it work with Performance Max and Shopping?','Yes. ARINE supports Search, Shopping and Performance Max, and keeps the product feed healthy so campaigns have the data they need.'],['Will ARINE spend budget without approval?','No. You set budgets and guardrails, and you choose whether ARINE acts on its own or suggests changes for approval.'],['How does it reduce wasted spend?','It reviews search terms daily, blocks queries that do not convert and moves budget towards products and campaigns with better returns.'],['Does ARINE guarantee results?','No tool can guarantee ad results. ARINE helps you decide faster and waste less, and results depend on your product, offer and market.']],
 kcH:['Google Ads','~knowledge','centre.'],picks:['best-d2c-lead-generation-tools-for-freelancers-and-agencies','how-to-reduce-cac-without-increasing-ad-spend','the-4d-growth-framework-for-scaling-d2c-brands'],
 ctaH:['Put Google Ads on','autopilot.'],ctaP:'Connect Google Ads and Merchant Center in minutes.',viz:'google'},
creative:{h:['Your Creative Engine,','~always on'],lead:'Generate ad hooks, visuals, copy and variations from your brand kit, then learn what wins.',
 flowH:['Creative automation,','end to','~end.'],
 flow:[S('Brand kit','heart','Logo, colours, fonts and tone are saved once and used in every creative.','peach'),S('Ideas','bolt','Pick a product and an angle. ARINE suggests hooks based on what sells.','sun'),S('Visuals','creative','Static ads, product visuals and layouts built in your brand style.','sky'),S('Copy','chat','Headlines, primary text and CTAs written for each platform.','mint'),S('Variations','plus','Dozens of variations from one idea, ready for testing.','lav'),S('Learn','loop','Winning hooks and visuals guide the next batch automatically.','aqua')],
 howH:['Three steps to creatives that','~keep up.'],how:[['Share the brand','Add your logo, colours, fonts and tone of voice.'],['Pick an idea','Choose one product and one angle to start from.'],['Ship the winners','Tests run automatically and the best creatives are repeated.']],
 outH:['More ideas.','Better','~creative.'],out:[[{n:40,s:'+'},'Variations a week','All from one idea, ready to test.','peach'],[{n:3.2,dec:1,s:'%'},'Top creative CTR','Winners guide what gets made next.','sun'],[{n:100,s:'%'},'On brand','Your fonts, colours and tone, every time.','mint'],[{n:1},'One library','Every creative and its results in one place.','lav']],
 sec:{e:'Winner tracking',h:['Learn what','~wins','and repeat it.'],p:'ARINE tracks hook, visual and copy results across your ads, finds the patterns behind your best creatives and uses them to brief the next batch.',chips:['Hook analysis','Creative scoring','Fatigue alerts','Next-batch briefs'],viz:'meta'},
 whyH:['Why brands choose ARINE for creative','~production.'],why:[['Built for D2C','Creatives made around products, offers and seasons.','store','peach'],['Always on brand','Every output follows your saved brand kit.','shield','mint'],['Connected to results','Creative sits beside Meta, Google and CRM data.','grid','lav']],whyCol:'ARINE Creative Engine',
 tH:['Hear from the','people','~making ads.'],tR:['Creative strategist','D2C founder','Performance marketer'],
 faqH:['Creative Engine','~questions.'],faq:[['What is the ARINE Creative Engine?','The Creative Engine is an AI tool that generates ad creatives, hooks, copy and variations from your brand kit and product feed, then tracks which ones perform best.'],['Who is it for?','D2C brands, creative strategists, performance marketers and agencies that need more creative volume without a bigger team.'],['Will creatives match my brand?','Yes. You save your logo, colours, fonts and tone once, and every creative follows them.'],['Which platforms does it support?','Creatives and copy can be made for Meta and Google ads, and the same ideas can be reused across channels.'],['Do I approve creatives before they go live?','Yes. You review and approve every creative before it is used in a campaign.'],['How does it know what works?','It reads results from your connected ad accounts and finds the hooks, visuals and angles behind your best performers.'],['Does ARINE guarantee results?','No. It helps you test more and learn faster, and results depend on your product, offer and market.']],
 kcH:['Creative','~knowledge','centre.'],picks:['how-to-reduce-cac-without-increasing-ad-spend','how-to-create-meta-ad-account','the-4d-growth-framework-for-scaling-d2c-brands'],
 ctaH:['Make creative that','keeps up.'],ctaP:'Add your brand kit and make your first batch today.',viz:'creative'},
crm:{h:['CRM on','~Autopilot'],lead:'Know every customer and message them well across WhatsApp, email and SMS.',
 flowH:['CRM automation,','end to','~end.'],
 flow:[S('Import','store','Bring in customers and orders from your store in minutes.','mint'),S('Segment','grid','Live segments update with every order and visit.','sky'),S('Journeys','loop','Welcome, abandoned cart, win-back and repeat-purchase journeys from templates.','sun'),S('Messages','chat','Drafts for WhatsApp, email and SMS in your brand voice.','peach'),S('Replies','mail','Customer replies are drafted and routed to the right person.','lav'),S('Report','info','Repeat orders, revenue per customer and journey results in one view.','aqua')],
 howH:['Three steps to CRM on','~autopilot.'],how:[['Import your data','Connect Shopify or WooCommerce and bring in your customers.'],['Choose a journey','Start from a template and adjust it to your brand.'],['Watch it work','See repeat orders and customer value grow.']],
 outH:['More repeat orders.','Less','~chasing.'],out:[[{n:3,s:'x'},'Repeat orders','Journeys bring customers back at the right moment.','mint'],[{n:2,s:' min'},'Average reply','Replies are drafted and routed straight away.','sky'],[{n:5},'Live segments','Updated automatically with every order.','sun'],[{n:1},'One customer view','Orders, chats and journeys in one profile.','lav']],
 sec:{e:'Customer memory',h:['Every customer,','~remembered','across channels.'],p:'ARINE keeps one profile for each customer, with orders, messages and preferences, so every message feels personal and nobody gets the same offer twice.',chips:['Live segments','Customer profiles','Journey templates','Reply routing'],viz:'store'},
 whyH:['Why brands choose ARINE for customer','~retention.'],why:[['Built for D2C','Journeys designed around repeat purchase and lifetime value.','store','mint'],['You stay in control','Review messages before they send and set sending limits.','shield','sky'],['Connected to ads','CRM data feeds your Meta and Google audiences.','grid','lav']],whyCol:'ARINE CRM',
 tH:['Hear from the','people','~keeping customers.'],tR:['Retention marketer','D2C founder','D2C founder'],
 faqH:['CRM automation','~questions.'],faq:[['What is ARINE CRM?','ARINE CRM is an AI customer relationship tool for D2C brands. It builds live segments, runs journeys and handles replies across WhatsApp, email and SMS.'],['Who is it for?','D2C and e-commerce brands that want more repeat orders without managing many separate messaging tools.'],['Which channels does it support?','WhatsApp, email and SMS, with replies routed to your team.'],['What do I need to connect?','Your online store, such as Shopify or WooCommerce, and the messaging channels you use.'],['Can I review messages before they send?','Yes. You can approve messages first and set limits on how often customers hear from you.'],['How are segments created?','Segments update automatically from orders, browsing and message activity, so they are always current.'],['Does ARINE guarantee results?','No. It helps you follow up faster and more personally, and results depend on your product, offer and audience.']],
 kcH:['CRM','~knowledge','centre.'],picks:['best-d2c-lead-generation-tools-for-freelancers-and-agencies','why-d2c-brands-dont-need-another-marketing-agency','building-a-scalable-growth-operating-system'],
 ctaH:['Put your CRM on','autopilot.'],ctaP:'Import your customers and start your first journey.',viz:'crm'},
store:{h:['Store management on','~Autopilot'],lead:'Keep stock, orders and listings in order before they become problems.',
 flowH:['Store automation,','end to','~end.'],
 flow:[S('Connect','link','Shopify, WooCommerce and more, connected in minutes.','lav'),S('Inventory','store','Stock levels tracked live across products and variants.','mint'),S('Reorders','bolt','Reorder alerts based on sales speed and supplier lead times.','sun'),S('Orders','check','Orders synced and sent to your team quickly.','sky'),S('Listings','book','Titles, prices and tags kept fresh across your catalogue.','peach'),S('Report','info','Stock, orders and listing health in one dashboard.','aqua')],
 howH:['Three steps to a store that','~runs itself.'],how:[['Connect your store','Link Shopify, WooCommerce or your marketplace.'],['Set your rules','Add reorder points, lead times and pricing rules.'],['Stay ahead','Get alerts only when something needs you.']],
 outH:['Fewer stock-outs.','More','~time.'],out:[[{n:96,s:'%'},'In-stock rate','Reorder alerts arrive early, before products run out.','lav'],[{n:5,s:' min'},'Order sync','Orders reach your team fast.','sky'],[{n:1200,s:'+'},'Listings kept fresh','Titles, prices and tags stay current.','mint'],[{n:1},'One dashboard','Stock, orders and listing health in one view.','sun']],
 sec:{e:'Inventory intelligence',h:['Know what to reorder,','~before','it runs out.'],p:'ARINE watches sales speed, lead times and stock levels to flag what to reorder and when, and pauses ads for products that are about to sell out.',chips:['Reorder alerts','Stock-out protection','Listing updates','Order sync'],viz:'crm'},
 whyH:['Why brands choose ARINE for store','~operations.'],why:[['Built for D2C','Made around catalogues, variants and fast-moving stock.','store','lav'],['You stay in control','Rules and alerts you set, and nothing changes without your say.','shield','mint'],['Connected to ads','Stock data keeps ad spend off products that are out.','grid','sky']],whyCol:'ARINE Store Management',
 tH:['Hear from the','people','~running stores.'],tR:['Operations manager','D2C founder','D2C founder'],
 faqH:['Store automation','~questions.'],faq:[['What is ARINE Store Management?','ARINE Store Management is an AI tool that keeps stock, orders and product listings in order for online stores, and alerts you before problems happen.'],['Who is it for?','D2C and e-commerce brands that sell physical products and want less manual store admin.'],['Which platforms does it support?','Shopify, WooCommerce and other popular store platforms.'],['How do reorder alerts work?','You set reorder points and supplier lead times. ARINE watches sales speed and alerts you early.'],['Can it update product listings?','Yes. It can keep titles, prices and tags fresh, and you can review changes before they go live.'],['Does it connect to my ads?','Yes. Stock data can pause ads for products that are running out so spend is not wasted.'],['Does ARINE guarantee results?','No. It helps you stay ahead of issues, and results depend on your products, suppliers and demand.']],
 kcH:['Store','~knowledge','centre.'],picks:['shopify-vs-woocommerce-best-online-store-builder','building-a-scalable-growth-operating-system','why-d2c-brands-dont-need-another-marketing-agency'],
 ctaH:['Put your store on','autopilot.'],ctaP:'Connect your store and set your first rules.',viz:'store'},
seo:{h:['SEO on','~Autopilot'],lead:'Audits, content and links, handled in a steady rhythm so search growth compounds.',
 flowH:['SEO automation,','end to','~end.'],
 flow:[S('Audit','search','A full crawl of your site in minutes, with clear priorities.','aqua'),S('Fix','bolt','Speed, links, metadata and schema issues fixed or queued.','sun'),S('Keywords','seo','Find the topics and terms your customers search for.','sky'),S('Briefs','book','Content briefs ready to publish, built around search intent.','peach'),S('Links','link','Internal links and link opportunities suggested.','mint'),S('Track','info','Rankings, clicks and traffic reported weekly.','lav')],
 howH:['Three steps to SEO on','~autopilot.'],how:[['Connect your site','Link your website, Search Console and analytics.'],['Fix and brief','ARINE fixes issues and prepares content briefs.'],['Track growth','See rankings and organic clicks improve every week.']],
 outH:['Steady work.','Compounding','~growth.'],out:[[{n:164,s:'%'},'Organic clicks','Growth seen after eight weeks.','aqua'],[{n:312},'Issues fixed','Speed, links, schema and metadata.','sun'],[{n:12},'Briefs a month','Ready for your writers to publish.','peach'],[{n:1},'One dashboard','Rankings, clicks and issues together.','lav']],
 sec:{e:'AI search ready',h:['Search that works for','~people','and AI.'],p:'ARINE structures your pages with clear answers, schema and internal links, so they rank in search and are easy for AI assistants to read and quote.',chips:['Schema markup','Content briefs','Internal links','Rank tracking'],viz:'geo'},
 whyH:['Why brands choose ARINE for','~SEO.'],why:[['Built for D2C','Collection, product and blog pages all covered.','store','aqua'],['You stay in control','Review fixes and briefs before anything goes live.','shield','mint'],['Connected to growth','SEO sits beside ads, creative, CRM and finance.','grid','lav']],whyCol:'ARINE SEO Automation',
 tH:['Hear from the','people','~growing search.'],tR:['SEO manager','D2C founder','Content lead'],
 faqH:['SEO automation','~questions.'],faq:[['What is ARINE SEO Automation?','ARINE SEO Automation is an AI tool that audits your site, fixes technical issues, writes content briefs and tracks rankings for e-commerce brands.'],['Who is it for?','D2C and e-commerce brands, marketers and agencies that want steady organic growth without a large SEO team.'],['What do I need to connect?','Your website, Google Search Console and analytics.'],['Does it write content?','It creates briefs built around search intent and helps with drafts. You review everything before publishing.'],['Can it fix technical issues?','Yes. It fixes or queues issues with speed, links, metadata and schema, based on your approval settings.'],['How long does SEO take to work?','Search growth builds over time. Many brands start seeing movement in weeks, and results depend on your site and competition.'],['Does ARINE guarantee rankings?','No. Nobody can guarantee rankings. ARINE helps you do the right work consistently.']],
 kcH:['SEO','~knowledge','centre.'],picks:['shopify-vs-woocommerce-best-online-store-builder','the-4d-growth-framework-for-scaling-d2c-brands','building-a-scalable-growth-operating-system'],
 ctaH:['Put SEO on','autopilot.'],ctaP:'Run your first site audit in minutes.',viz:'seo'},
geo:{h:['GEO on','~Autopilot'],lead:'Get your brand cited in AI answers, not only ranked in search.',
 flowH:['GEO automation,','end to','~end.'],
 flow:[S('Track','search','See where AI assistants mention your brand and where they do not.','rose'),S('Prompts','chat','Monitor the questions your customers ask AI every day.','sun'),S('Rewrite','book','Make pages clear, factual and easy for AI to quote.','peach'),S('Structure','grid','Add schema and answer formats AI systems read well.','sky'),S('Compare','info','Measure your share of answer against competitors.','mint'),S('Improve','loop','Repeat what earns more citations, week after week.','lav')],
 howH:['Three steps to GEO on','~autopilot.'],how:[['Add your brand','Tell ARINE your brand, products and competitors.'],['Rewrite and structure','Pages are made easy for AI to understand and quote.'],['Compare and grow','Watch your share of AI answers grow.']],
 outH:['More mentions.','More','~trust.'],out:[[{n:4,s:'x'},'More AI citations','Pages AI can quote with confidence.','rose'],[{n:38,s:'%'},'Share of answer','Measured against three rivals.','sun'],[{n:7},'Daily checks','Across leading AI assistants.','sky'],[{n:1},'One dashboard','Mentions, sources and share in one view.','mint']],
 sec:{e:'Answer visibility',h:['See your share of','~every answer.'],p:'ARINE checks how AI assistants answer buyer questions in your category, shows which sources they use and tells you what to change to be included.',chips:['Prompt tracking','Citation sources','Share of answer','Competitor view'],viz:'seo'},
 whyH:['Why brands choose ARINE for','~GEO.'],why:[['Built for D2C','Tracks the questions shoppers ask before they buy.','store','rose'],['You stay in control','Review every page change before it goes live.','shield','mint'],['Connected to SEO','GEO and SEO work together on the same pages.','grid','lav']],whyCol:'ARINE GEO Automation',
 tH:['Hear from the','people','~winning AI answers.'],tR:['SEO manager','D2C founder','Brand lead'],
 faqH:['GEO automation','~questions.'],faq:[['What is GEO?','Generative Engine Optimisation (GEO) is the work of making your brand easy for AI assistants to find, understand and cite in their answers.'],['What is ARINE GEO Automation?','ARINE GEO Automation tracks where AI assistants mention your brand, rewrites pages so they are easier to quote and measures your share of answer over time.'],['How is GEO different from SEO?','SEO helps pages rank in search results. GEO helps your brand appear inside AI-generated answers. The two work well together.'],['Which AI assistants does it check?','ARINE checks leading AI assistants on a daily basis and shows how often your brand is mentioned.'],['Do I approve page changes?','Yes. You review every rewrite before it is published.'],['Who is it for?','D2C and e-commerce brands, marketers and agencies that want to stay visible as shoppers use AI to research products.'],['Does ARINE guarantee citations?','No. AI answers change often and nobody can guarantee them. ARINE helps you improve your chances consistently.']],
 kcH:['GEO','~knowledge','centre.'],picks:['the-4d-growth-framework-for-scaling-d2c-brands','building-a-scalable-growth-operating-system','why-d2c-brands-dont-need-another-marketing-agency'],
 ctaH:['Be the answer AI','gives.'],ctaP:'See where AI mentions your brand today.',viz:'geo'},
cfo:{h:['Your Virtual CFO,','~always on'],lead:'Cash flow, margins and forecasts, reviewed for you every day in plain words.',
 flowH:['Finance automation,','end to','~end.'],
 flow:[S('Connect','link','Bank, accounting and store data brought together.','sand'),S('Categorise','check','Transactions sorted and reconciled automatically.','sun'),S('Margins','coin','Margin by product, channel and campaign.','mint'),S('Forecast','info','A rolling cash forecast that updates with every order.','sky'),S('Budget','grid','Budgets and spending limits by team and channel.','peach'),S('Report','book','A monthly report written in plain words.','lav')],
 howH:['Three steps to finance on','~autopilot.'],how:[['Connect your accounts','Link your bank, books and online store.'],['Review the report','Get a clear monthly report in plain words.'],['Plan ahead','Budgets and forecasts update as your business changes.']],
 outH:['Clearer numbers.','Calmer','~decisions.'],out:[[{n:90,s:' days'},'Cash forecast','See your runway before it gets tight.','sand'],[{n:3.5,dec:1,s:' pts'},'Margin recovered','Find the costs that quietly eat profit.','mint'],[{n:2,s:' hrs'},'Monthly close','Down from two days of manual work.','sky'],[{n:1},'One finance view','Cash, margin and spend together.','lav']],
 sec:{e:'Profit clarity',h:['Know your real','~profit,','by product.'],p:'ARINE combines ad spend, product costs, shipping and fees to show true margin for every product and channel, so you scale what actually makes money.',chips:['Margin by product','Cash forecast','Budget tracking','Monthly report'],viz:'store'},
 whyH:['Why brands choose ARINE for','~finance.'],why:[['Built for D2C','Understands ad spend, returns, shipping and fees.','store','sand'],['You stay in control','You see every number and every assumption.','shield','mint'],['Connected to growth','Finance data guides ad budgets and stock decisions.','grid','lav']],whyCol:'ARINE Virtual CFO',
 tH:['Hear from the','people','~watching cash.'],tR:['Finance lead','D2C founder','D2C founder'],
 faqH:['Virtual CFO','~questions.'],faq:[['What is the ARINE Virtual CFO?','The ARINE Virtual CFO is an AI finance assistant for D2C brands. It tracks cash flow and margins, builds forecasts and writes a clear monthly report.'],['Who is it for?','D2C founders and finance leads who want clear numbers without hiring a full-time finance team.'],['What do I need to connect?','Your bank, accounting software and online store.'],['Does it replace my accountant?','No. It gives you clearer day-to-day numbers and forecasts. You still need an accountant for tax and compliance.'],['How does the cash forecast work?','It uses your orders, expenses and payment timing to project cash for the coming weeks and updates as things change.'],['Is my financial data safe?','ARINE only reads the data you connect, and you can disconnect at any time. See our privacy policy for details.'],['Does ARINE give financial advice?','No. ARINE provides reports and forecasts to support your decisions, not regulated financial advice.']],
 kcH:['Finance','~knowledge','centre.'],picks:['how-to-reduce-cac-without-increasing-ad-spend','building-a-scalable-growth-operating-system','growth-operating-partner-vs-performance-marketing-agency'],
 ctaH:['Put your finances on','autopilot.'],ctaP:'Connect your accounts and see your first report.',viz:'cfo'},
enterprise:{h:['Every tool.','One','~dashboard.'],lead:'Meta, Google, creative, CRM, store, SEO, GEO and finance, working together to grow revenue.',
 flowH:['Enterprise automation,','end to','~end.'],
 flow:[S('Connect','link','Ads, store, books and inbox connected once.','teal'),S('Share goals','grid','Revenue, margin and cash goals shared by every tool.','sun'),S('Plan','seo','One growth plan across channels, not eight separate ones.','sky'),S('Create','creative','Creatives, copy and journeys made from the same insights.','peach'),S('Coordinate','loop','Tools act together: stock pauses ads, margin guides budgets.','mint'),S('Report','info','One dashboard and one set of numbers for everyone.','lav')],
 howH:['Three steps to one connected','~growth system.'],how:[['Connect everything','Link ads, store, books and your inbox.'],['Set shared goals','Choose revenue, margin and cash targets.'],['Run as one','Every tool coordinates and reports in one place.']],
 outH:['One system.','Better','~revenue.'],out:[[{n:9},'Tools in sync','All sharing one set of data.','teal'],[{n:34,s:'%'},'Revenue growth','When every channel acts together.','sun'],[{n:1},'Source of truth','One set of numbers for everyone.','mint'],[{n:24,s:'/7'},'Always working','Nothing waits for Monday.','lav']],
 sec:{e:'Coordinated growth',h:['Every channel,','~acting','together.'],p:'When stock runs low, ads pause. When margins shift, budgets move. When a creative wins, it is reused everywhere. ARINE connects every tool so decisions are made together.',chips:['Shared data','Cross-channel rules','Unified reporting','Team access'],viz:'meta'},
 whyH:['Why brands choose ARINE for','~Enterprise.'],why:[['Built for scale','Handles many brands, stores and ad accounts.','store','teal'],['You stay in control','Roles, approvals and guardrails across the whole system.','shield','mint'],['One connected system','No more switching between tools and spreadsheets.','grid','lav']],whyCol:'ARINE Enterprise',
 tH:['Hear from the','teams','~using ARINE.'],tR:['Growth lead','D2C founder','Marketing head'],
 faqH:['Enterprise','~questions.'],faq:[['What is ARINE Enterprise?','ARINE Enterprise connects every ARINE tool, including Meta, Google, creative, CRM, store, SEO, GEO and finance, on one dashboard so they work together to grow revenue.'],['Who is it for?','Larger D2C brands, multi-brand groups and agencies that manage many channels and want one connected system.'],['Can multiple team members use it?','Yes. You can add team members with roles and approval rules.'],['Can I manage more than one brand or store?','Yes. Enterprise supports multiple brands, stores and ad accounts.'],['How do the tools work together?','They share data. For example, low stock can pause ads, and margin data can guide ad budgets.'],['Can I get a custom setup?','Yes. Talk to us and we will set up ARINE for your team and tools.'],['Does ARINE guarantee results?','No. ARINE helps your teams act faster and together, and results depend on your business and market.']],
 kcH:['Enterprise','~knowledge','centre.'],picks:['best-d2c-lead-generation-tools-for-freelancers-and-agencies','how-to-pitch-d2c-brands-for-meta-ads-management','building-a-scalable-growth-operating-system'],
 ctaH:['Run every tool as','one.'],ctaP:'Talk to us about your team and tools.',viz:'enterprise'}
};
const landing=id=>{const c=LAND[id],m=MODS.find(x=>x.id===id);
 const P=A.POSTS||[],pick=c.picks.map(s=>P.find(x=>x.slug===s)).filter(Boolean);
 const kc=(q,i)=>`<a class="bc t-${q.tint} rv" style="--d:${i}" href="#blog-${q.slug}"><span class="bc-c pat${i%3}"><em>${q.cat}</em></span><div class="bc-b"><h3 class="h3">${q.title}</h3><p>${q.ex}</p><small>${q.date} · ${q.read} read</small></div></a>`;
 const tile=(s,i)=>`<div class="bt tint t-${s[3]} rv" style="--d:${i%3}"><span class="ico-t">${ic(s[1])}</span><h3 class="h3" style="margin-top:18px">${s[0]}</h3><p>${s[2]}</p></div>`;
 return `<section class="wrap pt"><div class="fh t-${m.tint}"><div>
  <span class="chip rv">${ic(m.icon)}${m.name}</span>
  <h1 class="h1 sm an">${H(c.h)}</h1><p class="lead rv" style="--d:3">${c.lead}</p>
  <div class="cta-row rv" style="--d:4"><a class="btn btn-dark" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Sign up</a><a class="link" href="#pricing">See pricing ${ic('arrow')}</a></div><p class="offer rv" style="--d:5">${ic('check')}Start with 200 free credits</p></div>
  <div class="an">${VIZ[c.viz]()}${fine}</div></div></section>

<section class="wrap sec"><span class="eyebrow rv">What ARINE automates</span><h2 class="h2 an" style="max-width:16ch">${H(c.flowH)}</h2>
 <div class="an" style="margin:32px 0 36px"><div class="flow" style="margin:0">${c.flow.map((s,i)=>(i?ic('arrow'):'')+`<span style="--d:${i}">${s[0]}</span>`).join('')}</div></div>
 <div class="tiles3">${c.flow.map((s,i)=>tile([s[0],s[1],s[2],s[3]],i)).join('')}</div></section>

<section class="wrap sec sm"><span class="eyebrow rv">How it works</span><h2 class="h2 an" style="max-width:18ch">${H(c.howH)}</h2>
 <div class="steps an">${c.how.map((s,k)=>`<div class="stp rv" style="--d:${k}"><i>${k+1}</i><h3 class="h3">${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</div></section>

<section class="wrap sec"><span class="eyebrow rv">Business outcomes</span><h2 class="h2 an" style="max-width:16ch">${H(c.outH)}</h2>
 <div class="perks" style="margin-top:36px">${c.out.map((o,i)=>`<div class="bt tint t-${o[3]} rv" style="--d:${i}"><b class="n">${num(o[0].n,o[0])}</b><h3 class="h3">${o[1]}</h3><p>${o[2]}</p></div>`).join('')}</div>${fine}</section>

<section class="wrap sec sm"><div class="split"><div><span class="eyebrow rv">${c.sec.e}</span><h2 class="h2 an">${H(c.sec.h)}</h2>
 <p class="rv" style="--d:3;color:var(--ink2);margin:18px 0 0;max-width:46ch">${c.sec.p}</p>
 <div class="mk an">${c.sec.chips.map((x,i)=>`<span style="--d:${i}">${x}</span>`).join('')}</div></div>
 <div class="an">${VIZ[c.sec.viz]()}</div></div></section>

<section class="wrap sec"><span class="eyebrow rv">Why ARINE</span><h2 class="h2 an" style="max-width:18ch">${H(c.whyH)}</h2>
 <div class="tiles3" style="margin:36px 0">${c.why.map((t,i)=>`<div class="bt tint t-${t[3]} rv" style="--d:${i}"><span class="ico-t">${ic(t[2])}</span><h3 class="h3" style="margin-top:18px">${t[0]}</h3><p>${t[1]}</p></div>`).join('')}</div>
 <div class="why"><div class="why-t an"><div class="wh"><span>Traditional approach</span><span>${c.whyCol}</span></div>${WHYR.map((r,i)=>`<div class="wr" style="--d:${i}"><span>${ic('x')}${r[0]}</span><span>${ic('check')}${r[1]}</span></div>`).join('')}</div></div></section>

<section class="sec sm" style="padding-bottom:clamp(24px,4vw,48px)"><div class="wrap rail-h"><div><span class="eyebrow rv">Video testimonials</span><h2 class="h2 an" style="max-width:16ch">${H(c.tH)}</h2></div></div>
 <div class="rail vrail">${c.tR.map((r,i)=>{const v=[['#FFC8CB','sky'],['#C9EEF3','mint'],['#DCD3F6','lav']][i];return `<div class="vc" style="--bd:${v[0]}"><span class="vmedia"><div class="gv t-${v[1]}"><div class="card sm" style="text-align:center"><span style="display:block;width:56px;height:56px;border-radius:50%;background:var(--paper);margin:0 auto 12px"></span><b>${r}</b><br><small class="mute">Video testimonial</small></div></div><span class="vt">Coming soon</span></span><span class="vl">${r}</span></div>`}).join('')}</div></section>

<section class="wrap sec"><div class="split" style="align-items:start"><div><span class="eyebrow rv">FAQs</span><h2 class="h2 an">${H(c.faqH)}</h2><p class="rv" style="--d:3;color:var(--ink2);margin:18px 0 0;max-width:36ch">About the product, integrations, execution and control.</p></div>
 <div class="rv">${c.faq.map(f=>acc(f[0],f[1])).join('')}</div></div></section>

<section class="wrap sec sm"><span class="eyebrow rv">Knowledge centre</span><h2 class="h2 an" style="margin-bottom:32px">${H(c.kcH)}</h2><div class="bgrid three">${pick.map(kc).join('')}</div>
 <div class="cta-row rv"><a class="link" href="#blog">Read all articles ${ic('arrow')}</a></div></section>

<section class="wrap sec sm"><div class="band an"><div class="sunbg"></div><h2 class="h2">${H(c.ctaH)}</h2><p class="rv">${c.ctaP}</p><div class="rv" style="--d:1"><a class="btn btn-white" href="https://app.arineecosystem.com/login" target="_blank" rel="noopener">Sign up</a></div></div></section>
${LEAD}`};
Object.keys(LAND).forEach(k=>{A.pages[k]=()=>landing(k)});

/* ---------- SEO: titles, descriptions, canonical paths ---------- */
A.SITE='https://arineecosystem.com';
A.SEO={
 home:['ARINE | AI Growth Operating System for D2C Brands','Automate Meta and Google ads, AI creatives, CRM, store operations, SEO, GEO and finance for your D2C brand in one dashboard. Start with 200 free credits.','/'],
 pricing:['ARINE Pricing | Plans, Credits and Top-ups in INR','Compare ARINE Starter, Growth, Scale and Enterprise plans. Monthly credits, yearly savings and flexible top-ups. Start with 200 free credits.','/pricing'],
 signup:['Sign Up for ARINE | Get 200 Free Credits','Create your ARINE account and get 200 free credits to automate ads, creatives, CRM, store, SEO and finance for your D2C brand.','/signup'],
 about:['About ARINE | The Operating System for D2C Growth','ARINE brings research, marketing, operations, analytics and business intelligence into one AI ecosystem for D2C and e-commerce brands.','/about'],
 events:['ARINE Events | D2C Growth Workshops and Meetups','Join ARINE workshops, clinics and meetups on Meta ads, e-commerce growth and automation for D2C founders and marketers.','/events'],
 careers:['Careers at ARINE | Developer, Marketing, Sales and Design Jobs','Join ARINE. Open roles for full-stack developers, D2C performance marketers, SaaS sales and UI/UX developers in Mumbai and remote.','/careers'],
 policy:['ARINE Policies | Privacy, Terms, Refunds and Cookies','Read the ARINE privacy policy, terms of service, refund and cancellation policy, cookie policy and data deletion instructions.','/privacy'],
 support:['ARINE Support | Contact Our Team','Get help with ARINE. Send us your query and our team will reply within 24 hours on working days, or browse the Help Centre.','/support'],
 help:['ARINE Help Centre | Guides, Tutorials and FAQs','Step-by-step guides and tutorials for ARINE: getting started, connecting Meta, Google and Shopify, credits, billing, CRM, SEO and more.','/help-centre'],
 creators:['ARINE Creators Program | Make Content, Get Paid','Join the ARINE creators program. Create content for D2C brands and get paid for every approved video and post.','/creators'],
 blog:['ARINE Blog | D2C Growth, Meta Ads and E-commerce Guides','Practical guides on Meta ads, Google ads, Shopify, lead generation and scaling D2C and e-commerce brands from the ARINE team.','/blogs'],
 meta:['Meta Ads Automation for D2C Brands | ARINE','Automate Facebook and Instagram ads with AI: research, audiences, creatives, budgets and reporting on autopilot. Start with 200 free credits.','/meta-ads-automation'],
 google:['Google Ads Automation for E-commerce | ARINE','Automate Google Search, Shopping and Performance Max campaigns, fix your Merchant Center feed and cut wasted ad spend with ARINE.','/google-ads-automation'],
 creative:['AI Ad Creative Generator for D2C Brands | ARINE','Generate on-brand ad creatives, hooks, copy and variations with AI, then test and repeat the winners with the ARINE Creative Engine.','/ai-creative-engine'],
 crm:['CRM Automation for D2C | WhatsApp, Email and SMS | ARINE','Automate customer journeys, segments and replies across WhatsApp, email and SMS to grow repeat orders for your D2C brand.','/crm-automation'],
 store:['Shopify and WooCommerce Store Automation | ARINE','Automate inventory, reorder alerts, order sync and product listings for Shopify and WooCommerce stores with ARINE.','/store-management-automation'],
 seo:['SEO Automation for E-commerce Websites | ARINE','Automated SEO audits, technical fixes, content briefs and rank tracking for D2C and e-commerce websites.','/seo-automation'],
 geo:['GEO: Generative Engine Optimisation for Brands | ARINE','Get your brand cited in ChatGPT, Gemini and other AI answers. Track AI visibility and optimise pages with ARINE GEO automation.','/geo-automation'],
 cfo:['Virtual CFO for D2C Brands | Cash Flow and Margins | ARINE','Track cash flow, product margins and forecasts automatically with the ARINE Virtual CFO, built for D2C and e-commerce founders.','/virtual-cfo'],
 enterprise:['ARINE Enterprise | All Growth Tools on One Dashboard','Run Meta, Google, creative, CRM, store, SEO, GEO and finance automation together on one dashboard for larger brands and agencies.','/enterprise']};
A.PTITLE={'how-to-create-meta-ad-account':'How to Create a Meta Ad Account: Step-by-Step Guide','shopify-vs-woocommerce-best-online-store-builder':'Shopify vs WooCommerce: Which Store Builder Is Best?','how-to-create-a-meta-ads-account-beginners-guide':'How to Create a Meta Ads Account: Beginner\'s Guide','how-to-pitch-d2c-brands-for-meta-ads-management':'How to Pitch D2C Brands for Meta Ads Management','best-d2c-lead-generation-tools-for-freelancers-and-agencies':'Best D2C Lead Generation Tools for Freelancers'};
A.pages['404']=()=>`<section class="wrap ph2" style="min-height:52vh"><span class="eyebrow rv">Error 404</span><h1 class="h1 sm an" style="max-width:14ch">${H(['This page','took a','~detour.'])}</h1><p class="lead rv" style="--d:3">The page you are looking for does not exist or has moved.</p><div class="cta-row rv" style="--d:4"><a class="btn btn-dark" href="#home">Go to home</a><a class="link" href="#help">Visit the Help Centre ${ic('arrow')}</a></div></section>`;
A.SEO['404']=['Page Not Found | ARINE','The page you are looking for does not exist or has moved. Explore ARINE, the AI growth operating system for D2C brands.','/404'];
A.FAQS={meta:META_FAQ,support:FAQ,help:HFAQ,...Object.fromEntries(Object.keys(LAND).map(k=>[k,LAND[k].faq]))};
})();
