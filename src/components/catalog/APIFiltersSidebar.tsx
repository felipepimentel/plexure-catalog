import React from 'react';
import { Filter, Tag, Activity, Lock } from 'lucide-react';
import { Card } from '../ui/Card';
import { APIStatus, APIVisibility, APICategory } from '../../types/api';

interface APIFiltersSidebarProps {
  onFilterChange: (filters: APIFilters) => void;
  activeFilters: APIFilters;
  onClearFilters: () => void;
}

interface APIFilters {
  status?: APIStatus[];
  visibility?: APIVisibility[];
  category?: APICategory[];
}

export function APIFiltersSidebar({ onFilterChange, activeFilters, onClearFilters }: APIFiltersSidebarProps) {
  const statuses: APIStatus[] = ['stable', 'beta', 'deprecated'];
  const visibilities: APIVisibility[] = ['public', 'private', 'partner'];
  const categories: APICategory[] = ['Financial', 'Banking', 'Analytics', 'Security'];

  return (
    <Card className="bg-[#1E1E1E] p-4 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        {Object.keys(activeFilters).length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-[#E0E0E0] hover:text-white"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        <FilterSection
          icon={<Tag className="h-4 w-4" />}
          title="Category"
          options={categories}
          selected={activeFilters.category || []}
          onChange={(selected) => onFilterChange({ ...activeFilters, category: selected })}
        />

        <FilterSection
          icon={<Activity className="h-4 w-4" />}
          title="Status"
          options={statuses}
          selected={activeFilters.status || []}
          onChange={(selected) => onFilterChange({ ...activeFilters, status: selected })}
        />

        <FilterSection
          icon={<Lock className="h-4 w-4" />}
          title="Visibility"
          options={visibilities}
          selected={activeFilters.visibility || []}
          onChange={(selected) => onFilterChange({ ...activeFilters, visibility: selected })}
        />
      </div>
    </Card>
  );
}

interface FilterSectionProps {
  icon: React.ReactNode;
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function FilterSection({ icon, title, options, selected, onChange }: FilterSectionProps) {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-[#4FC3F7]">{icon}</span>
        <h4 className="text-[#E0E0E0] text-sm font-medium">{title}</h4>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => {
                const newSelected = selected.includes(option)
                  ? selected.filter(s => s !== option)
                  : [...selected, option];
                onChange(newSelected.length ? newSelected : []);
              }}
              className="rounded border-[#424242] bg-[#2A2A2A] text-[#FF5722] focus:ring-[#FF5722]"
            />
            <span className="text-[#E0E0E0] text-sm capitalize">{option.toLowerCase()}</span>
          </label>
        ))}
      </div>
    </div>
  );
}