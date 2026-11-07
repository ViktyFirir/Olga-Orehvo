(()=>{
const loops=[];let fvis=false,frun=false;
const startLoops=()=>{if(frun)return;frun=true;(function t(){if(!fvis){frun=false;return}loops.forEach(fn=>fn());requestAnimationFrame(t)})()};
new IntersectionObserver(e=>{fvis=e[0].isIntersecting;if(fvis)startLoops()},{rootMargin:'60% 0px'}).observe(document.getElementById('site-footer'));
// split headline into animated letters
let n=0;
document.querySelectorAll('[data-split]').forEach(h=>{ n=0;
  const walk=node=>{[...node.childNodes].forEach(c=>{
    if(c.nodeType===3){const frag=document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(t=>{ if(!t)return; if(/^\s+$/.test(t)){frag.append(' ');return}
        const w=document.createElement('span');w.className='w';
        [...t].forEach(ch=>{const s=document.createElement('span');s.className='ch';s.textContent=ch;s.style.setProperty('--i',n++);w.append(s)});frag.append(w)});
      c.replaceWith(frag)}
    else if(c.nodeType===1&&c.tagName!=='svg'&&c.tagName!=='BR')walk(c)})};
  walk(h)});
// duplicate marquee for a seamless loop
const tr=document.getElementById('track');tr.innerHTML+=tr.innerHTML;
// reveal on scroll
const f=document.getElementById('f');
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.3});
document.querySelectorAll('[data-io]').forEach(el=>io.observe(el));
// signature (blue brush lettering) cloned into both places
document.querySelectorAll('#sigw,#fsig').forEach(h=>{h.append(document.getElementById('fsigtpl').content.cloneNode(true));
  h.querySelectorAll('path').forEach((p,i)=>p.style.setProperty('--k',i))});
// draggable slider with inertia
const sl=document.getElementById('slider'),st=document.getElementById('strip');st.innerHTML+=st.innerHTML;
let pos=0,vel=0,drag=false,lx=0,ld=0,hov=false;
sl.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;sl.classList.add('drag');sl.setPointerCapture(e.pointerId)});
sl.addEventListener('pointermove',e=>{if(!drag)return;ld=e.clientX-lx;lx=e.clientX;pos+=ld});
const up=()=>{if(drag){drag=false;vel=-ld;sl.classList.remove('drag')}};
sl.addEventListener('pointerup',up);sl.addEventListener('pointercancel',up);
sl.addEventListener('pointerenter',()=>hov=true);sl.addEventListener('pointerleave',()=>hov=false);
document.getElementById('next').onclick=()=>vel+=18;document.getElementById('prev').onclick=()=>vel-=18;
const cs=document.getElementById('cs'),sw=document.getElementById('sigw');
loops.push(function(){const half=st.scrollWidth/2;
  if(!drag){pos-=(hov?0:.7)+vel;vel*=.92}
  pos%=half;if(pos>0)pos-=half;
  st.style.transform=`translate3d(${pos}px,0,0)`;
  sw.style.setProperty('--px',cs.getBoundingClientRect().top*.18+'px')});
// cursor glow
const card=document.getElementById('card'),glow=document.getElementById('glow');
card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();glow.style.left=e.clientX-r.left+'px';glow.style.top=e.clientY-r.top+'px'});
// 3D tilt of the portrait
const ph=document.getElementById('photo'),tilt=document.getElementById('tilt');
ph.addEventListener('pointermove',e=>{const r=ph.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  tilt.style.transform=`rotateY(${x*22}deg) rotateX(${-y*14}deg)`});
ph.addEventListener('pointerleave',()=>tilt.style.transform='');
// magnetic buttons
document.querySelectorAll('.mag').forEach(b=>{
  b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();
    b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`;
    if(b.classList.contains('cta'))b.style.transform=`translate(calc(-50% + ${(e.clientX-r.left-r.width/2)*.25}px),${(e.clientY-r.top-r.height/2)*.35}px)`});
  b.addEventListener('pointerleave',()=>{b.style.transform=b.classList.contains('cta')?'translateX(-50%)':''})});
// marquee speeds up with scroll
let last=scrollY,lastRate=1;loops.push(()=>{const v=Math.abs(scrollY-last);last=scrollY;const rate=1+Math.min(v/6,5);
  if(rate!==lastRate){lastRate=rate;tr.getAnimations().forEach(a=>a.playbackRate=rate)}});

// hide the main fixed header while the footer is on screen (its own logo/menu are inside the footer)
new IntersectionObserver(e=>document.body.classList.toggle('in-footer',e[0].isIntersecting),{threshold:.35}).observe(document.getElementById('site-footer'));
// photo fallback
document.querySelectorAll('#site-footer .arch img').forEach(im=>{const mark=()=>im.parentElement.classList.add('noimg');im.addEventListener('error',mark);if(im.complete&&!im.naturalWidth)mark()});
})();
