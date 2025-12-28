/**
 * USLayer Component
 * Per MAP_IMPLEMENTATION_PROMPTS.md PROMPT 05
 * Renders US state boundaries with interaction using TopoJSON
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

interface USLayerProps {
  onHover: (event: React.MouseEvent, name: string, info?: string) => void;
  onLeave: () => void;
}

export const USLayer: React.FC<USLayerProps> = ({ onHover, onLeave }) => {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const { selectRegion } = useDepthNavigation();
  const selection = useMapStore((state) => state.selection);
  const viewportTransform = useMapStore((state) => state.viewportTransform);
  const setViewportTransform = useMapStore((state) => state.setViewportTransform);

  const projection = geoAlbersUsa().translate([480, 300]).scale(800);
  const pathGenerator = geoPath().projection(projection);

  useEffect(() => {
    axios.get('/api/map/us')
      .then((response) => {
        const topology = response.data;
        if (topology.objects && topology.objects.states) {
          const geojson = feature(topology, topology.objects.states);
          setFeatures(geojson.features as GeoFeature[]);
        }
      })
      .catch((error) => {
        console.error('[USLayer] Failed to load US data:', error);
      });
  }, []);

  const handleClick = (f: GeoFeature) => {
    // Calculate bounding box of the clicked feature in SVG coordinates
    const bounds = pathGenerator.bounds(f as any);
    const [[x0, y0], [x1, y1]] = bounds;
    
    const width = 960;
    const height = 600;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    
    // Calculate scale to fit bounds with padding
    const newScale = Math.min(3, 0.9 / Math.max(dx / width, dy / height));
    
    // For transform: translate(tx, ty) scale(s)
    // Final position = (point * s) + translate
    // We want: (center * s) + translate = (width/2, height/2)
    // So: translate = (width/2, height/2) - (center * s)
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
        // Trigger depth change after animation
        selectRegion({
          depth: 'state',
          id: f.id as string,
          name: f.properties.name || `State ${f.id}`,
        });
      },
    });
  };

  return (
    <g className="map-layer map-layer--us">
      {features.map((f) => {
        const isSelected = selection && selection.id === f.id;
        const hasSelection = selection !== null;
        
        return (
          <path
            key={f.id}
            d={pathGenerator(f as any) || ''}
            className="map-region"
            onClick={() => handleClick(f)}
            onMouseMove={(e) => onHover(e, f.properties.name || `State ${f.id}`)}
            onMouseLeave={onLeave}
            style={{
              opacity: hasSelection && !isSelected ? 0.3 : 1,
              filter: hasSelection && !isSelected ? 'blur(2px)' : 'none',
              transition: 'opacity 0.6s ease, filter 0.6s ease',
            }}
          />
        );
      })}
    </g>
  );
};
