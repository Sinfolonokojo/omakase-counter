# Barbie Glam Retheme — Design

**Date:** 2026-06-11
**Goal:** Restyle the Omakase Counter PWA with a bold pink glam ("Barbie/Y2K") aesthetic. Purely visual — no changes to logic, hooks, data, translations, or layout structure.

## Decisions (from brainstorming)

- **Vibe:** Bold pink glam (hot pink, magenta, sparkles, high contrast)
- **Scope:** Full glam makeover — palette, fonts, and glam details everywhere
- **Animations:** Sushi + glam mix — keep sushi emojis, add hearts/sparkles/pink confetti

## Approach

Retheme the Tailwind design tokens so the whole app flips at once, then do a
focused glam pass on key components.

## Palette (tailwind.config.js)

| Token | Old | New |
|-------|-----|-----|
| `rice` (background) | `#F8F7F4` | `#FFF0F6` soft pink |
| `charcoal` (text/headings) | `#2C3E50` | `#E91E8C` magenta (display) / keep dark variant for body readability |
| `salmon` (accent) | `#FF6B6B` | `#FF1493` hot pink |
| `border-gray` | `#E8E8E8` | `#FFC1DC` pink border |
| new: `bubblegum` | — | `#FF69B4` |
| new: `gold` | — | `#FFD700` (record/celebration moments) |

Counter screen gets a subtle pink-to-lavender gradient background.

## Typography

- Body: keep **Inter** (readability)
- App title: **Pacifico** (script)
- Counter number / headings: **Baloo 2** (rounded bold)
- Fonts loaded via Google Fonts in `index.html`

## Glam details

- Counter number: pink gradient text fill with glow; record state = gold-and-pink sparkle glow
- Buttons and bottom nav: glossy pink pills with gradient fills
- Selected-types banner (was charcoal): hot pink gradient
- ✨ sparkle accents around the title and record indicator
- Cards/chips: white with pink borders and soft pink glow shadow

## Animations (sushi + glam mix)

- `FloatingSushi.jsx`: tap bursts mix sushi with 💖 ✨ 💕 🎀
- `Confetti.jsx`: particle colors become pinks/magenta/gold; emoji mix gains hearts and sparkles
- `AnimatedBackground.jsx`: background floaters mix sushi with hearts/sparkles

## Out of scope

- Any behavioral/logic change
- Theme toggle / preserving the old look
- PWA manifest/icon redesign (can be a follow-up)
