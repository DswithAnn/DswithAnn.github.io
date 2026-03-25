import { Suspense } from 'react';
import { getAllPosts, getAllTags } from '@/lib/posts';
import PostList from '@/components/PostList';
import TagFilter from '@/components/TagFilter';
import SearchBar from '@/components/SearchBar';

interface BlogPageProps {
  searchParams: Promise<{
    tag?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = getAllPosts();
  const tags = getAllTags();
  
  let posts = allPosts;
  let activeTag: string | null = null;

  // Filter by tag if provided
  if (params.tag) {
    activeTag = params.tag;
    posts = allPosts.filter((post) => post.tags.includes(params.tag!));
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-background-secondary border-b border-surface-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
              Blog
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Explore our collection of articles, tutorials, and insights on technology and development.
            </p>
            
            {/* Search */}
            <Suspense fallback={<div className="h-12 bg-surface rounded-lg animate-pulse" />}>
              <SearchBar variant="inline" placeholder="Search articles..." />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Tags */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-4">
                  Filter by Tag
                </h2>
                <TagFilter 
                  tags={tags} 
                  selectedTag={activeTag}
                  variant="default"
                />
              </div>
            </aside>

            {/* Main Content - Posts */}
            <div className="flex-grow">
              {activeTag && (
                <div className="mb-6">
                  <span className="text-text-tertiary">Showing posts tagged:</span>
                  <span className="tag tag-active ml-2">#{activeTag}</span>
                </div>
              )}
              
              <PostList 
                posts={posts} 
                emptyMessage={
                  activeTag 
                    ? `No posts found with tag "${activeTag}".`
                    : 'No posts available yet.'
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
