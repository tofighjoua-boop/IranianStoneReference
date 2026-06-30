import os, re

ROOT = r"C:\Users\BiaDigi.Com\Desktop\WebSiteS\IranianStoneReference\src"

REPLACEMENTS = {
    "/images/banner-1.jpg":              "/images/banner-new-1.jpg",
    "/images/banner-2.jpg":              "/images/banner-new-3.jpg",
    "/images/banner-6.jpg":              "/images/banner-new-4.jpg",
    "/images/bottom-banner-1.jpg":       "/images/banner-arch.jpg",
    "/images/collection-exclusive.jpg":  "/images/collection-marble-dark.jpg",
    "/images/collection-tableware.jpg":  "/images/collection-marble-green.jpg",
    "/images/collection-tech.jpg":       "/images/banner-stone-dark.jpg",
}

EXTS = {".tsx", ".ts", ".css"}

for dirpath, _, files in os.walk(ROOT):
    for fname in files:
        if not any(fname.endswith(e) for e in EXTS):
            continue
        fpath = os.path.join(dirpath, fname)
        with open(fpath, encoding="utf-8") as f:
            content = f.read()
        new_content = content
        for old, new in REPLACEMENTS.items():
            new_content = new_content.replace(old, new)
        if new_content != content:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Fixed: {fpath.replace(ROOT, 'src')}")

print("Done.")
