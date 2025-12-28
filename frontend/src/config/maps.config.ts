/**
 * Google Maps API Configuration
 * 
 * To use Google Maps API:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select existing
 * 3. Enable the following APIs:
 *    - Maps JavaScript API
 *    - Places API
 *    - Geocoding API
 *    - Geolocation API
 *    - Maps Static API (optional)
 * 4. Create credentials -> API Key
 * 5. Set restrictions (HTTP referrers: http://localhost:*)
 * 6. Copy your API key below
 * 
 * FREE TIER LIMITS (as of 2025):
 * - Maps JavaScript API: $200/month free credit (~28,000 map loads)
 * - Places API: $200/month free credit
 * - Street View: $200/month free credit
 * 
 * ALTERNATIVE FREE APIS:
 * - OpenStreetMap: Completely free, unlimited
 * - Mapbox: 50,000 map loads/month free
 * - Leaflet.js: Open source mapping library
 */

export const GOOGLE_MAPS_CONFIG = {
  // Replace with your actual API key
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
  
  // Map configuration
  defaultCenter: { lat: 39.8283, lng: -98.5795 }, // Center of USA
  defaultZoom: 5,
  
  // Enabled libraries
  libraries: ['places', 'geometry', 'drawing', 'visualization'],
  
  // Map styles (optional custom styling)
  mapStyles: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }, { color: '#333333' }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { weight: 2 }],
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#888888' }, { weight: 1 }],
    },
  ],
};

// Alternative free mapping services
export const ALTERNATIVE_MAPS = {
  // OpenStreetMap - Completely free
  openStreetMap: {
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
  
  // Mapbox - 50k requests/month free
  mapbox: {
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN || '',
    styleUrl: 'mapbox://styles/mapbox/streets-v12',
  },
  
  // ESRI - Free tier available
  esri: {
    tileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri',
  },
};

// Data sources for district boundaries (all free)
export const DATA_SOURCES = {
  // US Census Bureau TIGER/Line files (free)
  censusBureau: {
    states: 'https://www2.census.gov/geo/tiger/GENZ2020/shp/cb_2020_us_state_20m.zip',
    counties: 'https://www2.census.gov/geo/tiger/GENZ2020/shp/cb_2020_us_county_20m.zip',
    congressional: 'https://www2.census.gov/geo/tiger/GENZ2020/shp/cb_2020_us_cd116_20m.zip',
    zipcodes: 'https://www2.census.gov/geo/tiger/GENZ2020/shp/cb_2020_us_zcta520_500k.zip',
  },
  
  // Natural Earth (free global data)
  naturalEarth: {
    countries: 'https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip',
    states: 'https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces.zip',
  },
  
  // US Atlas (TopoJSON - free)
  usAtlas: {
    states: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
    counties: 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json',
  },
  
  // School Districts (free from NCES)
  schoolDistricts: {
    url: 'https://nces.ed.gov/programs/edge/Geographic/DistrictBoundaries',
    format: 'Shapefile',
  },
};
