import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * Convert markdown to HTML with syntax highlighting
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: false,
      onVisitLine(node: any) {
        // Prevent lines from collapsing in empty code lines
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }];
        }
      },
      onVisitHighlightedLine(node: any) {
        node.properties.className = ['line highlight'];
      },
      onVisitHighlightedWord(node: any) {
        node.properties.className = ['word highlight'];
      },
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(markdown);

  return String(result);
}

/**
 * Convert markdown to HTML (simple version without syntax highlighting)
 */
export async function markdownToHtmlSimple(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);

  return String(result);
}
