'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const projectsCtx={window:{}};
vm.runInNewContext(read('portfolio-data.js'),projectsCtx);
vm.runInNewContext(read('portfolio-editorial.js'),projectsCtx);
const projects=projectsCtx.window.PORTFOLIO_PROJECTS,meta=projectsCtx.window.PORTFOLIO_EDITORIAL;
assert.equal(projects.length,12,'All 12 projects must remain in source.');
assert.equal(projects.reduce((s,p)=>s+p.images.length,0),237,'Original 237 media items must remain.');
const seen=new Set();
for(const p of projects){
 assert(!seen.has(p.key),'Project keys must be unique: '+p.key);seen.add(p.key);
 assert(fs.existsSync(p.cover),'Missing original cover: '+p.cover);
 for(const src of p.images)assert(fs.existsSync(src),'Missing original board: '+src);
 const e=meta[p.key]||{};
 for(const i of e.omittedEditorialBoards||[])assert(i>=0&&i<p.images.length,'Invalid omission '+p.key+':'+i);
 if(e.sections){
  const used=[];
  for(const s of e.sections){
   assert(s.sequence?.length,'Section must have a sequential artwork ledger: '+p.key);
   const stageNames=s.sequence.filter(x=>x.type==='stage').map(x=>x.title);
   assert(stageNames.length,'Each section should explain its typography/development hierarchy');
   for(const x of s.sequence)if(x.type==='image'){assert(x.index>=0&&x.index<p.images.length);used.push(x.index)}
  }
  for(const i of e.process?.artworks||[])used.push(i);
  assert.equal(new Set(used).size,used.length,'Duplicated artwork '+p.key);
  const omitted=new Set(e.omittedEditorialBoards||[]);
  const expected=p.images.map((_,i)=>i).filter(i=>!omitted.has(i)).sort((a,b)=>a-b).join(',');
  assert.equal([...used].sort((a,b)=>a-b).join(','),expected,'Missing / extra Uwallet boards');
 }
}
const ed=meta.uwallet;
const d=ed.sections[0].sequence,b=ed.sections[1].sequence;
assert(d.findIndex(x=>x.type==='image'&&x.index===3)<d.findIndex(x=>x.type==='image'&&x.index===1),'Digital campaign typography must precede execution.');
assert(b.findIndex(x=>x.type==='image'&&x.index===13)<b.findIndex(x=>x.type==='image'&&x.index===14),'School campaign typography must precede execution.');

const wc=meta['uwallet-world-cup'];
assert.equal(wc.sections.length,3,'World Cup must separate type, visual development, and executions.');
const wcOrder=Array.from(wc.sections,section=>Array.from(section.sequence).filter(x=>x.type==='image').map(x=>x.index)).flat();
const wcType=[2,6,12],wcDevelopment=[3,4,9],wcExecution=[0,5,7,8,10,11,13,14];
assert.deepEqual(wcOrder.slice(0,3),wcType,'All three World Cup typography boards must appear first.');
assert.deepEqual(wcOrder.slice(3,6),wcDevelopment,'World Cup composition studies must precede execution.');
assert.deepEqual(wcOrder.slice(6),wcExecution,'World Cup execution group must remain complete and source-grounded.');
assert.deepEqual(Array.from(meta.ai.featuredIndices),[2,10,11,15],'Multi-brand front gallery cannot reintroduce uncurated automotive/retail work.');

const index=read('index.html'),c=read('case.html'),js=read('portfolio-v3.js'),css=read('portfolio-v3.css');
const assetVersion=index.split('portfolio-editorial.js?v=')[1]?.split('"')[0];
assert(assetVersion,'Homepage must expose a cache-busted editorial asset.');
for(const html of [index,c]){
 for(const asset of ['portfolio-editorial.js','portfolio-v3.js','portfolio-v3.css'])
  assert(html.includes(asset+'?v='+assetVersion),'All pages must share the same asset revision: '+asset);
}
const olive=meta.olivewood;
assert.deepEqual(Array.from(olive.featuredIndices),[7,8,9,10,11],'Olivewood must lead with five actual KV executions.');
for(const i of [3,4,5,13,14,15])
 assert(olive.omittedEditorialBoards.includes(i),'Olivewood text board '+i+' must not be rendered as portfolio artwork.');
assert(olive.credits.includes('Art Director'),'Olivewood HTML attribution must reflect its original collaboration board.');
assert(index.includes('HIRING A<br>GRAPHIC<br>DESIGNER'),'Contact section should address agency recruitment.');
assert(js.includes('motion-ready')&&css.includes('portfolio-headline-arrive'),'Expected actual controlled site motion.');
assert(css.includes('prefers-reduced-motion:reduce'),'Reduced motion styles must exist.');
for(const f of ['portfolio-v3.js','portfolio-editorial.js','portfolio-data.js'])new (require('node:vm').Script)(read(f),{filename:f});
console.log(JSON.stringify({status:'PASS',projects:projects.length,media:237,checks:'source + sequence + metadata + syntax + motion'}));
