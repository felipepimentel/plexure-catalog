import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'api_search_history';
const MAX_HISTORY_ITEMS = 5;

export function useSearchHistory() {
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addToHistory = (query: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      return [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  return {
    recentSearches,
    addToHistory,
    clearHistory
  };
}