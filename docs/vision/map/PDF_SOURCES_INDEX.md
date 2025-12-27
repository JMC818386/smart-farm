# PDF SOURCES INDEX — Living Map Requirements (Authoritative)

These PDFs are treated as authoritative requirements inputs for the AgriCommand Map module.

## Sources
1. docs/vision/map/sources/The Living Map of America.pdf
2. docs/vision/map/sources/The Living Map - Interactive, Multi-Depth Visualization System.pdf
3. docs/vision/map/sources/The Living Map - Internal Technical Brief.pdf
4. docs/vision/map/sources/The Living Map - Press Release.pdf

## Required Behaviors Extracted
- Depth hierarchy: Nation → State → County → City
- Core components: MapContainer (or MapViewport), USLayer, StateLayer, CountyLayer, CityLayer, KPIOverlayPanel, Tooltip, DepthNavigator
- Hooks expected: useGsapTimeline, useDepthNavigation, useKPIContext
- Lazy load deeper layers on zoom-in
- Reverse navigation via timeline.reverse()
- Performance: TopoJSON simplification; Canvas fallback at deep zooms
- Accessibility: keyboard navigation + reduced motion mode

## AgriCommand Constraints Override
If any PDF implies "cinematic motion" or long timelines, AgriCommand rules still apply:
- No decorative motion
- Animations < 250ms (unless explicitly enabled via a "Cinematic Mode" toggle)
- All interactions log to LogConsole
