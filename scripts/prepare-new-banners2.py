from PIL import Image
import os

IMG = r"C:\Users\BiaDigi.Com\Desktop\WebSiteS\IranianStoneReference\public\images"

TASKS = [
    ("5dd23907-da51-4ef2-b79d-8c79221aee5e.png", "banner-arch.jpg",            1920, 85),
    ("b41.jpg",                                   "banner-washbasin.jpg",       1920, 85),
    ("12.jpg",                                    "collection-marble-dark.jpg", 1920, 85),
]

for src_name, dst_name, max_w, q in TASKS:
    src = os.path.join(IMG, src_name)
    dst = os.path.join(IMG, dst_name)
    before = os.path.getsize(src)
    with Image.open(src) as img:
        img = img.convert("RGB")
        w, h = img.size
        if w > max_w:
            img = img.resize((max_w, int(h * max_w / w)), Image.LANCZOS)
        img.save(dst, "JPEG", quality=q, optimize=True, progressive=True)
    after = os.path.getsize(dst)
    pct = round((1 - after/before)*100)
    print(f"{pct}% smaller  {before//1024}KB -> {after//1024}KB  {src_name} -> {dst_name}")

print("Done.")
