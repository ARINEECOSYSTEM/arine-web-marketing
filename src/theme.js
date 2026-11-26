/* ARINE theme interactions: scroll progress, pointer spotlight, 3D tilt, route fade */
(()=>{const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const pg=document.createElement('div');pg.id='prog';document.body.appendChild(pg);
let tk=0;const upd=()=>{tk=0;const h=document.documentElement.scrollHeight-innerHeight;pg.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'};
addEventListener('scroll',()=>{tk||(tk=requestAnimationFrame(upd))},{passive:true});
if(fine&&!reduce){
 document.addEventListener('pointermove',e=>{
  const s=e.target.closest&&e.target.closest('.bt.tint,.bc,.vc');
  if(s){const r=s.getBoundingClientRect();s.style.setProperty('--px',(e.clientX-r.left)+'px');s.style.setProperty('--py',(e.clientY-r.top)+'px')}
  const t=e.target.closest&&e.target.closest('.fh');
  if(t){const v=t.lastElementChild,r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   v.style.transform='perspective(1200px) rotateY('+(x*7).toFixed(2)+'deg) rotateX('+(-y*6).toFixed(2)+'deg) translateZ(0)'}
 },{passive:true});
 document.addEventListener('pointerout',e=>{const t=e.target.closest&&e.target.closest('.fh');if(t&&!t.contains(e.relatedTarget)){t.lastElementChild.style.transform=''}},{passive:true});
}
function reel(el){if(el._r)return;el._r=1;const S=[...el.querySelectorAll('.rs')],C=[...el.querySelectorAll('.rc')],G=[...el.querySelectorAll('.rseg i')],n=S.length,DUR=6000,T=el.querySelector('[data-rt]'),CL=el.querySelector('[data-rc]'),R=el.querySelector('.reel'),CH=el.querySelector('.rl-chap');
 let cur=0,el_=0,t0=0,play=false,vis=false,manual=false,raf=0;
 const fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
 const clock=()=>{CL.textContent=fmt((cur*DUR+el_)/1000)+' / '+fmt(n*DUR/1000)};
 const replay=s=>{const q=s.querySelectorAll('.an,.rv,.in');q.forEach(e=>{if(e.classList.contains('an')||e.classList.contains('rv'))e.classList.remove('in')});void s.offsetWidth;requestAnimationFrame(()=>requestAnimationFrame(()=>q.forEach(e=>{if(e.classList.contains('an')||e.classList.contains('rv'))e.classList.add('in')})))};
 const show=i=>{cur=i;el_=0;replay(S[i]);S.forEach((s,k)=>{s.classList.toggle('on',k===i);const v=s.querySelector('video');if(v){k===i?(v.currentTime=0,v.play().catch(()=>{})):v.pause()}});C.forEach((c,k)=>c.classList.toggle('on',k===i));G.forEach((g,k)=>g.style.setProperty('--f',k<i?1:0));T.textContent=C[i].querySelector('b').textContent;
  const ch=C[i];if(CH.scrollWidth>CH.clientWidth)CH.scrollTo({left:ch.offsetLeft-CH.clientWidth/2+ch.offsetWidth/2,behavior:'smooth'});clock()};
 const tick=ts=>{if(!el.isConnected)return;if(play){if(!t0)t0=ts;el_+=ts-t0;t0=ts;const f=Math.min(1,el_/DUR);G[cur].style.setProperty('--f',f);clock();if(f>=1)show((cur+1)%n)}else t0=0;raf=requestAnimationFrame(tick)};
 const set=p=>{play=p;R.classList.toggle('paused',!p);R.querySelector('[data-rpp]').setAttribute('aria-label',p?'Pause':'Play')};
 el.querySelector('[data-rpp]').addEventListener('click',()=>{manual=play;set(!play)});
 C.forEach((c,i)=>c.addEventListener('click',()=>{show(i);manual=false;set(true)}));
 new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(!manual&&!reduce)set(vis)},{threshold:.35}).observe(R);
 set(false);raf=requestAnimationFrame(tick)}
const view=document.getElementById('view');
const initReels=()=>document.querySelectorAll('[data-reel]').forEach(reel);
if(view){new MutationObserver(()=>{if(!reduce&&view.animate)view.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:520,easing:'cubic-bezier(.16,1,.3,1)'});upd();requestAnimationFrame(initReels)}).observe(view,{childList:true})}
setTimeout(initReels,0);
})();
(()=>{const a=document.getElementById('ann');if(!a)return;try{if(localStorage.getItem('arine_ann')==='x')a.remove()}catch(e){}
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-ann-x]')){const b=document.getElementById('ann');b&&b.classList.add('off');setTimeout(()=>b&&b.remove(),450);try{localStorage.setItem('arine_ann','x')}catch(e){}}})})();

/* analytics events: sent to GA4 (gtag) and Google Tag Manager (dataLayer) when they are on the page */
(()=>{window.arineTrack=(name,params={})=>{try{for(const k in params)if(params[k]===undefined)delete params[k];
 if(typeof window.gtag==='function')window.gtag('event',name,params);
 if(Array.isArray(window.dataLayer))window.dataLayer.push(Object.assign({event:name},params))}catch(e){}};
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href')||'',txt=(a.textContent||'').trim().slice(0,60);
 if(/app\.arineecosystem\.com\/login/.test(h)){
  if(a.dataset.plan)window.arineTrack('select_plan',{plan:a.dataset.plan,location:location.pathname});
  else window.arineTrack(/credit/i.test(txt)?'claim_credits_click':'sign_up_click',{link_text:txt,location:location.pathname})}
 else if(/^mailto:/.test(h))window.arineTrack('email_click',{location:location.pathname})},true)})();
