'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { PostMeta } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: PostMeta;
  variant?: 'default' | 'featured' | 'compact';
}

// Get basePath from environment or default (empty for root deployment)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Helper function to prepend basePath to image paths
function getImagePath(imagePath: string | undefined): string | undefined {
  if (!imagePath) return undefined;
  // If basePath is empty or imagePath already starts with basePath, return as-is
  if (!basePath || imagePath.startsWith(basePath)) return imagePath;
  // Otherwise prepend basePath
  return `${basePath}${imagePath}`;
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const { slug, title, date, tags, excerpt, coverImage, readingTime } = post;
  const imagePath = getImagePath(coverImage);

  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-surface border border-surface-border card-hover">
        {imagePath ? (
          <div className="absolute inset-0">
            <img
              src={imagePath}
              alt={title}
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = 'https://placehold.co/1200x630/18181b/2dd4bf?text=' + encodeURIComponent(title.substring(0, 30));
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-secondary-900/30" />
        )}
        
        <div className="relative p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="tag text-xs px-2 py-1"
              >
                {tag}
              </Link>
            ))}
          </div>

          <Link href={`/blog/${slug}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4 group-hover:text-primary-400 transition-colors line-clamp-2">
              {title}
            </h2>
          </Link>

          <p className="text-text-secondary mb-6 line-clamp-2 max-w-2xl">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </span>
            </div>

            <Link
              href={`/blog/${slug}`}
              className="inline-flex items-center gap-2 text-primary-400 font-medium group/btn hover:text-primary-300 transition-colors"
            >
              Read more
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group p-4 rounded-xl bg-surface border border-surface-border card-hover">
        <Link href={`/blog/${slug}`}>
          <h3 className="font-heading font-semibold text-text-primary mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-3 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readingTime} min
          </span>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group flex flex-col h-full rounded-xl bg-surface border border-surface-border overflow-hidden card-hover">
      {imagePath ? (
        <Link href={`/blog/${slug}`} className="relative block overflow-hidden aspect-video">
          <img
            src={imagePath}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = 'https://placehold.co/1200x630/18181b/2dd4bf?text=' + encodeURIComponent(title.substring(0, 30));
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      ) : (
        // Fallback when no coverImage is provided
        <Link href={`/blog/${slug}`} className="relative block overflow-hidden aspect-video bg-gradient-to-br from-primary-900/20 to-secondary-900/20">
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <h3 className="font-heading font-bold text-text-primary/20 text-center line-clamp-3">
              {title}
            </h3>
          </div>
        </Link>
      )}

      <div className="flex flex-col flex-grow p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="tag text-xs"
            >
              {tag}
            </Link>
          ))}
        </div>

        <Link href={`/blog/${slug}`}>
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
          {excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-surface-border mt-auto">
          <div className="flex items-center gap-3 text-xs text-text-tertiary">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min
            </span>
          </div>

          <Link
            href={`/blog/${slug}`}
            className="text-primary-400 hover:text-primary-300 transition-colors"
            aria-label={`Read more about ${title}`}
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
