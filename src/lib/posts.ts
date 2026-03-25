import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta, TagInfo, SearchResult } from '@/types/blog';
import { calculateReadingTime, generateExcerpt } from '@/lib/utils';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all posts from the content directory
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  const posts: PostMeta[] = markdownFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      updated: data.updated,
      tags: data.tags || [],
      excerpt: data.excerpt || generateExcerpt(content),
      coverImage: data.coverImage,
      author: data.author,
      featured: data.featured || false,
      readingTime: calculateReadingTime(content),
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      updated: data.updated,
      tags: data.tags || [],
      excerpt: data.excerpt || generateExcerpt(content),
      coverImage: data.coverImage,
      author: data.author,
      draft: data.draft || false,
      featured: data.featured || false,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit: number = 3): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.featured)
    .slice(0, limit);
}

/**
 * Get recent posts
 */
export function getRecentPosts(limit: number = 10): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique tags with counts
 */
export function getAllTags(): TagInfo[] {
  const allPosts = getAllPosts();
  const tagCounts = new Map<string, number>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * Search posts
 */
export function searchPosts(query: string): SearchResult[] {
  const allPosts = getAllPosts();
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

  const results: SearchResult[] = allPosts
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

      return {
        ...post,
        score,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Get related posts
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): PostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts();

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      return { ...post, sharedTags: sharedTags.length };
    })
    .filter((post) => post.sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit);

  const recentPosts = allPosts
    .filter((post) => post.slug !== currentSlug && !relatedPosts.find((r) => r.slug === post.slug))
    .map((post) => ({ ...post, sharedTags: 0 }))
    .slice(0, Math.max(0, limit - relatedPosts.length));
  relatedPosts.push(...recentPosts);

  return relatedPosts;
}
