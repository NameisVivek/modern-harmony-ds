# Modern Harmony — App UI Kit

High-fidelity UI kit for the **leo Supply platform** (S&OP / forecasting / logistics).

## What's included

- `index.html` — Interactive S&OP Dashboard prototype (main entry point)
  - App header with leo logo + navigation
  - Collapsible left sidebar with icon nav
  - KPI widgets dashboard
  - Data grid with forecast data
  - Notifications panel

## Design decisions

- App header: `#282828` (gray-875) background, white text/icons
- Sidebar: white bg, `48px` collapsed / `216px` expanded
  - Active item: `rgba(131,66,187,0.08)` bg + `4px` left violet border
- KPI cards: white, `border-radius: 24px`, elevation-2 shadow
- Data grid: alternating cool-50 rows, 32px row height
- Primary font: Switzer (UI) + Roboto Mono (numbers/KPIs)
- Icons: Material Icons throughout

## Key patterns

- **Starred pages** — users can star/bookmark modules; appear in sidebar
- **Density modes** — Comfy (default), Cozy, Condensed
- **Forecast grid** — color-coded by time period (past=cool, present=green, future=violet)
- **S&OP** — main workflow; demand/supply planning
