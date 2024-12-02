import { useState, useCallback } from 'react';
import { API } from '../types/api';

export function useAPISearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const filterAPIs = useCallback((apis: API[]) => {
    return apis.filter(api => {
      const matchesSearch = !searchQuery || 
        api.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilters = Object.entries(filters).every(([key, values]) => {
        if (!values || !values.length) return true;
        return values.includes(api[key]);
      });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filterAPIs,
    clearFilters: () => setFilters({})
  };
}