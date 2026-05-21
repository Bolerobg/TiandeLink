---
name: Organic Elegance
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#4f4442'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#817471'
  outline-variant: '#d3c3bf'
  surface-tint: '#705953'
  primary: '#1e0f0b'
  on-primary: '#ffffff'
  primary-container: '#35231e'
  on-primary-container: '#a38981'
  inverse-primary: '#dec0b8'
  secondary: '#685e38'
  on-secondary: '#ffffff'
  secondary-container: '#f1e2b2'
  on-secondary-container: '#6e643e'
  tertiary: '#685e3c'
  on-tertiary: '#ffffff'
  tertiary-container: '#b8ab83'
  on-tertiary-container: '#483f20'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fbdcd3'
  primary-fixed-dim: '#dec0b8'
  on-primary-fixed: '#281713'
  on-primary-fixed-variant: '#57423c'
  secondary-fixed: '#f1e2b2'
  secondary-fixed-dim: '#d4c698'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#504623'
  tertiary-fixed: '#f0e2b6'
  tertiary-fixed-dim: '#d4c69c'
  on-tertiary-fixed: '#221b02'
  on-tertiary-fixed-variant: '#4f4626'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
  cream-surface: '#F2EFE9'
  soft-gold: '#C7B98B'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is centered on a "Sophisticated Organic" aesthetic, tailored for a high-end beauty and health influencer. The brand personality is poised, nurturing, and professional, aiming to evoke a sense of calm reliability and premium quality.

The visual direction blends **Minimalism** with **Tactile** elements. It utilizes generous whitespace, a restricted but warm palette, and subtle depth through soft shadows to create an interface that feels like high-quality stationery or luxury skincare packaging. The goal is to move away from the "flat" web look toward a more dimensional, inviting, and human-centric experience.

## Colors

The palette is rooted in earth tones and warm neutrals to reflect health and organic beauty. 

- **Primary (#35231E):** A deep charcoal-brown used for primary typography and high-contrast actions. It provides a grounded, premium feel that is softer than pure black.
- **Secondary (#B7AA7E):** A muted olive-beige used for interactive elements and subtle highlights.
- **Tertiary (#655B39):** A darker moss tone used for secondary accents or borders to maintain the organic theme.
- **Neutral (#F9F7F2):** A warm, off-white "linen" color used as the primary background to reduce eye strain and feel more inviting than stark white.

The design defaults to **light mode** to maximize the "clean and airy" atmosphere essential to the beauty industry.

## Typography

This design system employs a high-contrast typographic pairing to signal both heritage and modernity.

- **Headlines (EB Garamond):** A classical serif that communicates authority and elegance. It should be used for all major headings and display text.
- **Body & Labels (Hanken Grotesk):** A precise, contemporary sans-serif that ensures legibility and a modern edge. 

Key instructions:
- Use `display-lg` sparingly for hero sections.
- Apply `label-lg` with increased letter spacing and uppercase styling for small sub-headers or category tags to create a refined, editorial look.
- Maintain generous line heights to preserve the airy, premium feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain a controlled, editorial appearance, and a fluid approach on mobile. 

- **Grid:** A 12-column system is used for desktop (1200px max width).
- **Rhythm:** Spacing follows an 8px linear scale. 
- **Reflow:** On mobile, margins reduce to 16px. Elements like cards or bio-links should stack vertically with 12px or 16px gaps.
- **White Space:** Prioritize vertical "breathing room." Use large section padding (80px–120px) on desktop to separate content blocks, reinforcing the premium, unhurried brand voice.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**. Instead of heavy dropshadows, this design system uses soft, diffused "glow" shadows that mimic natural light hitting a matte surface.

- **Level 1 (Base):** Neutral background (#F9F7F2).
- **Level 2 (Cards/Buttons):** Cream Surface (#F2EFE9) with a very soft shadow (0px 4px 20px, 5% opacity of Primary color).
- **Interactive:** On hover, elements should slightly lift (increase shadow spread) or shift color subtly. 

Avoid harsh borders. Use thin, low-contrast outlines in Secondary or Tertiary colors only when necessary for accessibility on input fields.

## Shapes

The shape language is **Rounded**, avoiding both the clinical feel of sharp corners and the overly casual look of full pill-shapes.

- **Standard Elements:** Buttons, cards, and input fields use a 0.5rem (8px) radius.
- **Large Containers:** Section containers or featured image masks can scale up to 1rem (16px) for a softer appearance.
- **Images:** Use soft rounded corners on all photography to maintain the organic, approachable feel.

## Components

### Buttons
- **Primary:** Solid Primary color fill with light neutral text. 0.5rem roundedness. Soft transition (200ms) on hover to a slightly lighter shade.
- **Secondary:** Transparent background with a 1px Primary or Tertiary border.
- **Text:** Uppercase `label-lg` style for high-end boutique feel.

### Cards & Links
- Influencer "Link" blocks should be full-width on mobile with a subtle shadow and a `cream-surface` background.
- Include a subtle chevron icon in the Tertiary color to indicate interactivity.

### Inputs & Forms
- Minimalist design. Bottom-border only or a very light 1px border using `secondary-color`.
- Focus state uses a soft glow in the `secondary-color`.

### Chips & Tags
- Used for categories (e.g., "Skin Care", "Nutrition"). Small 0.25rem radius, low-contrast background (#F2EFE9), and `label-md` typography.

### Featured Content
- Use "Editorial Cards" for blog posts or featured products, featuring a large image with the headline overlayed at the bottom using `headline-md` in EB Garamond.