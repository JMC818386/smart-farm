/**
 * Map Module Types
 * Per PDF_REQUIREMENTS_EXTRACT.md
 */

export type MapDepth = 'us' | 'state' | 'county' | 'city';

export interface MapSelection {
  depth: MapDepth;
  id: string;
  name: string;
  parentId?: string;
}

export interface BreadcrumbItem {
  depth: MapDepth;
  id: string;
  name: string;
}

export interface KPIData {
  equipment: number;
  drones: number;
  soilQuality: number;
  weatherStatus: string;
}

export interface GeoFeature {
  type: 'Feature';
  id: string;
  properties: {
    name: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any;
  };
}

export interface MapState {
  currentDepth: MapDepth;
  selection: MapSelection | null;
  breadcrumbs: BreadcrumbItem[];
  kpiData: KPIData | null;
  isTransitioning: boolean;
}

export interface GsapTimelineConfig {
  duration: number;
  ease?: string;
  onComplete?: () => void;
  onReverseComplete?: () => void;
}
