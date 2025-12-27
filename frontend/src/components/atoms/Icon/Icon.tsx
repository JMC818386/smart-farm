/**
 * ATOM: Icon
 */

import React from 'react';
import './Icon.css';

export interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
}) => {
  const className = `icon icon--${size}`;
  const style = color ? { color } : undefined;
  
  return (
    <span className={className} style={style} data-icon={name}>
      {/* Icon implementation - use lucide-react or similar */}
      {name}
    </span>
  );
};
