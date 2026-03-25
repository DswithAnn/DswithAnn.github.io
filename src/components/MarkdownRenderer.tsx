import { markdownToHtml } from '@/lib/markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default async function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const html = await markdownToHtml(content);

  return (
    <div
      className={`prose prose-invert prose-lg max-w-none ${className}
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
        prose-blockquote:border-l-primary-500 prose-blockquote:bg-surface/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        prose-blockquote:text-text-secondary prose-blockquote:italic
        prose-pre:bg-surface prose-pre:border prose-pre:border-surface-border prose-pre:rounded-xl
        prose-code:text-primary-300 prose-code:bg-surface/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-img:border prose-img:border-surface-border prose-img:shadow-lg
        prose-hr:border-surface-border prose-hr:my-12
        prose-table:border-collapse prose-table:w-full prose-table:my-6
        prose-th:bg-surface prose-th:border prose-th:border-surface-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
        prose-td:border prose-td:border-surface-border prose-td:px-4 prose-td:py-3
        prose-figure:my-8
        prose-figcaption:text-text-tertiary prose-figcaption:text-sm prose-figcaption:mt-2
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
