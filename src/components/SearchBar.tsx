'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { SearchResult } from '@/types/blog';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (results: SearchResult[]) => void;
  variant?: 'inline' | 'modal' | 'dropdown';
  placeholder?: string;
}

export default function SearchBar({ onSearch, variant = 'inline', placeholder = 'Search posts...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Debounced search
  const searchPosts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      onSearch?.([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
      onSearch?.(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [onSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchPosts(query);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchPosts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && results.length > 0) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (slug: string) => {
    router.push(`/blog/${slug}`);
    setIsOpen(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  if (variant === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl animate-slide-down">
              <div className="relative bg-surface border border-surface-border rounded-xl shadow-2xl overflow-hidden">
                <form onSubmit={handleSubmit} className="flex items-center gap-4 p-4 border-b border-surface-border">
                  <Search className="w-5 h-5 text-text-tertiary flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow bg-transparent text-text-primary placeholder-text-tertiary outline-none"
                    autoFocus
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="p-1 text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </form>

                {results.length > 0 && (
                  <div className="max-h-96 overflow-y-auto p-2">
                    {results.map((result) => (
                      <button
                        key={result.slug}
                        onClick={() => handleResultClick(result.slug)}
                        className="w-full text-left p-4 rounded-lg hover:bg-surface-hover transition-colors"
                      >
                        <h4 className="font-medium text-text-primary mb-1">{result.title}</h4>
                        <p className="text-sm text-text-secondary line-clamp-2">{result.excerpt}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-primary-400">#{tag}</span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {query && results.length === 0 && !isLoading && (
                  <div className="p-8 text-center text-text-secondary">
                    No results found for &quot;{query}&quot;
                  </div>
                )}

                {isLoading && (
                  <div className="p-8 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-text-tertiary hover:text-text-primary transition-colors"
              >
                Press ESC to close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setIsOpen(true)}
            placeholder={placeholder}
            className="input-field pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-surface-border rounded-xl shadow-xl overflow-hidden animate-slide-down z-50">
            <div className="max-h-80 overflow-y-auto">
              {results.slice(0, 5).map((result) => (
                <button
                  key={result.slug}
                  onClick={() => handleResultClick(result.slug)}
                  className="w-full text-left p-4 hover:bg-surface-hover transition-colors border-b border-surface-border last:border-0"
                >
                  <h4 className="font-medium text-text-primary mb-1">{result.title}</h4>
                  <p className="text-sm text-text-secondary line-clamp-1">{result.excerpt}</p>
                </button>
              ))}
            </div>
            {results.length > 5 && (
              <button
                onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                className="w-full flex items-center justify-center gap-2 p-3 text-sm text-primary-400 hover:bg-surface-hover transition-colors border-t border-surface-border"
              >
                View all results
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Inline variant (default)
  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-12 pr-12"
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </form>
  );
}
