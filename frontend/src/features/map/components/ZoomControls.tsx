/**
 * ZoomControls Component
 * Provides reset button and breadcrumb navigation
 */

import React from 'react';
import { useMapStore } from '../store/mapStore';
import './ZoomControls.css';

export const ZoomControls: React.FC = () => {
  const breadcrumbs = useMapStore((state) => state.breadcrumbs);
  const reset = useMapStore((state) => state.reset);
  const navigateBack = useMapStore((state) => state.navigateBack);
  const currentDepth = useMapStore((state) => state.currentDepth);

  const handleReset = () => {
    reset();
  };

  const handleBack = () => {
    navigateBack();
  };

  if (currentDepth === 'us') return null;

  return (
    <div className="zoom-controls">
      <div className="zoom-controls__breadcrumbs">
        <button 
          onClick={handleReset} 
          className="zoom-controls__btn zoom-controls__btn--home"
          title="Reset to US view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L2 7h2v6h3V9h2v4h3V7h2L8 2z"/>
          </svg>
          USA
        </button>
        
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={`${item.depth}-${item.id}`}>
            <span className="zoom-controls__separator">/</span>
            <button
              onClick={() => {
                // Navigate back to this level
                const stepsBack = breadcrumbs.length - index - 1;
                for (let i = 0; i < stepsBack; i++) {
                  navigateBack();
                }
              }}
              className="zoom-controls__btn"
            >
              {item.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {breadcrumbs.length > 0 && (
        <button 
          onClick={handleBack} 
          className="zoom-controls__btn zoom-controls__btn--back"
          title="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 13L5 8l5-5v10z"/>
          </svg>
          Back
        </button>
      )}
    </div>
  );
};
