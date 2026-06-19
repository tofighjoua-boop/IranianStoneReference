/**
 * Take QA screenshots of the clone at localhost:3000 and compare with original.
 */
import { chromium } from 'playwright';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DESIGN_REF = path.join(__dirname, '..', 'docs', 'design-references');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: false });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to clone...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Full-page screenshot
  await page.screenshot({ path: path.join(DESIGN_REF, 'clone-desktop-full.png'), fullPage: true });
  await page.screenshot({ path: path.join(DESIGN_REF, 'clone-desktop-viewport.png'), fullPage: false });
  console.log('✓ Clone desktop screenshot saved');

  // Scroll screenshots
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'clone-scroll-800.png') });

  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'clone-scroll-1500.png') });

  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'clone-scroll-3000.png') });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'clone-footer.png') });

  // Mobile
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 20000 });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: path.join(DESIGN_REF, 'clone-mobile.png'), fullPage: true });
  await mobilePage.close();
  console.log('✓ Clone mobile screenshot saved');

  await browser.close();
  console.log('\nQA screenshots saved to docs/design-references/');
}

main().catch(err => { console.error(err); process.exit(1); });
