# La Sabroso — Design System (DESIGN.md)

Brand token spec for The Cafe La Sabroso, Madhapur, Hyderabad.
Derived from the cafe's live site (lasabroso.com), Instagram (@lasabroso_cafe),
and dine-in listings (Zomato/EazyDiner/Swiggy Dineout). "Boho Neon" setting:
warm bohemian interior, chandelier glow, macrame, neon signage.

## Brand Voice

- Tagline: "Feed your spirit. Feed your belly. Feed your soul."
- Positioning: "A sophisticated blend of Italian elegance and Indian spice."
- Tone: warm, welcoming, artisanal, slightly playful. Never corporate.

## Color Tokens

| Token | Hex | Role | Pairing rules |
|-------|-----|------|---------------|
| `--c-forest` | #2E5D34 | Primary. Headings, filled buttons, footer | on cream/parchment (contrast ≈7.2:1, AAA) |
| `--c-forest-deep` | #23472A | Hover state, dark sections (events) | white text on top |
| `--c-cream` | #FFF9E6 | Page base background | — |
| `--c-parchment` | #F9F3E5 | Alternating section background | — |
| `--c-butter` | #FFF9D1 | Hero card, highlights, offer strip | forest text |
| `--c-terracotta` | #E57A4F | Accent: prices, dividers, partner accents | large text/accents only (≈3.1:1) |
| `--c-terracotta-deep` | #C9623A | Accent hover | — |
| `--c-mint` | #D5F5E3 | Support: badges, tags, delivery cards | forest text |
| `--c-gold` | #FFD700 | Rating stars, chef's-pick badges | on forest/ink |
| `--c-neon-pink` | #FF5C8A | Neon signage accent ONLY (hero sign, events) | glow layers on dark grounds |
| `--c-ink` | #2B2B2B | Body text | on cream/parchment/butter/mint |
| `--c-gray` | #6B6B6B | Secondary text, captions | on light grounds only |

Prohibited: neon pink for body text or large fills; terracotta for body copy;
any background outside the warm family (no pure white pages, no cool grays).

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-script` | 'Dancing Script', cursive | Wordmark "La Sabroso", section kickers, neon sign |
| `--font-body` | 'Nunito', sans-serif | Headings (700/800), body (400/600), buttons (700) |
| `--font-accent` | 'Playfair Display', serif italic | Taglines, pull quotes, testimonials |

Scale (px): 12 · 14 · 16 · 18 · 22 · 28 · 36 · 48 · 64.
Line-height: 1.5 body, 1.2 display. Letter-spacing: normal; script +0.01em.

- H1: 48/64 script or Nunito 800 · H2: 36 Nunito 800 · H3: 22–28 Nunito 700
- Kickers: script, 28px, terracotta
- Prices: Nunito 800, terracotta

## Shape & Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `--r-pill` | 999px | Buttons, filter tabs, badges |
| `--r-card` | 20px | All cards |
| `--r-img` | 16px | Images, gallery tiles |
| `--shadow-card` | 0 8px 24px rgba(43,43,43,.10) | Resting cards |
| `--shadow-lift` | 0 14px 34px rgba(43,43,43,.16) | Hover lift |

Everything rounded — no sharp corners anywhere. Dividers are dotted terracotta,
not solid gray lines.

## Motion

- Hover lift: 150ms ease, translateY(-3px) + shadow-card → shadow-lift
- Scroll reveal: fade-up 24px, 500ms ease-out, staggered 80ms per sibling
- Neon flicker: opacity 1→.55 jitter at 20%/63% keyframes, neon sign only
- Respect `prefers-reduced-motion`: disable reveal + flicker

## Imagery

Direction: warm evening-lit cafe interior, chandeliers, macrame, rattan,
neon signage glow, latte art, food close-ups on ceramic. Sepia-warm grade.
Rounded corners (`--r-img`). Slots: hero(1) + about(2) + gallery(16) —
see assets/img/README.md for swap guide and stock fallbacks.

## Components (implemented in assets/css/style.css)

nav (sticky, script wordmark, pill CTA) · hero (blurred photo + butter card) ·
offer-strip (4 offer cards) · section-heading (script kicker + sans title) ·
specialty-card (icon + title + copy) · partner-card (Zomato/Swiggy/District/
Dineout) · events (forest-deep section + neon sign) · testimonial-carousel ·
gallery-strip / masonry-gallery + lightbox · newsletter · footer (4-col) ·
menu-tabs (category filter pills) · menu-item (dotted-leader price rows) ·
badge-chef (gold) · tag-veg / tag-nonveg (square indicators) · btn-filled /
btn-outline (pills) · rating-badge · reveal

## Canonical Brand Data (verified Aug 17, 2026 — use verbatim)

- Hours: Mon–Sun, 11:00 AM – 11:00 PM
- Phone: +91 9182801364 · Email: lasabrosocafe2022@gmail.com
- Address: Kavuri Hills Road, Madhapur, Hyderabad 500081 (beside Shivaji
  Military Hotel, opp. Game Point, Hitech City)
- Rating: 4.3 ★ · 1,158 dining ratings (Zomato)
- Cost for two: ₹1,200–₹2,000
- Social: Instagram @lasabroso_cafe · Threads @lasabroso_cafe
- Order: Zomato, Swiggy · Dine-in offers: Zomato District, Swiggy Dineout
- Amenities: pet-friendly · free parking · live music · outdoor seating · AC
- Never write "La Sabraso" (typo on their current site — do not propagate)
