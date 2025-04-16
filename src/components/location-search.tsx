'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LocationResult } from '@/lib/weather';

export default function LocationSearch({ 
  onLocationSelect, 
  defaultLocation = 'Chennai, India',
  className = '' 
}: { 
  onLocationSelect: (location: string) => void;
  defaultLocation?: string;
  className?: string;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Initialize query with default location
  useEffect(() => {
    setQuery(defaultLocation || '');
  }, [defaultLocation]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!query.trim()) return;

    setLoading(true);
    
    // Use promises instead of async/await
    const cacheBuster = Date.now();
    fetch(`/api/location-search?query=${encodeURIComponent(query)}&t=${cacheBuster}`)
      .then(response => {
        if (!response.ok) throw new Error('Search failed');
        return response.json();
      })
      .then(data => {
        setResults(data.results || []);
        setIsOpen(data.results && data.results.length > 0);
        
        // If no results, show message
        if (!data.results || data.results.length === 0) {
          console.log('No results found for query:', query);
        }
      })
      .catch(error => {
        console.error('Error searching locations:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle selection
  const handleSelect = (result: LocationResult) => {
    const locationName = `${result.name}, ${result.country}`;
    onLocationSelect(locationName);
    setQuery(locationName);
    setIsOpen(false);
  };

  // Handle direct submission
  const handleDirectSubmit = () => {
    if (query.trim()) {
      onLocationSelect(query.trim());
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (e.shiftKey) {
                  // Direct submission with Shift+Enter
                  handleDirectSubmit();
                } else {
                  // Normal search with Enter
                  handleSearch();
                }
              }
            }}
          />
          {loading ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin">
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : null}
        </div>
        <Button onClick={handleSearch} size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-10">
          <ul className="max-h-60 overflow-auto py-1 text-sm">
            {results.map((result, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelect(result)}
              >
                <div className="font-medium">{result.name}</div>
                <div className="text-xs text-gray-500">
                  {result.region}, {result.country}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="text-xs text-gray-400 mt-1">
        Search for a city or use Shift+Enter to search directly with your text.
      </div>
    </div>
  );
} 