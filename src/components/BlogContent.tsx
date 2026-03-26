'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { PostMeta, TagInfo } from '@/types/blog';
import PostList from './PostList';
import TagFilter from './TagFilter';
import SearchBar from './SearchBar';
import { Suspense, useMemo } from 'react';

interface BlogContentProps {
    allPosts: PostMeta[];
    tags: TagInfo[];
}

function BlogContentInner({ allPosts, tags }: BlogContentProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tag = searchParams.get('tag');

    const filteredPosts = useMemo(() => {
        if (!tag) return allPosts;
        return allPosts.filter((post) => post.tags.includes(tag));
    }, [allPosts, tag]);

    const handleTagSelect = (selectedTag: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (selectedTag) {
            params.set('tag', selectedTag);
        } else {
            params.delete('tag');
        }
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Tags */}
            <aside className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24">
                    <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                        Filter by Tag
                    </h2>
                    <TagFilter
                        tags={tags}
                        totalCount={allPosts.length}
                        selectedTag={tag}
                        onTagSelect={handleTagSelect}
                        variant="default"
                    />
                </div>
            </aside>

            {/* Main Content - Posts */}
            <div className="flex-grow">
                {tag && (
                    <div className="mb-6">
                        <span className="text-text-tertiary">Showing posts tagged:</span>
                        <span className="tag tag-active ml-2">#{tag}</span>
                    </div>
                )}

                <PostList
                    posts={filteredPosts}
                    emptyMessage={
                        tag
                            ? `No posts found with tag "${tag}".`
                            : 'No posts available yet.'
                    }
                />
            </div>
        </div>
    );
}

export default function BlogContent(props: BlogContentProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogContentInner {...props} />
        </Suspense>
    );
}
