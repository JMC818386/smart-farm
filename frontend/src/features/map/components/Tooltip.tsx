/**
 * Tooltip Component
 * Per MAP_IMPLEMENTATION_PROMPTS.md PROMPT 04
 * Displays region information on hover
 */

import React from 'react';
import './Tooltip.css';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  content: {
    name: string;
    info?: string;
  } | null;
}

export const Tooltip: React.FC<TooltipProps> = ({ visible, x, y, content }) => {
  if (!visible || !content) {
    return null;
  }

  return (
    <div
      className="map-tooltip"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div className="map-tooltip__name">{content.name}</div>
      {content.info && (
        <div className="map-tooltip__info">{content.info}</div>
      )}
    </div>
  );
};
