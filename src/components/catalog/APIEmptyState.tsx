import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

interface APIEmptyStateProps {
  onReset: () => void;
}

export function APIEmptyState({ onReset }: APIEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2A2A2A] mb-4">
        <Search className="h-8 w-8 text-[#4FC3F7]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        No APIs Found
      </h3>
      <p className="text-[#E0E0E0] mb-6">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#333333] transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
}