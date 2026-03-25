import { getAllPosts } from '@/lib/posts';
import SearchContent from '@/components/SearchContent';

export default async function SearchPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen">
      <SearchContent allPosts={allPosts} />
    </div>
  );
}
