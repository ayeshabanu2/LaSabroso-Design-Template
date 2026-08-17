# Image slots — swap guide

All imagery is **remote Unsplash stock** (warm cafe aesthetic) mirroring the
current lasabroso.com approach. To swap in the cafe's real photography:

1. Save photos into this folder (e.g. `hero.jpg`, `about-1.jpg`, `gallery-01.jpg` …)
2. Replace the `https://images.unsplash.com/...` URLs in the HTML `src` /
   `--hero-img` variables with `assets/img/<file>.jpg`

## Hero
- slot: hero.jpg (~1920px wide) — used as CSS background via `--hero-img` on
  `.hero` (index.html)
- fallback currently hot-linked:
  `photo-1514933651103-005eec06c04b` (same as lasabroso.com "La Sabroso Vibe")

## About
- about-1.jpg — cafe interior, chandeliers / macrame
- about-2.jpg — coffee pouring / latte art

## Gallery (16 slots)
gallery.html uses a masonry grid with these fallback Unsplash IDs (replace
`src` with local files; update `alt` + `figcaption` accordingly):

| # | Unsplash ID | Subject |
|---|-------------|---------|
| 01 | photo-1554118811-1e0d58224f24 | cafe bar interior |
| 02 | photo-1517248135467-4c7edcad34c4 | dining tables |
| 03 | photo-1559339352-11d035aa65de | dessert plating |
| 04 | photo-1485182708500-e8f1f318ba72 | friends at table |
| 05 | photo-1565299624946-b28f40a0ae38 | pizza close-up |
| 06 | photo-1567620905732-2d1ec7ab7445 | pancake/dessert tower |
| 07 | photo-1514362545857-3bc16549766b | hand-crafted drink |
| 08 | photo-1551024709-8f23befc6f87 | iced beverage |
| 09 | photo-1509042239860-f550ce710b93 | latte art top-down |
| 10 | photo-1495474472287-4d71bcdd2085 | coffee cup on table |
| 11 | photo-1414235077428-338989a2e8c0 | fine dining plate |
| 12 | photo-1541167760496-1628856ab772 | coffee + book |
| 13 | photo-1521017432531-fbd92d768814 | cafe window seat |
| 14 | photo-1445116572660-236099ec97a0 | cafe storefront vibe |
| 15 | photo-1442512595331-e89e73853f31 | pour over |
| 16 | photo-1453614512568-c4024d13c247 | cafe sea-view tables |

## Menu item photos
41 items in `assets/js/menu-data.json` already carry the cafe's REAL food
photos hosted on their Petpooja CDN (dineinpetweb.gumlet.io). These render
automatically in menu.html with a ☕ placeholder fallback if a URL 404s.

## Brand marks (partner cards)
Rendered as colored text chips (.partner__logo), NOT the official Zomato/
Swiggy trademark logos — swap with licensed assets if this becomes their
production site.
