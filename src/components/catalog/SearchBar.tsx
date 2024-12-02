import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E0E0E0]" />
        <input
          type="text"
          placeholder="Search APIs by name, description, or tags..."
          className="w-full pl-10 pr-4 py-2 border border-[#424242] rounded-lg bg-[#1E1E1E] text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-[#424242] rounded-lg bg-[#1E1E1E] text-white hover:bg-[#2A2A2A] transition-colors">
        <SlidersHorizontal className="h-5 w-5" />
        <span className="text-sm">Filters</span>
      </button>
    </div>
  );
}