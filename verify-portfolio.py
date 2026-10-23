from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
class Page(HTMLParser):
 def __init__(self):super().__init__();self.tags=[]
 def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))
root=Path(__file__).resolve().parent
pages=['index.html','saudi.html','uwallet.html','devil.html','ai.html','auto.html']
for name in pages:
 p=Page();p.feed((root/name).read_text(encoding='utf-8'))
 assert sum(t=='h1' for t,a in p.tags)==1,name
 assert any(t=='meta' and a.get('property')=='og:image' for t,a in p.tags),name
 ids=[a['id'] for t,a in p.tags if 'id'in a];assert len(ids)==len(set(ids)),name
 for t,a in p.tags:
  if t=='img':assert all(a.get(k) for k in ['alt','width','height','srcset']), (name,a)
  for key in (['src'] if t in ['img','script'] else ['href'] if t in ['a','link'] else []):
   url=a.get(key,'');parsed=urlsplit(url)
   if not url or parsed.scheme or parsed.netloc:continue
   target=root/unquote(parsed.path) if parsed.path else root/name
   assert target.exists(),(name,url)
   if parsed.fragment and target.suffix=='.html':
    other=Page();other.feed(target.read_text(encoding='utf-8'));assert any(x.get('id')==parsed.fragment for _,x in other.tags),(name,url)
 print(name,'OK;',sum(t=='img' for t,a in p.tags),'images')
assert b'%PDF' in (root/'Mahmoud_Abd_Elwahab_CV.pdf').read_bytes()[:10]
print('CV signature, image dimensions, local links, fragments, metadata and headings verified.')
