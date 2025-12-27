/**
 * ORGANISM: FleetOverview
 * Per COMPONENT_CATALOG.md & 01_Dashboard.md
 */

import React from 'react';
import { useFarmStore } from '../../../store/farmStore';
import { TractorCard } from '../../molecules/TractorCard/TractorCard';
import './FleetOverview.css';

export const FleetOverview: React.FC = () => {
  const equipment = useFarmStore((state) => state.equipment);
  const addLog = useFarmStore((state) => state.addLog);
  
  const handleTractorClick = (name: string) => {
    addLog('TRACTOR_SELECT', `Selected ${name}`);
  };
  
  if (equipment.length === 0) {
    return (
      <div className="fleet-overview panel">
        <h3 className="fleet-overview__title display">Fleet Overview</h3>
        <div className="fleet-overview__empty">No equipment data available</div>
      </div>
    );
  }
  
  return (
    <div className="fleet-overview">
      <h3 className="fleet-overview__title display">Fleet Overview</h3>
      <div className="fleet-overview__grid">
        {equipment.map((item) => (
          <TractorCard
            key={item.id}
            {...item}
            onClick={() => handleTractorClick(item.name)}
          />
        ))}
      </div>
    </div>
  );
};
