/**
 * KPIOverlayPanel Component
 * Per MAP_IMPLEMENTATION_PROMPTS.md PROMPT 04
 * Displays context-aware metrics for current map selection
 */

import React from 'react';
import './KPIOverlayPanel.css';
import { useKPIContext } from '../hooks/useKPIContext';

export const KPIOverlayPanel: React.FC = () => {
  const { data: kpiData, isLoading, isError } = useKPIContext();

  if (isLoading) {
    return (
      <aside className="kpi-panel kpi-panel--loading">
        <div className="kpi-panel__spinner">Loading metrics...</div>
      </aside>
    );
  }

  if (isError || !kpiData) {
    return null;
  }

  return (
    <aside className="kpi-panel" aria-label="Key performance indicators">
      <h2 className="kpi-panel__title">Metrics</h2>
      
      <div className="kpi-panel__grid">
        <div className="kpi-card">
          <div className="kpi-card__label">Equipment</div>
          <div className="kpi-card__value">{kpiData.equipment}</div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-card__label">Drones</div>
          <div className="kpi-card__value">{kpiData.drones}</div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-card__label">Soil Quality</div>
          <div className="kpi-card__value">{kpiData.soilQuality}%</div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-card__label">Weather</div>
          <div className="kpi-card__value kpi-card__value--text">{kpiData.weatherStatus}</div>
        </div>
      </div>
    </aside>
  );
};
