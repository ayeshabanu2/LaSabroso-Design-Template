# La Sabroso — Design Template

A standalone brand + page template for **The Cafe La Sabroso**, Madhapur,
Hyderabad — built from the cafe's live design language (lasabroso.com), its
Instagram (@lasabroso_cafe), its live dine-in menu (Petpooja QR menu), and
public listings (Zomato, Swiggy Dineout, EazyDiner).

> Fan craft / redesign concept — not affiliated with the cafe.

## What's inside

```
DESIGN.md                  Brand token spec: palette, type, shape, motion,
                           imagery direction, component inventory — reusable
                           for menus, social posts, signage, future pages.
index.html                 Home: hero, offer strip, specialties, signature
                           creations, about teaser, delivery/dine-in partners,
                           events (Boho-Neon dark section), testimonials,
                           moments strip, newsletter, footer.
menu.html                  Full live menu: 121 dishes · 20 categories ·
                           category tabs + search + veg/non-veg tags +
                           chef's-pick badges + real food photos.
gallery.html               16-slot masonry gallery + lightbox + IG highlights.
about.html                 Origin story, signatures, amenities, Boho Neon.
contact.html               Address/map, phone/email, hours, amenities,
                           rating, reservation partners (District/Dineout).
assets/css/style.css       The full design system (single stylesheet).
assets/js/main.js          Nav toggle, reveal, menu filters/search, carousel,
                           lightbox, newsletter — vanilla, no dependencies.
assets/js/menu-data.json   Live menu extract (Aug 17 2026, Petpooja dine-in):
                           name, price, description, veg flag, photo URL.
assets/img/README.md       Photo-slot guide for swapping in real photography.
```

## Brand language (from DESIGN.md)

- Forest green `#2E5D34` + cream `#FFF9E6` + terracotta `#E57A4F`,
  mint `#D5F5E3`, gold `#FFD700`, neon pink `#FF5C8A` (sign only)
- Dancing Script (wordmark/kickers) · Nunito (UI/body) · Playfair italic (quotes)
- Pill buttons, 20px card radii, warm soft shadows, dotted terracotta leaders
- Boho-Neon motion: gentle lifts, scroll reveals, neon-sign flicker

## Run it

Any static server, or just open index.html:

```bash
cd LaSabroso
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy anywhere

The whole folder is self-contained static HTML/CSS/JS (only external deps are
Google Fonts + Unsplash/Petpooja hot-linked images). Drop the folder onto
Netlify, Vercel, GitHub Pages, S3/CloudFront, or any Apache/Nginx docroot.

## Updating the menu

`assets/js/menu-data.json` is the single source. Refresh by re-extracting from
the live QR menu (https://dinein.petpooja.com/orders/category/fm32c9qw/19)
or hand-editing — menu.html renders from it at load time.

## Verification status (Aug 17 2026)

- 121 items / 20 categories / 41 real photos (menu-data.json)
- All 5 pages share contract components; no per-page CSS
- No console errors; menu tabs + search, carousel, lightbox verified in browser
- Canonical brand data (hours 11–11, phone, address, rating) from official site + Zomato
