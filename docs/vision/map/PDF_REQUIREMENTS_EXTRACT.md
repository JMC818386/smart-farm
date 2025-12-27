# PDF REQUIREMENTS EXTRACT — Living Map → AgriCommand Map Module

This file translates the Living Map PDFs into build requirements that fit AgriCommand Phase I rules.

## Depth Model (must implement)
- us (nation)
- state
- county
- city (Phase I can be stubbed)

## Component Tree (must implement)
```
<MapPage>
  <MapShell>
    <DepthNavigator />
    <MapViewport>
      <USLayer />
      <StateLayer />
      <CountyLayer />
      <CityLayer /> (Phase I stub OK)
    </MapViewport>
    <KPIOverlayPanel />
    <Tooltip />
  </MapShell>
</MapPage>
```

## Hooks (must implement)
- useGsapTimeline(levelRef, config)
- useDepthNavigation()
- useKPIContext()

## Motion Rules
Base Mode (default):
- Functional transitions only (<250ms)
- fade/scale/translate
- reverse transitions on breadcrumb

Optional Mode (future):
- "Cinematic" timelines aligned with the PDF blueprint
- masterTimeline with named segments (usIntro/stateZoom/countyReveal/cityDive/kpiPulse)

## Data + Rendering
- Use D3-Geo + TopoJSON for parsing/projection/path generation
- Lazy-load GeoJSON/TopoJSON per depth on selection
- Keep SVG manageable; allow Canvas fallback at deeper zooms

## Performance + UX
- Avoid context loss: breadcrumbs always visible
- Tooltip detail short
- Reduced-motion support required
