# PDF ALIGNMENT NOTES — Conflicts + Resolutions

## Potential Conflicts
1. PDFs describe "cinematic motion" and longer durations.
2. AgriCommand Phase I forbids decorative motion and caps animation duration.

## Resolution
- Implement two tiers:
  - Default: Functional Motion (<250ms, no scroll-driven motion)
  - Optional: Cinematic Mode (feature-flagged, off by default)

## Required PDF Targets (keep as non-functional goals in Phase I)
- Canvas fallback at deep zooms
- TopoJSON simplification at load
- Reverse nav via timeline.reverse()

## Performance Mitigations
Performance + Canvas fallback is directly called out in the technical brief and press release risk section.

## AgriCommand Override Rules
- All map interactions must log to LogConsole
- Hover states use copper glow per BRAND_UI_RULES
- Color palette uses AgriCommand tokens (sky-cobalt, agri-green, etc.)
- No external API calls in Phase I (mock data only)
