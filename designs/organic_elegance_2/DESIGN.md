---
name: Organic Elegance
colors:
  surface: '#fff8f3'
  surface-dim: '#e1d8d0'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2ea'
  surface-container: '#f6ece4'
  surface-container-high: '#f0e7de'
  surface-container-highest: '#eae1d9'
  on-surface: '#1f1b16'
  on-surface-variant: '#4d4540'
  inverse-surface: '#34302a'
  inverse-on-surface: '#f9efe7'
  outline: '#7e756f'
  outline-variant: '#cfc4bd'
  surface-tint: '#635d5a'
  primary: '#181512'
  on-primary: '#ffffff'
  primary-container: '#2d2926'
  on-primary-container: '#96908b'
  inverse-primary: '#cdc5c0'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#151612'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a2a26'
  on-tertiary-container: '#92918c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9e1dc'
  primary-fixed-dim: '#cdc5c0'
  on-primary-fixed: '#1e1b18'
  on-primary-fixed-variant: '#4b4642'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e5e2dc'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474743'
  background: '#fff8f3'
  on-background: '#1f1b16'
  surface-variant: '#eae1d9'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is rooted in the "Organic Elegance" philosophy—a fusion of high-fashion editorial aesthetics and minimalist functionalism. It targets a discerning audience that values tactility, quiet luxury, and deliberate breathing room. 

The visual style is **Editorial Minimalism**. It leverages heavy whitespace not as "empty space," but as a structural element that directs focus toward curated content. The emotional response is intended to be one of calm, premium sophistication, and timelessness. By moving away from standard "app-like" densities, this design system treats every screen as a digital spread in a high-end publication.

## Colors

The palette is anchored in natural, earthy tones that evoke organic materials:

*   **Primary (Deep Espresso):** Used for typography and high-contrast structural elements. It provides a grounded, authoritative weight.
*   **Secondary (Soft Gold):** Reserved for interactive accents, subtle dividers, and moments of celebration. It is used sparingly to maintain its premium impact.
*   **Tertiary (Cream):** The primary surface color. It replaces pure white to reduce eye strain and provide a warmer, more "paper-like" feel.
*   **Neutral (Taupe/Warm Gray):** Used for secondary text, metadata, and delicate borders.

The default color mode is **Light**, emphasizing the cream-colored surfaces to maintain the "Organic Elegance" atmosphere.

## Typography

Typography is the primary driver of the "Organic Elegance" narrative. It utilizes a high-contrast pairing:

1.  **Playfair Display:** An elegant serif used for headlines and display text. It should be typeset with slightly tighter letter-spacing for large sizes to create a bespoke, editorial feel.
2.  **DM Sans:** A geometric sans-serif that remains understated and functional. It is used for all UI elements, labels, and long-form body copy to ensure legibility and a modern touch.

Labels use **uppercase** styling with generous letter-spacing to distinguish them from body content and evoke luxury branding.

## Layout & Spacing

This design system uses a **Fixed Grid** philosophy for desktop to maintain editorial control over line lengths and white space. 

*   **Desktop:** A 12-column grid with 24px gutters and wide 64px margins. Content is often offset or centered with significant "white-space" buffers (using the 120px section gap) to allow elements to breathe.
*   **Mobile:** A 4-column fluid grid. Margins are reduced to 20px, but vertical rhythm is maintained to prevent the design from feeling cluttered.

The spacing rhythm is based on an 8px base unit, but preference is always given to larger increments (32px, 48px, 64px) to emphasize the sense of spaciousness.

## Elevation & Depth

To maintain a minimalist and "organic" feel, depth is achieved through **Tonal Layers** and **Subtle Shadows** rather than aggressive stacking.

*   **Surface Hierarchy:** The base layer is the Cream (#F9F6F0). Higher-level elements (like cards or modals) use a pure White (#FFFFFF) to provide a soft lift.
*   **Shadows:** Shadows are extremely diffused (high blur, low opacity) and tinted with the Espresso primary color to avoid a "dirty" gray look. They should feel like soft ambient light hitting a physical surface.
*   **Borders:** Delicate, 1px borders in Soft Gold or light Taupe are used to define boundaries without adding visual noise.

## Shapes

The shape language is **Soft** and restrained. While sharp corners can feel too harsh and fully rounded "pill" shapes can feel too playful, the soft (4px - 12px) radius provides a human, organic touch that aligns with the "Elegance" narrative.

Interactive elements like buttons and input fields use the base `rounded` (4px) setting. Larger containers, such as imagery cards or featured modules, may use `rounded-lg` (8px) or `rounded-xl` (12px) to soften the overall layout.

## Components

*   **Buttons:** Primary buttons are Espresso with White text, using a subtle Soft Gold border on hover. Secondary buttons are outlined in 1px Soft Gold. Padding is generous (16px 32px).
*   **Input Fields:** Ghost-style inputs with only a bottom border in Taupe. Upon focus, the border transitions to Soft Gold. Labels are always small-cap and positioned above the field.
*   **Cards:** Use White backgrounds on the Cream surface. Borders are optional; if used, they should be high-transparency Taupe. Shadows are only applied to "hover" states to indicate interactivity.
*   **Chips/Tags:** Minimalist containers with a 1px border. No background fill unless active.
*   **Lists:** Separated by thin, 1px horizontal rules in a very light Taupe, with generous vertical padding (24px) between items.
*   **Featured Imagery:** Images should always feature a subtle 4px corner radius and be treated with a consistent warm-toned filter to match the Cream palette.