const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
const root=document.documentElement,control=document.querySelector('.motion-control');
let manualPause=motionQuery.matches;
function applyMotion(){root.classList.toggle('motion-off',manualPause);root.classList.toggle('motion-on',!manualPause);if(control){control.textContent=manualPause?'Enable motion':'Pause motion';control.setAttribute('aria-pressed',String(manualPause))}}
if(control){control.hidden=false;control.addEventListener('click',()=>{manualPause=!root.classList.contains('motion-off');applyMotion()})}applyMotion();motionQuery.addEventListener('change',()=>{manualPause=motionQuery.matches;applyMotion()});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
const progress=document.querySelector('.page-progress i');let pending=false;
function updateProgress(){pending=false;const total=root.scrollHeight-innerHeight;if(progress)progress.style.width=(total?Math.min(100,scrollY/total*100):0)+'%'}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateProgress)}},{passive:true});updateProgress();
const links=[...document.querySelectorAll('[data-lightbox]')];
if(links.length){const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.setAttribute('aria-label','Project image viewer');dialog.innerHTML='<div class="viewer-controls"><button type="button" data-prev aria-label="Previous image">←</button><span aria-live="polite"></span><button type="button" data-next aria-label="Next image">→</button><button type="button" data-close>Close ×</button></div><img alt="">';document.body.append(dialog);let active=0;
function show(index){active=(index+links.length)%links.length;const link=links[active];dialog.querySelector('img').src=link.href;dialog.querySelector('img').alt=link.querySelector('img').alt;dialog.querySelector('span').textContent=(active+1)+' / '+links.length}
links.forEach((link,i)=>link.addEventListener('click',e=>{e.preventDefault();show(i);dialog.showModal();root.classList.add('viewer-open')}));
dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.querySelector('[data-prev]').onclick=()=>show(active-1);dialog.querySelector('[data-next]').onclick=()=>show(active+1);dialog.addEventListener('close',()=>{root.classList.remove('viewer-open');links[active].focus()});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(active+1);if(e.key==='ArrowLeft')show(active-1)});
}
