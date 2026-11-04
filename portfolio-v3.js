(()=>{'use strict';
const priority=['uwallet','saudi','uwallet-world-cup','devil','uwallet-2','olivewood','auto','ai','food','big-chips','gym','aqsa'];
const projects=(Array.isArray(window.PORTFOLIO_PROJECTS)?[...window.PORTFOLIO_PROJECTS]:[]).sort((x,y)=>{
 const a=priority.indexOf(x.key), b=priority.indexOf(y.key);
 return (a<0?999:a)-(b<0?999:b);
});
const editorial=window.PORTFOLIO_EDITORIAL||{};
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const num=n=>String(n).padStart(2,'0');
const titleOf=p=>editorial[p.key]?.displayName||p.name;
const card=(project,index)=>`<a class="project-card" data-project="${esc(project.key)}" data-reveal href="case.html?id=${encodeURIComponent(project.key)}" aria-label="Open ${esc(titleOf(project))} project">
  <div class="card-art">
    <span class="card-number">${num(index+1)} / ${num(projects.length)}</span>
    <img src="${esc(project.key==='ai'?project.images[2]:project.key==='saudi'?project.images[4]:project.cover)}" alt="${project.key==='ai'?'Selected multi-brand food artwork':project.key==='saudi'?'Selected Saudi Royal Nutrition family and meal artwork':'Original Behance cover for '+esc(project.name)}" loading="${index<4?'eager':'lazy'}" decoding="async">
    <span class="view-circle" aria-hidden="true"><span>VIEW<br>PROJECT ↗</span></span>
  </div>
  <div class="card-meta"><div><h3>${esc(titleOf(project))}</h3><p>${esc(project.tag)}</p></div><b aria-hidden="true">↗</b></div>
</a>`;
const featured=document.getElementById('featured-projects');
const archive=document.getElementById('archive-projects');
if(featured)featured.innerHTML=projects.slice(0,4).map(card).join('');
if(archive)archive.innerHTML=projects.slice(4,9).map((p,i)=>card(p,i+4)).join('');
const earlier=document.getElementById('secondary-projects');
if(earlier)earlier.innerHTML=projects.slice(9).map((p,i)=>card(p,i+9)).join('');

const caseRoot=document.getElementById('case-root');
const artwork=(project,index,caption='')=>{
  const src=project.images[index];
  if(!src)return '';
  const alt=caption||project.name+' — artwork '+(index+1);
  return `<figure class="case-artwork" data-reveal><a href="${esc(src)}" data-lightbox aria-label="View artwork ${index+1}: ${esc(project.name)}"><img src="${esc(src)}" alt="${esc(alt)}" loading="${(project.key==='uwallet-world-cup'&&[2,3,0].includes(index))||(project.key==='uwallet'&&[3,13].includes(index))?'eager':'lazy'}" decoding="async"></a>${caption?`<figcaption>${esc(caption)}</figcaption>`:''}</figure>`;
};
const overview=(project,info)=>{
  const facts=[['Project type',info.kind||project.discipline],['Source',`<a class="case-source" href="${esc(project.source)}" rel="noopener noreferrer" target="_blank">Original Behance project ↗</a>`]];
  return `<div class="case-overview"><div class="case-overview-heading"><span class="case-label">PROJECT CONTEXT</span><h2>The brief.<br>The work.</h2></div><div class="case-overview-copy"><p>${esc(info.summary||project.description)}</p><dl>${facts.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('')}</dl>${info.credits?`<p class="case-credits"><strong>Contribution &amp; attribution</strong>${esc(info.credits)}</p>`:''}</div></div>`;
};
const sequenceArt=(project,part,captions={})=>{
 if(part.type==='stage'){
  const phase=part.phase||(/typography/i.test(part.title)?'TYPOGRAPHY':/final|applications/i.test(part.title)?'FINAL EXECUTIONS':'VISUAL DEVELOPMENT');
  return `<div class="case-stage" data-reveal><span class="case-stage-eyebrow">${esc(phase)}</span><h3>${esc(part.title)}</h3>${part.description?`<p>${esc(part.description)}</p>`:''}</div>`;
 }
 if(part.type==='image')return artwork(project,part.index,captions[part.index]||'');
 return '';
};
const narrativeSection=(project,section)=>{
 const texts=[['Challenge',section.challenge],['Creative approach',section.approach]].filter(row=>row[1]);
 const visualContent=Array.isArray(section.sequence)?
   section.sequence.map(item=>sequenceArt(project,item,section.captions||{})).join(''):
   (section.artworks||[]).map(idx=>artwork(project,idx,section.captions?.[idx]||'')).join('');
 return `<section class="editorial-section" aria-label="${esc(section.title)}"><header class="editorial-section-header"><div><span class="case-label">${esc(section.title)}</span><span class="section-context">${esc(section.eyebrow||'')}</span></div><h2>${esc(section.lead||section.title)}</h2></header><div class="section-story">${texts.map(([title,body])=>`<div><h3>${esc(title)}</h3><p>${esc(body)}</p></div>`).join('')}</div><div class="case-gallery">${visualContent}</div></section>`;
};
const genericGallery=(project,info)=>{
 const hidden=new Set(info.omittedEditorialBoards||[]);
 const originals=project.images.map((_,i)=>i).filter(i=>!hidden.has(i));
 // Keep the original source sequence unless a verified art-direction reason calls for a different sequence.
 let sequence=Array.isArray(info.featureSequence)?info.featureSequence.filter(i=>originals.includes(i)):[...originals];
 // Ensure no source item is lost or inadvertently duplicated.
 sequence=[...new Set([...sequence,...originals])];
 const curated=Array.isArray(info.featuredIndices)?info.featuredIndices:(project.key==='devil'?[0,21,22,24,25,26,27,28]:sequence);
 const representedByCaseHero=project.key==='ai'?2:project.key==='saudi'?4:null;
 const featured=[...new Set(curated)].filter(i=>sequence.includes(i)&&!hidden.has(i)&&i!==representedByCaseHero).slice(0,8);
 const show=new Set(featured);
 const extra=sequence.filter(i=>!show.has(i)&&i!==representedByCaseHero);
 const body=`<section class="case-selected" aria-label="Selected project visuals">${info.featureIntro?`<p class="case-feature-intro">${esc(info.featureIntro)}</p>`:''}<div class="case-gallery">${featured.map(i=>artwork(project,i)).join('')}</div></section>`;
 return body+(extra.length?`<details class="case-process case-source-gallery"><summary><span>More source boards <small>(${extra.length} additional boards)</small></span><span class="summary-action">Explore all +</span></summary><p>Additional project boards are preserved in their source order. They include alternate executions, presentation details and process documentation.</p><div class="case-gallery">${extra.map(i=>artwork(project,i)).join('')}</div></details>`:'' );
};

if(caseRoot){
 const id=new URLSearchParams(location.search).get('id');
 const project=projects.find(p=>p.key===id);
 if(!project){
   document.title='Project not found — Mahmoud Abdel Wahab';
   caseRoot.innerHTML='<section class="case-intro"><h1 class="display">PROJECT NOT FOUND.</h1><p><a class="pill pill-dark" href="index.html#work">Return to all projects ↗</a></p></section>';
 }else{
   const info=editorial[project.key]||{};
   const index=projects.indexOf(project);
   const next=projects[(index+1)%projects.length];
   document.title=titleOf(project)+' — Mahmoud Abdel Wahab';
   const meta=document.querySelector('meta[name="description"]');
   if(meta)meta.content=(info.summary||project.description).slice(0,155);
   const heroSrc=project.key==='ai'?project.images[2]:project.key==='saudi'?project.images[4]:project.cover;
   const heroAlt=project.key==='ai'?'Selected food advertising artwork from the multi-brand collection':project.key==='saudi'?'Selected Saudi Royal Nutrition family and meal advertising artwork':'Original '+project.name+' project cover';
   const selected=Array.isArray(info.sections)&&info.sections.length;
   const gallery=selected?
     info.sections.map(s=>narrativeSection(project,s)).join('')+
     (info.process?`<details class="case-process"><summary><span>${esc(info.process.title)}</span><span class="summary-action">Explore process +</span></summary><p>${esc(info.process.intro||'')}</p><div class="case-gallery">${info.process.artworks.map(i=>artwork(project,i)).join('')}</div></details>`:''):
     `${info.challenge||info.approach?`<section class="case-story-compact"><h2>Creative approach</h2>${info.challenge?`<p>${esc(info.challenge)}</p>`:''}${info.approach?`<p>${esc(info.approach)}</p>`:''}</section>`:''}${genericGallery(project,info)}`;
   caseRoot.innerHTML=`<article class="portfolio-case"><header class="case-hero" data-reveal><div class="case-title-wrap"><span class="eyebrow">${esc(project.tag)} / ${num(index+1)} — ${num(projects.length)}</span><h1 class="display">${esc(titleOf(project))}</h1></div><div class="case-summary"><p>${esc(info.kind||project.discipline)}</p><span>Selected artwork and case context ↓</span></div></header><img class="case-cover" src="${esc(heroSrc)}" alt="${esc(heroAlt)}" fetchpriority="high">${overview(project,info)}${gallery}<nav class="case-more" aria-label="Next project"><div><span class="case-back">NEXT PROJECT / ${num((index+1)%projects.length+1)}</span><h2 class="display"><a href="case.html?id=${encodeURIComponent(next.key)}">${esc(titleOf(next))} ↗</a></h2></div><a class="pill pill-light" href="index.html#work">All ${projects.length} projects ↗</a></nav></article>`;
 }
}

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.header-links');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('is-open',!open);document.body.classList.toggle('is-menu-open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu?.setAttribute('aria-expanded','false');nav.classList.remove('is-open');document.body.classList.remove('is-menu-open')}));

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced)requestAnimationFrame(()=>document.documentElement.classList.add('motion-ready'));
const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(entry.isIntersecting){
  const node=entry.target;
  if(!reduced&&node.animate&&node.matches('.project-card, .case-artwork, .about-portrait')){
   node.animate([{opacity:.62,transform:'translate3d(0,16px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:550,easing:'cubic-bezier(.16,1,.3,1)'});
  }
  node.classList.add('is-visible');
  revealObserver.unobserve(node);
 }
}),{rootMargin:'0px 0px -35px',threshold:.03}):null;
document.querySelectorAll('[data-reveal]').forEach(element=>revealObserver&&!reduced?revealObserver.observe(element):element.classList.add('is-visible'));

const progress=document.getElementById('scroll-progress');
const portrait=document.querySelector('.portrait-crop img');
let scrollFrame=0;
const paintScroll=()=>{scrollFrame=0;const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?scrollY/max*100:0)+'%';if(portrait&&!reduced&&innerWidth>760){const y=Math.max(-28,Math.min(24,scrollY*.045));portrait.style.setProperty('--portrait-y',y+'px')}};
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(paintScroll)},{passive:true});addEventListener('resize',paintScroll,{passive:true});paintScroll();

const cursor=document.querySelector('.site-cursor');
if(cursor&&!reduced&&matchMedia('(hover:hover) and (pointer:fine)').matches){let dx=-100,dy=-100,x=-100,y=-100;addEventListener('pointermove',event=>{dx=event.clientX;dy=event.clientY},{passive:true});document.addEventListener('pointerover',event=>cursor.classList.toggle('is-over',Boolean(event.target.closest('a,button'))));const tick=()=>{x+=(dx-x)*.15;y+=(dy-y)*.15;cursor.style.left=x+'px';cursor.style.top=y+'px';requestAnimationFrame(tick)};requestAnimationFrame(tick)}

const lightbox=document.querySelector('.lightbox');
const lightboxImage=lightbox?.querySelector('img');
let lastLightboxTrigger=null;
const closeLightbox=()=>{if(!lightbox||lightbox.hidden)return;lightbox.hidden=true;if(lightboxImage)lightboxImage.removeAttribute('src');document.body.style.overflow='';lastLightboxTrigger?.focus();lastLightboxTrigger=null};
document.addEventListener('click',event=>{const link=event.target.closest('a[data-lightbox]');if(link&&lightbox&&lightboxImage){event.preventDefault();lastLightboxTrigger=link;lightboxImage.src=link.href;lightboxImage.alt=link.querySelector('img')?.alt||'Artwork preview';lightbox.hidden=false;document.body.style.overflow='hidden';lightbox.querySelector('.lightbox-close')?.focus()}if(event.target===lightbox||event.target.closest('.lightbox-close'))closeLightbox()});
addEventListener('keydown',event=>{
 if(event.key==='Escape')closeLightbox();
 if(event.key==='Tab'&&lightbox&&!lightbox.hidden){event.preventDefault();lightbox.querySelector('.lightbox-close')?.focus()}
});
})();
