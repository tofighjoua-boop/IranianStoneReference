# HeroBanner Specification

## Overview
- **Target file:** `src/components/HeroBanner.tsx`
- **Screenshot:** `docs/design-references/antolini-desktop-viewport.png`
- **Interaction model:** time-driven (auto-cycling carousel, ~5 seconds per slide)

## DOM Structure
```
div.home_banner_container [position:relative, height:720px, overflow:hidden]
  div#home_banner_2.home_banner [position:absolute, inset:0, opacity:0 (hidden)]
    div [text content wrapper, centered]
      span.banner_title "ANTOLINI® HAUTE NATURE®"
      span.banner_subtitle "Designed by Nature, Perfected in Italy."
    a [link: "Antolini® Exclusive Collection"]
  div#home_banner_4.home_banner [position:absolute, inset:0, opacity:1 (ACTIVE/shown)]
    ... same structure
  div#home_banner_7.home_banner [opacity:0]
  div#home_banner_21.home_banner [opacity:0]
  div#home_banner_23.home_banner [opacity:0]
  div#home_banner_25.home_banner [opacity:0]
  div.home_banner_container [mobile versions, hidden on desktop]
```

## Computed Styles (exact values)

### .home_banner_container
- position: relative
- width: 100%
- height: 720px
- max-height: 800px
- min-height: 520px
- overflow: hidden
- display: block

### div.home_banner (each slide)
- position: absolute
- top: 0
- left: 0
- width: 100%
- height: 100%
- background-size: cover
- background-position: 50% 50%
- display: flex
- flex-direction: column
- justify-content: center
- align-items: center
- color: rgb(255, 255, 255)
- transition: opacity 2s ease-out

### Active slide (.animated_shown)
- opacity: 1

### Inactive slide (.animated_hidden)
- opacity: 0

### Text content wrapper (child div)
- width: 835px (approx, centered)
- text-align: center
- display: flex
- flex-direction: column
- align-items: center
- gap: 16px

### Banner brand label
- font-size: 18px
- color: white
- letter-spacing: 4px
- text-transform: uppercase
- font-weight: 300

### Banner main title
- font-size: 32px
- line-height: 39px
- letter-spacing: 4.8px
- color: white
- text-transform: uppercase
- font-weight: 300

### Banner subtitle
- font-size: 22px
- line-height: 29px
- letter-spacing: 2px
- color: white
- font-weight: 300

### Collection link
- font-size: 18px
- color: white
- letter-spacing: 2px
- text-decoration: none
- margin-top: 32px
- text-transform: none

## States & Behaviors

### Auto-cycling
- **Trigger:** setInterval, ~5000ms per slide
- **State A (hidden):** opacity: 0, transition: opacity 2s ease-out
- **State B (shown):** opacity: 1, transition: opacity 2s ease-out
- **Overlap:** Next slide fades in while current is still visible (cross-fade)
- **Implementation:** React useState with setInterval, cycling through 6 slides

## Per-Slide Content

### Slide 1 (banner-1.jpg)
- Background: `/images/banner-1.jpg`
- Mobile bg: `/images/banner-mobile-1.jpg`
- Text: "ANTOLINI® HAUTE NATURE®" / "Designed by Nature, Perfected in Italy."
- Link: "Antolini® Exclusive Collection"

### Slide 2 (banner-2.jpg) [ACTIVE on page load]
- Background: `/images/banner-2.jpg`
- Mobile bg: `/images/banner-mobile-2.jpg`
- Text: "ANTOLINI® HAUTE NATURE®" / "Designed by Nature, Perfected in Italy."
- Link: "Antolini® Exclusive Collection"

### Slide 3 (banner-3.jpg)
- Background: `/images/banner-3.jpg`

### Slide 4 (banner-4.jpg)
- Background: `/images/banner-4.jpg`

### Slide 5 (banner-5.jpg)
- Background: `/images/banner-5.jpg`

### Slide 6 (banner-6.jpg)
- Background: `/images/banner-6.jpg`

## Assets
- Banner images: `/images/banner-1.jpg` through `/images/banner-6.jpg`
- Mobile banners: `/images/banner-mobile-1.jpg`, `/images/banner-mobile-2.jpg`

## Responsive Behavior
- **Desktop (1440px):** 720px height, desktop banner images
- **Tablet (768px):** same height, same images
- **Mobile (390px):** ~500px height, mobile banner images
- **Breakpoint:** ~500px switches to mobile images
