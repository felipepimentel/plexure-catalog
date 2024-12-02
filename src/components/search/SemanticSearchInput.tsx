import React, { useState, useRef, useEffect } from 'react';
import { Search, X, History, Sparkles, ArrowRight } from 'lucide-react';
import { useSearchSuggestions } from '../../hooks/useSearchSuggestions';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { SearchSuggestion } from '../../types/search';

interface SemanticSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SemanticSearchInput({ 
  onSearch, 
  placeholder = "Search APIs by name, description, or use case...",
  autoFocus = false 
}: SemanticSearchInputProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { suggestions, loading } = useSearchSuggestions(query);
  const { recentSearches, addToHistory, clearHistory } = useSearchHistory();
  const { selectedIndex, setSelectedIndex, handleKeyDown } = useKeyboardNavigation(
    suggestions.length + recentSearches.length
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    addToHistory(searchQuery);
    setShowSuggestions(false);
  };

  const renderSuggestionIcon = (type: string) => {
    switch (type) {
      case 'api':
        return <ArrowRight className="h-4 w-4 text-[#4FC3F7]" />;
      case 'category':
        return <Search className="h-4 w-4 text-[#4FC3F7]" />;
      case 'useCase':
        return <Sparkles className="h-4 w-4 text-[#4FC3F7]" />;
      case 'recent':
        return <History className="h-4 w-4 text-[#9E9E9E]" />;
      default:
        return null;
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4FC3F7]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            handleKeyDown(e);
            if (e.key === 'Enter' && selectedIndex === -1) {
              handleSearch(query);
            }
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-12 py-3 bg-[#1E1E1E] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:border-[#4FC3F7] focus:ring-1 focus:ring-[#4FC3F7] transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              onSearch('');
              setShowSuggestions(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#2A2A2A] rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-[#E0E0E0]" />
          </button>
        )}
      </div>

      {showSuggestions && (query || recentSearches.length > 0) && (
        <div className="absolute w-full mt-2 bg-[#1E1E1E] border border-[#424242] rounded-lg shadow-lg z-50 overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-[#9E9E9E]">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#4FC3F7] border-t-transparent mx-auto mb-2" />
              Analyzing your search...
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              {recentSearches.length > 0 && (
                <div className="p-2 border-b border-[#424242]">
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center space-x-2 text-[#E0E0E0]">
                      <History className="h-4 w-4" />
                      <span className="text-sm">Recent Searches</span>
                    </div>
                    <button
                      onClick={clearHistory}
                      className="text-xs text-[#9E9E9E] hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => handleSearch(search)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-[#2A2A2A] transition-colors ${
                        selectedIndex === index ? 'bg-[#2A2A2A]' : ''
                      }`}
                    >
                      <History className="h-4 w-4 text-[#9E9E9E]" />
                      <span className="text-[#E0E0E0]">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="p-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`suggestion-${index}`}
                      onClick={() => handleSearch(suggestion.text)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-[#2A2A2A] transition-colors ${
                        selectedIndex === index + recentSearches.length ? 'bg-[#2A2A2A]' : ''
                      }`}
                    >
                      {renderSuggestionIcon(suggestion.type)}
                      <div className="flex-1">
                        <div className="text-[#E0E0E0]">{suggestion.text}</div>
                        {suggestion.description && (
                          <div className="text-xs text-[#9E9E9E] mt-0.5">
                            {suggestion.description}
                          </div>
                        )}
                      </div>
                      {suggestion.category && (
                        <span className="text-xs text-[#9E9E9E] px-2 py-0.5 bg-[#2A2A2A] rounded">
                          {suggestion.category}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {query && !loading && suggestions.length === 0 && (
                <div className="p-4 text-center text-[#9E9E9E]">
                  No suggestions found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}