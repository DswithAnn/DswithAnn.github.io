import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getFeaturedPosts, getRecentPosts, getAllTags } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import PostList from '@/components/PostList';
import TagFilter from '@/components/TagFilter';

export default async function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const recentPosts = getRecentPosts(6);
  const tags = getAllTags();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background-secondary border-b border-surface-border">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-500/30 text-primary-400 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Welcome to DevBlog
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 animate-slide-up">
              Insights & Stories from the{' '}
              <span className="gradient-text">World of Technology</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl animate-slide-up text-balance">
              Discover tutorials, best practices, and thought-provoking articles 
              on software development, system design, and emerging technologies.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up">
              <Link href="/blog" className="btn-primary group">
                Explore Posts
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/tags" className="btn-secondary">
                Browse Tags
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
                Featured Posts
              </h2>
              <Link href="/blog?featured=true" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <PostList posts={featuredPosts} variant="featured" />
          </div>
        </section>
      )}

      {/* Tags Section */}
      {tags.length > 0 && (
        <section className="py-16 bg-background-secondary border-y border-surface-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-8">
              Browse by Tags
            </h2>
            <TagFilter tags={tags} variant="cloud" />
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary">
              Recent Posts
            </h2>
            <Link href="/blog" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <PostList posts={recentPosts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 border-t border-surface-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
            Ready to dive deeper?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Explore our complete collection of articles, tutorials, and guides.
          </p>
          <Link href="/blog" className="btn-primary">
            View All Posts
          </Link>
        </div>
      </section>
    </div>
  );
}
