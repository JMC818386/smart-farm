# Screen: Map (Living Map Module)

**Status:** Phase II - Pending PDF upload and implementation  
**Priority:** High  
**Complexity:** High (multi-depth interactive visualization)

---

## Goal
Interactive 4-depth geographic visualization system aligned with Living Map PDF specifications while respecting AgriCommand Phase I constraints.

---

## Data Sources

### API Endpoints
- GET /api/map/us
- GET /api/map/state/:stateId
- GET /api/map/county/:stateId/:countyId
- GET /api/map/city/:stateId/:countyId/:cityId
- GET /api/map/kpi?depth={depth}&id={id}

### Data Format
- TopoJSON for geographic boundaries
- KPI metrics per depth level
- Lazy-loaded per depth transition

---

## Component Hierarchy

```
<MapPage>
  └─ <MapShell>
      ├─ <DepthNavigator />
      ├─ <MapViewport>
      │   ├─ <USLayer />
      │   ├─ <StateLayer />
      │   ├─ <CountyLayer />
      │   └─ <CityLayer />
      ├─ <KPIOverlayPanel />
      └─ <Tooltip />
</MapPage>
```

---

## Required Hooks

- `useDepthNavigation()` - Manages depth state, selection, breadcrumb
- `useGsapTimeline()` - Creates/controls transitions
- `useKPIContext()` - Fetches KPI data for current selection

---

## States

- **loading** - Initial data fetch
- **normal** - Default interactive state
- **transitioning** - During depth change animation
- **error** - API failure or missing geometry
- **empty** - No data for selection

---

## Depth Model

| Depth  | Displays      | Click Action           | Back Action        |
|--------|---------------|------------------------|--------------------|
| us     | USA outline   | Select state → state   | N/A                |
| state  | Counties      | Select county → county | Return to us       |
| county | County detail | Select city → city     | Return to state    |
| city   | City detail   | N/A (deepest)          | Return to county   |

---

## Interactions (All logged to LogConsole)

| Action           | Log Event      | Payload                    |
|------------------|----------------|----------------------------|
| Select region    | MAP_SELECT     | { depth, id, name }        |
| Navigate back    | MAP_NAV_BACK   | { fromDepth, toDepth }     |
| Hover region     | MAP_HOVER      | { depth, id } (optional)   |
| View KPI         | MAP_KPI_VIEW   | { depth, id, kpiType }     |

---

## Motion Constraints

### Default Mode (Phase I)
- Transitions < 250ms
- Simple fade/scale/translate
- Reverse transitions on back navigation
- No scroll-driven animations

### Cinematic Mode (Future)
- Feature-flagged OFF by default
- Implements PDF timeline sequences
- Optional for demos/presentations

---

## Performance Requirements

- Canvas fallback at deep zoom (if feature count > threshold)
- Path memoization (avoid recomputing projections)
- Lazy load geometry per depth
- TopoJSON simplification hook (structure only in Phase I)

---

## Accessibility

- Keyboard navigation (Tab, Enter, Escape)
- Focus-visible states
- Reduced-motion support (respects prefers-reduced-motion)
- ARIA labels for all interactive regions
- Screen reader announcements on depth changes

---

## Acceptance Criteria

- ✅ 4-depth hierarchy functional (us → state → county → city stub)
- ✅ Breadcrumb navigation with reverse transitions
- ✅ KPI overlay updates per selection
- ✅ All interactions logged
- ✅ Tooltip shows on hover/focus
- ✅ Respects AgriCommand motion constraints
- ✅ No external API calls (mock data only)
- ✅ Design tokens from theme.css
- ✅ Copper glow on hover per BRAND_UI_RULES

---

## Dependencies

- d3-geo (projection, path generation)
- topojson-client (topology parsing)
- gsap (animation timeline)
- @tanstack/react-query (data fetching)
- zustand (map state management)

---

## Related Documents

- [PDF_SOURCES_INDEX.md](../../docs/vision/map/PDF_SOURCES_INDEX.md)
- [PDF_REQUIREMENTS_EXTRACT.md](../../docs/vision/map/PDF_REQUIREMENTS_EXTRACT.md)
- [PDF_ALIGNMENT_NOTES.md](../../docs/architecture/map/PDF_ALIGNMENT_NOTES.md)
- [MAP_IMPLEMENTATION_PROMPTS.md](../../docs/vision/map/MAP_IMPLEMENTATION_PROMPTS.md)
