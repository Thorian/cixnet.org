from PIL import Image, ImageOps
from pathlib import Path
root=Path('src/assets')
for name in ['nova-scotia-coast-v1','cooler-node-concept-v1','lora-glovebox-v1']:
    Image.open(root/(name+'.png')).convert('RGB').save(root/(name+'.webp'),'WEBP',quality=82,method=6)
ImageOps.fit(Image.open(root/'nova-scotia-coast-v1.png').convert('RGB'),(1200,630),centering=(1,0)).save(root/'social-coast.jpg',quality=85,optimize=True)
logo=Image.open(root/'logo.png').convert('RGB')
logo.thumbnail((700,400),Image.Resampling.LANCZOS)
logo.quantize(colors=128).save(root/'logo-optimized.png',optimize=True)
