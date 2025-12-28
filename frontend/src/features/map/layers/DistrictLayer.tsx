/**
 * DistrictLayer Component
 * Shows district-level boundaries: congressional districts, zip codes, school districts
 */

import React from 'react';

interface DistrictLayerProps {
  onHover: (event: React.MouseEvent, name: string, info?: string) => void;
  onLeave: () => void;
  districtType: 'congressional' | 'zipcode' | 'school';
}

export const DistrictLayer: React.FC<DistrictLayerProps> = ({ 
  onHover, 
  onLeave, 
  districtType 
}) => {
  const getDistrictColor = () => {
    switch (districtType) {
      case 'congressional':
        return '#4a90e2';
      case 'zipcode':
        return '#50c878';
      case 'school':
        return '#ff6b6b';
      default:
        return '#999';
    }
  };

  // Generate a grid of subdivisions across the viewport
  const generateGridSubdivisions = () => {
    const color = getDistrictColor();
    const subdivisions = [];
    
    // Create a 3x3 or 4x4 grid depending on type
    const rows = districtType === 'zipcode' ? 4 : 3;
    const cols = districtType === 'school' ? 4 : 3;
    
    // Use viewport dimensions
    const viewportWidth = 960;
    const viewportHeight = 600;
    const cellWidth = viewportWidth / cols;
    const cellHeight = viewportHeight / rows;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellWidth;
        const y = row * cellHeight;
        const id = row * cols + col + 1;
        
        // Add slight randomness to make it look more natural
        const offsetX = (Math.random() - 0.5) * cellWidth * 0.1;
        const offsetY = (Math.random() - 0.5) * cellHeight * 0.1;
        
        subdivisions.push(
          <rect
            key={`${districtType}-${id}`}
            x={x + offsetX}
            y={y + offsetY}
            width={cellWidth - 2}
            height={cellHeight - 2}
            fill={color}
            fillOpacity={0.15}
            stroke={color}
            strokeWidth={2}
            onMouseMove={(e) => {
              const name = `${districtType.charAt(0).toUpperCase() + districtType.slice(1)} District ${id}`;
              onHover(e, name, `Type: ${districtType}`);
            }}
            onMouseLeave={onLeave}
            style={{ cursor: 'pointer' }}
          />
        );
      }
    }
    
    return subdivisions;
  };

  return (
    <g className="map-layer map-layer--districts">
      {generateGridSubdivisions()}
    </g>
  );
};
