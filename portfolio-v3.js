(()=>{'use strict';
const priority=['uwallet','uwallet-world-cup','saudi','devil','uwallet-2','olivewood','auto','ai','food','big-chips','gym','aqsa'];
const projects=(Array.isArray(window.PORTFOLIO_PROJECTS)?[...window.PORTFOLIO_PROJECTS]:[]).sort((x,y)=>{
 const a=priority.indexOf(x.key), b=priority.indexOf(y.key);
 return (a<0?999:a)-(b<0?999:b);
});
const editorial=window.PORTFOLIO_EDITORIAL||{};
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const num=n=>String(n).padStart(2,'0');
const card=(project,index)=>`<a class="project-card" data-reveal href="case.html?id=${encodeURIComponent(project.key)}" aria-label="Open the complete ${esc(project.name)} project">
  <div class="card-art">
    <span class="card-number">${num(index+1)} / ${num(projects.length)}</span>
    <img src="${esc(project.cover)}" alt="Original Behance cover for ${esc(project.name)}" loading="${index<4?'eager':'lazy'}" decoding="async">
    <span class="view-circle" aria-hidden="true"><span>VIEW<br>PROJECT ↗</span></span>
  </div>
  <div class="card-meta"><div><h3>${esc(project.name)}</h3><p>${esc(project.tag)}</p></div><b aria-hidden="true">↗</b></div>
</a>`;
const featured=document.getElementById('featured-projects');
const archive=document.getElementById('archive-projects');
if(featured)featured.innerHTML=projects.slice(0,4).map(card).join('');
if(archive)archive.innerHTML=projects.slice(4).map((p,i)=>card(p,i+4)).join('');

const caseRoot=document.getElementById('case-root');
const artwork=(project,index,caption='')=>{
  const src=project.images[index];
  if(!src)return '';
  const alt=caption||project.name+' — artwork '+(index+1);
  return `<figure class="case-artwork" data-reveal><a href="${esc(src)}" data-lightbox aria-label="View artwork ${index+1}: ${esc(project.name)}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"></a>${caption?`<figcaption>${esc(caption)}</figcaption>`:''}</figure>`;
};
const overview=(project,info)=>{
  const facts=[['Project type',info.kind||project.discipline],['Source',`<a class="case-source" href="${esc(project.source)}" rel="noopener noreferrer" target="_blank">Original Behance project ↗</a>`]];
  return `<div class="case-overview"><div class="case-overview-heading"><span class="case-label">PROJECT CONTEXT</span><h2>What this work<br>is about.</h2></div><div class="case-overview-copy"><p>${esc(info.summary||project.description)}</p><dl>${facts.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('')}</dl>${info.credits?`<p class="case-credits"><strong>Contribution &amp; attribution</strong>${esc(info.credits)}</p>`:''}</div></div>`;
};
const narrativeSection=(project,section)=>{
 const texts=[['Challenge',section.challenge],['Creative approach',section.approach]].filter(row=>row[1]);
 return `<section class="editorial-section" aria-label="${esc(section.title)}"><header class="editorial-section-header"><div><span class="case-label">${esc(section.title)}</span><span class="section-context">${esc(section.eyebrow||'')}</span></div><h2>${esc(section.lead||section.title)}</h2></header><div class="section-story">${texts.map(([title,body])=>`<div><h3>${esc(title)}</h3><p>${esc(body)}</p></div>`).join('')}</div><div class="case-gallery">${section.artworks.map(idx=>artwork(project,idx,section.captions?.[idx]||'')).join('')}</div></section>`;
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
   document.title=project.name+' — Mahmoud Abdel Wahab';
   const meta=document.querySelector('meta[name="description"]');
   if(meta)meta.content=(info.summary||project.description).slice(0,155);
   const selected=Array.isArray(info.sections)&&info.sections.length;
   const gallery=selected?
     info.sections.map(s=>narrativeSection(project,s)).join('')+
     (info.process?`<details class="case-process"><summary><span>${esc(info.process.title)}</span><span class="summary-action">Explore process +</span></summary><p>${esc(info.process.intro||'')}</p><div class="case-gallery">${info.process.artworks.map(i=>artwork(project,i)).join('')}</div></details>`:''):
     `${info.challenge||info.approach?`<section class="case-story-compact"><h2>Creative approach</h2>${info.challenge?`<p>${esc(info.challenge)}</p>`:''}${info.approach?`<p>${esc(info.approach)}</p>`:''}</section>`:''}<div class="case-gallery">${project.images.map((src,i)=>info.omittedEditorialBoards?.includes(i)?'':artwork(project,i)).join('')}</div>`;
   caseRoot.innerHTML=`<article class="portfolio-case"><header class="case-hero" data-reveal><div class="case-title-wrap"><span class="eyebrow">${esc(project.tag)} / ${num(index+1)} — ${num(projects.length)}</span><h1 class="display">${esc(project.name)}</h1></div><div class="case-summary"><p>${esc(info.kind||project.discipline)}</p><span>Original key visuals and case context ↓</span></div></header><img class="case-cover" src="${esc(project.cover)}" alt="Original ${esc(project.name)} project cover" fetchpriority="high">${overview(project,info)}${gallery}<nav class="case-more" aria-label="Next project"><div><span class="case-back">NEXT PROJECT / ${num((index+1)%projects.length+1)}</span><h2 class="display"><a href="case.html?id=${encodeURIComponent(next.key)}">${esc(next.name)} ↗</a></h2></div><a class="pill pill-light" href="index.html#work">All ${projects.length} projects ↗</a></nav></article>`;
 }
}

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.header-links');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('is-open',!open);document.body.classList.toggle('is-menu-open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu?.setAttribute('aria-expanded','false');nav.classList.remove('is-open');document.body.classList.remove('is-menu-open')}));

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{rootMargin:'0px 0px -50px',threshold:.04}):null;
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
const closeLightbox=()=>{if(!lightbox)return;lightbox.hidden=true;if(lightboxImage)lightboxImage.removeAttribute('src');document.body.style.overflow=''};
document.addEventListener('click',event=>{const link=event.target.closest('a[data-lightbox]');if(link&&lightbox&&lightboxImage){event.preventDefault();lightboxImage.src=link.href;lightboxImage.alt=link.querySelector('img')?.alt||'Artwork preview';lightbox.hidden=false;document.body.style.overflow='hidden'}if(event.target===lightbox||event.target.closest('.lightbox-close'))closeLightbox()});
addEventListener('keydown',event=>{if(event.key==='Escape')closeLightbox()});
})();
