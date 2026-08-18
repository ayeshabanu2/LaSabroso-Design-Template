# La Sabroso — Customer Website & Staff POS Management System

A complete brand + page template + staff Point-of-Sale (POS) dashboard for **The Cafe La Sabroso**, Madhapur, Hyderabad — built from the cafe's live design language (lasabroso.com), its Instagram (@lasabroso_cafe), its live dine-in menu (Petpooja QR menu), and official brand specifications.

## What's inside

```
DESIGN.md                  Brand token spec: forest green #2E5D34, cream #FFF9E6,
                           terracotta #E57A4F, mint #D5F5E3, butter #FFF9D1,
                           Dancing Script, Nunito, Playfair Display.
index.html                 Customer Homepage: hero, offer strip, specialties, signature
                           creations, partners, events, testimonials, footer + link to Staff POS.
pos.html                   Staff POS Portal: live POS sale builder (₹), Order Kanban board,
                           121-item menu catalog manager, ingredient inventory tracking,
                           customer directory, analytics charts, and Dark Roast mode.
menu.html                  Full live customer menu: 121 dishes · 20 categories ·
                           category tabs + search + veg/non-veg tags + real food photos.
gallery.html               16-slot masonry gallery + lightbox + IG highlights.
about.html                 Origin story, signatures, amenities, Boho Neon ambiance.
contact.html               Address/map, phone/email, hours, amenities, rating.
globals.css                POS & design system stylesheet matching DESIGN.md tokens.
app.js                     POS state engine, XSS-safe rendering, ₹ formatting, stock guards.
assets/css/style.css       Customer site design system stylesheet.
assets/js/main.js          Customer site JS (carousel, lightbox, menu rendering).
assets/js/menu-data.json   Live menu extract (121 dishes, real prices in ₹, veg flags).
```

## Running the Application

Open `index.html` for the customer experience or `pos.html` for the staff management portal in any browser or static HTTP server:

```bash
python -m http.server 8000
# Customer Site: http://localhost:8000/index.html
# Staff POS Portal: http://localhost:8000/pos.html
```

## Security & Data Integrity Improvements

- **XSS Prevention**: Dynamic rendering sinks use HTML-escaping (`esc()`).
- **Currency & Localized Data**: Prices rendered in Indian Rupees (₹) using real menu items from Madhapur, Hyderabad.
- **Stock & Sale Guards**: Restock quantities strictly validated (`qty > 0`), unavailable items excluded from POS checkout.
- **State Persistence**: Catalog and orders persist across page reloads via `localStorage`.
