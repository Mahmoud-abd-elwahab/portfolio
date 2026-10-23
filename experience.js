const selections={uwallet:[0,7,16],saudi:[2,5,6],devil:[2,5,6],ai:[2,14,33],auto:[1,2,3]};
const coverFor=id=>'https://mir-s3-cdn-cf.behance.net/projects/404/'+caseEdit[id].cover;
document.querySelectorAll('.work-card').forEach(card=>{
 const id=new URL(card.href).searchParams.get('id'),images=projectAssets[id];
 card.querySelector('.work-image img').src=coverFor(id);
 const strip=document.createElement('div');strip.className='variations';strip.setAttribute('aria-hidden','true');
 selections[id].forEach(i=>{const img=document.createElement('img');img.src=images[i];img.alt='';img.loading='lazy';strip.append(img)});
 card.querySelector('.work-image').after(strip);
});
const archiveImage=document.querySelector('.archive-card img');if(archiveImage)archiveImage.src=coverFor('auto');
const caseRoot=document.querySelector('#case');
if(caseRoot){
 const requested=new URLSearchParams(location.search).get('id');
 const p=all.find(p=>p.id===requested)||all[0],edit=caseEdit[p.id],images=projectAssets[p.id],next=all[(all.indexOf(p)+1)%all.length];
 document.title=p.title+' — Mahmoud Abdel Wahab';
 caseRoot.innerHTML=`<a class="back" href="index.html#work">← Selected work</a><header class="case-heading"><div><p class="kicker">${p.type}</p><h1>${p.title}</h1></div></header><img class="project-cover" src="${coverFor(p.id)}" alt="${p.title} original project cover"><section class="case-intro"><h2>${edit.line}</h2><p>${edit.intro}</p></section><nav class="case-toolbar" aria-label="Project sections"><span>Explore the visual series ↓</span><a href="mailto:abwahab1696@gmail.com">Discuss a brief ↗</a></nav><div class="editorial-gallery"></div><div class="case-next"><div><p class="kicker">Next project</p><h2><a href="project.html?id=${next.id}">${next.title} ↗</a></h2></div><a class="button" href="mailto:abwahab1696@gmail.com">Send a brief ↗</a></div>`;
 const gallery=caseRoot.querySelector('.editorial-gallery'),dialog=document.querySelector('.lightbox');
 edit.groups.forEach((group,g)=>{
  const section=document.createElement('section');section.className='visual-chapter';
  section.innerHTML=`<header class="chapter-heading"><span class="chapter-number">0${g+1}</span><h2>${group.title}</h2><p>${group.note}</p></header><div class="visual-grid ${group.layout}"></div>`;
  group.images.forEach((i,j)=>{
   const button=document.createElement('button');button.className='case-image';button.setAttribute('aria-label','Enlarge '+group.title+' image '+(j+1));
   const img=document.createElement('img');img.src=images[i];img.alt=p.title+' — '+group.title+' '+(j+1);img.loading='lazy';img.decoding='async';
   button.append(img);button.addEventListener('click',()=>{dialog.querySelector('img').src=images[i];dialog.querySelector('img').alt=img.alt;dialog.showModal()});section.querySelector('.visual-grid').append(button);
  });gallery.append(section);
 });
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
}
document.querySelector('.motion-control')?.addEventListener('click',function(){
 const paused=document.documentElement.classList.toggle('motion-off');
 this.setAttribute('aria-pressed',String(paused));this.textContent=paused?'Resume motion':'Pause motion';
});
