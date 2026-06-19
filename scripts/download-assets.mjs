/**
 * Download all Antolini.com assets to public/
 */
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..');

const assets = [
  // Logos
  { url: 'https://www.antolini.com/frontend/assets/images/logo.png', dest: 'public/images/logo.png' },
  { url: 'https://www.antolini.com/frontend/assets/images/logo_white.png', dest: 'public/images/logo_white.png' },
  // Icons
  { url: 'https://www.antolini.com/frontend/assets/images/ico_cerca.svg', dest: 'public/images/ico_cerca.svg' },
  { url: 'https://www.antolini.com/frontend/assets/images/freccia_bianca.svg', dest: 'public/images/freccia_bianca.svg' },
  { url: 'https://www.antolini.com/frontend/assets/images/chiudi.svg', dest: 'public/images/chiudi.svg' },
  // Hero banners (desktop)
  { url: 'https://www.antolini.com/image/banner-banner-1-2_1.jpg', dest: 'public/images/banner-1.jpg' },
  { url: 'https://www.antolini.com/image/banner-banner-1-3_1.jpg', dest: 'public/images/banner-2.jpg' },
  { url: 'https://www.antolini.com/image/banner-img_4277.jpg', dest: 'public/images/banner-3.jpg' },
  { url: 'https://www.antolini.com/image/banner-banner-1-5_1.jpg', dest: 'public/images/banner-4.jpg' },
  { url: 'https://www.antolini.com/image/banner-antolini-24.jpg', dest: 'public/images/banner-5.jpg' },
  { url: 'https://www.antolini.com/image/banner-purpleclouds_2.jpg', dest: 'public/images/banner-6.jpg' },
  // Collection section banners
  { url: 'https://www.antolini.com/image/banner-banner-exclusive_2.jpg', dest: 'public/images/collection-exclusive.jpg' },
  { url: 'https://www.antolini.com/image/banner-amd1.jpg', dest: 'public/images/collection-stoneroom.jpg' },
  { url: 'https://www.antolini.com/image/banner-banner-tableware.jpg', dest: 'public/images/collection-tableware.jpg' },
  { url: 'https://www.antolini.com/image/banner-banner-tech-home_1.jpg', dest: 'public/images/collection-tech.jpg' },
  // Bottom banners
  { url: 'https://www.antolini.com/image/banner-banner71_1.jpg', dest: 'public/images/bottom-banner-1.jpg' },
  { url: 'https://www.antolini.com/image/banner-banner72.jpg', dest: 'public/images/bottom-banner-2.jpg' },
  { url: 'https://www.antolini.com/image/banner-banner-fiere-sito.jpg', dest: 'public/images/bottom-banner-3.jpg' },
  // Tech logos
  { url: 'https://www.antolini.com/frontend/assets/images/tech/logo_azerocare_plus.svg', dest: 'public/images/logo-azerocare-plus.svg' },
  { url: 'https://www.antolini.com/frontend/assets/images/Logo-AVP-bianco-outline.png', dest: 'public/images/logo-avp.png' },
  { url: 'https://www.antolini.com/frontend/assets/images/Logo-Azerobact-plus-Bianco-outline.png', dest: 'public/images/logo-azerobact-plus.png' },
  // Stoneroom logo
  { url: 'https://www.antolini.com/en/assets/images/stoneroom-logo.png', dest: 'public/images/stoneroom-logo.png' },
  // Mobile banners
  { url: 'https://www.antolini.com/image/bannermobile-banner-1-2_1.jpg', dest: 'public/images/banner-mobile-1.jpg' },
  { url: 'https://www.antolini.com/image/bannermobile-banner-1-3_1.jpg', dest: 'public/images/banner-mobile-2.jpg' },
  { url: 'https://www.antolini.com/image/bannermobile-banner-exclusive_2.jpg', dest: 'public/images/collection-exclusive-mobile.jpg' },
  { url: 'https://www.antolini.com/image/bannermobile-amd1.jpg', dest: 'public/images/collection-stoneroom-mobile.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fullDest = path.join(BASE, dest);
    if (fs.existsSync(fullDest)) { console.log(`  SKIP (exists): ${dest}`); resolve(); return; }
    fs.mkdirSync(path.dirname(fullDest), { recursive: true });
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(fullDest);
    const req = protocol.get(url, { timeout: 20000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlinkSync(fullDest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close(); try { fs.unlinkSync(fullDest); } catch(e){}
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log(`  ✓ ${dest}`); resolve(); });
    });
    req.on('error', (err) => { file.close(); try { fs.unlinkSync(fullDest); } catch(e){} reject(err); });
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function main() {
  console.log(`Downloading ${assets.length} assets...\n`);
  // Batches of 4
  for (let i = 0; i < assets.length; i += 4) {
    const batch = assets.slice(i, i + 4);
    await Promise.allSettled(batch.map(({ url, dest }) =>
      download(url, dest).catch(err => console.log(`  ✗ ${dest}: ${err.message}`))
    ));
  }
  console.log('\nDone!');
}

main();
