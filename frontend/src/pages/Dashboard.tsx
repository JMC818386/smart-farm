/**
 * PAGE: Dashboard
 * Per plans/screens/01_Dashboard.md
 */

import React, { useEffect, useState } from 'react';
import { useFarmStore } from '../store/farmStore';
import { farmAPI } from '../api/client';
import { FleetOverview } from '../components/organisms/FleetOverview/FleetOverview';
import { DroneFeedPanel } from '../components/organisms/DroneFeedPanel/DroneFeedPanel';
import { WeatherTile } from '../components/molecules/WeatherTile/WeatherTile';
import { SoilAnalytics } from '../components/organisms/SoilAnalytics/SoilAnalytics';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { setEquipment, setDrones, setWeather, setSoil, weather, addLog } = useFarmStore();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      addLog('DASHBOARD_LOAD', 'Loading dashboard data...');
      
      try {
        const [equipmentRes, dronesRes, weatherRes, soilRes] = await Promise.all([
          farmAPI.getEquipment(),
          farmAPI.getDrones(),
          farmAPI.getWeather(),
          farmAPI.getSoil()
        ]);
        
        setEquipment(equipmentRes.data);
        setDrones(dronesRes.data);
        setWeather(weatherRes.data);
        setSoil(soilRes.data);
        
        addLog('DASHBOARD_LOAD', 'Dashboard data loaded successfully');
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load data';
        setError(message);
        addLog('DASHBOARD_ERROR', message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [setEquipment, setDrones, setWeather, setSoil, addLog]);
  
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="display" style={{ fontSize: 'var(--text-2xl)', color: 'var(--sky-cobalt)' }}>
          LOADING DASHBOARD...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="dashboard-error panel">
        <h2 className="display" style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-error)' }}>
          SYSTEM ERROR
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="dashboard">
      <FleetOverview />
      
      <div className="dashboard__grid">
        <div className="dashboard__weather">
          {weather && <WeatherTile {...weather} />}
        </div>
        
        <div className="dashboard__drones">
          <DroneFeedPanel />
        </div>
        
        <div className="dashboard__soil">
          <SoilAnalytics />
        </div>
      </div>
    </div>
  );
};
