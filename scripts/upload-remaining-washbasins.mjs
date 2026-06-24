import sharp from "sharp";
import { readdirSync, statSync, copyFileSync, unlinkSync, renameSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = "C:/Users/BiaDigi.Com/Desktop/Iranian stone reference/washbasins";
const DST = resolve(__dirname, "../public/images/gallery/washbasins");

// ── TIF → JPG mapping (clean destination filename) ──────────────────────────
const TIF_MAP = [
  // Studio shots (_M5B7xxx series) — each is a separate product
  { src: "_M5B7091-1.tif",         dst: "studio-m5b7091.jpg" },
  { src: "_M5B7095-1.tif",         dst: "studio-m5b7095.jpg" },
  { src: "_M5B7096-1.tif",         dst: "studio-m5b7096.jpg" },
  { src: "_M5B7098-1.tif",         dst: "studio-m5b7098.jpg" },
  { src: "_M5B7100-1.tif",         dst: "studio-m5b7100.jpg" },
  { src: "_M5B7112-1.tif",         dst: "studio-m5b7112.jpg" },
  { src: "_M5B7115-1.tif",         dst: "studio-m5b7115.jpg" },
  { src: "_M5B7123-1.tif",         dst: "studio-m5b7123.jpg" },
  { src: "_M5B7126-1.tif",         dst: "studio-m5b7126.jpg" },
  { src: "_M5B7130-1.tif",         dst: "studio-m5b7130.jpg" },
  // 001 series (12 angles of same product)
  { src: "001.tif",                dst: "series-001.jpg"    },
  { src: "001 (2).tif",            dst: "series-001-2.jpg"  },
  { src: "001 (3).tif",            dst: "series-001-3.jpg"  },
  { src: "001 (4).tif",            dst: "series-001-4.jpg"  },
  { src: "001 (5).tif",            dst: "series-001-5.jpg"  },
  { src: "001 (6).tif",            dst: "series-001-6.jpg"  },
  { src: "001 (7).tif",            dst: "series-001-7.jpg"  },
  { src: "001 (8).tif",            dst: "series-001-8.jpg"  },
  { src: "001 (9).tif",            dst: "series-001-9.jpg"  },
  { src: "001 (10).tif",           dst: "series-001-10.jpg" },
  { src: "001 (11).tif",           dst: "series-001-11.jpg" },
  // 002 series (2 angles)
  { src: "002.tif",                dst: "series-002.jpg"    },
  { src: "002 (2).tif",            dst: "series-002-2.jpg"  },
  // 01 series (2 angles)
  { src: "01.tif",                 dst: "series-01.jpg"     },
  { src: "01 (2).tif",             dst: "series-01-2.jpg"   },
];

// ── SAVE JPG mapping ─────────────────────────────────────────────────────────
const SAVE_MAP = [
  { src: "SAVE_20221115_112518.jpg",           dst: "photo-01.jpg" },
  { src: "SAVE_20221115_112924.jpg",           dst: "photo-02.jpg" },
  { src: "SAVE_20221122_153220 copy.jpg",      dst: "photo-03.jpg" },
  { src: "SAVE_20221122_153412 copy.jpg",      dst: "photo-04.jpg" },
  { src: "SAVE_20221122_153738 copy.jpg",      dst: "photo-05.jpg" },
  { src: "SAVE_20221129_130043 copy.jpg",      dst: "photo-06.jpg" },
  { src: "SAVE_20221129_130253 copy.jpg",      dst: "photo-07.jpg" },
  { src: "SAVE_20221129_130259 copy.jpg",      dst: "photo-08.jpg" },
  { src: "SAVE_20221129_130551 copy.jpg",      dst: "photo-09.jpg" },
  { src: "SAVE_20221129_130737 copy.jpg",      dst: "photo-10.jpg" },
  { src: "SAVE_20221210_093834 (1) copy.jpg",  dst: "photo-11.jpg" },
];

console.log("=== Converting TIF → JPG ===");
for (const { src, dst } of TIF_MAP) {
  const srcPath = join(SRC, src);
  const dstPath = join(DST, dst);
  const tmp = dstPath + ".tmp";
  const before = statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(tmp);

  renameSync(tmp, dstPath);
  const after = statSync(dstPath).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${pct}% ▼  ${(before/1024/1024).toFixed(0).padStart(3)}MB → ${(after/1024).toFixed(0).padStart(4)}KB  ${src} → ${dst}`);
}

console.log("\n=== Copying & compressing SAVE JPGs ===");
for (const { src, dst } of SAVE_MAP) {
  const srcPath = join(SRC, src);
  const dstPath = join(DST, dst);
  const tmp = dstPath + ".tmp";
  const before = statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(tmp);

  renameSync(tmp, dstPath);
  const after = statSync(dstPath).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${pct}% ▼  ${(before/1024).toFixed(0).padStart(5)}KB → ${(after/1024).toFixed(0).padStart(4)}KB  ${dst}`);
}

console.log("\n✓ All done.");
