document.documentElement.lang='en-IN';
(()=>{
'use strict';
const {$,$$,reduce,ic,navHTML,mmHTML,footHTML,POL,state}=A;
const view=$('#view'),nav=$('#nav'),mm=$('#mm');
nav.innerHTML=navHTML();mm.innerHTML=mmHTML();$('#foot').innerHTML=footHTML();
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

/* ---------- counters ---------- */
const fmtc=(el,v)=>{const d=+(el.dataset.dec||0);return (el.dataset.pre||'')+(d?v.toFixed(d):Math.round(v).toLocaleString('en-US'))+(el.dataset.suf||'')};
function count(el){if(el.dataset.done)return;el.dataset.done=1;const to=+el.dataset.count,from=+(el.dataset.from||0);
 if(reduce){el.textContent=fmtc(el,to);return}
 const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1600),e=1-Math.pow(1-k,4);el.textContent=fmtc(el,from+(to-from)*e);if(k<1)requestAnimationFrame(f)})(t0)}
function tween(el,to,dur=700){const from=+el.textContent.replace(/[^\d.]/g,'')||0,fm=el.hasAttribute('data-inr')?v=>Math.round(v).toLocaleString('en-IN'):Math.round;if(reduce){el.textContent=fm(to);return}
 const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fm(from+(to-from)*e);if(k<1)requestAnimationFrame(f)})(t0)}

/* ---------- reveal ---------- */
let io=null;
function observe(){
 const els=$$('.rv,.an',view);
 if(reduce||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));$$('[data-count]',view).forEach(count);return}
 $$('[data-count]',view).forEach(el=>{el.textContent=fmtc(el,+(el.dataset.from||0))});
 io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const e=en.target;e.classList.add('in');$$('[data-count]',e).forEach(count);io.unobserve(e)}),{threshold:.15,rootMargin:'0px 0px -5% 0px'});
 els.forEach(e=>io.observe(e));
}

/* ---------- scroll hooks ---------- */
let hooks=[],cleanup=[],ticking=false;
function onScroll(){nav.classList.toggle('solid',scrollY>8);hooks.forEach(f=>f())}
addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;onScroll()})},{passive:true});
addEventListener('resize',onScroll);

function story(){const s=$('.story');if(!s||reduce)return;
 const st=$$('.st',s),cr=$$('.cr',s),nd=$$('.nd',s),pg=$$('.pg i',s),ring=$('.ring-p',s);let cur=-1;
 hooks.push(()=>{const r=s.getBoundingClientRect(),p=clamp(-r.top/(r.height-innerHeight),0,1),i=Math.min(3,Math.floor(p*4));
  ring.style.strokeDashoffset=(1-p)*100;
  if(i!==cur){cur=i;[st,cr,nd,pg].forEach(a=>a.forEach((e,k)=>e.classList.toggle('on',k===i)))}})}
function parallax(){
 const sb=$('[data-par]');if(sb&&!reduce)hooks.push(()=>{sb.style.transform=`translateY(${Math.min(scrollY,700)*.07}px)`});
 const sc=$('[data-scale]');if(sc&&!reduce)hooks.push(()=>{const r=sc.getBoundingClientRect(),k=clamp((innerHeight-r.top)/(innerHeight*.7),0,1);sc.style.setProperty('--s',(.93+.07*k).toFixed(3))});
 const bd=$('.band .sunbg');if(bd&&!reduce)hooks.push(()=>{const r=bd.parentElement.getBoundingClientRect(),p=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);bd.style.setProperty('--py',(p*-70+35).toFixed(1)+'px')})}
function clocks(){const cl=$$('.clk');if(!cl.length)return;const fm={};
 const tick=()=>cl.forEach(c=>{const tz=c.dataset.tz,f=fm[tz]||(fm[tz]=new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}));
  const o={};f.formatToParts(new Date()).forEach(p=>{if(p.type!=='literal')o[p.type]=+p.value});
  const h=o.hour,m=o.minute,s=o.second;
  $('[data-h]',c).setAttribute('transform',`rotate(${(h%12)*30+m*.5} 50 50)`);
  $('[data-m]',c).setAttribute('transform',`rotate(${m*6+s*.1} 50 50)`);
  $('[data-s]',c).setAttribute('transform',`rotate(${s*6} 50 50)`);
  $('[data-t]',c).textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
  c.classList.toggle('day',h>=6&&h<18)});
 tick();const id=setInterval(tick,1000);cleanup.push(()=>clearInterval(id))}

/* ---------- pages ---------- */
function renderPol(k){const c=$('#pol-c');if(!c)return;c.innerHTML=`<h2 class="h2">${A.POLT[k]||k}</h2><p class="upd">${A.POLD[k]||''}</p>`+POL[k].map(([t,p])=>`<h3 class="h3">${t}</h3><p>${p}</p>`).join('')}
function est(){const e=$('[data-est]');if(!e)return;const r=$('#vids'),amt=$('[data-amt]',e),vl=$('[data-vl]',e);
 const rate=()=>+$('[data-lv] .on',e).dataset.rate;
 const up=(anim)=>{const v=+r.value;vl.textContent=v;r.style.setProperty('--p',((v-2)/28*100)+'%');const t=v*rate();if(anim)tween(amt,t,500);else amt.textContent=t};
 e._up=up;up(false)}

const MAIL_TO='arine.soem@gmail.com';
function mailSend(f,done){
 const btn=$('button[type=submit]',f),lbl=btn.textContent,old=$('.send-err',f);old&&old.remove();
 const file=f.elements.resume&&f.elements.resume.files[0];
 const fail=m=>{btn.disabled=false;btn.textContent=lbl;const p=document.createElement('p');p.className='send-err';
  const body=[...new FormData(f)].filter(x=>typeof x[1]==='string').map(x=>x[0]+': '+x[1]).join('\n');
  p.innerHTML=m+' <a href="mailto:'+MAIL_TO+'?subject='+encodeURIComponent(f.id==='job-form'?'Job application':'Support query')+'&body='+encodeURIComponent(body)+'">Send by email instead</a>';f.appendChild(p)};
 if(file&&file.size>5*1024*1024){fail('Your resume is larger than 5 MB.');return}
 btn.disabled=true;btn.textContent='Sending…';
 const fd=new FormData(f);fd.append('_subject',f.id==='job-form'?'ARINE careers: '+f.elements.role.value+' – '+f.elements.name.value:'ARINE support query – '+f.elements.name.value);fd.append('_template','table');fd.append('_captcha','false');
 if(f.elements.email)fd.append('_replyto',f.elements.email.value);
 fetch('https://formsubmit.co/ajax/'+MAIL_TO,{method:'POST',body:fd,headers:{Accept:'application/json'}}).then(r=>r.json()).then(j=>{if(j&&(j.success===true||j.success==='true'))done();else throw 0}).catch(()=>fail('We could not send this right now.'))}
function bindForms(){$$('form.form',view).forEach(f=>f.addEventListener('submit',ev=>{ev.preventDefault();let ok=true;
 $$('[required]',f).forEach(i=>{const v=i.value.trim(),bad=!v||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(v))||(i.type==='tel'&&!/^[+()\d][\d\s()-]{6,}$/.test(v));i.closest('.fld').classList.toggle('err',bad);if(bad)ok=false});
 if(!ok){const b=$('.err input,.err textarea,.err select',f);b&&b.focus();return}
 const n=(f.elements.name?f.elements.name.value.trim().split(' ')[0]:''),T={
  'su-form':[`You're in, ${n}.`,'We will set up your workspace and send the next steps to your inbox.'],
  'ct-form':['Query received.','Thank you. Our team will connect with you within 24 hours on working days.'],
  'job-form':['Application received.','Thank you for applying. We will contact shortlisted candidates by email.'],
  'cr-form':['Application received.','We review creator applications every week.'],
  'lead-form':[`Thanks, ${n}.`,'We will reach out shortly.']}[f.id]||['Thanks.','We will be in touch.'];
 const done=()=>{f.parentElement.innerHTML=`<div class="ok-box"><svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" pathLength="1"/><path d="M17 29l8 8 14-16" pathLength="1"/></svg><h3>${T[0]}</h3><p>${T[1]}</p>${f.id==='su-form'?'<a class="link" href="#meta" style="margin-top:8px">Explore features '+A.ic('arrow')+'</a>':''}</div>`};if(f.hasAttribute('data-mail'))mailSend(f,done);else done()}))}

/* one delegated click handler for the whole view */
view.addEventListener('click',e=>{const t=e.target;let el;
 if(el=t.closest('[data-to]')){e.preventDefault();const go=()=>{const x=$(el.dataset.to);if(x){x.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});const a=x.matches('.acc')?x:null;a&&a.querySelector('button').click()}};const r=el.dataset.r0||el.getAttribute('href').replace(/^#/,'');if(key()!==r){navTo(r);setTimeout(go,500)}else go();return}
 if(el=t.closest('[data-apply]')){e.preventDefault();const s=$('#f-role');if(s)s.value=el.dataset.apply;$('#apply-job').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});return}
 if(el=t.closest('.acc>button')){const a=el.parentElement,o=!a.classList.contains('open');a.classList.toggle('open',o);el.setAttribute('aria-expanded',o);return}
 if(el=t.closest('[data-plan]')){state.plan=el.dataset.plan;return}
 if(el=t.closest('[data-bill]')){const tg=el.closest('[data-tg]'),y=el.dataset.bill==='y';tg.dataset.y=y?1:0;$$('button',tg).forEach(b=>b.classList.toggle('on',b===el));$$('[data-price]').forEach(p=>tween(p,+p.dataset[y?'y':'m']));$$('[data-bnote]').forEach(n=>n.textContent=n.dataset[y?'y':'m']);return}
 if(el=t.closest('[data-vid]')){openVid(el.dataset.vid);return}
 if(el=t.closest('[data-bf] .fc2')){$$('.fc2',el.parentElement).forEach(b=>b.classList.toggle('on',b===el));$$('.bc').forEach(v=>v.classList.toggle('hide',el.dataset.f!=='All'&&v.dataset.cat!==el.dataset.f));return}
 if(el=t.closest('[data-rail]')){$('[data-rail-box]').scrollBy({left:+el.dataset.rail*360,behavior:reduce?'auto':'smooth'});return}
 if(el=t.closest('[data-evf] .fc2')){$$('.fc2',el.parentElement).forEach(b=>b.classList.toggle('on',b===el));$$('.ev').forEach(v=>v.classList.toggle('hide',el.dataset.f!=='All'&&v.dataset.type!==el.dataset.f));return}
 if(el=t.closest('[data-rf] .fc2')){$$('.fc2',el.parentElement).forEach(b=>b.classList.toggle('on',b===el));$$('.acc[data-dept]').forEach(v=>v.classList.toggle('hide',el.dataset.f!=='All'&&v.dataset.dept!==el.dataset.f));return}
 if(el=t.closest('[data-save]')){const on=el.classList.toggle('on');el.textContent=on?'Seat saved':'Save a seat';return}
 if(el=t.closest('[data-pol]')){const c=$('#pol-c');$$('[data-pol]').forEach(b=>b.classList.toggle('on',b===el));c.classList.add('sw');setTimeout(()=>{renderPol(el.dataset.pol);c.classList.remove('sw')},170);return}
 if(el=t.closest('[data-scroll]')){e.preventDefault();$('[data-apply]').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});return}
 if(el=t.closest('[data-lv] button')){$$('button',el.parentElement).forEach(b=>b.classList.toggle('on',b===el));$('[data-est]')._up(true);return}
});
view.addEventListener('input',e=>{const t=e.target;
 if(t.id==='vids'){$('[data-est]')._up(true);return}
 if(t.id==='hq'){const q=t.value.trim().toLowerCase();let n=0;$$('[data-hs-i]').forEach(a=>{const m=!q||a.textContent.toLowerCase().includes(q);a.style.display=m?'':'none';if(m)n++});$$('.hc-g').forEach(g=>{g.style.display=[...g.querySelectorAll('[data-hs-i]')].some(x=>x.style.display!=='none')?'':'none'});$('#hq-none').style.display=n?'none':'block'}
 if(t.id==='sq'){const q=t.value.trim().toLowerCase();let n=0;$$('#faq .acc').forEach(a=>{const m=!q||a.textContent.toLowerCase().includes(q);a.style.display=m?'':'none';if(m)n++});$('#faq-none').style.display=n?'none':'block'}});

/* ---------- home interactions ---------- */
function openVid(id){
 const v=A.VID.find(x=>x.id===id);if(!v||$('#vmod'))return;
 const src=A.VIDSRC[id],m=document.createElement('div');
 m.className='vmod';m.id='vmod';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label',v.label);
 m.innerHTML=`<div class="vmb"></div><div class="vmc"><button class="vx" aria-label="Close">${ic('plus')}</button><div class="vmh"><b>${v.label}</b><span class="mute">${src?'':'Animated preview'}</span></div><div class="vms an">${src?`<video src="${src}" controls autoplay muted loop playsinline></video>`:A.VIZ[id]()}</div></div>`;
 document.body.appendChild(m);document.body.classList.add('vlock');
 const esc=e=>{if(e.key==='Escape')close()};
 const close=()=>{m.classList.remove('open');document.body.classList.remove('vlock');document.removeEventListener('keydown',esc);setTimeout(()=>m.remove(),320)};
 document.addEventListener('keydown',esc);
 m.addEventListener('click',e=>{if(e.target.closest('.vx')||e.target.classList.contains('vmb'))close()});
 requestAnimationFrame(()=>{m.classList.add('open');$$('.an',m).forEach(e=>e.classList.add('in'));$$('[data-count]',m).forEach(el=>{el.textContent=fmtc(el,+(el.dataset.from||0));count(el)});$('.vx',m).focus()});
}
function calcInit(){
 const c=$('[data-calc]');if(!c)return;
 let cur='INR';const RNG={INR:[2e5,5e7],USD:[5e3,1e6]};
 const nice=v=>{const p=Math.pow(10,Math.floor(Math.log10(v))-1);return Math.round(v/p)*p};
 const money=v=>cur==='INR'?'₹'+(v>=1e7?(v/1e7).toFixed(2)+' Cr':v>=1e5?(v/1e5).toFixed(1)+' L':Math.round(v).toLocaleString('en-IN')):'$'+(v>=1e6?(v/1e6).toFixed(2)+'M':v>=1e3?(v/1e3).toFixed(1)+'k':Math.round(v));
 const tw=(el,to,f)=>{const from=el._v||0;el._v=to;if(reduce){el.textContent=f(to);return}cancelAnimationFrame(el._r);const t0=performance.now();(function s(t){const k=Math.min(1,(t-t0)/450),e=1-Math.pow(1-k,3);el.textContent=f(from+(to-from)*e);if(k<1)el._r=requestAnimationFrame(s)})(t0)};
 const g=s=>$(s,c);
 function upd(){
  const [lo,hi]=RNG[cur],t=+g('#c-rev').value/100,rev=nice(lo*Math.pow(hi/lo,t)),a=+g('#c-ads').value,rp=+g('#c-rep').value;
  const spend=rev*a/100,paid=Math.min(spend*2.5,rev*.8),rep=rev*rp/100,org=Math.max(0,rev-paid-rep);
  const e1=paid*.18,e2=rep*.25,e3=org*.1,ex=e1+e2+e3;
  g('[data-v="rev"]').textContent=money(rev);g('[data-v="ads"]').textContent=a+'% · '+money(spend);g('[data-v="rep"]').textContent=rp+'%';
  ['#c-rev','#c-ads','#c-rep'].forEach(s=>{const i=g(s);i.style.setProperty('--p',((i.value-i.min)/(i.max-i.min)*100)+'%')});
  tw(g('[data-out=extra]'),ex,money);
  const mx=Math.max(e1,e2,e3,1);
  [[e1,'r1'],[e2,'r2'],[e3,'r3']].forEach(([v,k])=>{g(`[data-out=${k}]`).textContent='+'+money(v);g(`[data-bar=${k}]`).style.setProperty('--w',(v/mx*100)+'%')});
  g('[data-out=pct]').textContent='+'+(ex/rev*100).toFixed(1)+'%';
  let yr=0;const pts=[];for(let m=1;m<=12;m++){const f=Math.min(1,m/4);yr+=ex*f;pts.push(rev+ex*f)}
  tw(g('[data-out=year]'),yr,money);
  const W=480,H=150,L=8,R=8,T=16,B=26,ymin=rev*.985,ymax=Math.max(rev+ex*1.15,ymin*1.04);
  const x=i=>L+(W-L-R)*i/11,y=v=>T+(H-T-B)*(1-(v-ymin)/(ymax-ymin));
  const up=pts.map((v,i)=>`${x(i).toFixed(1)},${y(v).toFixed(1)}`),yb=y(rev).toFixed(1);
  g('.cg').innerHTML=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Twelve month revenue projection"><path d="M${up.join('L')}L${x(11).toFixed(1)},${yb}L${x(0).toFixed(1)},${yb}Z" fill="#0C3341" fill-opacity=".1"/><path d="M${x(0).toFixed(1)},${yb}H${x(11).toFixed(1)}" stroke="#C2C9D6" stroke-width="2" stroke-dasharray="4 5" fill="none"/><path d="M${up.join('L')}" fill="none" stroke="#0C3341" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${x(11).toFixed(1)}" cy="${y(pts[11]).toFixed(1)}" r="5" fill="#E8503E"/>${[0,5,11].map(i=>`<text class="tk" x="${x(i).toFixed(1)}" y="${H-6}" text-anchor="${i===0?'start':i===11?'end':'middle'}">Month ${i+1}</text>`).join('')}</svg>`;
 }
 $$('input[type=range]',c).forEach(i=>i.addEventListener('input',upd));
 $$('[data-cur] button',c).forEach(b=>b.addEventListener('click',()=>{cur=b.dataset.c;$$('[data-cur] button',c).forEach(x=>x.classList.toggle('on',x===b));[g('[data-out=extra]'),g('[data-out=year]')].forEach(e=>e._v=0);upd()}));
 upd();
}
function homeInit(){
 const hb=$('[data-hbox]');
 if(hb&&!reduce&&matchMedia('(hover:hover)').matches){
  hb.addEventListener('mousemove',e=>{const r=hb.getBoundingClientRect();hb.style.setProperty('--mx',(((e.clientX-r.left)/r.width-.5)*40).toFixed(1));hb.style.setProperty('--my',(((e.clientY-r.top)/r.height-.5)*40).toFixed(1))});
  hb.addEventListener('mouseleave',()=>{hb.style.setProperty('--mx',0);hb.style.setProperty('--my',0)});
 }
 const uf=$('#url-form'),msg=$('#url-msg');
 if(uf){
  uf.addEventListener('submit',e=>{e.preventDefault();const v=$('#url').value.trim(),ok=/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v);
   uf.classList.toggle('bad',!ok);msg.textContent=ok?msg.dataset.def:'Enter your store link, like yourstore.com';
   if(!ok){uf.classList.remove('shake');void uf.offsetWidth;uf.classList.add('shake');return}
   const dest='https://app.arineecosystem.com/login?website='+encodeURIComponent(v);
   if(PM)location.href=dest;else window.open(dest,'_blank','noopener')});
  uf.addEventListener('input',()=>{if(uf.classList.contains('bad')){uf.classList.remove('bad');msg.textContent=msg.dataset.def}});
 }
 const rail=$('.vrail');
 if(rail){
  const cards=$$('.vc',rail),dots=$$('[data-vdots] i'),step=()=>cards[1].offsetLeft-cards[0].offsetLeft;
  rail.addEventListener('scroll',()=>{const i=Math.min(cards.length-1,Math.round(rail.scrollLeft/step()));dots.forEach((d,k)=>d.classList.toggle('on',k===i))},{passive:true});
  let paused=false;
  ['mouseenter','touchstart','focusin'].forEach(ev=>rail.addEventListener(ev,()=>{paused=true},{passive:true}));
  ['mouseleave','focusout'].forEach(ev=>rail.addEventListener(ev,()=>{paused=false}));
  rail.addEventListener('touchend',()=>setTimeout(()=>{paused=false},4000),{passive:true});
  if(!reduce){const id=setInterval(()=>{if(paused||document.hidden||$('#vmod')||document.body.classList.contains('lock'))return;
   const r=rail.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
   const max=rail.scrollWidth-rail.clientWidth,nx=rail.scrollLeft+step();rail.scrollTo({left:nx>max-4?0:nx,behavior:'smooth'})},4500);cleanup.push(()=>clearInterval(id))}
  dots.forEach((d,k)=>d.addEventListener('click',()=>rail.scrollTo({left:cards[k].offsetLeft-cards[0].offsetLeft,behavior:'smooth'})));
 }
 calcInit();
}
document.addEventListener('click',e=>{const el=e.target.closest('[data-pol-open]');if(el)state.pol=el.dataset.polOpen});

/* ---------- router ---------- */
const MODIDS=A.MODS.map(m=>m.id),RESIDS=A.RES.map(r=>r[0]);
/* path mode (deployed site): real URLs like /pricing; hash mode (preview): #pricing */
const PM=!!document.querySelector('meta[name="arine-mode"][content="paths"]');
const POLP={'/privacy':'Privacy','/terms':'Terms','/data-deletion':'Data deletion','/refund-policy':'Refunds','/cookie-policy':'Cookies'};
const POLR={};for(const p in POLP)POLR[POLP[p]]=p;
function pathOf(r,pol){if(r.startsWith('blog-'))return '/blogs/'+r.slice(5);if(r==='policy'&&pol&&POLR[pol])return POLR[pol];const s=(A.SEO||{})[r];return s?s[2]:'/'}
function routeOfPath(p){p=p.replace(/\.html$/,'').replace(/\/+$/,'')||'/';if(p.startsWith('/blogs/'))return 'blog-'+p.slice(7);if(POLP[p]){state.pol=state.pol||POLP[p];return 'policy'}const S=A.SEO||{};for(const k in S)if(S[k][2]===p)return k;return p==='/'?'home':'404'}
const key=()=>{if(location.hash.length>1){const h=location.hash.slice(1).split('?')[0];if(A.pages[h]||h.startsWith('blog-'))return h}return PM?routeOfPath(location.pathname):'home'};
function navTo(r,pol){if(PM){history.pushState(null,'',pathOf(r,pol));route()}else location.hash=r}
function linkify(root){if(!PM||!root)return;root.querySelectorAll('a[href^="#"]').forEach(a=>{const r=a.getAttribute('href').slice(1);if(!r||!(A.pages[r]||r.startsWith('blog-')))return;a.dataset.r0=r;a.setAttribute('href',pathOf(r,a.dataset.polOpen))})}
if(PM){document.addEventListener('click',e=>{if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const a=e.target.closest('a[data-r0]');if(!a||a.target)return;e.preventDefault();if(a.dataset.polOpen)state.pol=a.dataset.polOpen;const r=a.dataset.r0;const same=pathOf(r,a.dataset.polOpen)===location.pathname;if(same&&r!=='policy'){scrollTo({top:0,behavior:reduce?'auto':'smooth'});return}history.pushState(null,'',pathOf(r,a.dataset.polOpen));route()});
 addEventListener('popstate',()=>route());
 if(location.hash.length>1){const h=location.hash.slice(1);if(A.pages[h]||h.startsWith('blog-'))history.replaceState(null,'',pathOf(h))}
 linkify(nav);linkify(mm);linkify($('#foot'))}
function setNav(k){$$('nav [data-r], .nav [data-r]').forEach(a=>a.classList.toggle('on',a.dataset.r===k||(k.startsWith('blog-')&&a.dataset.r==='blog')));
 $('[data-m="features"]').classList.toggle('on',MODIDS.includes(k));$('[data-m="resources"]').classList.toggle('on',RESIDS.includes(k))}
function setMeta(sel,attr,val){let m=document.head.querySelector(sel);if(!m){m=document.createElement(sel.startsWith('link')?'link':'meta');const a=sel.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/);m.setAttribute(a[1],a[2]);document.head.appendChild(m)}m.setAttribute(attr,val)}
function setSEO(k){const S=A.SEO||{},site=A.SITE||'';let t,d,path,ld=null;
 if(k.startsWith('blog-')){const po=(A.POSTS||[]).find(x=>x.slug===k.slice(5));if(po){const pt=(A.PTITLE||{})[po.slug]||po.title;t=(pt+' | ARINE Blog').length<=60?pt+' | ARINE Blog':pt;d=po.ex;path='/blogs/'+po.slug;ld={"@context":"https://schema.org","@type":"BlogPosting","headline":po.title,"description":po.ex,"datePublished":new Date(po.date).toISOString().slice(0,10),"author":{"@type":"Organization","name":"ARINE Ecosystem"},"publisher":{"@type":"Organization","name":"ARINE Ecosystem"},"mainEntityOfPage":site+path}}}
 const PX={'/terms':['Terms of Service | ARINE','Read the ARINE terms of service covering accounts, ad platform connections, credits, billing and acceptable use.'],'/data-deletion':['Data Deletion Instructions | ARINE','How to disconnect accounts and request deletion of your data from ARINE, including Meta and Google data.'],'/refund-policy':['Refund and Cancellation Policy | ARINE','ARINE refund and cancellation policy for monthly and annual plans, credits and top-ups.'],'/cookie-policy':['Cookie Policy | ARINE','Learn which cookies ARINE uses, why we use them and how you can manage your cookie preferences.']};
 if(k==='policy'&&PM&&PX[location.pathname]){t=PX[location.pathname][0];d=PX[location.pathname][1];path=location.pathname}
 const e=S[k]||S.home;t=t||e[0];d=d||e[1];path=path||e[2];
 if(d&&d.length>160)d=d.slice(0,157).replace(/\s+\S*$/,'')+'…';
 document.title=t;setMeta('meta[name="robots"]','content',k==='404'||k==='signup'?'noindex, follow':'index, follow, max-image-preview:large');setMeta('meta[name="description"]','content',d);setMeta('link[rel="canonical"]','href',site+(k==='404'?'/':path));
 setMeta('meta[property="og:title"]','content',t);setMeta('meta[property="og:description"]','content',d);setMeta('meta[property="og:url"]','content',site+path);
 setMeta('meta[name="twitter:title"]','content',t);setMeta('meta[name="twitter:description"]','content',d);
 const f=(A.FAQS||{})[k];if(!ld&&f&&f.length)ld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":f.map(q=>({"@type":"Question","name":q[0],"acceptedAnswer":{"@type":"Answer","text":q[1]}}))};
 let s=document.getElementById('ld-route');if(!s){s=document.createElement('script');s.type='application/ld+json';s.id='ld-route';document.head.appendChild(s)}s.textContent=ld?JSON.stringify(ld):'{}'}
function mount(k){
 cleanup.forEach(f=>f());cleanup=[];hooks=[];if(io){io.disconnect();io=null}
 view.innerHTML=(A.pages[k]||(k.startsWith('blog-')&&A.pageBlog(k.slice(5)))||A.pages.home)();linkify(view);
 scrollTo(0,0);setNav(k);closeAll();setSEO(k);
 observe();bindForms();story();parallax();clocks();renderPol(state.pol||'Privacy');state.pol=null;est();homeInit();if(k==='pricing'){ctuBind();priceRefresh()}
 requestAnimationFrame(()=>{view.classList.remove('out');onScroll()});
}
let tok=0;
function ctuBind(){const w=$('[data-ctu]',view);if(!w)return;const amt=$('#ctu-amt',w),rg=$('.range',w),out=$('[data-ctu-out]',w),er=$('[data-ctu-err]',w),mn=+w.dataset.min,mx=+w.dataset.max,rt=+w.dataset.rate;
 const fill=()=>rg.style.setProperty('--p',((+rg.value-+rg.min)/(+rg.max-+rg.min)*100)+'%');
 const up=v=>{const n=+v;if(!n||n<mn||n>mx){er.textContent='Enter an amount between ₹'+mn.toLocaleString('en-IN')+' and ₹'+mx.toLocaleString('en-IN')+'.';out.textContent='—';return}er.textContent='';out.textContent=Math.floor(n*rt).toLocaleString('en-IN')};
 amt.addEventListener('input',()=>{up(amt.value);if(+amt.value<=+rg.max){rg.value=amt.value;fill()}});rg.addEventListener('input',()=>{amt.value=rg.value;fill();up(rg.value)});fill()}
let priceLive=0;function priceRefresh(){if(priceLive)return;priceLive=1;const c=new AbortController();setTimeout(()=>c.abort(),6000);
 fetch(A.PRICE_API,{signal:c.signal,headers:{Accept:'application/json'}}).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>{if(!d||!Array.isArray(d.plans)||!d.plans.length)return;const same=JSON.stringify(d)===JSON.stringify(A.PRICE);A.PRICE=d;if(!same&&key()==='pricing')mount('pricing')}).catch(()=>{})}
function route(first){const k=key();if(first||reduce){mount(k);return}view.classList.add('out');const t=++tok;setTimeout(()=>{if(t===tok)mount(k)},210)}
addEventListener('hashchange',()=>route());

/* ---------- nav behaviour ---------- */
let ot;
const openMega=m=>{clearTimeout(ot);if(m)nav.dataset.open=m;else delete nav.dataset.open;$$('[data-m]',nav).forEach(b=>b.setAttribute('aria-expanded',b.dataset.m===m))};
const setMenu=o=>{document.body.classList.toggle('lock',o);$('.burger',nav).setAttribute('aria-expanded',o)};
function closeAll(){openMega(null);setMenu(false)}
$$('[data-m]',nav).forEach(b=>{b.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)openMega(b.dataset.m)});b.addEventListener('click',()=>openMega(nav.dataset.open===b.dataset.m?null:b.dataset.m))});
nav.addEventListener('mouseleave',()=>{ot=setTimeout(()=>openMega(null),140)});
nav.addEventListener('mouseenter',()=>clearTimeout(ot));
$('.burger',nav).addEventListener('click',()=>setMenu(!document.body.classList.contains('lock')));
mm.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
nav.addEventListener('click',e=>{if(e.target.closest('.mega a'))openMega(null)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
document.addEventListener('click',e=>{if(!nav.contains(e.target))openMega(null)});

route(true);
})();
