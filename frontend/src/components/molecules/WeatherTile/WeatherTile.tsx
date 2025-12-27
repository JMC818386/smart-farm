/**
 * MOLECULE: WeatherTile
 */

import React from 'react';
import './WeatherTile.css';

export interface WeatherTileProps {
  temp: number;
  wind: number;
  forecast: string;
}

export const WeatherTile: React.FC<WeatherTileProps> = ({
  temp,
  wind,
  forecast,
}) => {
  return (
    <div className="weather-tile panel">
      <h3 className="weather-tile__title display">Weather</h3>
      <div className="weather-tile__data">
        <div className="weather-tile__metric">
          <span className="weather-tile__value mono">{temp}°C</span>
          <span className="weather-tile__label">Temperature</span>
        </div>
        <div className="weather-tile__metric">
          <span className="weather-tile__value mono">{wind} km/h</span>
          <span className="weather-tile__label">Wind Speed</span>
        </div>
      </div>
      <div className="weather-tile__forecast">{forecast}</div>
    </div>
  );
};
