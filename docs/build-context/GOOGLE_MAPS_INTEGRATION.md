# Google Maps Integration - Build Context

## Overview
Replace D3-based vector SVG map with production-grade Google Maps JavaScript API integration for high-performance, feature-rich interactive mapping.

## Initial Build Prompt
```
Replace the current SVG/D3 vector map implementation with a fully integrated Google Maps JavaScript API solution. Requirements:

1. Core Integration:
   - Google Maps JavaScript API with Places, Geocoding, Geolocation libraries
   - Dynamic API key loading from environment variables
   - Comprehensive error handling and fallback messaging

2. Map Features:
   - Multiple map types (Roadmap, Satellite, Hybrid, Terrain)
   - State boundaries with click-to-zoom
   - County drill-down with automatic viewport fitting
   - Congressional district, zipcode, and school district overlays
   - Building POI markers using Places API
   - Custom data layer styling

3. Technical Implementation:
   - TypeScript with @types/google.maps
   - React functional components with hooks
   - Zustand state management for navigation
   - TopoJSON to GeoJSON conversion for boundaries
   - Data Layer API for polygon rendering

4. Data Sources:
   - US Atlas TopoJSON (states, counties)
   - Census Bureau TIGER/Line (districts)
   - Google Places API (buildings/POIs)

5. Performance:
   - Lazy load API only when needed
   - Cache loaded boundaries
   - Viewport-based data loading
```

## Implementation Details

### Files Created
- `frontend/src/config/maps.config.ts` - API configuration
- `frontend/src/utils/googleMapsLoader.ts` - Dynamic API loader
- `frontend/src/features/map/types/google-maps.d.ts` - TypeScript definitions
- `frontend/.env.example` - Environment template
- `GOOGLE_MAPS_SETUP.md` - Setup instructions

### Files Modified
- `frontend/index.html` - Removed static script tag
- `frontend/src/features/map/components/MapViewport.tsx` - Complete rewrite for Google Maps
- `frontend/src/features/map/components/MapViewport.css` - Google Maps styling
- `backend/server.js` - Added district data endpoints

### Dependencies Added
- `@types/google.maps` - TypeScript definitions

## Current State
- Google Maps API integration architecture complete
- Configuration and loader utilities implemented
- Comprehensive setup documentation created
- Backend endpoints for district data prepared
- MapViewport component needs recreation (was deleted during cleanup)

## Next Steps
1. Recreate MapViewport.tsx with clean Google Maps implementation
2. Test API key configuration
3. Verify state/county boundary loading
4. Implement district overlay toggling
5. Test Places API for building POIs
