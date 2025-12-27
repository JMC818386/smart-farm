/**
 * Mock Backend Server
 * Per SOLUTION_CONCEPT.md - Express + Static JSON
 */

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Load mock data
const loadJSON = (filename) => {
  const path = join(__dirname, 'data', filename);
  return JSON.parse(readFileSync(path, 'utf-8'));
};

// API Routes
app.get('/api/equipment', (req, res) => {
  console.log('[API] GET /api/equipment');
  const data = loadJSON('equipment.json');
  res.json(data);
});

app.get('/api/drones', (req, res) => {
  console.log('[API] GET /api/drones');
  const data = loadJSON('drones.json');
  res.json(data);
});

app.get('/api/weather', (req, res) => {
  console.log('[API] GET /api/weather');
  const data = loadJSON('weather.json');
  res.json(data);
});

app.get('/api/soil', (req, res) => {
  console.log('[API] GET /api/soil');
  const data = loadJSON('soil.json');
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚜 AgriCommand OS Backend running on http://localhost:${PORT}`);
});
