/**
 * MOLECULE: SoilMeter
 */

import React from 'react';
import { Meter } from '../../atoms/Meter/Meter';
import './SoilMeter.css';

export interface SoilMeterProps {
  label: string;
  value: number;
  unit: string;
  optimal: number;
}

export const SoilMeter: React.FC<SoilMeterProps> = ({
  label,
  value,
  unit,
  optimal,
}) => {
  const diff = Math.abs(value - optimal);
  const percentage = (diff / optimal) * 100;
  
  let variant: 'success' | 'warning' | 'error' = 'success';
  if (percentage > 20) variant = 'warning';
  if (percentage > 40) variant = 'error';
  
  return (
    <div className="soil-meter">
      <div className="soil-meter__header">
        <span className="soil-meter__label">{label}</span>
        <span className="soil-meter__optimal">Optimal: {optimal}{unit}</span>
      </div>
      <Meter 
        value={value}
        max={optimal * 1.5}
        unit={unit}
        variant={variant}
      />
    </div>
  );
};
