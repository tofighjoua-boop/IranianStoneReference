# Antolini.com Behaviors

## Scroll Behaviors
- No smooth scroll library (Lenis=false, Locomotive=false)
- Default browser scroll behavior (`scroll-behavior: auto`)
- EasyScrollDots navigation dots (small dot indicators on right side for section navigation)
- **No scroll-snap observed**
- Elements do NOT animate on scroll (no IntersectionObserver-driven animations detected)

## Header Behavior
- **Interaction model:** scroll-driven
- Header has `#header.no_sf` class. Fixed position at top.
- The `.no_sf` class seems to indicate "no scroll fix" — the header appears to be transparent/dark over the hero banner
- White logo (`logo_white.png`) shows by default (for dark backgrounds)
- Dark logo (`logo.png`) shows when header is over white content (likely toggled by JS on scroll)
- At scroll position 0 (over banner): dark/transparent background, white logo visible
- After scrolling past banner: header likely gets a light/white background with dark logo

## Hero Banner Carousel
- **Interaction model:** time-driven (auto-cycling)
- Multiple absolute-positioned `div.home_banner` elements stacked
- Active banner has class `animated_shown` (opacity: 1)
- Inactive banners have class `animated_hidden` (opacity: 0)
- Transition: `opacity 2s ease-out`
- JS cycles through banners on a timer (~5 seconds per banner)
- 6 banner images total
- Text overlaid with: title, subtitle, collection link

## Collection Sections
- **Interaction model:** scroll-driven (scroll into view triggers zoom animation)
- Each section is 600px tall with background-image (cover)
- Slow zoom animation: `animation: fullcont_img_sf_anim 20s infinite` (scale 1→1.1→1)
- Text overlay with collection name and "DISCOVER" CTA
- 4 collection sections: Exclusive Collection, Stoneroom, Tableware, Technology

## Bottom Banner
- **Interaction model:** time-driven (auto-cycling, same as hero)
- Smaller banner carousel with 3 images
- Class pattern: `.home_bottom_banner` with animated_shown/animated_hidden

## Technology Section
- **Interaction model:** static
- Dark background section
- 3 tech logos displayed: Azerocare Plus, AVP, Azerobact Plus
- Logos link to individual technology pages

## Hover States
- Nav links: color change to white (from `#A18F7A`)
- CTA buttons: likely color transition 1s (from CSS analysis: `Color transitions 1s`)
- Collection "Discover" links: underline or color change

## Responsive Breakpoints
- 1640px: max-width container
- 1280px: layout adjustment
- 1024px: tablet breakpoint
- 500px: mobile breakpoint
- Desktop classes: `.nomobile` (display: block/flex)
- Mobile classes: `.onlymobile` (display: block/flex)
- Mobile has separate banner images (bannermobile-*.jpg)
