# Implementation Plan — La Sabroso Café Customer Website & Staff POS Portal

Updated design and implementation plan for **The Cafe La Sabroso**, Madhapur, Hyderabad.

## Architecture

- **Customer Website**:
  - `index.html`: Main landing page with hero, offer strips, event booking, testimonials, and Staff POS link.
  - `menu.html`: Customer menu browser driven by `assets/js/menu-data.json`.
  - `gallery.html`, `about.html`, `contact.html`: Additional public pages.
- **Staff POS Portal**:
  - `pos.html`: Integrated POS & management dashboard.
  - `globals.css`: DESIGN.md aligned design tokens (`#2E5D34` forest green, `#FFF9E6` cream, `#E57A4F` terracotta, `#D5F5E3` mint, `#FFF9D1` butter, Nunito & Dancing Script typography).
  - `app.js`: POS engine with XSS escaping (`esc()`), ₹ currency formatting, real 121 menu items, inventory restock guards, and Chart.js analytics graphs.

## Verification

- Verified customer links: `index.html` <-> `pos.html` navigation.
- Verified menu data: 121 real items in ₹ for Madhapur, Hyderabad.
- Verified XSS prevention across all `innerHTML` sinks.
- Verified stock guards (`qty > 0`) and unavailable item POS filtering.
