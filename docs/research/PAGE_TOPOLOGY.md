# Antolini.com Page Topology

## Overall Layout
- Full-width page, no horizontal scroll
- Container max-width: 1640px, padding-left: 140px (desktop)
- Fixed header overlay (z-index high, above all content)
- Sections stack vertically
- No scroll-snap
- EasyScrollDots on right edge of viewport (section navigation dots)

## Sections (top to bottom)

### 1. Header (Fixed Overlay)
- **Tag:** `#header.no_sf`
- **Position:** fixed, top: 0, full width, z-index high
- **Type:** static layout, scroll-driven appearance change
- **Contains:** Logo, hamburger menu, nav panel (slides in from left/top)
- **Nav panel:** `#header_menu_cont` — slides in, contains 2 levels of nav
  - Level 1: Store Locator, Fairs & Events, Contact Us, Language selector, Search
  - Level 2: ANTOLINI®, Haute Nature®, History, Collections (dropdown), Geofamily (dropdown), Innovation, Lady A, Stoneroom®

### 2. Hero Banner Carousel
- **Class:** `.home_banner_container`
- **Position:** flow content (below header, which overlaps it)
- **Height:** 720px (max 800px, min 520px)
- **Type:** time-driven auto carousel
- **Contains:** 6 full-viewport background image divs that fade in/out
- **Text overlay:** White text with collection name and CTA link
- **Interaction:** None (auto-cycling only)

### 3. Collection Sections (×4 stacked)
- **Class:** `.collection_banner_hp`
- **Height:** 600px each
- **Type:** static with CSS animation (slow zoom)
- **Sections:**
  1. Exclusive Collection (`collection-exclusive.jpg`) - "Exclusivity through tradition..."
  2. Stoneroom® (`collection-stoneroom.jpg`) - Stoneroom logo + link
  3. Tableware (`collection-tableware.jpg`) - Tableware section
  4. Technology (`collection-tech.jpg`) - Innovation/tech section

### 4. Bottom Banner Carousel
- **Class:** `.home_bottom_banner`
- **Type:** time-driven auto carousel (3 images)
- **Similar structure to hero banner** but different images

### 5. Technology Section
- **Type:** static
- **Background:** Dark (#090808 or near-black)
- **Contains:** 3 technology logos with links (Azerocare Plus, AVP, Azerobact Plus)

### 6. Newsletter / Contact Section
- **Type:** static
- **Contains:** Email subscription form, GDPR consent checkboxes

### 7. Footer
- **Background:** `#090808` (very dark, near-black)
- **Color:** `#A18F7A` (warm beige)
- **Contains:** Logo, nav links, address, social icons (Facebook, Instagram)
- **Type:** static

## Z-Index Layers
1. Header: highest (1000+)
2. Hero banner text overlay: above banner images
3. Banner images: stacked absolutely
4. Footer: z-index 5
5. Normal content: 1

## Dependency Map
- Header overlaps all sections (fixed)
- Hero banner is the first visible section under header
- Collection sections flow below hero
- Technology section after collections
- Newsletter before footer
- Footer is last
