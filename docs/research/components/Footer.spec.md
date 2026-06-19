# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Screenshot:** `docs/design-references/antolini-footer.png`
- **Interaction model:** static

## DOM Structure
```
footer.antolini-footer [background:#090808, color:#A18F7A]
  div [container, max-width 1640px, padding 40px 140px]
    div [top row - 3 columns: logo/address | nav links | social]
      div.footer_box_logo [left column]
        a [logo link]
          img [logo_white.png, 125px wide]
        p [company address]
      div [middle column - nav links]
        a "Store Locator"
        a "Contacts"
        a "Terms"
        a "Legal Notes"
        a "Cookies"
      div [right column - social + language]
        a [Facebook icon]
        a [Instagram icon]
    div [bottom row - company info]
      p "Antolini Luigi® & C. S.p.a."
      p [address, VAT]
      p [copyright or legal]
      a [email links]
```

## Computed Styles (exact values)

### footer.antolini-footer
- background-color: #090808
- color: #A18F7A
- position: relative
- z-index: 5
- width: 100%
- padding: 60px 0 40px

### Container
- max-width: 1640px
- margin: 0 auto
- padding: 0 140px
- display: flex
- flex-direction: column
- gap: 40px

### Top row
- display: flex
- flex-direction: row
- justify-content: space-between
- align-items: flex-start
- gap: 40px

### Footer logo
- width: 125px
- height: auto

### Company address text
- font-size: 13px
- color: #A18F7A
- line-height: 1.6
- margin-top: 16px

### Footer nav links
- font-size: 13px
- color: #A18F7A
- text-decoration: none
- letter-spacing: 1px
- text-transform: uppercase
- display: block
- line-height: 2

### Hover on footer links
- color: white
- transition: color 0.3s

### Social icons (Facebook, Instagram)
- color: #A18F7A (fill: currentColor)
- width: 28px
- height: 28px
- display: inline-block
- margin-right: 12px

### Social icon hover
- color: white

### Bottom row (legal/VAT)
- font-size: 11px
- color: #A18F7A
- border-top: 1px solid rgba(161,143,122,0.3)
- padding-top: 20px
- display: flex
- justify-content: space-between

## Text Content (verbatim)

### Left column
- Logo: `logo_white.png`
- "Antolini Luigi® & C. S.p.a."
- "Sant'Ambrogio di Valpolicella VERONA"

### Middle column links
- "STORE LOCATOR" → /en/store-locator
- "CONTACTS" → /en/contacts
- "TERMS" → /en/condvendita.php
- "LEGAL NOTES" → /en/legal-notes
- "COOKIES" → /en/cookies

### Right column
- Facebook icon → https://www.facebook.com/Antolini.Luigi
- Instagram icon → https://www.instagram.com/Antolini/

### Bottom row
- "P.IVA IT 0044809 023 3"
- Email: al.spa@pec.antolini.it
- Email: privacy@antolini.it

## Assets
- Logo: `/images/logo_white.png` (340x93 natural, 125px displayed)
- Facebook icon: from `icons.tsx` `<FacebookIcon />`
- Instagram icon: from `icons.tsx` `<InstagramIcon />`

## Responsive Behavior
- **Desktop (1440px):** 3-column horizontal layout
- **Mobile (390px):** Single column, stacked
- **Breakpoint:** ~768px
