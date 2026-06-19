# TechnologySection Specification

## Overview
- **Target file:** `src/components/TechnologySection.tsx`
- **Screenshot:** `docs/design-references/antolini-scroll-2400.png`
- **Interaction model:** static

## DOM Structure
```
section [dark background #090808, full width]
  div [container, max-width 1640px, centered]
    div [3-column flex layout]
      a [link to Azerocare Plus page]
        img [logo-azerocare-plus.svg, 269px wide x 48px]
        p [description text]
        span "Discover more →"
      a [link to AVP page]
        img [logo-avp.png, 308px wide x 53px]
        p [description text]
        span "Discover more →"
      a [link to Azerobact Plus page]
        img [logo-azerobact-plus.png, 253px wide x 53px]
        p [description text]
        span "Discover more →"
```

## Computed Styles (exact values)

### Section container
- background-color: #090808
- width: 100%
- padding: 80px 140px
- display: flex
- justify-content: center

### Inner 3-column grid
- display: flex
- flex-direction: row
- justify-content: space-between
- align-items: flex-start
- gap: 60px
- max-width: 1640px
- width: 100%

### Each tech item (column)
- display: flex
- flex-direction: column
- align-items: center
- text-align: center
- gap: 20px
- flex: 1

### Tech logo image
- width: auto
- height: 50px
- object-fit: contain

### Description text
- font-size: 15px
- color: #A18F7A
- font-family: Lato, sans-serif
- font-weight: 400
- line-height: 1.6
- text-align: center
- max-width: 300px

### "Discover more" link
- font-size: 14px
- color: #A18F7A
- letter-spacing: 2px
- text-transform: uppercase
- text-decoration: none
- border-bottom: 1px solid #A18F7A
- padding-bottom: 2px

## Text Content (verbatim)

### Azerocare Plus®
- Logo: `/images/logo-azerocare-plus.svg`
- Description: "New technology Developed for surfaces in Lether, Matt and Lux® finish"
- Link: "Discover more"
- Href: "/en/azerocare-plus"

### AVP
- Logo: `/images/logo-avp.png`
- Description: "Advanced Vein Process technology"
- Link: "Discover more"
- Href: "/en/avp"

### Azerobact Plus
- Logo: `/images/logo-azerobact-plus.png`
- Description: "Antibacterial technology for natural stone surfaces"
- Link: "Discover more"
- Href: "/en/azerobact-plus"

## States & Behaviors
- **Hover on "Discover more":** letter-spacing slight increase, or opacity change

## Assets
- `/images/logo-azerocare-plus.svg`
- `/images/logo-avp.png`
- `/images/logo-azerobact-plus.png`

## Responsive Behavior
- **Desktop (1440px):** 3-column horizontal layout
- **Tablet (768px):** Still 3 columns, reduced padding
- **Mobile (390px):** Stacks to single column
- **Breakpoint:** ~768px
