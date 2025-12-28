/**
 * Map Store - Zustand State Management
 * Per PDF_REQUIREMENTS_EXTRACT.md depth model
 */

import { create } from 'zustand';
import type { MapDepth, MapSelection, BreadcrumbItem, KPIData, MapState } from '../types';

export interface ViewportTransform {
  x: number;
  y: number;
  scale: number;
}

interface MapStore extends MapState {
  // Viewport state
  viewportTransform: ViewportTransform;
  // Actions
  setDepth: (depth: MapDepth) => void;
  setSelection: (selection: MapSelection) => void;
  navigateBack: () => void;
  setKPIData: (data: KPIData | null) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  setViewportTransform: (transform: ViewportTransform) => void;
  reset: () => void;
}

const initialState: MapState = {
  currentDepth: 'us',
  selection: null,
  breadcrumbs: [],
  kpiData: null,
  isTransitioning: false,
};

const initialViewportTransform: ViewportTransform = {
  x: 0,
  y: 0,
  scale: 1,
};

export const useMapStore = create<MapStore>((set) => ({
  ...initialState,
  viewportTransform: initialViewportTransform,

  setDepth: (depth) => set({ currentDepth: depth }),

  setSelection: (selection) =>
    set((state) => {
      const newBreadcrumbs: BreadcrumbItem[] = [
        ...state.breadcrumbs,
        {
          depth: selection.depth,
          id: selection.id,
          name: selection.name,
        },
      ];

      return {
        selection,
        currentDepth: selection.depth,
        breadcrumbs: newBreadcrumbs,
      };
    }),

  navigateBack: () =>
    set((state) => {
      if (state.breadcrumbs.length === 0) return state;

      const newBreadcrumbs = [...state.breadcrumbs];
      newBreadcrumbs.pop();

      const previousSelection = newBreadcrumbs[newBreadcrumbs.length - 1] || null;

      return {
        breadcrumbs: newBreadcrumbs,
        selection: previousSelection
          ? {
              depth: previousSelection.depth,
              id: previousSelection.id,
              name: previousSelection.name,
            }
          : null,
        currentDepth: previousSelection?.depth || 'us',
      };
    }),

  setKPIData: (data) => set({ kpiData: data }),

  setTransitioning: (isTransitioning) => set({ isTransitioning }),

  setViewportTransform: (transform) => set({ viewportTransform: transform }),

  reset: () => set({ ...initialState, viewportTransform: initialViewportTransform }),
}));
