# Iranian Stone Reference — Project Context

## Architecture

The site uses **Next.js 16 App Router** with a dual-locale route tree (`/en/*` and `/fa/*`) alongside a client-side `LanguageContext` for RTL/translation state. These two strategies currently operate independently — switching language in the header context does not navigate between route trees.

The root `/` serves an English homepage directly. There is no `src/app/en/page.tsx`; navigation links from the root (e.g. "About") go to `/en/about` which exists, but `/en/` itself 404s.

All pages are static — no data fetching, no CMS, no API routes. Product/category data is hardcoded inline in each page file.

The design is derived from a pixel-perfect clone of antolini.com that was rebranded to ISR. Several Antolini-specific assets, class names, and translation strings remain in the codebase.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16.2.1 (App Router, React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + custom tokens in `tailwind.config.ts` |
| UI Primitives | shadcn/ui via `@base-ui/react` |
| Icons | Lucide React |
| Fonts (EN) | Lato (Google Fonts, via `next/font`) |
| Fonts (FA) | Vazirmatn (Google Fonts, via `next/font`) |
| Animations | `tw-animate-css`, custom `@keyframes` in `globals.css` |
| Deployment | Vercel (`output: "standalone"`) |
| Node | ≥ 24 |

---

## Folder Structure

```
src/
  app/
    layout.tsx              # Root layout — fonts, LanguageProvider, metadata
    page.tsx                # Root homepage (English, no redirect)
    globals.css             # Tailwind base + custom tokens + RTL rules + Antolini utilities
    en/
      about/page.tsx
      gallery/page.tsx      # Static gallery (4 hardcoded products)
      contact/page.tsx      # Contact form (no backend)
    fa/
      page.tsx              # Persian homepage (mirrors root)
      about/page.tsx
      gallery/page.tsx
      contact/page.tsx

  components/
    Header.tsx              # Fixed header — scroll-aware, language toggle, mobile menu
    NewFooter.tsx           # Footer with bilingual inline content
    ui/
      Button.tsx            # Custom button (PascalCase import)
      button.tsx            # shadcn button (lowercase import) — both used inconsistently
      Card.tsx
      Container.tsx
      Section.tsx

    # ── Leftover from Antolini clone phase (unused) ──
    Navigation.tsx
    HeroBanner.tsx
    CollectionSections.tsx
    TechnologySection.tsx
    NewsletterSection.tsx
    Footer.tsx              # Replaced by NewFooter.tsx
    BottomBanner.tsx
    icons.tsx

  contexts/
    LanguageContext.tsx     # EN/FA state, RTL toggle, localStorage persistence

  lib/
    translations.ts         # EN + FA string maps (still contains Antolini brand labels)
    utils.ts                # cn() utility

  types/
    stone.ts                # StoneCategory, StoneProduct, StoneProject, BlogPost
    antolini.ts             # Leftover from clone phase

public/
  images/                   # Referenced but missing — pages use gradient placeholders
  videos/
  seo/

docs/
  research/                 # Inspection guides and design token docs
scripts/
  inspect-banner-images.js
tailwind.config.ts
next.config.ts
```

---

## Completed Features

- [x] Next.js 16 App Router scaffold with TypeScript strict mode
- [x] Dual-locale route tree: `/en/*` and `/fa/*`
- [x] `LanguageContext` — stores EN/FA preference in `localStorage`, sets `html[dir]` and `html[lang]`
- [x] RTL layout support for Persian (Tailwind utilities + CSS overrides)
- [x] Dual font loading: Lato (EN) and Vazirmatn (FA) via `next/font`
- [x] Fixed header with scroll-aware background, mobile hamburger menu, language toggle button
- [x] Bilingual footer with quick links and contact info
- [x] Homepage: hero section, 6-category grid, about teaser, CTA strip
- [x] Gallery page: 4-product grid with "Exclusive" badge
- [x] About page (EN + FA)
- [x] Contact page with quote request form (EN + FA)
- [x] Custom Tailwind tokens: dark palette, accent gold, cream background, display/body fonts
- [x] Custom UI components: `Section`, `Container`, `Button` with variants
- [x] TypeScript type definitions for `StoneCategory`, `StoneProduct`, `StoneProject`, `BlogPost`
- [x] Vercel deployment config (`output: "standalone"`)
- [x] Webpack alias fix for non-ASCII parent directory path

---

## Pending Features

- [ ] Real product images — all category/product cards show gradient placeholders
- [ ] Dynamic gallery routes — `/en/gallery/[slug]` and `/fa/gallery/[slug]`
- [ ] Products page (`/en/projects`, `/fa/projects`) — linked in nav, 404s
- [ ] Magazine/blog page (`/en/magazine`, `/fa/magazine`) — linked in nav, 404s
- [ ] `/en/` index page — `src/app/en/page.tsx` is missing; root links assume it exists
- [ ] Language switch navigation — toggling language should route from `/en/*` to `/fa/*` and vice versa
- [ ] Contact form backend — form submits nowhere; needs API route or third-party service
- [ ] Real business data — phone, address, email are all placeholders
- [ ] Data layer — product/category content is hardcoded inline; needs a data file, CMS, or API
- [ ] SEO — per-page metadata (title, description, OG image) only set at root layout level
- [ ] Social links — Instagram, LinkedIn, Facebook are `href="#"` placeholders
- [ ] Sitemap and robots.txt

---

## Known Issues

### P0 — Crashes

- **`toggleLanguage` is undefined** (`Header.tsx:8`): `useLanguage()` returns `{ language, setLanguage, t, isRTL }` but the Header destructures a non-existent `toggleLanguage`. Clicking the language button throws a runtime error on every page.

### P1 — Broken Navigation

- **`/en/` 404s**: No `src/app/en/page.tsx` exists. The root page links to `/en/about` etc. which work, but `/en/` itself returns 404.
- **Language toggle doesn't navigate**: Even when fixed, calling `setLanguage("fa")` only updates context state — it doesn't redirect the user from `/en/gallery` to `/fa/gallery`. Route-based and context-based i18n are disconnected.
- **Nav links 404**: `/en/projects`, `/en/magazine`, `/fa/projects`, `/fa/magazine` have no corresponding page files.
- **Gallery slugs 404**: Category links on the homepage go to `/en/gallery/marble` etc. but no `[slug]` dynamic route exists.

### P2 — Code Quality

- **Dual Button components**: `ui/Button.tsx` and `ui/button.tsx` both exist; pages import from each inconsistently.
- **7 unused components**: Antolini-phase components (`Navigation`, `HeroBanner`, `CollectionSections`, `TechnologySection`, `NewsletterSection`, `Footer`, `BottomBanner`) remain in `src/components/` but are not used by any current page.
- **`src/types/antolini.ts`**: Leftover type file from clone phase alongside the ISR-specific `stone.ts`.
- **Tailwind v4 + JS config conflict**: Tailwind v4 reads design tokens from `@theme` in CSS; extending via `tailwind.config.ts` may not apply. Custom colors defined in JS config (`dark-900`, `accent-gold`, `text-light`, etc.) should be migrated to `globals.css` `@theme` block.
- **Stale translation keys**: `translations.ts` still contains Antolini brand labels (`STONEROOM®`, `GEOFAMILY`, `LADY A`, `HAUTENATURE®`) that don't apply to ISR.
- **Antolini class names in CSS**: `globals.css` contains `.antolini-footer`, `.antolini-header`, `.collection-banner-img`, `antolini-container` utility classes — legacy from the clone phase.

### P3 — Design Inconsistencies

- **`rounded-lg` vs `--radius: 0px`**: `globals.css` sets `--radius: 0px` (sharp Antolini aesthetic) but contact form inputs use `rounded-lg`, producing inconsistent corners.
- **Google Fonts double-load**: Lato is loaded via `@import url(...)` in `globals.css` AND via `next/font` in `layout.tsx`.
- **`html[dir]` not set on initial render**: `LanguageContext` sets `document.documentElement.dir` in a `useEffect`, causing a flash of LTR layout before the FA direction is applied on Persian pages.
