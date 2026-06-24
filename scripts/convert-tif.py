from PIL import Image
import os, sys

SRC = r"C:\Users\BiaDigi.Com\Desktop\Iranian stone reference\washbasins"
DST = r"C:\Users\BiaDigi.Com\Desktop\WebSiteS\IranianStoneReference\public\images\gallery\washbasins"

TIF_MAP = [
    ("_M5B7091-1.tif",       "studio-m5b7091.jpg"),
    ("_M5B7095-1.tif",       "studio-m5b7095.jpg"),
    ("_M5B7096-1.tif",       "studio-m5b7096.jpg"),
    ("_M5B7098-1.tif",       "studio-m5b7098.jpg"),
    ("_M5B7100-1.tif",       "studio-m5b7100.jpg"),
    ("_M5B7112-1.tif",       "studio-m5b7112.jpg"),
    ("_M5B7115-1.tif",       "studio-m5b7115.jpg"),
    ("_M5B7123-1.tif",       "studio-m5b7123.jpg"),
    ("_M5B7126-1.tif",       "studio-m5b7126.jpg"),
    ("_M5B7130-1.tif",       "studio-m5b7130.jpg"),
    ("001.tif",               "series-001.jpg"),
    ("001 (2).tif",           "series-001-2.jpg"),
    ("001 (3).tif",           "series-001-3.jpg"),
    ("001 (4).tif",           "series-001-4.jpg"),
    ("001 (5).tif",           "series-001-5.jpg"),
    ("001 (6).tif",           "series-001-6.jpg"),
    ("001 (7).tif",           "series-001-7.jpg"),
    ("001 (8).tif",           "series-001-8.jpg"),
    ("001 (9).tif",           "series-001-9.jpg"),
    ("001 (10).tif",          "series-001-10.jpg"),
    ("001 (11).tif",          "series-001-11.jpg"),
    ("002.tif",               "series-002.jpg"),
    ("002 (2).tif",           "series-002-2.jpg"),
    ("01.tif",                "series-01.jpg"),
    ("01 (2).tif",            "series-01-2.jpg"),
]

SAVE_MAP = [
    ("SAVE_20221115_112518.jpg",          "photo-01.jpg"),
    ("SAVE_20221115_112924.jpg",          "photo-02.jpg"),
    ("SAVE_20221122_153220 copy.jpg",     "photo-03.jpg"),
    ("SAVE_20221122_153412 copy.jpg",     "photo-04.jpg"),
    ("SAVE_20221122_153738 copy.jpg",     "photo-05.jpg"),
    ("SAVE_20221129_130043 copy.jpg",     "photo-06.jpg"),
    ("SAVE_20221129_130253 copy.jpg",     "photo-07.jpg"),
    ("SAVE_20221129_130259 copy.jpg",     "photo-08.jpg"),
    ("SAVE_20221129_130551 copy.jpg",     "photo-09.jpg"),
    ("SAVE_20221129_130737 copy.jpg",     "photo-10.jpg"),
    ("SAVE_20221210_093834 (1) copy.jpg", "photo-11.jpg"),
]

MAX_W = 1600

def convert(src_name, dst_name, quality=85):
    src_path = os.path.join(SRC, src_name)
    dst_path = os.path.join(DST, dst_name)
    before = os.path.getsize(src_path)
    try:
        with Image.open(src_path) as img:
            img = img.convert("RGB")
            w, h = img.size
            if w > MAX_W:
                img = img.resize((MAX_W, int(h * MAX_W / w)), Image.LANCZOS)
            img.save(dst_path, "JPEG", quality=quality, optimize=True, progressive=True)
        after = os.path.getsize(dst_path)
        pct = round((1 - after / before) * 100)
        print(f"{pct:2d}% ▼  {before//1024:5d}KB → {after//1024:4d}KB  {src_name} → {dst_name}")
    except Exception as e:
        print(f"ERROR: {src_name}: {e}", file=sys.stderr)

print("=== Converting TIF → JPG ===")
for src, dst in TIF_MAP:
    convert(src, dst, quality=85)

print("\n=== Copying & compressing SAVE JPGs ===")
for src, dst in SAVE_MAP:
    convert(src, dst, quality=82)

print("\n✓ All done.")
