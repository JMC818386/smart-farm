/**
 * MOLECULE: DroneStatus
 */

import React from 'react';
import { Label } from '../../atoms/Label/Label';
import { Meter } from '../../atoms/Meter/Meter';
import './DroneStatus.css';

export interface DroneStatusProps {
  id: string;
  status: 'active' | 'idle' | 'charging';
  battery: number;
}

export const DroneStatus: React.FC<DroneStatusProps> = ({
  id,
  status,
  battery,
}) => {
  const statusVariant = status === 'active' ? 'success' : status === 'charging' ? 'warning' : 'default';
  const batteryVariant = battery > 50 ? 'success' : battery > 20 ? 'warning' : 'error';
  
  return (
    <div className="drone-status">
      <div className="drone-status__header">
        <span className="drone-status__id mono">{id}</span>
        <Label variant={statusVariant} size="sm">{status}</Label>
      </div>
      <Meter 
        value={battery}
        max={100}
        unit="%"
        variant={batteryVariant}
      />
    </div>
  );
};
