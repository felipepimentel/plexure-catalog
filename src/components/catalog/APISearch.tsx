import React, { useState, useEffect } from 'react';
import { Search, X, History, Sparkles } from 'lucide-react';

interface APISearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function APISearch({ onSearch, placeholder = "Search APIs..." }: APISearchProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentAPISearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);

    if (value.trim()) {
      const updatedSearches = [value, ...recentSearches.filter(s => s !== value)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentAPISearches', JSON.stringify(updatedSearches));
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E0E0E0]" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-[#1E1E1E] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-5 w-5 text-[#E0E0E0] hover:text-white" />
          </button>
        )}
      </div>

      {showDropdown && (recentSearches.length > 0 || suggestions.length > 0) && (
        <div className="absolute w-full mt-2 bg-[#1E1E1E] border border-[#424242] rounded-lg shadow-lg z-10">
          {recentSearches.length > 0 && (
            <div className="p-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-[#E0E0E0] text-sm">
                <History className="h-4 w-4" />
                <span>Recent Searches</span>
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
          )}

          {suggestions.length > 0 && (
            <div className="p-2 border-t border-[#424242]">
              <div className="flex items-center space-x-2 px-3 py-2 text-[#E0E0E0] text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Suggestions</span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2 text-[#E0E0E0] hover:bg-[#2A2A2A] rounded"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}