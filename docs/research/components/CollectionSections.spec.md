# CollectionSections Specification

## Overview
- **Target file:** `src/components/CollectionSections.tsx`
- **Screenshot:** `docs/design-references/antolini-scroll-1200.png`
- **Interaction model:** static (CSS animation on background image, scroll into view)

## DOM Structure
```
div [4 sections stacked]
  div.collection_banner_hp [full-width, 600px height, background-image]
    div [inner content, centered]
      p/span [section label, small text, uppercase]
      h2/div [collection title, large text]
      a/button [CTA link "DISCOVER THIS MATERIAL" or "DISCOVER"]
  div.collection_banner_hp [Stoneroom - has logo image instead of text]
    img [stoneroom-logo.png]
    a [CTA link]
  div.collection_banner_hp [Tableware]
  div.collection_banner_hp [Technology/Innovation]
```

## Computed Styles (exact values)

### .collection_banner_hp (each section)
- width: 100%
- height: 600px
- display: flex
- align-items: center
- justify-content: center
- flex-direction: column
- background-size: cover
- background-position: 50% 50%
- background-repeat: no-repeat
- overflow: hidden
- position: relative
- text-align: center

### Inner content wrapper
- display: flex
- flex-direction: column
- align-items: center
- gap: 20px
- z-index: 1
- position: relative

### Section label (small text above title)
- font-size: 12px
- color: #A18F7A
- letter-spacing: 3px
- text-transform: uppercase
- font-weight: 400

### Collection title
- font-size: 28px
- color: #A18F7A
- letter-spacing: 2px
- text-transform: uppercase
- font-weight: 400
- font-family: Lato, sans-serif

### CTA link/button
- font-size: 18px
- color: #A18F7A
- letter-spacing: 2px
- text-transform: uppercase
- text-decoration: none
- border: 1px solid #A18F7A
- padding: 12px 30px
- background: transparent
- transition: color 1s, background-color 1s
- cursor: pointer

### CTA hover state
- background-color: #A18F7A
- color: white

### Background image overlay (slow zoom)
- The background image has animation: slowZoom 20s ease-in-out infinite (scale 1→1.08→1)
- Achieved by wrapping in a div with overflow:hidden and animating the inner bg

## Per-Section Content

### Section 1: Exclusive Collection
- Background: `/images/collection-exclusive.jpg`
- Mobile bg: `/images/collection-exclusive-mobile.jpg`
- Label text: "ANTOLINI®"
- Title: "EXCLUSIVE COLLECTION"
- Body text: "Exclusivity through tradition and expertise. Antolini® is curator to Mother Nature's most desired and recognisable masterpieces."
- CTA text: "DISCOVER THIS MATERIAL"
- CTA href: "/en/c3/exclusive-collection"

### Section 2: Stoneroom®
- Background: `/images/collection-stoneroom.jpg`
- Mobile bg: `/images/collection-stoneroom-mobile.jpg`
- Logo image: `/images/stoneroom-logo.png` (520x145, displayed at 260px wide)
- CTA text: "DISCOVER MORE"
- CTA href: "/en/milanoduomo"

### Section 3: Tableware
- Background: `/images/collection-tableware.jpg`
- Label: "ANTOLINI®"
- Title: "TABLEWARE"
- CTA text: "DISCOVER"
- CTA href: "/en/tableware"

### Section 4: Technology
- Background: `/images/collection-tech.jpg`
- Label: "ANTOLINI®"
- Title: "INNOVATION"
- CTA text: "DISCOVER"
- CTA href: "/en/innovation"

## States & Behaviors

### Slow Zoom Animation
- **Trigger:** CSS animation, plays continuously
- **Animation:** background position/scale animation via child div
- `@keyframes slowZoom { 0%: scale(1); 50%: scale(1.08); 100%: scale(1) }`
- Duration: 20s, easing: ease-in-out, iteration: infinite
- Achieved by: wrapping bg-image div in overflow:hidden container, animating inner div

### Hover on CTA button
- color: white → (transition 1s)
- background-color: transparent → #A18F7A (transition 1s)

## Assets
- `/images/collection-exclusive.jpg`
- `/images/collection-stoneroom.jpg`
- `/images/collection-tableware.jpg`
- `/images/collection-tech.jpg`
- `/images/stoneroom-logo.png`

## Responsive Behavior
- **Desktop (1440px):** 600px height, full-width
- **Tablet (768px):** Same height
- **Mobile (390px):** Height reduces to ~350px, mobile bg images used, text smaller
- **Breakpoint:** ~500px
