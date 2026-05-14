# Modern Harmony Design System

Modern Harmony is the design system for **e2open**, a WiseTech Global Group company.
e2open is a B2B enterprise supply chain management platform used by logistics, manufacturing,
and trade teams worldwide. It covers Sales & Operations Planning (S&OP), forecasting,
freight management, and trade compliance workflows.

---

## Sources

| Source | Notes |
|---|---|
| **Figma file** | "Modern Components.fig" — mounted as virtual FS during generation. Contains 102 pages, 477 frames, 4,400+ components covering all UI components, tokens, motion, and guidelines. |
| **Codebase** | `UXUI.DesignKit-main/` — `@wtg/designkit` npm package. AI-assisted screen building pipeline for Supply Design System in Vue 3 + Vite repos. See `UXUI.DesignKit-main/README.md` for full docs. |
| **Supply MCP** | `@wtg/supply-mcp-server` — companion MCP for component knowledge (props, events, tokens). Used alongside designkit. |

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Professional and precise** — enterprise B2B context; users are logistics specialists, supply planners, trade compliance officers
- **Concise and functional** — labels are clear verbs or nouns; never decorative
- **Sentence case** — e.g. "View orders" not "View Orders" (except acronyms like S&OP, KPI, CSV)
- **No emoji** — none used in UI; Material Icons only for all iconography
- **No exclamation marks** — calm, authoritative, not cheerful
- **"you" not "I"** — second-person for instructions and confirmations
- **Lower case for single-word inline actions** — "undo", "reset", "cancel"
- **Title case only for proper nouns** — product names, company names

### Copy Examples
| Context | Good | Bad |
|---|---|---|
| Button | "View orders" | "View Orders" / "Click here to view" |
| Inline action | "undo" | "Undo" / "Undo action" |
| Column header | "Order date" | "Order Date" / "DATE OF ORDER" |
| Error message | "Something went wrong. Try again." | "Oops! 😢 That didn't work!" |
| Empty state | "No results match your filters." | "Nothing here yet!" |
| Confirmation | "Are you sure you want to delete this record?" | "You are about to delete!" |

---

## VISUAL FOUNDATIONS

### Color System
Three-level token hierarchy: **Core → Decision → Component**

**Brand / Accent — Violet family**
- `violet-600` `#8342BB` — primary accent; buttons, selected states, focus rings
- `violet-675` `#7239A4` — foreground text on violet backgrounds
- `violet-775` `#4D3075` — inverse/dark violet (nav selected)
- `violet-25` `#ECE4F5` — subtle tint; hover backgrounds, chip fills
- Transparent overlay: `rgba(131,66,187,0.08)` — selected state background

**Brand foreground — Near-black**
- `gray-875` `#282828` — app header background; primary text on light; brand "dark"

**Cool Grays (purple-tinted neutrals)**
- Palette spans `cool-50` `#F0F0F4` → `cool-800` `#5E5C75`
- Used for panel backgrounds, border strokes, disabled states
- Distinguished from pure gray by a subtle purple cast

**Semantic Colors**
- Error/Red: `#E02F3A` (strong), light fills for backgrounds
- Success/Green: `#5BD6A0` (strong), `#27854D` (foreground)
- Warning/Amber: `#FFB84D` (strong), `#C47A00` (foreground)
- High-risk: Amber-orange series (distinct from warning)
- Info/Blue: `#3399FF` (strong), `#0066CC` (foreground)

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Component name | Roboto Mono | 400 | 48px |
| Heading | Roboto Mono | 500 | 24–32px |
| UI Label | Switzer | 500 | 16px |
| UI Body small | Switzer | 400 | 14px |
| Body text | Roboto | 400 | 16px |
| Data / numbers | Inter | 500 | 10–14px |
| Caption | Switzer | 400 | 12px |
| Monospace / code | Roboto Mono | 400/500 | 14px |
| Icons | Material Icons | — | 24px |

**Switzer** is the primary UI font (replaces Inter/Roboto for all labels). It's available via Fontshare.
**Roboto Mono** is used prominently for headings, component names, and KPI numbers — giving the system a modern, technical feel.

> ⚠️ **Font substitution note**: Switzer is loaded from Fontshare CDN (`api.fontshare.com`). Satoshi (used in some Figma components) is substituted with Plus Jakarta Sans in HTML artifacts.

### Spacing System
Based on a 16px REM unit with density modes (Comfy / Cozy / Condensed):
- `2px` `4px` `8px` `12px` `14px` `16px` `20px` `24px` `32px` `48px`
- Token levels: `element` < `base` < `panel` < `container` < `page`

### Backgrounds
- **Main surface**: Pure white `#FFFFFF`
- **Subtle surface**: `#F0F0F4` (cool-50) — sidebars, alt rows
- **App header**: `#282828` (gray-875) — always dark
- **Cards / containers**: White with elevation shadow + border
- No full-bleed images, no gradients on panels (except primary button inner glow)
- No textures or patterns

### Borders
- Default border: `1px solid #E5E5EC` (approximately cool-100/gray-150)
- Focused input: `1px solid #8342BB` (violet-600) + focus ring
- Error input: `1px solid #E02F3A`
- Sidebar: `1px solid #EBEBEB`

### Corner Radius
- `4px` — small elements (badges, pills within components)
- `6–8px` — buttons, inputs, small components  
- `12px` — panels, chips, large interactive areas
- `24px` — cards, containers, modals, drawers
- `9999px` — full pills (tags with close)

### Shadows / Elevation
All shadows use violet-tinted alpha values `rgba(55,23,78,...)`:
- `elevation-1` — subtle (dropdowns, tooltips inline)
- `elevation-2` — panels, sidebar
- `elevation-3` — modals, overlays
- Violet tint distinguishes from generic grey shadows

### Hover / Press / Focus States
- **Hover**: Semi-opaque overlay `rgba(40,40,40,0.08)` on light; `rgba(164,163,185,0.12)` on dark
- **Pressed**: Slightly darker overlay `rgba(40,40,40,0.16)`
- **Focus**: Ring — `0 0 0 2px white, 0 0 0 4px #8342BB`
- **Selected**: `rgba(131,66,187,0.08)` background + `4px left border #8342BB`
- **Disabled**: Cool-gray text, no hover effects

### Animation / Motion
- **Buttons**: Instant state transitions — no animation
- **Page transitions**: Defined (fade/slide) — see Motion-Design Figma page
- **Easing curves**: `ease-in`, `ease-out`, `ease-in-out` (5 variants each)
- **General philosophy**: Subtle, functional motion only; no decorative animation

### Cards & Panels
- White background
- `border-radius: 24px` for containers/drawers
- Thin border `1px solid rgba(229,229,236,1)` + elevation shadow
- Inner content padding: `24px`
- No colored left-border accents

### Imagery & Illustrations
- No decorative illustrations in the product UI
- Avatars use initials in colored circles (letter monogram system)
- No photography in UI components
- Forecast calendars use color-coded grid cells for time periods

---

## ICONOGRAPHY

**Icon system: Material Icons (Google)**
- Font family: `Material Icons` (icon font)
- Sizes: `24px` (standard), `16px` (small contexts)
- Color: Follows text/semantic token color
- No custom SVG icons — all icons use the Material Icons font
- CDN: `https://fonts.googleapis.com/icon?family=Material+Icons`
- No emoji used anywhere in the UI

**Avatar / Monogram system**
- When no image: 2-letter initials in a colored circle
- Circle `20–32px` diameter, `border-radius: 50%`
- Background colors from semantic palette (cool grays, purple tints, greens, etc.)

**Logo usage**
- `e2open` wordmark: Dark version (black on white) or Light version (white on dark)
- App header always uses Light SM variant (`96×24px`)
- `e2` monogram: Used as favicon / browser tab icon
- See `assets/logo-black.jpg` for the full wordmark

---

## FILE INDEX

```
README.md               ← This file
SKILL.md                ← Agent skill definition
colors_and_type.css     ← All CSS variables (colors, type, spacing, radius, shadow)

assets/
  logo-black.jpg        ← e2open + WiseTech Global Group logo (dark on light)

preview/
  — Foundations —
  brand-colors.html     ← Brand violet + gray-875 palette
  neutral-colors.html   ← Cool-gray and neutral-gray palette
  semantic-colors.html  ← Error, success, warning, info, high-risk
  forecast-colors.html  ← Forecast period color scale
  type-display.html     ← Display & heading type (Roboto Mono)
  type-ui.html          ← UI type scale (Switzer, body sizes)
  type-switzer.html     ← Switzer weight/style specimen
  spacing-tokens.html   ← Spacing scale visualization
  elevation-shadows.html ← Shadow system and elevation levels
  corner-radius.html    ← Border radius tokens
  scrollbar.html        ← Scrollbar styles (light + dark)

  — Navigation —
  app-header.html       ← Application header (white, navpanel, breadcrumbs, user menu)
  sidebar.html          ← Sidebar navigation (collapsed / expanded)
  breadcrumbs.html      ← Breadcrumb trail variants
  meganav.html          ← Mega-nav overlay panel
  tabs.html             ← Tab bar variants and states
  pagination.html       ← Pagination controls + toolbar

  — Inputs & Forms —
  buttons.html          ← Button variants and states
  button-group.html     ← Button group / split button
  inputs.html           ← Text input field variants
  select-input.html     ← Select / dropdown input
  checkbox.html         ← Checkbox states and groups
  radio-button.html     ← Radio button states and groups
  switch.html           ← Toggle switch
  slider.html           ← Range slider (single + dual handle)
  stepper.html          ← Numeric stepper
  segments.html         ← Segmented control
  date-picker.html      ← Date picker and date-range picker
  file-upload.html      ← File upload (drag-and-drop + inline)
  textarea-link.html    ← Textarea + link input
  embedded-search.html  ← Embedded / inline search
  command-bar.html      ← Command menu / keyboard palette

  — Feedback & Overlays —
  alert.html            ← Alert / message block variants
  modal.html            ← Modal dialog variants
  drawer.html           ← Side drawer panel
  tooltip.html          ← Tooltip placements and styles
  notifications.html    ← Notification items and panel
  progress.html         ← Progress bar / loader
  action-sheet.html     ← Action sheet / bottom sheet

  — Data Display —
  data-grid.html        ← Data grid with sorting, filters, selection
  kpi-widgets.html      ← KPI metric widgets
  card-well.html        ← Card and well containers
  badges-tags.html      ← Badge, tag, and status components
  tag-pill.html         ← Tag pill with dismiss
  avatar.html           ← Avatar (image + initials)
  field-value-pairs.html ← Field-value pair display
  section-heading.html  ← Section heading with actions
  empty-states.html     ← Empty state patterns
  tree-view.html        ← Tree / hierarchy list

  — Complex Components —
  accordion.html        ← Accordion expand/collapse
  ping-pong.html        ← Dual-list transfer (eto-pingpong) ← NEW
  footer.html           ← Page footer with actions + pagination ← NEW

  — Brand —
  brand-logo.html       ← Logo usage guide

ui_kits/
  app/
    README.md           ← App UI kit notes
    index.html          ← Main interactive prototype (S&OP Dashboard)
```

---

## PRODUCTS

### Supply (e2open Platform)
The main product is a web-based enterprise application used by supply chain professionals.
Core modules include:
- **S&OP** (Sales & Operations Planning) — demand/supply balancing
- **Forecast** — future-period planning with color-coded calendars
- **Grid/Table views** — dense data grids with filtering, sorting, inline editing
- **KPI Widgets** — dashboard metrics with trend indicators
- **Notifications** — activity feed and alerts

UI Kit: `ui_kits/app/index.html`
