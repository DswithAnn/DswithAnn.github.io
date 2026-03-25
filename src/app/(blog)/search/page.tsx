import { Suspense } from 'react';
import { searchPosts } from '@/lib/posts';
import PostList from '@/components/PostList';
import SearchBar from '@/components/SearchBar';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const results = query ? searchPosts(query) : [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-background-secondary border-b border-surface-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
              Search
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Find articles, tutorials, and insights across our blog.
            </p>
            
            <Suspense fallback={<div className="h-12 bg-surface rounded-lg animate-pulse" />}>
              <SearchBar variant="inline" placeholder="Search articles..." />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {query && (
            <div className="mb-8">
              <p className="text-text-tertiary">
                {results.length > 0 
                  ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results found for "${query}"`
                }
              </p>
            </div>
          )}

          {!query ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">
                Enter a search term to find relevant articles.
              </p>
            </div>
          ) : (
            <PostList 
              posts={results} 
              emptyMessage="No posts match your search. Try different keywords."
            />
          )}
        </div>
      </section>
    </div>
  );
}
