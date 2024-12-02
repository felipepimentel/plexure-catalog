import React from 'react';
import { Grid, List, Layers } from 'lucide-react';

export type ViewMode = 'grid' | 'list' | 'categories';

interface APIViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function APIViewSelector({ currentView, onViewChange }: APIViewSelectorProps) {
  return (
    <div className="flex items-center space-x-2 bg-[#1E1E1E] rounded-lg p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
          currentView === 'grid'
            ? 'bg-[#2A2A2A] text-[#4FC3F7]'
            : 'text-[#E0E0E0] hover:bg-[#2A2A2A] hover:text-[#4FC3F7]'
        }`}
      >
        <Grid className="h-4 w-4" />
        <span className="text-sm font-medium">Grid</span>
      </button>

      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
          currentView === 'list'
            ? 'bg-[#2A2A2A] text-[#4FC3F7]'
            : 'text-[#E0E0E0] hover:bg-[#2A2A2A] hover:text-[#4FC3F7]'
        }`}
      >
        <List className="h-4 w-4" />
        <span className="text-sm font-medium">List</span>
      </button>

      <button
        onClick={() => onViewChange('categories')}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
          currentView === 'categories'
            ? 'bg-[#2A2A2A] text-[#4FC3F7]'
            : 'text-[#E0E0E0] hover:bg-[#2A2A2A] hover:text-[#4FC3F7]'
        }`}
      >
        <Layers className="h-4 w-4" />
        <span className="text-sm font-medium">Categories</span>
      </button>
    </div>
  );
}