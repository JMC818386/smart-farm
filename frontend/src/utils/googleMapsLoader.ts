/**
 * Google Maps Loader Utility
 * Dynamically loads Google Maps JavaScript API with proper configuration
 */

import { GOOGLE_MAPS_CONFIG } from '../config/maps.config';

let isLoading = false;
let isLoaded = false;
const callbacks: (() => void)[] = [];

/**
 * Load Google Maps JavaScript API dynamically
 * Handles multiple concurrent calls and ensures API is loaded only once
 */
export const loadGoogleMapsAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (isLoaded && window.google && window.google.maps) {
      resolve();
      return;
    }

    // Currently loading - add to callback queue
    if (isLoading) {
      callbacks.push(resolve);
      return;
    }

    // Start loading
    isLoading = true;

    const apiKey = GOOGLE_MAPS_CONFIG.apiKey;
    
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      const error = new Error(
        'Google Maps API key is not configured. ' +
        'Please set VITE_GOOGLE_MAPS_API_KEY in your .env.local file. ' +
        'Get a free API key from: https://console.cloud.google.com/'
      );
      console.error(error);
      reject(error);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    const libraries = GOOGLE_MAPS_CONFIG.libraries.join(',');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}&loading=async&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    // Success callback
    (window as any).initGoogleMaps = () => {
      isLoaded = true;
      isLoading = false;
      resolve();
      
      // Execute all queued callbacks
      callbacks.forEach(cb => cb());
      callbacks.length = 0;
      
      console.log('✅ Google Maps API loaded successfully');
    };

    // Error handler
    script.onerror = () => {
      isLoading = false;
      const error = new Error('Failed to load Google Maps API. Check your API key and network connection.');
      console.error(error);
      reject(error);
    };

    // Append to document
    document.head.appendChild(script);
  });
};

/**
 * Check if Google Maps API is loaded
 */
export const isGoogleMapsLoaded = (): boolean => {
  return !!(window.google && window.google.maps);
};

/**
 * Wait for Google Maps API to be available
 * Useful for components that need to ensure API is ready
 */
export const waitForGoogleMaps = async (timeout = 10000): Promise<boolean> => {
  if (isGoogleMapsLoaded()) {
    return true;
  }

  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (isGoogleMapsLoaded()) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.warn('Timeout waiting for Google Maps API');
  return false;
};
