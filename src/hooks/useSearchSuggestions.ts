import { useState, useEffect } from 'react';
import { SearchSuggestion } from '../types/search';
import { API } from '../types/api';
import { sampleAPIs } from '../data/sampleAPIs';

const DEBOUNCE_DELAY = 300;

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await generateSuggestions(query, sampleAPIs);
        setSuggestions(results);
      } catch (err) {
        setError(err as Error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, loading, error };
}

async function generateSuggestions(query: string, apis: API[]): Promise<SearchSuggestion[]> {
  const normalizedQuery = query.toLowerCase();
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));

  const suggestions: SearchSuggestion[] = [];

  // Direct matches
  apis.forEach(api => {
    if (suggestions.length >= 5) return;

    if (api.title.toLowerCase().includes(normalizedQuery) ||
        api.description.toLowerCase().includes(normalizedQuery)) {
      suggestions.push({
        text: api.title,
        description: api.description,
        category: api.category,
        type: 'api'
      });
    }
  });

  // Category matches
  const categories = Array.from(new Set(apis.map(api => api.category)));
  categories.forEach(category => {
    if (suggestions.length >= 5) return;

    if (category.toLowerCase().includes(normalizedQuery)) {
      suggestions.push({
        text: `Browse ${category} APIs`,
        category,
        type: 'category'
      });
    }
  });

  // Common use cases
  const useCases = [
    { query: 'authentication', text: 'How to implement user authentication?' },
    { query: 'payments', text: 'Process payments securely' },
    { query: 'analytics', text: 'Track user behavior and events' },
    { query: 'notifications', text: 'Send push notifications' }
  ];

  useCases.forEach(useCase => {
    if (suggestions.length >= 5) return;

    if (useCase.text.toLowerCase().includes(normalizedQuery) ||
        useCase.query.includes(normalizedQuery)) {
      suggestions.push({
        text: useCase.text,
        type: 'useCase'
      });
    }
  });

  return suggestions;
}