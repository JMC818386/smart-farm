/**
 * ATOM: Label
 */

import React from 'react';
import './Label.css';

export interface LabelProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export const Label: React.FC<LabelProps> = ({
  children,
  variant = 'default',
  size = 'md',
}) => {
  const className = `label label--${variant} label--${size}`;
  
  return <span className={className}>{children}</span>;
};
