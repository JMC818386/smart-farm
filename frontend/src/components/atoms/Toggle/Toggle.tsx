/**
 * ATOM: Toggle
 */

import React from 'react';
import './Toggle.css';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className={`toggle ${disabled ? 'toggle--disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="toggle__input"
      />
      <span className="toggle__slider" />
      {label && <span className="toggle__label">{label}</span>}
    </label>
  );
};
