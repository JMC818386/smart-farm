/**
 * Map API Routes
 * Per PDF hierarchy: us → state → county → city
 */

import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

const loadJSON = (filename) => {
  try {
    const path = join(__dirname, '../../data', 'map', filename);
    console.log(`[loadJSON] Attempting to load: ${path}`);
    const content = readFileSync(path, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`[loadJSON] Error loading ${filename}:`, error.message);
    return null;
  }
};

// GET /api/map/us
router.get('/us', (req, res) => {
  console.log('[API] GET /api/map/us');
  const data = loadJSON('us-states.json');
  if (!data) {
    return res.status(500).json({ error: 'Failed to load US states data' });
  }
  res.json(data);
});

// GET /api/map/state/:stateId
router.get('/state/:stateId', (req, res) => {
  const { stateId } = req.params;
  console.log(`[API] GET /api/map/state/${stateId}`);
  
  const data = loadJSON('us-counties.json');
  if (!data) {
    return res.status(500).json({ error: 'Failed to load counties data' });
  }
  res.json(data);
});

// GET /api/map/county/:stateId/:countyId
router.get('/county/:stateId/:countyId', (req, res) => {
  const { stateId, countyId } = req.params;
  console.log(`[API] GET /api/map/county/${stateId}/${countyId}`);
  
  const data = loadJSON(`county-${stateId}-${countyId}.json`) || {
    type: 'FeatureCollection',
    features: [],
    empty: true
  };
  res.json(data);
});

// GET /api/map/city/:stateId/:countyId/:cityId (Phase I stub)
router.get('/city/:stateId/:countyId/:cityId', (req, res) => {
  const { stateId, countyId, cityId } = req.params;
  console.log(`[API] GET /api/map/city/${stateId}/${countyId}/${cityId}`);
  
  res.json({
    type: 'Feature',
    id: cityId,
    properties: { name: 'City Detail (Phase I Stub)' },
    geometry: null,
    stub: true
  });
});

// GET /api/map/kpi?depth=us|state|county|city&id=<id>
router.get('/kpi', (req, res) => {
  const { depth, id } = req.query;
  console.log(`[API] GET /api/map/kpi?depth=${depth}&id=${id}`);
  
  // Mock KPI data
  const kpiData = {
    equipment: Math.floor(Math.random() * 20) + 5,
    drones: Math.floor(Math.random() * 10) + 2,
    soilQuality: Math.floor(Math.random() * 30) + 70,
    weatherStatus: ['Clear', 'Partly Cloudy', 'Optimal'][Math.floor(Math.random() * 3)]
  };
  
  res.json(kpiData);
});

// GET /api/map/districts/:type/:regionId
// Types: congressional, zipcode, school
router.get('/districts/:type/:regionId', (req, res) => {
  const { type, regionId } = req.params;
  console.log(`[API] GET /api/map/districts/${type}/${regionId}`);
  
  // Placeholder response - in production, serve real district boundary data
  // Data sources:
  // - Congressional: https://github.com/unitedstates/districts
  // - Zip codes: https://github.com/OpenDataDE/State-zip-code-GeoJSON
  // - School districts: https://nces.ed.gov/programs/edge/Geographic/DistrictBoundaries
  
  res.json({
    type: 'FeatureCollection',
    features: [],
    metadata: {
      districtType: type,
      regionId: regionId,
      message: 'District data will be available in next phase. Integrate with Census TIGER/Line or custom boundary APIs.'
    }
  });
});

// GET /api/map/satellite/:z/:x/:y (Tile endpoint for satellite imagery)
router.get('/satellite/:z/:x/:y', (req, res) => {
  const { z, x, y } = req.params;
  console.log(`[API] GET /api/map/satellite/${z}/${x}/${y}`);
  
  // Placeholder - integrate with MapBox, Google Maps, or ESRI satellite tiles
  res.json({
    message: 'Satellite tile endpoint. Integrate with tile provider API.',
    tile: { z, x, y },
    providers: [
      'Mapbox: https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png',
      'ESRI: https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      'Google: Requires Google Maps API key'
    ]
  });
});

// GET /api/map/buildings/:bounds (Vector data for buildings/POIs)
router.get('/buildings/:bounds', (req, res) => {
  const { bounds } = req.params;
  console.log(`[API] GET /api/map/buildings/${bounds}`);
  
  // Placeholder - integrate with OpenStreetMap Overpass API or Google Places
  res.json({
    type: 'FeatureCollection',
    features: [],
    metadata: {
      message: 'Buildings/POI data endpoint. Integrate with:',
      sources: [
        'OpenStreetMap Overpass API for buildings, schools, businesses',
        'Google Places API for business data',
        'Microsoft Building Footprints: https://github.com/microsoft/USBuildingFootprints'
      ]
    }
  });
});

export default router;
