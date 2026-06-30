from PIL import Image
import os, sys

IMG = r"C:\Users\BiaDigi.Com\Desktop\WebSiteS\IranianStoneReference\public\images"

# (source, destination, max_width, quality)
TASKS = [
    ("7W4A9926.jpg",                              "banner-stone-dark.jpg",     1920, 85),
    ("7W4A0126.jpg",                              "collection-stone-amber.jpg", 1920, 85),
    ("e708af63-fa4a-4d5f-8121-bc6255c734fa.png",  "collection-outdoor.jpg",    1920, 85),
    ("10.jpg",                                    "banner-interior.jpg",        1920, 85),
    ("12.jpg",                                    "collection-marble-dark.jpg", 1920, 85),
    ("12 copy.jpg",                               "collection-marble-green.jpg",1920, 85),
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

print("\nDone.")
