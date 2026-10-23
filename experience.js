const selections={uwallet:[0,7,16],saudi:[3,8,13],devil:[3,15,27],ai:[8,17,24]};
document.querySelectorAll('.work-card').forEach(card=>{
  const id=new URL(card.href).searchParams.get('id'), images=projectAssets[id];
  if(!images)return;
  const selected=selections[id];
  card.querySelector('.work-image img').src=images[selected[0]];
  const strip=document.createElement('div');strip.className='variations';strip.setAttribute('aria-hidden','true');
  selected.forEach(i=>{const img=document.createElement('img');img.src=images[i];img.alt='';img.loading='lazy';strip.append(img)});
  card.querySelector('.work-image').after(strip);
});
const caseRoot=document.querySelector('#case');
if(caseRoot){
  const requested=new URLSearchParams(location.search).get('id');
  const p=all.find(p=>p.id===requested)||all[0], images=projectAssets[p.id];
  const next=all[(all.indexOf(p)+1)%all.length];
  document.title=p.title+' — Mahmoud Abdel Wahab';
  caseRoot.innerHTML=`<a class="back" href="index.html#work">← Selected work</a><header class="case-heading"><div><p class="kicker">${p.type}</p><h1>${p.title}</h1></div><p>Original project boards, visual development and variations.<br>Tap any board to enlarge.</p></header><div class="case-toolbar"><span>${images.length} project boards · original sequence</span><a href="mailto:abwahab1696@gmail.com">Discuss your project ↗</a></div><section class="case-gallery" aria-label="Complete project presentation"></section><div class="case-next"><div><p class="kicker">Next project</p><h2><a href="project.html?id=${next.id}">${next.title} ↗</a></h2></div><a class="button" href="mailto:abwahab1696@gmail.com">Send a brief ↗</a></div>`;
  const gallery=caseRoot.querySelector('.case-gallery'),dialog=document.querySelector('.lightbox');
  images.forEach((src,i)=>{
    const button=document.createElement('button');button.className='case-image';button.setAttribute('aria-label','Enlarge board '+(i+1));
    const img=document.createElement('img');img.alt=p.title+' — original project board '+(i+1);img.loading=i<2?'eager':'lazy';img.decoding='async';
    if(src.endsWith('.gif')&&reduced){
      button.className='animation-optin';button.textContent='Play original animation '+(i+1);
      button.addEventListener('click',()=>{img.src=src;button.replaceChildren(img)},{once:true});
    }else{img.src=src;button.append(img);button.addEventListener('click',()=>{dialog.querySelector('img').src=src;dialog.querySelector('img').alt=img.alt;dialog.showModal()})}
    gallery.append(button);
  });
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
}
const motionButton=document.querySelector('.motion-control');
motionButton?.addEventListener('click',()=>{
 const paused=document.documentElement.classList.toggle('motion-off');
 motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'Resume motion':'Pause motion';
});
