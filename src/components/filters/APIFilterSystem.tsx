import React from 'react';
import { Filter, X } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import { StatusFilter } from './StatusFilter';
import { AuthFilter } from './AuthFilter';
import { RegionFilter } from './RegionFilter';
import { ComplexityFilter } from './ComplexityFilter';
import { useAPIFilters } from '../../hooks/useAPIFilters';
import { Badge } from '../ui/Badge';

export interface APIFilters {
  categories: string[];
  status: string[];
  auth: string[];
  regions: string[];
  complexity: string | null;
}

interface APIFilterSystemProps {
  onFiltersChange: (filters: APIFilters) => void;
}

export function APIFilterSystem({ onFiltersChange }: APIFilterSystemProps) {
  const {
    filters,
    activeFilterCount,
    updateFilter,
    clearFilters,
    clearFilter
  } = useAPIFilters(onFiltersChange);

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-3 py-1.5 bg-[#2A2A2A] rounded-lg hover:bg-[#333333] transition-colors"
          >
            <X className="h-4 w-4 text-[#E0E0E0]" />
            <span className="text-sm text-[#E0E0E0]">Clear all</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        <CategoryFilter
          selected={filters.categories}
          onChange={(categories) => updateFilter('categories', categories)}
        />

        <StatusFilter
          selected={filters.status}
          onChange={(status) => updateFilter('status', status)}
        />

        <AuthFilter
          selected={filters.auth}
          onChange={(auth) => updateFilter('auth', auth)}
        />

        <RegionFilter
          selected={filters.regions}
          onChange={(regions) => updateFilter('regions', regions)}
        />

        <ComplexityFilter
          selected={filters.complexity}
          onChange={(complexity) => updateFilter('complexity', complexity)}
        />
      </div>

      {activeFilterCount > 0 && (
        <div className="mt-6 pt-6 border-t border-[#424242]">
          <div className="text-sm text-[#E0E0E0] mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge
                key={`category-${category}`}
                variant="default"
                className="flex items-center space-x-1"
                onClick={() => clearFilter('categories', category)}
              >
                <span>{category}</span>
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.status.map((status) => (
              <Badge
                key={`status-${status}`}
                variant="default"
                className="flex items-center space-x-1"
                onClick={() => clearFilter('status', status)}
              >
                <span>{status}</span>
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.auth.map((auth) => (
              <Badge
                key={`auth-${auth}`}
                variant="default"
                className="flex items-center space-x-1"
                onClick={() => clearFilter('auth', auth)}
              >
                <span>{auth}</span>
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.regions.map((region) => (
              <Badge
                key={`region-${region}`}
                variant="default"
                className="flex items-center space-x-1"
                onClick={() => clearFilter('regions', region)}
              >
                <span>{region}</span>
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.complexity && (
              <Badge
                variant="default"
                className="flex items-center space-x-1"
                onClick={() => updateFilter('complexity', null)}
              >
                <span>{filters.complexity}</span>
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}