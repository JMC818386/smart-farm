/**
 * DepthNavigator Component
 * Per MAP_IMPLEMENTATION_PROMPTS.md PROMPT 04
 * Breadcrumb navigation showing current map depth path
 */

import React from 'react';
import './DepthNavigator.css';
import { useMapStore } from '../store/mapStore';
import { useDepthNavigation } from '../hooks/useDepthNavigation';

export const DepthNavigator: React.FC = () => {
  const breadcrumbs = useMapStore((state) => state.breadcrumbs);
  const { goBack, canGoBack } = useDepthNavigation();

  return (
    <nav className="depth-navigator" aria-label="Map navigation">
      <div className="depth-navigator__breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.id}>
            {index > 0 && <span className="depth-navigator__separator">→</span>}
            <span className="depth-navigator__crumb">{crumb.name}</span>
          </React.Fragment>
        ))}
      </div>
      
      {canGoBack && (
        <button
          className="depth-navigator__back-button"
          onClick={goBack}
          aria-label="Go back to previous level"
        >
          ← Back
        </button>
      )}
    </nav>
  );
};
