/**
 * ATOM: Meter
 */

import React from 'react';
import './Meter.css';

export interface MeterProps {
  value: number;
  max?: number;
  label?: string;
  unit?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Meter: React.FC<MeterProps> = ({
  value,
  max = 100,
  label,
  unit,
  variant = 'default',
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="meter">
      {label && <div className="meter__label">{label}</div>}
      <div className="meter__track">
        <div 
          className={`meter__fill meter__fill--${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="meter__value mono">
        {value}{unit && ` ${unit}`}
      </div>
    </div>
  );
};
