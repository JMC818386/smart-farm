/**
 * CountyLayer Component
 * Renders the selected county boundary at county depth
 */

import React, { useEffect, useState } from 'react';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { feature } from 'topojson-client';
import axios from 'axios';
import './MapLayer.css';
import { useMapStore } from '../store/mapStore';
import type { GeoFeature } from '../types';

interface CountyLayerProps {
  onHover: (event: React.MouseEvent, name: string, info?: string) => void;
  onLeave: () => void;
}

export const CountyLayer: React.FC<CountyLayerProps> = ({ onHover, onLeave }) => {
  const [countyFeature, setCountyFeature] = useState<GeoFeature | null>(null);
  const selection = useMapStore((state) => state.selection);

  const projection = geoAlbersUsa().translate([480, 300]).scale(800);
  const pathGenerator = geoPath().projection(projection);

  useEffect(() => {
    if (!selection?.id || !selection?.parentId) return;

    const stateId = selection.parentId;

    // Fetch all counties for the state and find the selected one
    axios.get(`/api/map/state/${stateId}`)
      .then((response) => {
        const topology = response.data;
        if (topology.objects && topology.objects.counties) {
          const geojson = feature(topology, topology.objects.counties);
          const selectedCounty = geojson.features.find((f: any) => f.id === selection.id);
          if (selectedCounty) {
            setCountyFeature(selectedCounty as GeoFeature);
          }
        }
      })
      .catch((error) => {
        console.error('[CountyLayer] Failed to load county data:', error);
      });
  }, [selection?.id, selection?.parentId]);

  if (!countyFeature) {
    return (
      <g className="map-layer map-layer--county">
        <text x="480" y="300" className="map-layer__message" textAnchor="middle" fill="#ffffff">
          Loading county...
        </text>
      </g>
    );
  }

  return (
    <g className="map-layer map-layer--county">
      <path
        d={pathGenerator(countyFeature as any) || ''}
        className="map-region"
        fill="var(--soil-graphite-800, #444)"
        stroke="var(--sky-cobalt-500, #4a90e2)"
        strokeWidth="0.5"
        onMouseMove={(e) => onHover(e, countyFeature.properties?.name || `County ${countyFeature.id}`)}
        onMouseLeave={onLeave}
      />
    </g>
  );
};
