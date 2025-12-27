/**
 * Main Application Entry
 * Router configuration per plans/ROUTES.md
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Tractors } from './pages/Tractors';
import { Drones } from './pages/Drones';
import { Soil } from './pages/Soil';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tractors" element={<Tractors />} />
          <Route path="drones" element={<Drones />} />
          <Route path="soil" element={<Soil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
