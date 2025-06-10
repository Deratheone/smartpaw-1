import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult {
  id: string;
  title: string;
  type: 'service' | 'provider' | 'product';
  description: string;
  location?: string;
  rating?: number;
  price?: string;
  image?: string;
  tags: string[];
}

interface AdvancedSearchProps {
  onResults?: (results: SearchResult[]) => void;
  placeholder?: string;
  className?: string;
}

// Mock search data - replace with actual API call
const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Premium Pet Boarding',
    type: 'service',
    description: 'Luxury boarding facility with 24/7 monitoring',
    location: 'Downtown SF',
    rating: 4.8,
    price: '$45/night',
    tags: ['boarding', 'luxury', 'monitoring']
  },
  {
    id: '2',
    title: 'Happy Paws Grooming',
    type: 'provider',
    description: 'Professional grooming for all dog breeds',
    location: 'Mission District',
    rating: 4.9,
    price: '$$',
    tags: ['grooming', 'professional', 'all-breeds']
  },
  {
    id: '3',
    title: 'Smart Pet Collar',
    type: 'product',
    description: 'GPS tracking and health monitoring collar',
    price: '$129.99',
    rating: 4.6,
    tags: ['technology', 'gps', 'health-monitoring']
  }
];

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onResults,
  placeholder = "Search for services, providers, or products...",
  className
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    maxPrice: '',
    minRating: 0
  });

  const debouncedQuery = useDebounce(query, 300);

  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    return mockResults.filter(result => {
      const matchesQuery = 
        result.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(debouncedQuery.toLowerCase()));

      const matchesType = filters.type === 'all' || result.type === filters.type;
      const matchesLocation = !filters.location || 
        result.location?.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRating = !filters.minRating || 
        (result.rating && result.rating >= filters.minRating);

      return matchesQuery && matchesType && matchesLocation && matchesRating;
    });
  }, [debouncedQuery, filters]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setIsSearching(true);
      // Simulate API delay
      setTimeout(() => {
        setResults(filteredResults);
        setShowResults(true);
        setIsSearching(false);
        onResults?.(filteredResults);
      }, 300);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery, filteredResults, onResults]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Handle search submission - navigate to results page or trigger callback
      console.log('Search submitted:', query, filters);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-base"
            onFocus={() => query && setShowResults(true)}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-smartpaw-purple"></div>
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            variant={filters.type === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters(prev => ({...prev, type: 'all'}))}
          >
            All
          </Button>
          <Button
            type="button"
            variant={filters.type === 'service' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters(prev => ({...prev, type: 'service'}))}
          >
            Services
          </Button>
          <Button
            type="button"
            variant={filters.type === 'provider' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters(prev => ({...prev, type: 'provider'}))}
          >
            Providers
          </Button>
          <Button
            type="button"
            variant={filters.type === 'product' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters(prev => ({...prev, type: 'product'}))}
          >
            Products
          </Button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto z-50 shadow-lg">
          <CardContent className="p-0">
            {results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      // Handle result click - navigate to detail page
                      console.log('Result clicked:', result);
                      setShowResults(false);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{result.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {result.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        {result.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {result.location}
                          </span>
                        )}
                        {result.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-400" />
                            {result.rating}
                          </span>
                        )}
                      </div>
                      {result.price && (
                        <span className="font-medium">{result.price}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{debouncedQuery}"</p>
                <p className="text-xs mt-1">Try adjusting your search terms</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};
