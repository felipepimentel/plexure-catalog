import { useState, useCallback, useEffect } from 'react';
import { APIFilters } from '../components/filters/APIFilterSystem';

const initialFilters: APIFilters = {
  categories: [],
  status: [],
  auth: [],
  regions: [],
  complexity: null
};

export function useAPIFilters(onChange: (filters: APIFilters) => void) {
  const [filters, setFilters] = useState<APIFilters>(initialFilters);

  const activeFilterCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length;
    }
    return count + (value ? 1 : 0);
  }, 0);

  const updateFilter = useCallback((key: keyof APIFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilter = useCallback((key: keyof APIFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev[key])
        ? (prev[key] as string[]).filter(v => v !== value)
        : null
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  return {
    filters,
    activeFilterCount,
    updateFilter,
    clearFilter,
    clearFilters
  };
}