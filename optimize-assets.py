import json, pathlib, urllib.request, concurrent.futures, io
from PIL import Image
root=pathlib.Path(__file__).resolve().parent
dest=root/'assets';dest.mkdir(exist_ok=True)
def process(job):
    key=job['key']; meta=dest/(key+'.json')
    if meta.exists():return json.loads(meta.read_text())
    req=urllib.request.Request(job['url'],headers={'User-Agent':'Mozilla/5.0'})
    raw=urllib.request.urlopen(req,timeout=45).read()
    im=Image.open(io.BytesIO(raw)).convert('RGB');w,h=im.size
    sizes=[]
    for target in sorted(set([min(640,w),min(1400,w)])):
        resized=im.resize((target,round(h*target/w)),Image.Resampling.LANCZOS)
        path=dest/(key+'-'+str(target)+'.webp');resized.save(path,'WEBP',quality=86,method=5)
        sizes.append({'width':target,'path':'assets/'+path.name,'bytes':path.stat().st_size})
    result={'key':key,'width':w,'height':h,'sizes':sizes}
    meta.write_text(json.dumps(result));return result
jobs=json.loads((root/'work/asset-jobs.json').read_text())
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: results=list(pool.map(process,jobs))
(root/'assets/manifest.json').write_text(json.dumps({r['key']:r for r in results},indent=2))
print('Optimized',len(results),'images;',sum(s['bytes'] for r in results for s in r['sizes']),'bytes total')
