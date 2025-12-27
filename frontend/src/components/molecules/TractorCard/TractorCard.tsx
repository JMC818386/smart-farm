/**
 * MOLECULE: TractorCard
 */

import React from 'react';
import { Label } from '../../atoms/Label/Label';
import { Meter } from '../../atoms/Meter/Meter';
import './TractorCard.css';

export interface TractorCardProps {
  id: string;
  name: string;
  fuel: number;
  task: string;
  onClick?: () => void;
}

export const TractorCard: React.FC<TractorCardProps> = ({
  name,
  fuel,
  task,
  onClick,
}) => {
  const fuelVariant = fuel > 50 ? 'success' : fuel > 20 ? 'warning' : 'error';
  
  return (
    <div className="tractor-card panel" onClick={onClick}>
      <div className="tractor-card__header">
        <h3 className="tractor-card__name display">{name}</h3>
        <Label variant="default" size="sm">{task}</Label>
      </div>
      <Meter 
        label="Fuel Level"
        value={fuel}
        max={100}
        unit="%"
        variant={fuelVariant}
      />
    </div>
  );
};
