import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchInput({ onSearch, placeholder = "Search...", autoFocus = false }: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4FC3F7]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-12 py-3 bg-[#1E1E1E] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:border-[#4FC3F7] focus:ring-1 focus:ring-[#4FC3F7] transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#2A2A2A] rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-[#E0E0E0]" />
          </button>
        )}
      </div>
    </form>
  );
}