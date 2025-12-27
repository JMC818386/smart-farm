/**
 * Zustand Store - Farm State Management
 * Per SOLUTION_CONCEPT.md
 */

import { create } from 'zustand';

interface Equipment {
  id: string;
  name: string;
  fuel: number;
  task: string;
}

interface Drone {
  id: string;
  status: 'active' | 'idle' | 'charging';
  battery: number;
}

interface Weather {
  temp: number;
  wind: number;
  forecast: string;
}

interface Soil {
  moisture: number;
  ph: number;
  npk: number[];
}

interface LogEntry {
  timestamp: string;
  action: string;
  details: string;
}

interface FarmState {
  equipment: Equipment[];
  drones: Drone[];
  weather: Weather | null;
  soil: Soil | null;
  logs: LogEntry[];
  
  setEquipment: (equipment: Equipment[]) => void;
  setDrones: (drones: Drone[]) => void;
  setWeather: (weather: Weather) => void;
  setSoil: (soil: Soil) => void;
  addLog: (action: string, details: string) => void;
}

export const useFarmStore = create<FarmState>((set) => ({
  equipment: [],
  drones: [],
  weather: null,
  soil: null,
  logs: [],
  
  setEquipment: (equipment) => set({ equipment }),
  setDrones: (drones) => set({ drones }),
  setWeather: (weather) => set({ weather }),
  setSoil: (soil) => set({ soil }),
  
  addLog: (action, details) => 
    set((state) => ({
      logs: [
        {
          timestamp: new Date().toISOString(),
          action,
          details
        },
        ...state.logs
      ].slice(0, 100) // Keep last 100 logs
    }))
}));
