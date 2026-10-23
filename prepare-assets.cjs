const fs=require('fs'),vm=require('vm');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync('project-assets.js','utf8')+'\nthis.data={projectAssets}',ctx);
const covers={uwallet:'5246b0254146371.Y3JvcCw5NjQsNzU0LDI0Myww.jpg',saudi:'dc7269238158775.Y3JvcCw3MzAsNTcxLDM4MSwxMg.jpg',devil:'e9ed24251533415.Y3JvcCw4MjQsNjQ1LDM0Nyww.jpg',ai:'022344225063917.Y3JvcCwxMjc4LDEwMDAsNjAsMA.jpg',auto:'87d863243919205.Y3JvcCwxMjE5LDk1Myw1Nyw4NDg.jpg'};
const selected={uwallet:[0,7,15,16,17,18],saudi:[0,2,4,5,6,8,9,10,13],devil:[0,2,3,5,6,8,9,15,18],ai:[2,3,14,15,22,23,33,34,47,48],auto:[1,2,3,4,5,6,7,9,10]};
const jobs=[];for(const [id,list]of Object.entries(selected)){for(const i of list)jobs.push({key:id+'-'+i,url:ctx.data.projectAssets[id][i]});jobs.push({key:id+'-cover',url:'https://mir-s3-cdn-cf.behance.net/projects/404/'+covers[id]})}
fs.mkdirSync('work',{recursive:true});fs.writeFileSync('work/asset-jobs.json',JSON.stringify(jobs));
