/**
 * API Client - Axios Configuration
 * Per SOLUTION_CONCEPT.md
 */

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('[API Error]', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;

// API methods
export const farmAPI = {
  getEquipment: () => apiClient.get('/equipment'),
  getDrones: () => apiClient.get('/drones'),
  getWeather: () => apiClient.get('/weather'),
  getSoil: () => apiClient.get('/soil')
};
