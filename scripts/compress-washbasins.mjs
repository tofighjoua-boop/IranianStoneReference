import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(__dirname, "../public/images/gallery/washbasins");

const files = readdirSync(DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const src  = join(DIR, file);
  const tmp  = src + ".tmp";
  const before = statSync(src).size;
  totalBefore += before;

  // Write to .tmp first, then replace original
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(tmp);

  const afterSize = statSync(tmp).size;
  totalAfter += afterSize;

  // Replace original with compressed version
  unlinkSync(src);
  renameSync(tmp, src);

  const reduction = Math.round((1 - afterSize / before) * 100);
  console.log(`${String(reduction).padStart(2)}% ▼  ${(before/1024).toFixed(0).padStart(5)}KB → ${(afterSize/1024).toFixed(0).padStart(4)}KB  ${file}`);
}

const pct = Math.round((1 - totalAfter/totalBefore) * 100);
console.log(`\n✓ Done: ${(totalBefore/1024/1024).toFixed(1)} MB → ${(totalAfter/1024/1024).toFixed(1)} MB  (${pct}% reduction)`);
