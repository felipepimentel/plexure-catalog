export interface SearchSuggestion {
  text: string;
  description?: string;
  category?: string;
  type: 'api' | 'category' | 'useCase' | 'recent';
}