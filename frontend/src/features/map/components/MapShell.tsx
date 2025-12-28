/**
 * MapShell Component
 * Per MAP_IMPLEMENTATION_PROMPTS.md PROMPT 04 - Map UI Shell
 * Container for map visualization with depth navigator and KPI panel
 */

import React from 'react';
import './MapShell.css';
import { DepthNavigator } from './DepthNavigator.tsx';
import { KPIOverlayPanel } from './KPIOverlayPanel.tsx';
import { MapViewport } from './MapViewport.tsx';

export const MapShell: React.FC = () => {
  return (
    <div className="map-shell">
      <div className="map-shell__header">
        <h1 className="map-shell__title">Living Map</h1>
        <DepthNavigator />
      </div>
      
      <div className="map-shell__content">
        <MapViewport />
        <KPIOverlayPanel />
      </div>
    </div>
  );
};
