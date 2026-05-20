# Design

## Theme

Light. Users arrive in a moment of stress (premium increase, life change). The interface should feel like a calm, well-lit office of a trusted advisor — not a SaaS dashboard, not a newspaper, not a bank. Ambient light is mid-afternoon, screen in a quiet apartment in Lausanne or Geneva.

## Color Strategy

Restrained, with intentional navy anchoring. Navy carries authority; blue is action; white is breathing room. No gradients. No decorative color. Every color earns its place through function.

### Palette

| Token | Value | Role |
|---|---|---|
| `navy` | `#0f2040` | Primary text, headings, nav — the authoritative voice |
| `brand` | `#1d4ed8` | Links, CTAs, active states — action only |
| `brand-dark` | `#1e40af` | Hover state for brand |
| `brand-light` | `#3b82f6` | Secondary interactive, icons |
| `blue-tint` | `#dbeafe` | Badge backgrounds, callout fills |
| `slate` | `#475569` | Body text, secondary content |
| `muted` | `#94a3b8` | Metadata, dates, labels |
| `edge` | `#e2e8f0` | Borders, dividers |
| `cloud` | `#f1f5f9` | Surface backgrounds, table stripes |
| `white` | `#ffffff` | Page background, card backgrounds |

### OKLCH equivalents (for future token migration)

- navy `oklch(18% 0.06 250)` · brand `oklch(45% 0.22 265)` · slate `oklch(47% 0.04 250)`

## Typography

System font stack: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`

No web font loaded (intentional — performance, and system fonts feel native/trustworthy on Swiss devices).

### Scale

| Role | Size | Weight | Color |
|---|---|---|---|
| Page H1 | 2.5–3.5rem | 700 | navy |
| Section H2 | 1.5rem (24px) | 600 | navy/ink |
| Sub-section H3 | 1.125rem (18px) | 600 | navy/ink |
| Body | 1.0625rem (17px) | 400 | slate |
| Small/meta | 0.875rem (14px) | 400–500 | muted |
| Label/badge | 0.8125rem (13px) | 500 | brand on blue-tint |

Line height: 1.6 body, 1.2–1.3 headings. Max line length: 68ch body, unlimited headings.

## Spacing & Layout

Grid: 12-col, max-width `1152px` (max-w-6xl), gutter `px-6`.

Spacing rhythm: 4px base unit. Major sections: `py-16` to `py-24`. Internal section gaps: `gap-8` to `gap-12`.

No decorative whitespace. Every gap is earned by content structure.

## Elevation & Depth

Minimal. Cards: `border border-edge rounded-lg` — no shadow by default. Hover: `shadow-sm` maximum. No layered shadows, no blur, no glassmorphism.

## Components

### Buttons
- Primary: `bg-brand text-white px-6 py-3 rounded-md font-medium` — hover `bg-brand-dark`
- Secondary: `border border-edge text-ink px-6 py-3 rounded-md` — hover `bg-cloud`
- Never gradient. Never rounded-full for actions.

### Cards
- Default: `bg-white border border-edge rounded-lg p-8`
- Small: `bg-white border border-edge rounded-lg p-5`
- No card grids with identical structure. Vary proportion, content density, or layout per card.

### Callouts
- **Note**: `bg-blue-tint border-l-4 border-brand` — information worth noting
- Banned: `border-left` colored stripe > 1px as decorative accent (already in globals — keep)

### Badges
- `bg-blue-tint text-brand text-[13px] font-medium px-3 py-1 rounded-full`

### Tables
- `stripe-table` class — thead `bg-cloud`, hover `bg-cloud/60`, borders `edge`

## Motion

Transitions: `duration-150 ease-out` only. No animation on layout properties. No bounce. No scroll-triggered animations on informational content (distracts from reading).

## Patterns to avoid

- Hero metric template (big number + gradient accent) — already creeping in via HeroStats; use sparingly
- Identical card grids (icon + heading + text × N)
- Gradient text
- Side-stripe borders as decorative accents (already banned in globals)
- Empty state filler — every section should earn its place
