import React from 'react';
import { Search, History, Sparkles } from 'lucide-react';
import { useRecentSearches } from '../../hooks/useRecentSearches';

interface APISearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function APISearchBar({ onSearch, placeholder = "Search APIs..." }: APISearchBarProps) {
  const { 
    recentSearches, 
    addRecentSearch, 
    clearRecentSearches 
  } = useRecentSearches();
  
  const [query, setQuery] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
    if (value.trim()) {
      addRecentSearch(value);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E0E0E0]" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-[#1E1E1E] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
        />
      </div>

      {showDropdown && recentSearches.length > 0 && (
        <div className="absolute w-full mt-2 bg-[#1E1E1E] border border-[#424242] rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="flex items-center justify-between px-3 py-2 text-[#E0E0E0] text-sm">
              <div className="flex items-center space-x-2">
                <History className="h-4 w-4" />
                <span>Recent Searches</span>
              </div>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-[#9E9E9E] hover:text-white"
              >
                Clear all
              </button>
            </div>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSearch(search)}
                className="w-full text-left px-3 py-2 text-[#E0E0E0] hover:bg-[#2A2A2A] rounded"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}