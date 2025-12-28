/**
 * useDepthNavigation Hook
 * Per PDF_REQUIREMENTS_EXTRACT.md - tracks depth + selection + breadcrumb behavior
 */

import { useCallback } from 'react';
import { useMapStore } from '../store/mapStore';
import { useFarmStore } from '../../../store/farmStore';
import type { MapSelection } from '../types';

export const useDepthNavigation = () => {
  const {
    currentDepth,
    selection,
    breadcrumbs,
    setSelection,
    navigateBack,
    setTransitioning,
  } = useMapStore();

  const addLog = useFarmStore((state) => state.addLog);

  const selectRegion = useCallback(
    (newSelection: MapSelection) => {
      setTransitioning(true);
      setSelection(newSelection);
      
      addLog('MAP_SELECT', `Selected ${newSelection.name} at ${newSelection.depth} level`);
      
      // Simulate transition duration
      setTimeout(() => setTransitioning(false), 250);
    },
    [setSelection, setTransitioning, addLog]
  );

  const goBack = useCallback(() => {
    const fromDepth = currentDepth;
    
    setTransitioning(true);
    navigateBack();
    
    const toDepth = breadcrumbs[breadcrumbs.length - 2]?.depth || 'us';
    addLog('MAP_NAV_BACK', `Navigated from ${fromDepth} to ${toDepth}`);
    
    // Simulate reverse transition duration
    setTimeout(() => setTransitioning(false), 250);
  }, [currentDepth, breadcrumbs, navigateBack, setTransitioning, addLog]);

  const canGoBack = breadcrumbs.length > 0;

  return {
    currentDepth,
    selection,
    breadcrumbs,
    selectRegion,
    goBack,
    canGoBack,
  };
};
