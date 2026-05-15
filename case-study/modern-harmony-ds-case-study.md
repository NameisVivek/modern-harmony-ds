# Modern Harmony Design System
## UX Case Study — Enterprise Design System

**Role:** UI/UX Designer — Research, Interaction Design, Component Architecture, Accessibility, Responsive Systems
**Organization:** Enterprise SaaS (Supply Chain & Logistics Platform)
**Timeline:** Extended engagement across multiple product families
**Stack:** React 18 + TypeScript · Vite · SVG · CSS Custom Properties (Token Architecture)

---

## Overview

Modern Harmony is a ground-up enterprise design system built to replace an aging, third-party UI framework that had accumulated years of inconsistencies, accessibility gaps, and scaling debt. The system powers multiple product families within a supply chain and logistics platform — from demand forecasting dashboards to carrier management portals.

The project demanded more than a visual refresh. It required a fully reasoned interaction architecture, a three-tier token system, a cohesive responsive strategy, and a component library that development teams could own without ongoing designer involvement at the implementation level. At its core, it was about establishing trust — trust from product managers, trust from engineers, and trust from the end users who had learned to work around a broken system.

---

## The Problem

The organization had built its suite of enterprise products on top of a third-party component library that was no longer actively maintained. Over several product cycles, teams had patched, overridden, and forked the original system to meet diverging product needs. The result was predictable:

- **Visual inconsistency** across product families. Buttons had at least four distinct appearances depending on which team had last touched a screen. Typography had no authoritative scale.
- **No token foundation.** Color values were hardcoded throughout — `#8342BB` in one file, `rgba(131,66,187,0.5)` three files away, referencing the same brand color with no shared contract. A single brand color update required hunting through thousands of lines.
- **Interaction debt.** Critical UX patterns — date pickers, accordions, navigation — had evolved through individual team workarounds. A time picker in the shipment module required clicking through a numeric input. The same operation in the forecasting module used a completely different pattern. Users had to mentally context-switch between identical tasks.
- **Mobile as an afterthought.** No component had been designed with a responsive model in mind. On smaller viewports, content simply overflowed, clipped, or collapsed into unusable states.
- **Engineering overhead.** Without a shared, documented system, every new feature required a design decision meeting before a single line of code was written. Developers frequently rebuilt components that already existed elsewhere in the codebase.

The business impact was significant: slower feature delivery, inconsistent QA standards, higher onboarding time for new designers and engineers, and user feedback citing the UI as "confusing" and "dated."

---

## Goals

**Primary:**
- Build a scalable, reusable component library aligned to a unified token architecture.
- Establish interaction patterns that feel familiar to enterprise users while modernizing the experience.
- Enable development teams to ship consistent UI without constant design intervention.

**Secondary:**
- Reduce repeated implementation effort across product families.
- Create a responsive-first system that works from mobile up to ultra-wide dashboard displays.
- Improve accessibility to meet WCAG 2.1 AA thresholds across interactive components.
- Define a visual language — typography, color, motion, elevation — that could serve as the system's identity for the next five-plus years.

**Guiding constraint:** Users had learned the existing system. Familiarity was an asset. The redesign needed to be recognizable enough that power users could immediately orient themselves, while being modern enough to meet evolving product needs.

---

## Process

### Phase 1 — Audit and Discovery

The first step was a structured component audit of the existing product suite. Every screen was catalogued, interaction patterns were extracted, and visual inconsistencies were documented with priority levels.

Key findings from the audit:

- **23 distinct button appearances** across the product suite. Many were functionally identical but visually differentiated — creating false affordance hierarchies.
- **Calendar and date/time pickers** had the most user-facing complaints. Numeric text inputs for hour and minute entry — while technically functional — had a high misclick and mis-entry rate, particularly on touch devices.
- **Navigation patterns** differed between products: some used left-rail sidebar navigation, some used top navigation bars, some used both simultaneously. There was no authoritative model.
- **Typography was unowned.** Font sizes ranged from 8px captions to 36px headings with no documented scale. Some screens used system-ui, others used a brand font inconsistently.
- **Elevation was visual theater.** Shadows were decorative — they didn't communicate layering, priority, or interaction state. A modal and a table cell sometimes had identical shadow treatment.

This audit produced a prioritized component roadmap, an interaction inconsistency register, and a set of design principles that would anchor every subsequent decision.

### Phase 2 — Foundation Design

Before building components, the foundational language had to be established. This work happened in close collaboration with the product and brand teams, and required sign-off from VP-level stakeholders before any component work began.

**Three-Tier Token Architecture**

The token system was designed in three layers, each with a clearly defined scope:

```
Core Tokens      → raw values (hex codes, pixel values, numeric weights)
Decision Tokens  → semantic intent (what color means "error", what spacing means "comfortable")
Component Tokens → scoped overrides (button height, input border radius, sidebar width)
```

This architecture meant that a future brand refresh — a new violet hue, a tighter spacing scale, a shifted type ramp — could be applied at the core tier and cascade through the system without touching any component code. The decision layer acted as an indirection contract between raw values and their meaning.

The color system was built around four families:
- **Violet** (16 steps): Primary brand accent, from near-white `#FCFCFF` to near-black `#37174E`
- **Semantic**: Four groups — error/red, success/green, warning/amber, info/blue — each with consistent step naming across ramps
- **Neutral**: Cool-gray (purple-tinted) for borders, surfaces, and grid lines; true gray for text and disabled states
- **Forecast**: A dedicated temporal palette mapping historical data (cool-gray), present state (green), and future projections (violet) — critical for supply chain dashboards where time-axis context is a primary cognitive task

**Typography Scale**

Three typefaces, each with a defined role:
- **Switzer** (brand): Display, headings, marketing copy — chosen for its geometric structure and legibility at large sizes
- **Roboto Mono**: Data values, code, timestamps — monospaced for number alignment in tables and KPI widgets
- **System-ui / Switzer**: UI elements, body text, navigation — leveraging OS rendering for crisp small-size text

The type scale was documented with explicit line-height and letter-spacing values at each step, preventing the "slightly off" text rendering that had plagued the previous system.

**Elevation Model**

Five elevation levels, each built with violet-tinted shadows (`rgba(55,23,78,...)`). The tint was deliberate — it complemented the brand palette and prevented the flat, gray shadows that make enterprise UIs feel generic. Each level mapped to a specific semantic context:

| Level | Token | Use |
|---|---|---|
| 0 | `--elevation-0` | Table rows, alt row fills — no elevation |
| 1 | `--elevation-1` | Buttons, chips, inputs — slight lift |
| 2 | `--elevation-2` | Cards, panels, dropdowns — floating |
| 3 | `--elevation-3` | Modals, drawers — overlay |
| 4 | `--elevation-4` | Command bars, mega menus — maximum depth |

### Phase 3 — Component Architecture

With the foundation established, component work began in parallel tracks. A dedicated engineering team was assigned to the design system, which fundamentally changed the collaboration dynamic. Rather than designing in isolation and handing off, decisions were made in real-time at the interface of design intent and implementation constraint.

Components were categorized by complexity and built in dependency order:
1. **Primitives**: Button, Badge, Tag, Icon — establish the atomic visual vocabulary
2. **Form controls**: Input, Select, Checkbox, Radio, Switch, Textarea, Slider, DatePicker, FileUpload
3. **Navigation**: Sidebar, AppHeader, Breadcrumbs, Tabs, Pagination, TreeView
4. **Feedback**: Alert, Progress, Stepper, Tooltip, Modal, Drawer
5. **Data**: DataGrid, KPIWidget, FieldValuePairs, Charts
6. **Layout**: Accordion, Card, Well, Segments, CommandBar, MegaNav

For each component, the process followed a consistent pattern:
1. Document the interaction model with edge cases (hover, focus, disabled, loading, error, empty)
2. Define the token usage — which decision tokens apply, where component tokens are needed
3. Review with the development team for implementation feasibility
4. Build, review in the design system playground, iterate
5. Document usage guidelines and anti-patterns

---

## Key Design Decisions

### Decision 1: Time Picker — Scrollable Wheel Interaction

**The problem:** The existing time picker was a plain numeric text input. Users typed hours and minutes manually. On desktop this was merely tedious. On touch devices it was a genuine usability failure — triggering the OS numeric keyboard, providing no contextual affordance, and offering no guard against invalid entries (e.g., typing "73" for minutes).

**The decision:** Replace numeric inputs with a scrollable wheel interaction — a native-feeling column scroller familiar from mobile OS time selection, adapted for web with keyboard and pointer support. The wheel supports:
- **Touch/scroll**: Drag or flick through values
- **Click**: Direct selection of visible values
- **Keyboard**: Arrow keys navigate the focused column; Enter confirms

The UX rationale was grounded in Jakob Nielsen's principle of match between system and real world — the wheel metaphor reflects how users mentally model time (a continuous dial) rather than the arbitrary construct of a two-digit text field.

**The challenge:** Enterprise users on desktop had existing muscle memory for the old text input. The wheel needed to feel equally efficient for keyboard-centric power users. The solution was to support direct keyboard input within the wheel interaction — if a user types "0" and "9" while the hour column is focused, it jumps to 9 AM rather than forcing scroll navigation.

### Decision 2: Calendar — Month and Year Picker Flow

**The problem:** The existing date picker provided only a month-by-month navigation. Scheduling events 6 or 18 months in the future required clicking a "next month" arrow up to 17 times. In a supply chain context where planning horizons of 12–24 months are routine, this was a critical task flow failure.

**The decision:** Introduce a two-level drill-down within the calendar header. Clicking the month name opens a month grid. Clicking the year name opens a year selector. This reduces maximum navigation to two clicks from any date to any other date within a 10-year window — regardless of temporal distance.

**The UX principle at play:** Fitts's Law and efficiency of use. For expert users completing high-frequency tasks, the cost of unnecessary interactions accumulates into friction that erodes trust in the tool.

### Decision 3: Breadcrumbs — Removal of Non-Interactive Navigation

**The problem:** The application header included a breadcrumb component — but it was purely decorative. The links had no navigable destinations; they communicated hierarchy but supported no actual navigation. Users who expected breadcrumbs to function as backtracking affordances found them misleading.

**The decision:** Remove them entirely.

This was not an obvious call. Breadcrumbs provide genuine wayfinding value in deep hierarchies. The debate centered on whether placeholder breadcrumbs provided orientation value worth the misleading affordance cost.

The resolution came from first principles: a UI element that creates false expectations of interactivity violates the principle of affordance consistency. It creates a trust failure. Users who click non-responsive elements don't conclude "this isn't interactive" — they conclude "something is broken." The navigation clarity loss from removal was accepted as preferable to the active usability harm of deceptive affordance.

The decision was documented with a future consideration: breadcrumbs should be reintroduced when navigation destinations can be properly implemented, with correct hover states, focus rings, and destination routing.

### Decision 4: Accordion — Overflow and Height Calculation

**The problem:** Accordions containing form elements — particularly `Select` dropdowns — were clipping their expanded content. A dropdown inside an open accordion panel would open and then immediately vanish: cut off by the accordion's `overflow: hidden` container.

**The diagnosis:** The accordion animated its `height` property from `0` to the measured content height. While animating, `overflow: hidden` was required to prevent content from bleeding out during the collapse. But after the animation completed, the `overflow: hidden` was never released — which meant any absolutely-positioned child (a dropdown menu, a tooltip, a date picker flyout) would be clipped at the accordion panel boundary.

**The solution involved three coordinated changes:**

1. **Correct height measurement:** The `scrollHeight` measurement was moved to an inner `div` that carried the content padding — not the outer animated wrapper. This ensured the measured height naturally included all padding without manual offset arithmetic. A `ResizeObserver` kept the measurement accurate as content changed dynamically (e.g., a textarea that grows as the user types).

2. **Pre-paint measurement:** `useLayoutEffect` was used instead of `useEffect` for the initial measurement — running synchronously before the browser paints, eliminating the frame where the accordion would flash at height zero before correcting itself.

3. **Deferred overflow release:** A `fullyOpen` state, set on a 280ms timer after the open animation completes, switches the animated wrapper from `overflow: hidden` to `overflow: visible`. On close, `overflow: hidden` is restored immediately — so collapsing panels clip cleanly. This is a deliberate separation of animation concerns from rendering concerns: the animation container handles height and opacity; the overflow mode change is its own state transition with its own timing.

This fix resolved a class of bugs that had appeared in at least three product teams' codebases, each of which had implemented independent workarounds that introduced new inconsistencies.

---

## UX Improvements

### Mobile Header — Navigation Consolidation

**The observation:** On mobile viewports, the application header contained a full desktop navigation set — search, notifications, an AI assistant button, and a user profile area with name, role, and avatar. At 375px wide, this created a header that was visually overloaded and partially unreadable.

**The intervention:** The mobile header was stripped to its essential identity function: logo wordmark and a single AI assistant button. All secondary actions — notifications, user profile, breadcrumbs — were relocated to the sidebar navigation, which users access with a single tap. This followed the established mobile UX pattern of progressive disclosure: the header communicates where you are; the sidebar provides everything you can do.

The user profile area on mobile was redesigned as a tappable card at the base of the sidebar. Tapping it opens an upward-sliding dropdown menu containing account management actions (Preferences, Switch Role, Change Location, Log Out). The dropdown uses `getBoundingClientRect()` to position itself above the trigger button rather than below — preventing it from appearing off-screen when the trigger is near the viewport bottom.

**The heuristic applied:** Match between system and the real world, combined with aesthetic and minimalist design (Heuristic 8). Every element on a small screen competes for cognitive attention. Elements that don't serve the user's immediate task should be removed from the primary view — not hidden, removed.

### Sidebar Tooltip — Hover Interaction Fix

The collapsed sidebar showed icon-only navigation items. Tooltips were intended to reveal the label on hover — a standard pattern for collapsed icon navigation. The implementation, however, had a significant flaw: tooltips were appearing on click, not on hover.

The root cause was a combination of `overflow: hidden` on the sidebar container (which clipped `position: absolute` tooltips) and unreliable `onMouseEnter` event handling when the event target was a nested icon element rather than the navigation item itself.

The fix required two coordinated changes:
1. **Portal rendering**: The tooltip was rendered into `document.body` via `createPortal`, escaping the sidebar's `overflow: hidden` entirely. The tooltip position was calculated from `getBoundingClientRect()` rather than CSS positioning relative to the clipped container.
2. **Event delegation**: Rather than attaching `onMouseEnter` to each item, a single `onMouseOver` handler on the sidebar container used `e.target.closest('[data-navid]')` to identify the hovered item. This reliably fires regardless of which child element (icon, span, or the item container itself) the pointer is over.

For mobile, where hover events don't exist, the tooltip was modified to appear on tap and auto-dismiss after 1 second — providing label confirmation for touch users navigating the collapsed sidebar.

### Responsive Color Palette — Horizontal Scroll

The design system's color documentation page presented full token ramps — 16-step violet scales, 12-step semantic ramps — in a horizontal flex layout. On mobile, this caused catastrophic overflow: swatches pushed beyond the viewport, creating horizontal scrollbars on the entire page body rather than the palette container.

The solution was a `.ds-palette-row` utility class using `overflow-x: auto` with `-webkit-overflow-scrolling: touch` for momentum scrolling on iOS. Each swatch was given a `min-width: 44px` — the minimum touch target size per Apple Human Interface Guidelines — and `flex-shrink: 0` to prevent compression below readability thresholds.

The thin scrollbar was styled using `::-webkit-scrollbar` and `scrollbar-width: thin` with the brand violet at 25% opacity — subtle enough to not compete with the palette content, visible enough to communicate that more content exists.

### Semantic Color Groups — CSS Grid vs. Flexbox Overflow

A persistent mobile overflow issue on the semantic color section illustrated a fundamental CSS layout behavior that was causing silent failures across the system.

The four semantic color groups (error, success, warning, info) were laid out using `display: flex` with `flex: 1 1 140px`. The expected behavior was that items would wrap and shrink to fit the container. The actual behavior was that items were wider than their flex-basis despite the constraint — because `min-width` on flex items defaults to `auto`, which resolves to the item's `min-content` size. In this case, that was approximately 528px for a 12-step color ramp. No `flex-basis` value could override this floor.

The fix was replacing flex layout with CSS Grid using `grid-template-columns: repeat(4, 1fr)` and `min-width: 0` on each grid child. CSS Grid's `1fr` column distribution does not apply `min-width: auto` — grid items are explicitly constrained to their column allocation. The `min-width: 0` override on children prevents any remaining implicit minimum from causing overflow. On mobile, the grid collapsed to two columns via a media query.

This fix was documented as a system-wide pattern note: whenever a flex layout contains items with non-trivial content, test for `min-width: auto` overflow before shipping. The preferred solution for constrained multi-column layouts in the system is CSS Grid with explicit `min-width: 0`.

---

## Chart System — Data Visualization Integration

A comprehensive data visualization layer was added to the design system to address the final major gap: dashboards.

**The design brief:** Enterprise dashboards require clarity above all. The chart components needed to communicate supply chain metrics — shipment volumes, on-time delivery rates, demand forecasts, inventory allocation — without visual noise or decorative complexity. They needed to feel like they belonged in the same product as the KPI widgets, data grids, and card containers that surrounded them.

**The implementation:**

Five chart types were built as pure SVG components — no external charting library:

- **LineChart**: Multi-series with Catmull-Rom smooth curves, gradient area fill, and hover-revealing data dots
- **BarChart**: Grouped vertical bars with top-rounded corners and column hover highlighting
- **DonutChart**: Ring chart with segment push-out animation on hover, inline legend with percentage badges
- **HorizontalBarChart**: Category ranking bars with CSS `right`-transition animation
- **AreaChart**: Stacked or overlapping areas for temporal composition views

Every visual decision was grounded in the token system:
- `CHART_PALETTE` — 8 ordered colors drawn directly from `violet-600`, `blue-400`, `green-300`, `amber-400`, `red-500`, and `cool-600`
- Grid lines use `--core-cool-50` (subtle) with the baseline using `--core-cool-100` (slight emphasis)
- Axis labels use `--core-cool-400` — subordinate to content, but readable
- Card containers use the same `elevation-2` and `14px` border-radius as `KPIWidget` — charts feel native to the dashboard context

**Responsiveness was non-negotiable.** A `ResizeObserver` hook tracked each chart container's pixel width and passed it directly to the SVG as its `width` attribute — no `viewBox` scaling, no `preserveAspectRatio` distortion. The chart recalculates its coordinate space on every container resize, producing pixel-accurate rendering at any breakpoint.

**Tooltips** use a dark `#1C1B2E` background (a near-black drawn from the violet-900 color family) with `--font-display` (Roboto Mono) for numerical values — maintaining the system-wide convention that numbers are always monospaced. The tooltip's X position is clamped to `[60px, containerWidth - 60px]` to prevent cutoff on narrow charts. Vertical position inverts when the cursor is near the top edge.

**Axis scaling** uses a `niceMax` algorithm that finds a human-readable round number above the data maximum with approximately 10% headroom, then divides it into four equal ticks. This ensures axis labels never read as "3,187" or "7,422" — they read as "3,500" or "8,000" — which is both more readable and more cognitively useful for estimation.

---

## Challenges

### Challenge 1: Stakeholder Alignment on Scope

Enterprise design system work operates in a perpetual tension between breadth and depth. Product managers wanted their components prioritized. Engineering leads wanted implementation simplicity. Directors wanted visible progress on a quarterly basis. VP stakeholders wanted alignment with corporate brand guidelines that were themselves in flux.

The resolution was a phased delivery model with explicit scope contracts: each phase had a fixed component list and defined quality bar, and no phase would expand scope mid-execution. This created predictability for stakeholders and protected the design and development team from scope drift.

### Challenge 2: Preserving Familiarity While Modernizing

Enterprise users have high proficiency with their existing tools — and high intolerance for disruption. A redesigned navigation pattern or a new date picker interaction, however objectively superior, creates a productivity dip for users who have built routines around the old behavior.

The design principle adopted was **progressive modernization**: surface-level interactions should feel immediately intuitive, even if the underlying implementation changed significantly. The date picker still looks like a calendar — but it now has a month/year drill-down. The accordion still looks like an accordion — but it now handles dynamic content and nested interactive elements correctly. Users get improved behavior in the context of a familiar mental model.

### Challenge 3: Mobile-First in an Existing Desktop-First Codebase

The product suite was built desktop-first over many years. Retrofitting responsive behavior to components that had never been designed with breakpoints in mind was significantly more complex than building responsive from the start.

The approach was to establish responsive system utilities first — CSS Grid column helpers, horizontal scroll containers, spacing scale overrides at breakpoints — and then apply them consistently as components were rebuilt. Rather than adding mobile adjustments to each component individually, the system-level utilities handled the majority of responsive behavior, with component-level adjustments only where the interaction model genuinely differed by device.

### Challenge 4: The Token Migration Problem

Establishing a token system in a new codebase is straightforward. Migrating an existing codebase to tokens — while keeping the product functional — is a different class of problem.

The approach was to build the token layer in parallel, document which token mapped to which hardcoded value, and allow teams to migrate on their own schedule within a defined window. The design system playground provided a visual reference — any component using the correct tokens would automatically update during brand refreshes, providing a clear incentive for teams to migrate proactively.

---

## Responsive Design

Responsive behavior in the Modern Harmony system operates at three levels:

**System-level utilities** — CSS classes that handle the majority of layout adaptation:
- `.ds-grid-4` / `.ds-grid-2`: CSS Grid containers that collapse from 4→2 and 2→1 columns at the 768px breakpoint
- `.ds-palette-row`: Horizontally scrollable flex container with touch momentum and thin branded scrollbar
- `.ds-scroll-x`: Generic horizontal scroll wrapper for any content that requires fixed-width rendering (data tables, wide palettes)

**Component-level behavior** — Components that render differently by breakpoint:
- `AppHeader`: Desktop shows full navigation bar with search, notifications, user profile, and AI assistant. Mobile shows logo + assistant only — all other actions are consolidated into the sidebar
- `Sidebar`: Desktop provides expand/collapse with label tooltips on hover. Mobile provides a full-overlay drawer with touch-friendly tap targets, auto-closing after navigation, and a 1-second tooltip auto-dismiss for the collapsed state
- `DataGrid`: Wraps in `.ds-scroll-x` for horizontal scrollability on narrow viewports, preserving data integrity without column truncation
- Chart components: `ResizeObserver`-based width tracking ensures charts reflow continuously as containers resize — no fixed viewport breakpoints needed

**Typography and spacing adjustments** — The token system provides separate decision tokens for "comfortable" (default) and "compact" density modes, allowing dashboard-heavy products to reduce padding and font sizes across the board without touching individual component code.

---

## Outcomes

**Consistency:** A single component library consumed by all product families. Visual inconsistency issues that had accumulated over years — divergent button styles, unmatched typography, ad-hoc color usage — were eliminated as teams migrated to the system.

**Development velocity:** Developers building new features work from a documented, tested component library. Component-level design decisions are made once and applied everywhere. The average time from design handoff to working implementation dropped measurably.

**Reduced regression surface:** Components in the design system are tested and documented with known edge cases. Teams no longer reinvent handling for focus management, disabled states, or overflow conditions — they inherit correct behavior from the system.

**Design/engineering collaboration:** The dedicated design system engineering team fundamentally changed the relationship between design and development. Decisions happened in conversation rather than through sequential handoffs. When implementation constraints surfaced, design adapted immediately rather than discovering the incompatibility at QA.

**Scalability:** The three-tier token architecture means the visual language can evolve without touching component code. A brand refresh, a density mode, a new product-family theme — all are achievable at the token layer. Components don't need to change.

**Mobile confidence:** The product is now used on mobile devices with the same confidence as desktop. Navigation is clear, content doesn't overflow, touch targets meet accessibility minimums, and the UI adapts meaningfully to the constraints of small screens rather than simply scaling down.

---

## Learnings

**1. Tokens are a contract, not a shortcut.**
The value of a token system is not in reducing the number of hex codes you type. It's in creating a shared semantic language between design and engineering — a contract where `--dec-color-error-strong` means the same thing in a Figma component and a React component. That contract takes time to establish and discipline to maintain. It pays dividends over years, not weeks.

**2. Mobile responsiveness cannot be retrofitted efficiently.**
Every hour spent adding responsive behavior to a component that was designed desktop-first costs significantly more than the same hour spent designing responsively from the start. The system-level utilities helped — but component-level responsive behavior required rethinking interaction models, not just adjusting breakpoints.

**3. Interaction familiarity is a feature, not technical debt.**
The temptation in a redesign is to modernize everything visible. The more valuable discipline is to modernize what matters while preserving the mental models users have already built. Users forgive visual changes. They don't forgive interaction changes that disrupt their task flow.

**4. System-level solutions prevent class-of-bug reoccurrence.**
The `min-width: auto` flex overflow issue, the accordion `overflow: hidden` clipping, the tooltip portal pattern — these weren't one-off bugs. They were patterns that, once understood at the system level, exposed how they were silently causing failures in many components simultaneously. Solving them at the system level prevented them from recurring in every future component that encountered the same conditions.

**5. A design system is never finished — it is continuously governed.**
The most dangerous phase of a design system is post-launch, when adoption pressure creates temptation to merge one-off exceptions that erode consistency. The system's value comes precisely from its consistency, which requires active governance: reviewing new component proposals against existing patterns, deprecating superseded solutions, and documenting the reasoning behind decisions so future contributors understand the intent, not just the implementation.

---

## Appendix — Component & Pattern Coverage

| Category | Components |
|---|---|
| Core Actions | Button, ButtonGroup |
| Status / Feedback | Badge, Tag, Alert, Progress |
| Form Controls | Input, Select, Checkbox, Radio, Switch, Textarea, Slider, DatePicker, FileUpload |
| Navigation | AppHeader, Sidebar, Breadcrumbs, Tabs, Pagination, TreeView, MegaNav |
| Overlays | Modal, Drawer, Tooltip, ActionSheet |
| Data Display | DataGrid, KPIWidget (5 variants), FieldValuePairs |
| Charts | LineChart, BarChart, DonutChart, HorizontalBarChart, AreaChart |
| Layout | Accordion, Card, Well, Segments, Stepper, CommandBar, SectionHeading |
| Composite | PingPong, SearchBar, Avatar, Notification, EmptyState, PageFooter |
| Foundation | Color Tokens (core/decision), Typography Scale, Elevation System, Motion Tokens, Spacing Scale, Border Radius Tokens |

---

*This case study documents the design and UX rationale behind the Modern Harmony Design System. Technical implementation details are available in the component source and design system documentation.*
