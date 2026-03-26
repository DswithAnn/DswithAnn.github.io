'use client';

import { useState, useMemo } from 'react';
import { TagInfo } from '@/types/blog';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: TagInfo[];
  totalCount?: number;
  selectedTag?: string | null;
  onTagSelect?: (tag: string | null) => void;
  variant?: 'default' | 'cloud';
}

export default function TagFilter({
  tags,
  totalCount,
  selectedTag,
  onTagSelect,
  variant = 'default'
}: TagFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = useMemo(() => {
    if (!searchQuery) return tags;
    return tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tags, searchQuery]);

  const handleTagClick = (tagName: string | null) => {
    onTagSelect?.(tagName);
  };

  if (variant === 'cloud') {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleTagClick(null)}
          className={cn(
            'tag transition-all duration-200',
            selectedTag === null && 'tag-active'
          )}
        >
          All
        </button>
        {filteredTags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => handleTagClick(tag.name)}
            className={cn(
              'tag transition-all duration-200',
              selectedTag === tag.name && 'tag-active'
            )}
          >
            {tag.name}
            <span className="ml-1 text-xs opacity-60">({tag.count})</span>
          </button>
        ))}
      </div>
    );
  }

  // Default list variant
  return (
    <div className="space-y-4">
      {/* Search */}
      {tags.length > 5 && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field text-sm pl-4 pr-10 py-2"
          />
        </div>
      )}

      {/* Tag list */}
      <div className="space-y-2">
        <button
          onClick={() => handleTagClick(null)}
          className={cn(
            'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
            selectedTag === null
              ? 'bg-primary-600/10 text-primary-400 border border-primary-500/30'
              : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-surface-border'
          )}
        >
          <span>All Posts</span>
          <span className="text-xs opacity-60">
            {totalCount ?? tags.reduce((acc, tag) => acc + tag.count, 0)}
          </span>
        </button>

        {filteredTags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => handleTagClick(tag.name)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
              selectedTag === tag.name
                ? 'bg-primary-600/10 text-primary-400 border border-primary-500/30'
                : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-surface-border'
            )}
          >
            <span>#{tag.name}</span>
            <span className="text-xs opacity-60">{tag.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
