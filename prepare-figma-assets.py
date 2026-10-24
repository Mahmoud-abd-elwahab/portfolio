from pathlib import Path
from PIL import Image

out = Path('figma-assets')
out.mkdir(exist_ok=True)
keys = ['uwallet-0','saudi-4','devil-0','ai-2','auto-1','uwallet-7','uwallet-15','uwallet-16','uwallet-17','uwallet-18']
for key in keys:
    with Image.open(Path('assets') / f'{key}-1400.webp') as im:
        im.convert('RGB').save(out / f'{key}.png', optimize=True)
print(f'Prepared {len(keys)} lossless PNG upload copies.')
