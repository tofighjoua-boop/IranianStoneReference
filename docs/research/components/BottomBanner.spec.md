# BottomBanner Specification

## Overview
- **Target file:** `src/components/BottomBanner.tsx`
- **Screenshot:** `docs/design-references/antolini-scroll-4000.png`
- **Interaction model:** time-driven (auto-cycling, same as HeroBanner)

## DOM Structure
```
div.home_bottom_banner_container [position:relative, height:600px, overflow:hidden]
  div#home_bottom_banner_1.home_bottom_banner [position:absolute, opacity:0]
    div [text content, centered]
  div#home_bottom_banner_2.home_bottom_banner [position:absolute, opacity:1 ACTIVE]
    div [text content, centered]
  div#home_bottom_banner_3.home_bottom_banner [position:absolute, opacity:0]
    div [text content, centered]
```

## Computed Styles (exact values)

### .home_bottom_banner_container
- position: relative
- width: 100%
- height: 600px
- overflow: hidden

### div.home_bottom_banner (each slide)
- position: absolute
- inset: 0
- background-size: cover
- background-position: 50% 50%
- display: flex
- align-items: center
- justify-content: center
- color: white
- opacity: 0 (hidden) or 1 (shown)
- transition: opacity 2s ease-out

### Text overlay
- text-align: center
- color: white

### Title (banner text)
- font-size: 32px
- letter-spacing: 4.8px
- text-transform: uppercase
- font-weight: 300
- color: white

## Per-Slide Content

### Slide 1 (bottom-banner-1.jpg)
- Background: `/images/bottom-banner-1.jpg`
- Text: [Event/collection text]

### Slide 2 (bottom-banner-2.jpg) [ACTIVE on load]
- Background: `/images/bottom-banner-2.jpg`

### Slide 3 (bottom-banner-3.jpg)
- Background: `/images/bottom-banner-3.jpg`
- This is the "Fairs & Events" banner (banner-banner-fiere-sito.jpg)

## States & Behaviors
- **Auto-cycling:** setInterval ~5000ms, same logic as HeroBanner
- **Transition:** opacity 2s ease-out (cross-fade)

## Assets
- `/images/bottom-banner-1.jpg`
- `/images/bottom-banner-2.jpg`
- `/images/bottom-banner-3.jpg`

## Responsive Behavior
- **Desktop (1440px):** 600px height
- **Mobile (390px):** ~350px height
