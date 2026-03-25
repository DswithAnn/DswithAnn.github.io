import { getAllPosts, getAllTags } from '@/lib/posts';
import BlogContent from '@/components/BlogContent';
import SearchBar from '@/components/SearchBar';
import { Suspense } from 'react';

export default async function BlogPage() {
  const allPosts = getAllPosts();
  const tags = getAllTags();

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
          <BlogContent allPosts={allPosts} tags={tags} />
        </div>
      </section>
    </div>
  );
}
