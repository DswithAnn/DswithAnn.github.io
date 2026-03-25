/**
 * Blog Post Frontmatter type
 */
export interface PostFrontmatter {
  title: string;
  date: string;
  updated?: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  author?: string;
  draft?: boolean;
  featured?: boolean;
}

/**
 * Complete Post type with slug and content
 */
export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}

/**
 * Post metadata for listing (without full content)
 */
export interface PostMeta extends Omit<PostFrontmatter, 'draft'> {
  slug: string;
  readingTime: number;
}

/**
 * Tag with count
 */
export interface TagInfo {
  name: string;
  count: number;
}

/**
 * Search result type
 */
export interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  score: number;
}
