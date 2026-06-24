import sharp from "sharp";
import { statSync, unlinkSync, renameSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG = resolve(__dirname, "../public/images");

// Large PNGs and oversized JPGs
const targets = [
  { file: "banner-new-1.png", maxW: 1920 },
  { file: "banner-new-2.png", maxW: 1920 },
  { file: "banner-new-3.png", maxW: 1920 },
  { file: "banner-new-4.png", maxW: 1920 },
  { file: "banner-1.jpg",     maxW: 1920 },
  { file: "banner-2.jpg",     maxW: 1920 },
  { file: "banner-6.jpg",     maxW: 1920 },
  { file: "bottom-banner-1.jpg", maxW: 1920 },
  { file: "collection-exclusive.jpg", maxW: 1920 },
  { file: "collection-tableware.jpg", maxW: 1920 },
  { file: "collection-tech.jpg", maxW: 1920 },
];

let totalBefore = 0;
let totalAfter = 0;

for (const { file, maxW } of targets) {
  const src = resolve(IMG, file);
  // PNG banners → keep same filename but output as JPEG under the same name (strip .png → use .jpg alias check)
  const isPng = file.endsWith(".png");
  const outFile = isPng ? file.replace(".png", ".jpg") : file;
  const out = resolve(IMG, outFile);
  const tmp = out + ".tmp";

  const before = statSync(src).size;
  totalBefore += before;

  await sharp(src)
    .resize({ width: maxW, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(tmp);

  const afterSize = statSync(tmp).size;
  totalAfter += afterSize;

  if (isPng) unlinkSync(src); else unlinkSync(out);
  renameSync(tmp, out);

  const reduction = Math.round((1 - afterSize / before) * 100);
  console.log(`${String(reduction).padStart(2)}% ▼  ${(before/1024).toFixed(0).padStart(5)}KB → ${(afterSize/1024).toFixed(0).padStart(4)}KB  ${file}${isPng ? " → " + outFile : ""}`);
}

const pct = Math.round((1 - totalAfter/totalBefore) * 100);
console.log(`\n✓ Done: ${(totalBefore/1024/1024).toFixed(1)} MB → ${(totalAfter/1024/1024).toFixed(1)} MB  (${pct}% reduction)`);
