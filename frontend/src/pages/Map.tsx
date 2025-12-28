/**
 * Map Page
 * Per MAP_IMPLEMENTATION_PROMPTS.md - Living Map integration
 */

import React from 'react';
import { MapShell } from '../features/map/components/MapShell';
import './Map.css';

export const Map: React.FC = () => {
  return (
    <div className="map-page">
      <MapShell />
    </div>
  );
};
