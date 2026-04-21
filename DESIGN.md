# Design Brief

## Direction

Transport Authority Modern — Algerian bus management app with professional yet approachable identity rooted in national colors.

## Tone

Confident and grounded. Not playful—transit demands reliability. Not cold—users trust this with travel money. Tight hierarchy, clear CTAs, reassuring feedback.

## Differentiation

Algerian green + warm gold palette creates distinct cultural identity without cliché. Mobile-first card layout with visible surface hierarchy across all zones.

## Color Palette

| Token           | OKLCH        | Role                               |
|-----------------|-------------|------------------------------------|
| background      | 0.98 0.006 150 | Cool off-white, eye strain reduction on mobile |
| foreground      | 0.15 0.02 160 | Deep forest-green text, AA+ contrast |
| card            | 1.0 0 0     | Pure white cards, scannable        |
| primary         | 0.52 0.18 155 | Algerian green, vibrant & professional |
| accent          | 0.65 0.16 40 | Warm gold, CTAs & highlights       |
| muted           | 0.93 0.01 150 | Section dividers, soft backgrounds |
| destructive     | 0.55 0.22 25 | Red warnings/errors                |
| success         | 0.58 0.16 155 | Green-aligned confirmation         |

## Typography

- Display: Figtree — modern, clean sans-serif, professional yet approachable
- Body: General Sans — neutral, high-legibility for transaction details
- Mono: Geist Mono — technical clarity for transaction IDs, balances, codes
- Scale: hero `text-4xl md:text-5xl font-bold tracking-tight`, section labels `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Subtle elevated shadows + card-based layout with visible borders. No floating orbs. Surface hierarchy through background color change (background → card → muted alternation).

## Structural Zones

| Zone    | Background       | Border      | Notes                 |
|---------|-----------------|-------------|----------------------|
| Header  | `bg-primary`    | none        | Green header, white text, unified branding |
| Content | Alternating     | `border-border` | `bg-background` / `bg-muted/20` for rhythm |
| Footer  | `bg-muted/60`   | `border-t`  | Grounded, accessible navigation |

## Spacing & Rhythm

Tight vertical rhythm with 4px/8px/12px/16px increments. Mobile-first density with spacious section breaks. Cards use 16px padding, sections separated by 20px gaps.

## Component Patterns

- Buttons: Medium roundness (10px), primary green on white, accent gold for secondary CTAs, hover darkens by 5% L
- Cards: 10px radius, white background, subtle border, 8px shadow
- Badges: Rounded pills, green background with white text or muted background with green text
- Balance display: Large mono number with `.balance-pulse` animation on update (scale + opacity animation 0.6s)
- Region selector: Green-tinted pills with active state underline

## Motion

- Entrance: Fade-in 0.2s for cards, stagger by 40ms per card
- Hover: Button color shift 0.3s smooth transition, card lift shadow 0.2s
- Decorative: Balance pulse animation (scale 1→1.05→1, 0.6s ease-out) on recharge or trip completion

## Constraints

- No floating blur orbs or decorative gradients—maintain clarity for transaction interface
- Color contrast: foreground-on-background ≥ 0.7 L difference, on-primary ≥ 0.45 L
- Never use arbitrary color classes; all colors via token Tailwind utilities
- Mobile-first: minimum 48px touch targets for all interactive elements

## Signature Detail

Animated balance counter on dashboard: on recharge or trip completion, the balance number pulses with color flash (green → white transition), creating reassuring visual feedback that payment was received. Differentiates from generic transport apps.
