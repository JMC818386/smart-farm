/**
 * ORGANISM: SoilAnalytics
 * Per COMPONENT_CATALOG.md & 01_Dashboard.md
 */

import React from 'react';
import { useFarmStore } from '../../../store/farmStore';
import { SoilMeter } from '../../molecules/SoilMeter/SoilMeter';
import './SoilAnalytics.css';

export const SoilAnalytics: React.FC = () => {
  const soil = useFarmStore((state) => state.soil);
  
  if (!soil) {
    return (
      <div className="soil-analytics panel">
        <h3 className="soil-analytics__title display">Soil Analytics</h3>
        <div className="soil-analytics__empty">No soil data available</div>
      </div>
    );
  }
  
  return (
    <div className="soil-analytics panel">
      <h3 className="soil-analytics__title display">Soil Analytics</h3>
      <div className="soil-analytics__metrics">
        <SoilMeter
          label="Moisture"
          value={soil.moisture}
          unit="%"
          optimal={60}
        />
        <SoilMeter
          label="pH Level"
          value={soil.ph}
          unit=""
          optimal={7}
        />
        {soil.npk.map((value, index) => (
          <SoilMeter
            key={index}
            label={['Nitrogen', 'Phosphorus', 'Potassium'][index]}
            value={value}
            unit="ppm"
            optimal={50}
          />
        ))}
      </div>
    </div>
  );
};
