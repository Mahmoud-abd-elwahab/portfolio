(()=>{'use strict';
const projects=Array.isArray(window.PORTFOLIO_PROJECTS)?window.PORTFOLIO_PROJECTS:[];
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const num=n=>String(n).padStart(2,'0');
const card=(project,index)=>`<a class="project-card" data-reveal href="case.html?id=${encodeURIComponent(project.key)}" aria-label="Open the complete ${esc(project.name)} project">
  <div class="card-art">
    <span class="card-number">${num(index+1)} / 12</span>
    <img src="${esc(project.cover)}" alt="Original Behance cover for ${esc(project.name)}" loading="${index<4?'eager':'lazy'}" decoding="async">
    <span class="view-circle" aria-hidden="true"><span>VIEW<br>PROJECT ↗</span></span>
  </div>
  <div class="card-meta"><div><h3>${esc(project.name)}</h3><p>${esc(project.tag)} · ${project.imageCount} project boards</p></div><b aria-hidden="true">↗</b></div>
</a>`;
const featured=document.getElementById('featured-projects');
const archive=document.getElementById('archive-projects');
if(featured)featured.innerHTML=projects.slice(0,4).map(card).join('');
if(archive)archive.innerHTML=projects.slice(4).map((p,i)=>card(p,i+4)).join('');

const caseRoot=document.getElementById('case-root');
if(caseRoot){
  const id=new URLSearchParams(location.search).get('id');
  const project=projects.find(item=>item.key===id);
  if(!project){
    document.title='Project not found — Mahmoud Abdel Wahab';
    caseRoot.innerHTML='<section class="case-intro"><h1 class="display">PROJECT NOT FOUND.</h1><p><a class="pill pill-dark" href="index.html#work">Return to all projects ↗</a></p></section>';
  }else{
    const index=projects.indexOf(project);
    const next=projects[(index+1)%projects.length];
    document.title=`${project.name} — Mahmoud Abdel Wahab`;
    const meta=document.querySelector('meta[name="description"]');
    if(meta)meta.content=`Complete ${project.name} project presentation with ${project.imageCount} original portfolio boards.`;
    const gallery=project.images.map((src,imageIndex)=>`<figure data-reveal>
      <a href="${esc(src)}" data-lightbox aria-label="Open artwork ${imageIndex+1} from ${esc(project.name)}">
        <img src="${esc(src)}" alt="${esc(project.name)} — original project artwork ${imageIndex+1} of ${project.imageCount}" loading="${imageIndex<2?'eager':'lazy'}" decoding="async">
      </a>
      <figcaption>${num(imageIndex+1)} / ${num(project.imageCount)}</figcaption>
    </figure>`).join('');
    caseRoot.innerHTML=`<article>
      <header class="case-hero" data-reveal>
        <div class="case-title-wrap"><span class="eyebrow">${esc(project.tag)} &nbsp; / &nbsp; ${num(index+1)} — 12</span><h1 class="display">${esc(project.name)}</h1></div>
        <div class="case-summary"><p>${esc(project.description)}</p><div class="case-facts"><div><b>Discipline</b>${esc(project.discipline)}</div><div><b>Published</b>${esc(project.date)}</div><div><b>Project boards</b>${project.imageCount} in original order</div><div><b>Context</b>${esc(project.context)}</div></div></div>
      </header>
      <img class="case-cover" src="${esc(project.cover)}" alt="Original Behance cover for ${esc(project.name)}" fetchpriority="high">
      <section class="case-intro"><h2 class="display">THE FULL<br>PROJECT.</h2><p>The complete published sequence is shown below without cropping or replacing the original artwork. Mockups, campaign executions and presentation boards remain in their Behance order.</p></section>
      <div class="case-progress"><span>ORIGINAL PROJECT SEQUENCE</span><span>${project.imageCount} BOARDS ↓</span></div>
      <section class="case-gallery" aria-label="Complete ${esc(project.name)} project gallery">${gallery}</section>
      <nav class="case-more" aria-label="Next project"><div><span class="case-back">NEXT PROJECT / ${num((index+1)%projects.length+1)}</span><h2 class="display"><a href="case.html?id=${encodeURIComponent(next.key)}">${esc(next.name)} ↗</a></h2></div><a class="pill pill-light" href="index.html#work">All 12 projects ↗</a></nav>
    </article>`;
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
