# NewsletterSection Specification

## Overview
- **Target file:** `src/components/NewsletterSection.tsx`
- **Screenshot:** `docs/design-references/antolini-footer.png`
- **Interaction model:** static (form submission)

## DOM Structure
```
section [light background or white]
  div [container, centered]
    h3/p [section label, small]
    h2 [section title]
    form [email subscription form]
      input type="email" placeholder="E-MAIL"
      div [GDPR consent text]
      button "SUBSCRIBE"
```

## Computed Styles (exact values)

### Section wrapper
- background-color: #ffffff (or #F0F0F0 very light)
- padding: 80px 140px
- display: flex
- justify-content: center

### Inner content
- max-width: 600px
- display: flex
- flex-direction: column
- align-items: center
- gap: 24px
- text-align: center

### Section title
- font-size: 22px
- color: #A18F7A
- letter-spacing: 3px
- text-transform: uppercase
- font-weight: 300

### Email input
- width: 100%
- border: none
- border-bottom: 1px solid #A18F7A
- padding: 12px 0
- font-size: 14px
- color: #A18F7A
- background: transparent
- outline: none
- placeholder color: #CFCAC3
- letter-spacing: 2px
- text-transform: uppercase

### GDPR text
- font-size: 11px
- color: #777373
- line-height: 1.5

### Subscribe button
- background-color: #A18F7A
- color: white
- border: none
- padding: 14px 40px
- font-size: 13px
- letter-spacing: 3px
- text-transform: uppercase
- cursor: pointer
- transition: background-color 0.3s

### Button hover
- background-color: #8a7a68

## Text Content (verbatim)
- Label: "NEWSLETTER"
- Title: "STAY UPDATED"
- Input placeholder: "E-MAIL"
- Consent: "I have read and authorize the use of my personal data. * Required field"
- Button: "SUBSCRIBE"

## States & Behaviors
- Form validation: email field required
- Submit: shows thank you or loading state
- No complex animations

## Responsive Behavior
- **Desktop (1440px):** Centered, 600px max-width form
- **Mobile (390px):** Full width form, reduced padding
