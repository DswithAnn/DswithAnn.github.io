import { getAllTags, getPostsByTag } from '@/lib/posts';
import Link from 'next/link';
import { Tag as TagIcon } from 'lucide-react';

export default async function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-background-secondary border-b border-surface-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
              Browse by Tags
            </h1>
            <p className="text-text-secondary text-lg">
              Explore posts organized by topic. Find content that matches your interests.
            </p>
          </div>
        </div>
      </section>

      {/* Tags Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {tags.length === 0 ? (
            <div className="text-center py-16">
              <TagIcon className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary text-lg">No tags available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/blog?tag=${tag.name}`}
                  className="group p-6 rounded-xl bg-surface border border-surface-border hover:border-primary-500/30 hover:bg-surface-hover transition-all duration-200 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-heading font-bold text-primary-400 group-hover:text-primary-300 transition-colors">
                      #{tag.name}
                    </span>
                    <span className="text-sm text-text-tertiary">
                      {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
