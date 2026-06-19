# Navigation Specification

## Overview
- **Target file:** `src/components/Navigation.tsx`
- **Screenshot:** `docs/design-references/antolini-desktop-viewport.png`
- **Interaction model:** scroll-driven (header background changes) + click-driven (menu open/close)

## DOM Structure
```
div#header.antolini-header [fixed, full-width, z-index:1000]
  div#header_content
    a [logo link to /en/]
      img#header_logomain_white [logo_white.png, 175px wide, visible by default]
      img#header_logomain [logo.png, 175px wide, hidden by default, shown when scrolled]
  div#header_menuopen [desktop only, .nomobile]
    svg [hamburger menu icon, 18x10, fill:#a18f7a]
    span "MENU" [text, font-size:18px, color:#A18F7A, letter-spacing:2px, uppercase]
  div#header_menu_1 [top right nav - desktop only]
    a "STORE LOCATOR" [color:#A18F7A, font-size:11px, letter-spacing:1px, uppercase]
    a "FAIRS & EVENTS"
    a "CONTACT US"
    span "|" divider
    div [language selector with arrow icon]
    a [search icon]
  div#header_menu_cont [full overlay panel, slides in when MENU clicked]
    img [logo inside panel]
    img [close button]
    div#header_menu_2 [main nav links]
      div.header_menu_2_elem "ANTOLINI®"
      div.header_menu_2_elem "HAUTE NATURE®"
      div.header_menu_2_elem "HISTORY"
      div.header_menu_2_elem_withchild "COLLECTIONS" [has dropdown]
      div.header_menu_2_elem_withchild "GEOFAMILY" [has dropdown]
      div.header_menu_2_elem "INNOVATION"
      div.header_menu_2_elem "LADY A"
      div.header_menu_2_elem "STONEROOM®"
```

## Computed Styles (exact values)

### #header (at scroll 0, over dark banner)
- position: fixed
- top: 0
- left: 0
- right: 0
- width: 100%
- z-index: 1000
- background-color: transparent (rgba(0,0,0,0)) — transparent over banner
- display: flex
- justify-content: space-between
- align-items: center
- padding: 20px 40px
- transition: background-color 0.3s ease

### Logo (white version)
- width: 175px
- height: auto
- display: block (default, shows over dark banner)

### Logo (dark version)
- display: none (default, shows when scrolled past banner)

### MENU button
- display: flex
- align-items: center
- gap: 8px
- cursor: pointer
- font-size: 18px
- color: #A18F7A
- letter-spacing: 2px
- text-transform: uppercase
- font-weight: 400

### Top-right nav items (Store Locator, Fairs, Contact)
- font-size: 11px
- color: #A18F7A
- letter-spacing: 1px
- text-transform: uppercase
- font-weight: 400
- text-decoration: none

### Menu overlay panel (#header_menu_cont)
- position: fixed
- top: 0
- left: 0
- width: 100%
- height: 100%
- background-color: rgba(255,255,255,0.97) OR dark (check screenshot)
- z-index: 999
- display: none by default, flex when open
- padding: 40px 140px

### Main nav links in panel
- font-size: 20px
- font-family: "Lato Semibold" (600 weight)
- color: #A18F7A
- letter-spacing: 2px
- text-transform: uppercase
- line-height: 2

## States & Behaviors

### Initial State (scroll position 0, over hero banner)
- Header: transparent background
- Logo: white version visible (logo_white.png)
- Text: color #A18F7A

### Scrolled State (past hero banner ~720px)
- Header: white background (#FFFFFF)
- Logo: dark version visible (logo.png)
- Text: still #A18F7A
- Transition: background-color 0.3s ease

### Menu Open State
- Overlay panel slides in (or fades in)
- Close button visible
- Body scroll locked

### Hover States
- Nav links: opacity 0.7 or color brightens slightly
- MENU text: no change (already #A18F7A)

## Text Content (verbatim)
- "MENU" (next to hamburger icon)
- "STORE LOCATOR"
- "FAIRS & EVENTS"
- "CONTACT US"
- Language: "EN" (with arrow)
- Nav items: "ANTOLINI®", "HAUTE NATURE®", "HISTORY", "COLLECTIONS", "GEOFAMILY", "INNOVATION", "LADY A", "STONEROOM®"

## Assets
- White logo: `/images/logo_white.png` (340x93 natural, displayed 175px wide)
- Dark logo: `/images/logo.png` (340x93 natural, displayed 175px wide)
- Search icon: `/images/ico_cerca.svg` (25x25)
- Arrow/chevron: `/images/freccia_bianca.svg` (15x8)
- Hamburger: SVG inline (18x10, fill:#a18f7a)
- Close icon: `/images/chiudi.svg` (14x14)

## Responsive Behavior
- **Desktop (1440px):** Full header with MENU text, top-right nav items
- **Tablet (768px):** Top-right nav items hidden, hamburger still visible
- **Mobile (390px):** Mobile-specific hamburger (`#header_menuopen_mobile`), top nav hidden
- **Breakpoint:** ~1024px
