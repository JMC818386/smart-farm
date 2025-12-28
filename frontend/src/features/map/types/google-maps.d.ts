/**
 * Google Maps TypeScript Definitions
 * Extended type definitions for Google Maps JavaScript API
 */

export {};

declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }

  namespace google.maps {
    // Core types are already defined by @types/google.maps
    // Add any custom extensions here if needed
  }
}
