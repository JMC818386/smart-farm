/**
 * StateLayer Component
 * Per MAP_IMPLEMENTATION_PROMPTS.md PROMPT 06
 * Renders county boundaries within selected state using TopoJSON
 */

import React, { useEffect, useState } from 'react';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { feature } from 'topojson-client';
import axios from 'axios';
import gsap from 'gsap';
import './MapLayer.css';
import { useDepthNavigation } from '../hooks/useDepthNavigation';
import { useMapStore } from '../store/mapStore';
import type { GeoFeature } from '../types';

interface StateLayerProps {
  onHover: (event: React.MouseEvent, name: string, info?: string) => void;
  onLeave: () => void;
}

export const StateLayer: React.FC<StateLayerProps> = ({ onHover, onLeave }) => {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const selection = useMapStore((state) => state.selection);
  const { selectRegion } = useDepthNavigation();
  const viewportTransform = useMapStore((state) => state.viewportTransform);
  const setViewportTransform = useMapStore((state) => state.setViewportTransform);

  const projection = geoAlbersUsa().translate([480, 300]).scale(800);
  const pathGenerator = geoPath().projection(projection);

  useEffect(() => {
    if (!selection?.id) return;

    axios.get(`/api/map/state/${selection.id}`)
      .then((response) => {
        const topology = response.data;
        if (topology.objects && topology.objects.counties) {
          const geojson = feature(topology, topology.objects.counties);
          const stateId = parseInt(selection.id);
          const countyFeatures = geojson.features.filter((f: any) => 
            Math.floor(f.id / 1000) === stateId
          );
          setFeatures(countyFeatures as GeoFeature[]);
        }
      })
      .catch((error) => {
        console.error('[StateLayer] Failed to load state data:', error);
      });
  }, [selection?.id]);

  const handleClick = (f: GeoFeature) => {
    if (!selection?.id) return;
    
    // Calculate bounding box of the clicked county
    const bounds = pathGenerator.bounds(f as any);
    const [[x0, y0], [x1, y1]] = bounds;
    
    const width = 960;
    const height = 600;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    
    // Calculate scale to fit bounds with padding
    const newScale = Math.min(20, 0.9 / Math.max(dx / width, dy / height));
    
    // Calculate translation to center the county
    const translateX = width / 2 - centerX * newScale;
    const translateY = height / 2 - centerY * newScale;

    // Create temp object for animation
    const temp = { x: viewportTransform.x, y: viewportTransform.y, scale: viewportTransform.scale };
    
    // Animate viewport transform
    gsap.to(temp, {
      x: translateX,
      y: translateY,
      scale: newScale,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setViewportTransform({ x: temp.x, y: temp.y, scale: temp.scale });
      },
      onComplete: () => {
        // Change to county depth after zoom
        selectRegion({
          depth: 'county',
          id: f.id as string,
          name: f.properties.name || `County ${f.id}`,
          parentId: selection.id,
        });
      },
    });
  };

  return (
    <g className="map-layer map-layer--state">
      {features.map((f) => (
        <path
          key={f.id}
          d={pathGenerator(f as any) || ''}
          className="map-region"
          onClick={() => handleClick(f)}
          onMouseMove={(e) => onHover(e, f.properties.name || `County ${f.id}`)}
          onMouseLeave={onLeave}
        />
      ))}
    </g>
  );
};
