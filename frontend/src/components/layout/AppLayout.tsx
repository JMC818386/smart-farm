/**
 * AppLayout - Main Application Shell
 * Per BRAND_UI_RULES.md
 */

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogConsole } from '../organisms/LogConsole/LogConsole';
import './AppLayout.css';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="app-layout">
      <nav className="app-layout__topnav">
        <h1 className="app-layout__logo display">AGRICOMMAND OS</h1>
        <div className="app-layout__nav-links">
          <Link 
            to="/" 
            className={`app-layout__nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/tractors" 
            className={`app-layout__nav-link ${isActive('/tractors') ? 'active' : ''}`}
          >
            Tractors
          </Link>
          <Link 
            to="/drones" 
            className={`app-layout__nav-link ${isActive('/drones') ? 'active' : ''}`}
          >
            Drones
          </Link>
          <Link 
            to="/soil" 
            className={`app-layout__nav-link ${isActive('/soil') ? 'active' : ''}`}
          >
            Soil
          </Link>
        </div>
      </nav>
      
      <main className="app-layout__main">
        <Outlet />
      </main>
      
      <aside className="app-layout__console">
        <LogConsole />
      </aside>
    </div>
  );
};
