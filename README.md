# Modern Blog Platform

A production-ready blog platform built with Next.js 14, TypeScript, and Tailwind CSS. Features markdown support, tag filtering, search functionality, and automated GitHub Actions deployment.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Next.js 14 App Router**: Latest React Server Components and App Router architecture
- **Markdown Support**: Write posts in markdown with frontmatter metadata
- **Syntax Highlighting**: Beautiful code highlighting with Shiki
- **Tag System**: Organize posts with tags and filter by topic
- **Search**: Full-text search across all posts
- **Dark Mode**: Dark theme by default with toggle support
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards
- **GitHub Actions**: Automated CI/CD pipeline for deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (v20 recommended)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/modern-blog-platform.git
cd modern-blog-platform
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
blog-platform/
├── content/
│   └── posts/           # Markdown blog posts
│       ├── getting-started-nextjs-14.md
│       ├── mastering-typescript.md
│       └── ...
├── src/
│   ├── app/
│   │   ├── (blog)/      # Blog pages group
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx       # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # Individual post
│   │   │   ├── tags/
│   │   │   │   └── page.tsx       # Tags page
│   │   │   ├── search/
│   │   │   │   └── page.tsx       # Search page
│   │   │   └── about/
│   │   │       └── page.tsx       # About page
│   │   ├── api/
│   │   │   ├── search/
│   │   │   │   └── route.ts       # Search API
│   │   │   └── tags/
│   │   │       └── route.ts       # Tags API
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── Header.tsx             # Site header
│   │   ├── Footer.tsx             # Site footer
│   │   ├── PostCard.tsx           # Post card component
│   │   ├── PostList.tsx           # Post list component
│   │   ├── TagFilter.tsx          # Tag filter component
│   │   ├── SearchBar.tsx          # Search bar component
│   │   ├── MarkdownRenderer.tsx   # Markdown renderer
│   │   └── ThemeProvider.tsx      # Theme provider
│   ├── lib/
│   │   ├── utils.ts               # Utility functions
│   │   ├── posts.ts               # Post data layer
│   │   └── markdown.ts            # Markdown processing
│   ├── styles/
│   │   └── globals.css            # Global CSS
│   └── types/
│       └── blog.ts                # TypeScript types
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions workflow
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies
```

## 📝 Writing Blog Posts

Create a new markdown file in `content/posts/`:

```markdown
---
title: 'Your Post Title'
date: '2024-01-15'
tags: ['Tag1', 'Tag2', 'Tag3']
excerpt: 'A brief description of your post (150-160 characters)'
coverImage: 'https://example.com/image.jpg'
author: 'Your Name'
featured: true
---

# Your Post Content

Write your content in markdown format...

## Code Example

```typescript
const greeting = 'Hello, World!';
console.log(greeting);
```

## More Content

Continue writing...
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `date` | string | Yes | Publication date (ISO format) |
| `updated` | string | No | Last updated date |
| `tags` | string[] | Yes | Post tags |
| `excerpt` | string | Yes | Brief description |
| `coverImage` | string | No | Featured image URL |
| `author` | string | No | Author name |
| `featured` | boolean | No | Show on homepage featured section |
| `draft` | boolean | No | Hide from production (default: false) |

## 🎨 Customization

### Design Tokens

Edit `tailwind.config.ts` to customize:

- **Colors**: Primary, secondary, background, surface colors
- **Typography**: Font families, sizes, weights
- **Spacing**: Custom spacing scale
- **Animations**: Keyframes and animation utilities
- **Glassmorphism**: Blur effects and transparency

### Theme Configuration

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        // Customize primary color palette
        500: '#your-color',
      },
    },
    fontFamily: {
      heading: ['Your-Heading-Font', 'sans-serif'],
      body: ['Your-Body-Font', 'sans-serif'],
    },
  },
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy automatically on every push

The included GitHub Actions workflow handles deployment automatically.

### GitHub Pages

1. Update `.github/workflows/ci-cd.yml`:
   - Set `deploy-pages.if` to `true`
   - Set `deploy.if` to `false`

2. Add to `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  basePath: '/your-repo-name',
};
```

3. Enable GitHub Pages in repository settings

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |

## 📦 Dependencies

### Core

- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### Styling

- `tailwindcss` - Utility-first CSS
- `@tailwindcss/typography` - Prose styles
- `clsx` + `tailwind-merge` - Class utilities

### Markdown

- `remark` + `remark-gfm` - Markdown parsing
- `rehype-pretty-code` + `shiki` - Syntax highlighting
- `gray-matter` - Frontmatter parsing

### Icons

- `lucide-react` - Beautiful icons

## 🔒 Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Social links
NEXT_PUBLIC_SITE_URL=https://yourblog.com
NEXT_PUBLIC_TWITTER_HANDLE=@yourhandle
```

## 📄 License

MIT License - feel free to use this template for personal or commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Support

- Create an issue for bugs or feature requests
- Check existing issues before creating new ones

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Shiki](https://github.com/shikijs/shiki) for syntax highlighting
- [Lucide](https://lucide.dev) for beautiful icons

---

Built with ❤️ using Next.js 14 and Tailwind CSS
