import React, { useState } from 'react';
import { SemanticSearchInput } from '../search/SemanticSearchInput';
import { APIFilterSystem } from '../filters/APIFilterSystem';
import { APIFeaturedSection } from './APIFeaturedSection';
import { APIGrid } from './APIGrid';
import { APIListView } from './APIListView';
import { APIViewSelector, ViewMode } from './APIViewSelector';
import { APIEmptyState } from './APIEmptyState';
import { API } from '../../types/api';
import { getAPIsByCategory } from '../../data/sampleAPIs';
import type { APIFilters } from '../filters/APIFilterSystem';

interface APICatalogProps {
  apis: API[];
  onSelectAPI: (api: API) => void;
}

export function APICatalog({ apis, onSelectAPI }: APICatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<APIFilters>({
    categories: [],
    status: [],
    auth: [],
    regions: [],
    complexity: null
  });

  const filteredAPIs = apis.filter(api => {
    const matchesSearch = !searchQuery || 
      api.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !filters.categories.length || 
      filters.categories.includes(api.category);

    const matchesStatus = !filters.status.length || 
      filters.status.includes(api.status);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const apisByCategory = getAPIsByCategory(filteredAPIs);
  const hasResults = Object.keys(apisByCategory).length > 0;
  const showFeatured = !searchQuery && Object.keys(filters).every(key => 
    !filters[key] || (Array.isArray(filters[key]) && !filters[key].length)
  );

  return (
    <div className="flex gap-8">
      <div className="w-80 flex-shrink-0">
        <div className="sticky top-4">
          <APIFilterSystem onFiltersChange={setFilters} />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 mr-8">
            <SemanticSearchInput
              onSearch={setSearchQuery}
              placeholder="Search APIs by name, description, or use case..."
              autoFocus
            />
          </div>
          <APIViewSelector
            currentView={viewMode}
            onViewChange={setViewMode}
          />
        </div>

        {showFeatured && (
          <APIFeaturedSection 
            apis={apis}
            onSelectAPI={onSelectAPI}
          />
        )}
        
        {hasResults ? (
          <div className="space-y-12">
            {viewMode === 'categories' ? (
              Object.entries(apisByCategory).map(([category, apis]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">{category}</h2>
                    <span className="text-[#9E9E9E] text-sm">{apis.length} APIs</span>
                  </div>
                  {viewMode === 'list' ? (
                    <APIListView apis={apis} onSelect={onSelectAPI} />
                  ) : (
                    <APIGrid apis={apis} onSelect={onSelectAPI} />
                  )}
                </div>
              ))
            ) : (
              viewMode === 'list' ? (
                <APIListView apis={filteredAPIs} onSelect={onSelectAPI} />
              ) : (
                <APIGrid apis={filteredAPIs} onSelect={onSelectAPI} />
              )
            )}
          </div>
        ) : (
          <APIEmptyState 
            onReset={() => {
              setSearchQuery('');
              setFilters({
                categories: [],
                status: [],
                auth: [],
                regions: [],
                complexity: null
              });
            }} 
          />
        )}
      </div>
    </div>
  );
}