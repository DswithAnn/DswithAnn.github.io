'use client';

import { useSearchParams } from 'next/navigation';
import { PostMeta } from '@/types/blog';
import PostList from './PostList';
import SearchBar from './SearchBar';
import { Suspense, useMemo } from 'react';

interface SearchContentProps {
    allPosts: PostMeta[];
}

function SearchContentInner({ allPosts }: SearchContentProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const results = useMemo(() => {
        if (!query) return [];

        const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

        return allPosts
            .map((post) => {
                const titleLower = post.title.toLowerCase();
                const excerptLower = post.excerpt.toLowerCase();
                const tagsLower = post.tags.join(' ').toLowerCase();

                let score = 0;
                searchTerms.forEach((term) => {
                    if (titleLower.includes(term)) score += 3;
                    if (excerptLower.includes(term)) score += 2;
                    if (tagsLower.includes(term)) score += 1;
                });

                return { ...post, score };
            })
            .filter((post) => post.score > 0)
            .sort((a, b) => b.score - a.score);
    }, [allPosts, query]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
                    Search
                </h1>
                <p className="text-text-secondary text-lg mb-8">
                    Find articles, tutorials, and insights across our blog.
                </p>

                <SearchBar variant="inline" placeholder="Search articles..." />
            </div>

            <div className="py-8">
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
        </div>
    );
}

export default function SearchContent(props: SearchContentProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchContentInner {...props} />
        </Suspense>
    );
}
