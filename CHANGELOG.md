# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] — 2026-08-11

### Fixed
- Mobile bottom navigation bar no longer gets clipped on the right edge (changed positioning strategy from `left/right percentages` to `left: 1rem; right: 1rem; width: auto; overflow: hidden`).
- Menu category tabs ("Cafés de Autor", "Pastelería de Alta Gama", "Brunch") now wrap correctly on mobile instead of overflowing horizontally (`white-space: normal`, `word-break: break-word`).
- About-section metrics now display as a compact 3-column grid on mobile instead of a stacked single column.

---

## [1.1.0] — 2026-08-11

### Added
- Full responsive layout for Desktop (1440px+), Tablet (1024px), Mobile (768px), and Small Phone (480px).
- Mobile bottom floating navigation bar with blur/glassmorphism effect.
- Hamburger menu for mobile viewports.
- Professional `README.md` with project structure, tech stack, and setup instructions.
- `.gitignore` with comprehensive coverage.

### Changed
- Hero image wrapper changed to `width: 100%; max-width: 400px` (fluid instead of fixed `400px`).
- Navigation links on tablet viewport reduced in font size to prevent overflow.
- Section titles scale down progressively: `3.5rem → 3rem → 2.5rem → 2rem`.

---

## [1.0.0] — 2026-08-11

### Added
- Complete landing page rebrand: white tables, flowers, city view, sunset terrace, owner-operated atmosphere.
- Integrated 3 real café photography assets: `patio_sunset.png`, `cafe_facade.png`, `rose_bench.png`.
- Updated operating hours to **Monday–Saturday, 10:00 AM – 9:00 PM**.
- Wi-Fi and jazz music mentioned throughout the page content.
- Interactive coffee-finder widget ("Descubrir mi Taza") with 3-step quiz and personalized recommendations.
- Dynamic menu tabs: Cafés de Autor, Pastelería de Alta Gama, Brunch Signature.
- Rose-gold & platinum design system (CSS custom properties, glassmorphism cards, smooth animations).
- Rotating circular stamp SVG in Hero section.
- Google Maps integration in the "Visítanos" section.
- WhatsApp contact card.
- Testimonials section with 3 customer reviews.
- Scroll-spy active state on navigation.
- Initial GitHub repository setup and push.

### Removed
- All references to the word "Ritual" — replaced with "Momento" and "Tu Taza Perfecta" to respect the owners' Christian values.
- Previous gold/luxury color palette replaced with rose-gold/platinum scheme derived from the official logo.

---

_Maintained by the Uhlala Café development team._
