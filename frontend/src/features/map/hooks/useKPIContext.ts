/**
 * useKPIContext Hook
 * Per PDF_REQUIREMENTS_EXTRACT.md - fetch KPI metrics for current selection
 */

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMapStore } from '../store/mapStore';
import axios from 'axios';
import type { KPIData } from '../types';

export const useKPIContext = () => {
  const { currentDepth, selection, setKPIData } = useMapStore();

  const { data, isLoading, error } = useQuery<KPIData>({
    queryKey: ['map-kpi', currentDepth, selection?.id],
    queryFn: async () => {
      const params = new URLSearchParams({
        depth: currentDepth,
        ...(selection?.id && { id: selection.id }),
      });
      
      const response = await axios.get(`/api/map/kpi?${params}`);
      return response.data;
    },
    enabled: !!currentDepth,
  });

  useEffect(() => {
    if (data) {
      setKPIData(data);
    }
  }, [data, setKPIData]);

  return {
    data: data || null,
    isLoading,
    isError: !!error,
  };
};
