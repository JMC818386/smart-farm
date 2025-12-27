/**
 * ORGANISM: DroneFeedPanel
 * Per COMPONENT_CATALOG.md & 01_Dashboard.md
 */

import React from 'react';
import { useFarmStore } from '../../../store/farmStore';
import { DroneStatus } from '../../molecules/DroneStatus/DroneStatus';
import './DroneFeedPanel.css';

export const DroneFeedPanel: React.FC = () => {
  const drones = useFarmStore((state) => state.drones);
  
  if (drones.length === 0) {
    return (
      <div className="drone-feed-panel panel">
        <h3 className="drone-feed-panel__title display">Drone Feed</h3>
        <div className="drone-feed-panel__empty">No drone data available</div>
      </div>
    );
  }
  
  return (
    <div className="drone-feed-panel panel">
      <h3 className="drone-feed-panel__title display">Drone Feed</h3>
      <div className="drone-feed-panel__list">
        {drones.map((drone) => (
          <DroneStatus key={drone.id} {...drone} />
        ))}
      </div>
    </div>
  );
};
