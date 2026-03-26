import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { SearchResult } from '@/types/blog';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json({ results: [] });
    }

    const allPosts = getAllPosts();
    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

    const results = allPosts
      .map((post) => {
        const titleLower = post.title.toLowerCase();
        const excerptLower = post.excerpt.toLowerCase();
        const tagsLower = post.tags.join(' ').toLowerCase();

        let score = 0;
        searchTerms.forEach((term) => {
          if (titleLower.includes(term)) score += 10;
          if (excerptLower.includes(term)) score += 5;
          if (tagsLower.includes(term)) score += 3;
        });

        return { 
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          tags: post.tags,
          date: post.date,
          score 
        };
      })
      .filter((post) => post.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Limit to top 10 results

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    );
  }
}
