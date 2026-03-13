# cafe-brown-hero

Fullscreen interactive hero page for cafe~brown.
Built with vanilla HTML, CSS, and JS — no frameworks or dependencies except Google Fonts.

> Original UI design by [@robert.mccombe](https://www.instagram.com/robert.mccombe/) — recreated from scratch in vanilla HTML, CSS & JS.

## Features
- Fullscreen dark background, fully responsive across all screen sizes
- Large script-font hero text (Satisfy) that scales with viewport
- 5 corner/edge labels with baseline drop-in animation on page load
- Labels turn green on hover
- 16 flip cards in 2 rows × 8 columns
  - Transparent front face (invisible by default)
  - Vertical flip (rotateX) on hover reveals café photo
  - Quick flip-in, image lingers, slow flip-back on mouse leave
  - Alternating diagonal tilts per card for organic feel
- Custom green dot cursor with mix-blend-mode exclusion

## Usage
Open `index.html` in any browser. No build step, no install needed.

## Customisation
| What | Where |
|---|---|
| Hero text size | `font-size: clamp(...)` on `.hero-text` |
| Image width | `width: clamp(...)` on `.flip-cell` |
| Images per row | `i < 8` threshold in JS + images array length |
| Row/column gap | `gap: clamp(...)` on `.img-rows` and `.img-row` |
| Colors | `--green`, `--dark`, `--text` in `:root` |
| Flip-back delay | `500` in `setTimeout` on `mouseleave` |

## Fonts (Google Fonts)
- **Satisfy** — hero script text
- **Poppins 800** — center label
- **Roboto Mono** — corner labels

## Tech
- HTML / CSS / JS — zero dependencies
- CSS custom properties for easy theming
- `clamp()` throughout for fluid responsive sizing
- CSS `rotateX` + `backface-visibility` for 3D flip effect

## Credits
Original UI design by [@robert.mccombe](https://www.instagram.com/robert.mccombe/) on Instagram.
This project is a from-scratch code recreation of his Figma/Wix design concept.
