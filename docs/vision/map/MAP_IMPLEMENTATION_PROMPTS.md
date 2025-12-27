# MAP MODULE IMPLEMENTATION PROMPTS

This file contains the sequential prompts for implementing the Living Map module in AgriCommand OS.

**Prerequisites:** Upload the 4 Living Map PDFs to `docs/vision/map/sources/` before running these prompts.

---

## PROMPT 00 — PDF INGEST (RUN FIRST)

```text
You are Claude Sonnet 4 running inside the SMART-FARM repository.

Load and internalize ALL map requirements from:
- docs/vision/map/sources/The Living Map of America.pdf
- docs/vision/map/sources/The Living Map - Interactive, Multi-Depth Visualization System.pdf
- docs/vision/map/sources/The Living Map - Internal Technical Brief.pdf
- docs/vision/map/sources/The Living Map - Press Release.pdf

Then load these repo specs (must override PDFs where conflicts exist):
- docs/ai/AI_SYSTEM_RULES.md
- docs/ai/BRAND_UI_RULES.md
- docs/ai/COMPONENT_CATALOG.md
- docs/architecture/SOLUTION_CONCEPT.md
- plans/ROUTES.md

Finally, update these context docs ONLY IF needed to reflect the PDFs without adding scope creep:
- docs/vision/map/PDF_SOURCES_INDEX.md
- docs/vision/map/PDF_REQUIREMENTS_EXTRACT.md
- docs/architecture/map/PDF_ALIGNMENT_NOTES.md

Acknowledge when loaded. Do not generate code yet.
```

---

## PROMPT 01 — DEPENDENCIES + FOLDER SETUP

```text
Implement Map module scaffolding with the PDF-driven component model.

Create folders:
- frontend/src/features/map/components/layers
- frontend/src/features/map/hooks
- frontend/src/features/map/store
- frontend/src/features/map/types
- frontend/src/features/map/styles
- backend/routes/map
- plans/data/map

Install frontend deps:
- d3-geo
- topojson-client
- gsap
- @tanstack/react-query

No UI yet. No backend yet. Just scaffolding and dependency wiring.
```

---

## PROMPT 02 — BACKEND ENDPOINTS (PDF-SHAPED RESPONSES)

```text
Implement backend endpoints aligned to the PDF hierarchy (us → state → county → city) and KPI overlays.

Create under backend/routes/map and mount under /api/map:

- GET /api/map/us
- GET /api/map/state/:stateId
- GET /api/map/county/:stateId/:countyId
- GET /api/map/city/:stateId/:countyId/:cityId  (Phase I can return stub)
- GET /api/map/kpi?depth=us|state|county|city&id=<id>

Use ONLY local deterministic mock files in plans/data/map.
If geometry files are missing, return empty-but-valid shapes + an "empty state" flag.

Do not fetch external APIs in Phase I.
```

---

## PROMPT 03 — FRONTEND STORE + QUERIES (PDF HOOKS REQUIRED)

```text
Implement Map state + data hooks.

Must create:
- useDepthNavigation() (tracks depth + selection + breadcrumb behavior)
- useGsapTimeline(levelRef, config) (create/play/reverse/cleanup)
- useKPIContext() (fetch KPI metrics for current selection)

Use Zustand + React Query.
All types strict.
No UI yet.
```

---

## PROMPT 04 — MAP UI (SHELL + NAV + KPI + TOOLTIP)

```text
Implement Map UI to satisfy plans/screens/04_Map.md and PDF component hierarchy.

Create:
- frontend/src/pages/MapPage.tsx (route /map)
- MapShell
- DepthNavigator (breadcrumb + back behavior)
- KPIOverlayPanel (shows KPI metrics for selection)
- Tooltip (works on hover AND keyboard focus)

All interactions must log to LogConsole:
- MAP_SELECT { depth, id }
- MAP_NAV_BACK { fromDepth, toDepth }
- MAP_HOVER { depth, id } (optional)

No layers rendered yet.
```

---

## PROMPT 05 — USLAYER (SVG + CLICK INTO STATE)

```text
Implement MapViewport + USLayer.

Requirements:
- d3-geo projection + geoPath
- topojson-client topology -> features
- hover/focus tooltip
- click state => depth=state, logs MAP_SELECT
- functional GSAP transition <250ms (fade/scale)

Do not implement StateLayer/CountyLayer yet.
```

---

## PROMPT 06 — STATE + COUNTY LAYERS (LAZY LOADING + REVERSE NAV)

```text
Implement StateLayer and CountyLayer with lazy loading.

- StateLayer renders counties once a state is selected
- CountyLayer renders county boundary once a county is selected
- CityLayer exists but can be a stub (Phase I)

Breadcrumb must reverse depth and trigger transition reverse().

Add path simplification + memoization guards. Avoid recreating projection/path each render.
```

---

## PROMPT 07 — PERFORMANCE GUARDS (CANVAS FALLBACK STUB)

```text
Implement performance guardrails based on PDFs:

- Add a switch point: if depth >= county and feature count exceeds threshold, render via Canvas renderer (Phase I can be a working stub that draws outlines).
- Add TopoJSON simplification hook point (Phase I: structure + TODO, no external tooling required).

Document the thresholds and behavior in docs/governance/BUILD_STATUS.md.
```

---

## PROMPT 08 — BUILD STATUS + TESTS

```text
Add:
- Unit tests for store + navigation + hook contracts
- A short compliance report in docs/governance/BUILD_STATUS.md

Must confirm:
- Depth hierarchy works
- Reverse navigation works
- KPI overlay updates
- Motion constraints enforced
- No token/style drift
```

---

## Implementation Notes

- Execute prompts sequentially
- Each prompt builds on the previous
- All code must respect AgriCommand BRAND_UI_RULES and AI_SYSTEM_RULES
- Motion is functional-first (<250ms), cinematic mode is future feature flag
