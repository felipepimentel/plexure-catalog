import React from 'react';
import { Filter, X, Gauge, Lock, Tag } from 'lucide-react';
import { APIStatus, APIVisibility, APICategory } from '../../types/api';

interface APIFiltersProps {
  onFilterChange: (filters: APIFilters) => void;
  activeFilters: APIFilters;
  onClearFilters: () => void;
}

interface APIFilters {
  status?: APIStatus[];
  visibility?: APIVisibility[];
  category?: APICategory[];
  complexity?: 'low' | 'medium' | 'high';
  authentication?: string[];
}

export function APIFilters({ onFilterChange, activeFilters, onClearFilters }: APIFiltersProps) {
  const statuses: APIStatus[] = ['stable', 'beta', 'deprecated'];
  const visibilities: APIVisibility[] = ['public', 'private', 'partner'];
  const categories: APICategory[] = ['Financial', 'Banking', 'Analytics', 'Security'];
  const complexities = ['low', 'medium', 'high'];
  const authMethods = ['OAuth 2.0', 'API Key', 'JWT', 'Basic Auth'];

  const handleComplexityChange = (complexity: string) => {
    onFilterChange({
      ...activeFilters,
      complexity: complexity as 'low' | 'medium' | 'high'
    });
  };

  const handleAuthMethodChange = (method: string) => {
    const newMethods = activeFilters.authentication?.includes(method)
      ? activeFilters.authentication.filter(m => m !== method)
      : [...(activeFilters.authentication || []), method];
    
    onFilterChange({
      ...activeFilters,
      authentication: newMethods.length ? newMethods : undefined
    });
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        {Object.keys(activeFilters).length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-[#E0E0E0] hover:text-white flex items-center space-x-1"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="h-4 w-4 text-[#4FC3F7]" />
            <h4 className="text-[#E0E0E0] text-sm font-medium">Category</h4>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={activeFilters.category?.includes(category) || false}
                  onChange={() => {
                    const newCategories = activeFilters.category?.includes(category)
                      ? activeFilters.category.filter(c => c !== category)
                      : [...(activeFilters.category || []), category];
                    
                    onFilterChange({
                      ...activeFilters,
                      category: newCategories.length ? newCategories : undefined
                    });
                  }}
                  className="rounded border-[#424242] bg-[#2A2A2A] text-[#FF5722] focus:ring-[#FF5722]"
                />
                <span className="text-[#E0E0E0] text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Gauge className="h-4 w-4 text-[#4FC3F7]" />
            <h4 className="text-[#E0E0E0] text-sm font-medium">Complexity</h4>
          </div>
          <div className="flex space-x-2">
            {complexities.map((complexity) => (
              <button
                key={complexity}
                onClick={() => handleComplexityChange(complexity)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  activeFilters.complexity === complexity
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-[#2A2A2A] text-[#E0E0E0] hover:bg-[#333333]'
                }`}
              >
                {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="h-4 w-4 text-[#4FC3F7]" />
            <h4 className="text-[#E0E0E0] text-sm font-medium">Authentication</h4>
          </div>
          <div className="space-y-2">
            {authMethods.map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={activeFilters.authentication?.includes(method) || false}
                  onChange={() => handleAuthMethodChange(method)}
                  className="rounded border-[#424242] bg-[#2A2A2A] text-[#FF5722] focus:ring-[#FF5722]"
                />
                <span className="text-[#E0E0E0] text-sm">{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}