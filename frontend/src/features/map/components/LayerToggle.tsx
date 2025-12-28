/**
 * LayerToggle Component
 * Allows user to toggle between different data layers
 */

import React, { useState } from 'react';
import './LayerToggle.css';

export type LayerType = 'base' | 'congressional' | 'zipcode' | 'school' | 'satellite' | 'buildings';

interface LayerToggleProps {
  activeLayer: LayerType;
  onLayerChange: (layer: LayerType) => void;
}

export const LayerToggle: React.FC<LayerToggleProps> = ({ activeLayer, onLayerChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const layers: { id: LayerType; label: string; icon: string }[] = [
    { id: 'base', label: 'Base Map', icon: '🗺️' },
    { id: 'congressional', label: 'Congressional Districts', icon: '🏛️' },
    { id: 'zipcode', label: 'Zip Codes', icon: '📮' },
    { id: 'school', label: 'School Districts', icon: '🏫' },
    { id: 'satellite', label: 'Satellite View', icon: '🛰️' },
    { id: 'buildings', label: 'Buildings & POIs', icon: '🏢' },
  ];

  return (
    <div className="layer-toggle">
      <button
        className="layer-toggle__button"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle layers"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1L1 5l9 4 9-4-9-4zM1 10l9 4 9-4M1 15l9 4 9-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
        Layers
      </button>

      {isOpen && (
        <div className="layer-toggle__menu">
          {layers.map((layer) => (
            <button
              key={layer.id}
              className={`layer-toggle__item ${activeLayer === layer.id ? 'layer-toggle__item--active' : ''}`}
              onClick={() => {
                onLayerChange(layer.id);
                setIsOpen(false);
              }}
            >
              <span className="layer-toggle__icon">{layer.icon}</span>
              <span className="layer-toggle__label">{layer.label}</span>
              {activeLayer === layer.id && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="layer-toggle__check">
                  <path d="M13 4L6 11 3 8"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
