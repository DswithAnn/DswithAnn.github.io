import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import PostCard from '@/components/PostCard';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'DevBlog'],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await markdownToHtml(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <article className="min-h-screen">
      {/* Back link */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Hero */}
      <header className="container mx-auto px-4 mb-12">
        {post.coverImage && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-surface-border">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="tag"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-text-secondary mb-8">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-tertiary pb-8 border-b border-surface-border">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readingTime} min read
            </span>
            {post.author && (
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-600/20 flex items-center justify-center text-primary-400 font-semibold text-sm">
                  {post.author.charAt(0).toUpperCase()}
                </span>
                {post.author}
              </span>
            )}

            {/* Share */}
            <button className="ml-auto flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-text-primary
              prose-h1:text-4xl prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-surface-border prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-text-secondary prose-p:leading-relaxed prose-p:my-4
              prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300 hover:prose-a:underline
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-text-secondary prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-surface/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-blockquote:text-text-secondary prose-blockquote:italic
              prose-pre:bg-surface prose-pre:border prose-pre:border-surface-border prose-pre:rounded-xl prose-pre:overflow-x-auto
              prose-code:text-primary-300 prose-code:bg-surface/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-img:border prose-img:border-surface-border prose-img:shadow-lg
              prose-hr:border-surface-border prose-hr:my-12
              prose-table:border-collapse prose-table:w-full prose-table:my-6
              prose-th:bg-surface prose-th:border prose-th:border-surface-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-surface-border prose-td:px-4 prose-td:py-3
            "
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-background-secondary border-t border-surface-border py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
