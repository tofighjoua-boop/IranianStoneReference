/**
 * Antolini.com extraction script using Playwright with system Chrome.
 * Captures screenshots, computed styles, assets, colors, fonts, and behaviors.
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.join(__dirname, '..');
const DESIGN_REF = path.join(BASE_DIR, 'docs', 'design-references');
const RESEARCH = path.join(BASE_DIR, 'docs', 'research');
const PUBLIC = path.join(BASE_DIR, 'public');

const TARGET_URL = 'https://antolini.com/en/';

// CSS properties to extract
const CSS_PROPS = [
  'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
  'textTransform','textDecoration','backgroundColor','background',
  'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
  'margin','marginTop','marginRight','marginBottom','marginLeft',
  'width','height','maxWidth','minWidth','maxHeight','minHeight',
  'display','flexDirection','justifyContent','alignItems','gap',
  'gridTemplateColumns','gridTemplateRows',
  'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
  'boxShadow','overflow','overflowX','overflowY',
  'position','top','right','bottom','left','zIndex',
  'opacity','transform','transition','cursor',
  'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
  'whiteSpace','textOverflow','WebkitLineClamp'
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url || url.startsWith('data:')) { resolve(null); return; }
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    const req = protocol.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    });
    req.on('error', (err) => { file.close(); try { fs.unlinkSync(dest); } catch(e){} reject(err); });
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function extractStyles(page, selector) {
  return page.evaluate(({ selector, props }) => {
    const el = document.querySelector(selector);
    if (!el) return { error: `Not found: ${selector}` };
    function getStyles(element) {
      const cs = getComputedStyle(element);
      const s = {};
      props.forEach(p => {
        try {
          const v = cs[p];
          if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== '') s[p] = v;
        } catch(e){}
      });
      return s;
    }
    function walk(el, depth) {
      if (depth > 4) return null;
      const children = [...el.children];
      const bgImg = getComputedStyle(el).backgroundImage;
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        classes: el.className?.toString().split(' ').filter(Boolean).slice(0, 8).join(' '),
        text: el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 ? el.textContent.trim().slice(0, 300) : null,
        styles: getStyles(el),
        img: el.tagName === 'IMG' ? { src: el.src, alt: el.alt, w: el.naturalWidth, h: el.naturalHeight } : null,
        backgroundImage: bgImg && bgImg !== 'none' ? bgImg : null,
        childCount: children.length,
        children: children.slice(0, 25).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    }
    return walk(el, 0);
  }, { selector, props: CSS_PROPS });
}

async function main() {
  console.log('Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('Navigating to antolini.com...');
  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Close any cookie/popup overlays
  try {
    const cookieBtn = page.locator('button:has-text("Accept"), button:has-text("Accetta"), #cookie-accept, .cookie-accept, [id*="cookie"] button, [class*="cookie"] button').first();
    if (await cookieBtn.isVisible({ timeout: 2000 })) {
      await cookieBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch(e) {}

  // =====================================================
  // PHASE 1: Desktop Screenshot (1440px)
  // =====================================================
  console.log('\n📸 Taking desktop screenshot...');
  await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-desktop-full.png'), fullPage: true });
  await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-desktop-viewport.png'), fullPage: false });
  console.log('✓ Desktop screenshots saved');

  // =====================================================
  // PHASE 2: Global Asset Discovery
  // =====================================================
  console.log('\n🔍 Extracting global assets...');
  const globalData = await page.evaluate((props) => {
    function getStyles(element) {
      const cs = getComputedStyle(element);
      const s = {};
      props.forEach(p => {
        try {
          const v = cs[p];
          if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== '') s[p] = v;
        } catch(e){}
      });
      return s;
    }

    return {
      title: document.title,
      metaDesc: document.querySelector('meta[name="description"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      images: [...document.querySelectorAll('img')].map(img => ({
        src: img.src || img.currentSrc,
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
        parentTag: img.parentElement?.tagName,
        parentClasses: img.parentElement?.className?.toString().split(' ').slice(0, 5).join(' '),
        position: getComputedStyle(img).position,
        zIndex: getComputedStyle(img).zIndex,
        display: getComputedStyle(img).display,
        width: getComputedStyle(img).width,
        height: getComputedStyle(img).height,
        objectFit: getComputedStyle(img).objectFit
      })),
      videos: [...document.querySelectorAll('video')].map(v => ({
        src: v.src || v.querySelector('source')?.src,
        poster: v.poster,
        autoplay: v.autoplay,
        loop: v.loop,
        muted: v.muted,
        width: v.videoWidth,
        height: v.videoHeight
      })),
      backgroundImages: [...document.querySelectorAll('*')].filter(el => {
        try { const bg = getComputedStyle(el).backgroundImage; return bg && bg !== 'none'; } catch(e) { return false; }
      }).slice(0, 100).map(el => ({
        url: getComputedStyle(el).backgroundImage,
        element: el.tagName + (el.id ? '#' + el.id : '') + '.' + el.className?.toString().split(' ').filter(Boolean).slice(0, 3).join('.'),
        size: getComputedStyle(el).backgroundSize,
        position: getComputedStyle(el).backgroundPosition
      })),
      svgs: [...document.querySelectorAll('svg')].slice(0, 30).map(svg => ({
        id: svg.id,
        classes: svg.className?.toString(),
        outerHTML: svg.outerHTML.slice(0, 1000),
        width: svg.getAttribute('width'),
        height: svg.getAttribute('height'),
        viewBox: svg.getAttribute('viewBox')
      })),
      fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 300).map(el => {
        try { return getComputedStyle(el).fontFamily; } catch(e) { return null; }
      }).filter(Boolean))],
      fontLinks: [...document.querySelectorAll('link[href*="font"], link[href*="Font"]')].map(l => l.href),
      favicons: [...document.querySelectorAll('link[rel*="icon"], link[rel*="apple"]')].map(l => ({ href: l.href, rel: l.rel, sizes: l.sizes?.toString() })),
      bodyStyles: getStyles(document.body),
      htmlStyles: getStyles(document.documentElement),
      colorSamples: [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,nav,.btn,.cta')].slice(0, 50).map(el => ({
        tag: el.tagName,
        classes: el.className?.toString().split(' ').slice(0, 3).join(' '),
        color: getComputedStyle(el).color,
        bg: getComputedStyle(el).backgroundColor,
        fontSize: getComputedStyle(el).fontSize,
        fontWeight: getComputedStyle(el).fontWeight,
        fontFamily: getComputedStyle(el).fontFamily
      })),
      scrollLibrary: {
        lenis: !!document.querySelector('.lenis, [class*="lenis"]'),
        locomotive: !!document.querySelector('.locomotive-scroll, [data-scroll-container]'),
        smoothScroll: document.documentElement.style.scrollBehavior || getComputedStyle(document.documentElement).scrollBehavior
      },
      linkTags: [...document.querySelectorAll('link')].map(l => ({ rel: l.rel, href: l.href, type: l.type })).filter(l => l.href),
      scriptTags: [...document.querySelectorAll('script[src]')].map(s => s.src),
      navItems: [...document.querySelectorAll('nav a, header a, .menu a, .nav a')].slice(0, 40).map(a => ({ text: a.textContent?.trim(), href: a.href })).filter(a => a.text),
      sections: [...document.querySelectorAll('section, main > div, .section, [id]')].slice(0, 20).map(s => ({
        tag: s.tagName,
        id: s.id,
        classes: s.className?.toString().split(' ').slice(0, 5).join(' '),
        childCount: s.children.length,
        firstText: s.textContent?.trim().slice(0, 100)
      }))
    };
  }, CSS_PROPS);

  fs.writeFileSync(path.join(RESEARCH, 'global-data.json'), JSON.stringify(globalData, null, 2));
  console.log(`✓ Global data: ${globalData.images.length} images, ${globalData.videos.length} videos, ${globalData.svgs.length} SVGs`);
  console.log(`  Fonts: ${globalData.fonts.slice(0, 5).join(', ')}`);
  console.log(`  Favicons: ${globalData.favicons.length}`);
  console.log(`  Scroll library: ${JSON.stringify(globalData.scrollLibrary)}`);

  // =====================================================
  // PHASE 3: Interaction / Scroll Sweep
  // =====================================================
  console.log('\n🔄 Scroll sweep - capturing behaviors...');

  // Capture header at scroll 0
  const headerStyles0 = await extractStyles(page, 'header, nav, .header, #header, [class*="header"], [class*="nav"]');

  // Scroll down slowly
  await page.evaluate(() => window.scrollTo(0, 100));
  await page.waitForTimeout(500);
  const headerStyles100 = await extractStyles(page, 'header, nav, .header, #header, [class*="header"], [class*="nav"]');

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);

  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-scroll-600.png') });

  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-scroll-1200.png') });

  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-scroll-2400.png') });

  await page.evaluate(() => window.scrollTo(0, 4000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-scroll-4000.png') });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-footer.png') });

  fs.writeFileSync(path.join(RESEARCH, 'header-scroll-diff.json'), JSON.stringify({
    headerStyles0,
    headerStyles100,
    note: 'Compare to find scroll-triggered style changes'
  }, null, 2));

  // Back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // =====================================================
  // PHASE 4: Section-by-section extraction
  // =====================================================
  console.log('\n🔍 Extracting page sections...');

  const sectionsData = await page.evaluate((props) => {
    function getStyles(element) {
      const cs = getComputedStyle(element);
      const s = {};
      props.forEach(p => {
        try {
          const v = cs[p];
          if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== '') s[p] = v;
        } catch(e){}
      });
      return s;
    }
    function walk(el, depth) {
      if (depth > 3) return null;
      const children = [...el.children];
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        classes: el.className?.toString().split(' ').filter(Boolean).slice(0, 8).join(' '),
        text: el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 ? el.textContent.trim().slice(0, 200) : null,
        allText: el.textContent?.trim().slice(0, 300),
        styles: getStyles(el),
        img: el.tagName === 'IMG' ? { src: el.src, alt: el.alt } : null,
        bgImg: getComputedStyle(el).backgroundImage !== 'none' ? getComputedStyle(el).backgroundImage : null,
        rect: (() => { try { const r = el.getBoundingClientRect(); return { top: r.top + window.scrollY, height: r.height }; } catch(e){ return null; } })(),
        childCount: children.length,
        children: children.slice(0, 15).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    }

    // Try to identify major sections
    const candidates = [
      ...document.querySelectorAll('header'),
      ...document.querySelectorAll('nav'),
      ...document.querySelectorAll('main, .main-content, #main'),
      ...document.querySelectorAll('section'),
      ...document.querySelectorAll('.hero, #hero, [class*="hero"]'),
      ...document.querySelectorAll('.banner, [class*="banner"]'),
      ...document.querySelectorAll('footer'),
    ];

    // Also grab body children
    const bodyChildren = [...document.body.children].slice(0, 20);
    const allEls = [...new Set([...candidates, ...bodyChildren])];

    return allEls.slice(0, 30).map(el => walk(el, 0));
  }, CSS_PROPS);

  fs.writeFileSync(path.join(RESEARCH, 'sections-data.json'), JSON.stringify(sectionsData, null, 2));
  console.log(`✓ Extracted ${sectionsData.length} section candidates`);

  // =====================================================
  // PHASE 5: Mobile screenshot
  // =====================================================
  console.log('\n📱 Taking mobile screenshot...');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: path.join(DESIGN_REF, 'antolini-mobile-full.png'), fullPage: true });
  await mobilePage.screenshot({ path: path.join(DESIGN_REF, 'antolini-mobile-viewport.png') });

  // Tablet
  await mobilePage.setViewportSize({ width: 768, height: 1024 });
  await mobilePage.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: path.join(DESIGN_REF, 'antolini-tablet.png'), fullPage: true });
  await mobilePage.close();
  console.log('✓ Mobile and tablet screenshots saved');

  // =====================================================
  // PHASE 6: Download assets
  // =====================================================
  console.log('\n⬇️  Downloading assets...');
  const imagesDir = path.join(PUBLIC, 'images');
  const seoDir = path.join(PUBLIC, 'seo');

  let downloadCount = 0;
  const assetMap = {};

  // Download favicons
  for (const fav of globalData.favicons) {
    try {
      const fname = path.basename(new URL(fav.href).pathname) || 'favicon.ico';
      const dest = path.join(seoDir, fname);
      await downloadFile(fav.href, dest);
      assetMap[fav.href] = '/seo/' + fname;
      downloadCount++;
    } catch(e) { console.log(`  Skip favicon: ${e.message}`); }
  }

  // Download images in batches of 4
  const imgUrls = globalData.images.filter(i => i.src && !i.src.startsWith('data:')).map(i => i.src);
  const uniqueImgUrls = [...new Set(imgUrls)];

  for (let i = 0; i < uniqueImgUrls.length; i += 4) {
    const batch = uniqueImgUrls.slice(i, i + 4);
    await Promise.allSettled(batch.map(async (url) => {
      try {
        const u = new URL(url);
        const ext = path.extname(u.pathname) || '.jpg';
        const name = path.basename(u.pathname, ext).replace(/[^a-z0-9-_]/gi, '_').slice(0, 50);
        const fname = name + ext;
        const dest = path.join(imagesDir, fname);
        if (!fs.existsSync(dest)) {
          await downloadFile(url, dest);
        }
        assetMap[url] = '/images/' + fname;
        downloadCount++;
      } catch(e) { console.log(`  Skip img: ${e.message?.slice(0, 60)}`); }
    }));
  }

  fs.writeFileSync(path.join(RESEARCH, 'asset-map.json'), JSON.stringify(assetMap, null, 2));
  console.log(`✓ Downloaded ${downloadCount} assets`);

  // =====================================================
  // PHASE 7: Navigation hover states
  // =====================================================
  console.log('\n🖱️  Checking navigation hover states...');
  try {
    const navEl = page.locator('nav, header, .header').first();
    const navRect = await navEl.boundingBox();
    if (navRect) {
      await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-nav-default.png') });
      const navLinks = page.locator('nav a, header a').first();
      await navLinks.hover();
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(DESIGN_REF, 'antolini-nav-hover.png') });
    }
  } catch(e) { console.log('  Nav hover: ' + e.message?.slice(0, 60)); }

  await browser.close();

  console.log('\n✅ Extraction complete!');
  console.log(`  Screenshots: ${DESIGN_REF}`);
  console.log(`  Research data: ${RESEARCH}`);
  console.log(`  Assets: ${PUBLIC}`);
  console.log(`  Total downloads: ${downloadCount}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
