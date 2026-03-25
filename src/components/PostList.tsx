import { PostMeta } from '@/types/blog';
import PostCard from './PostCard';

interface PostListProps {
  posts: PostMeta[];
  variant?: 'default' | 'featured' | 'compact';
  emptyMessage?: string;
}

export default function PostList({ posts, variant = 'default', emptyMessage = 'No posts found.' }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary text-lg">{emptyMessage}</p>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="featured" />
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="compact" />
        ))}
      </div>
    );
  }

  // Default grid layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
