import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/styles/globals.css';

// Font configuration based on frontend-design-system guidelines
// Space Grotesk for headings - tech & minimal aesthetic
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

// Inter for body text - clean and readable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Configurable site metadata via environment variables
// Set these in .env.local or GitHub Actions environment
const siteConfig = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Modern Blog Platform',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'A modern blog platform built with Next.js, TypeScript, and Tailwind CSS',
  author: process.env.NEXT_PUBLIC_SITE_AUTHOR || 'Blog Author',
  url: process.env.NEXT_PUBLIC_SITE_URL || '',
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '',
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: ['automation', 'software development', 'technology', 'programming', 'tutorials', 'DevOps', 'AI', 'machine learning', 'consulting'],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter ? `@${siteConfig.twitter.replace('@', '')}` : undefined,
    creator: siteConfig.twitter ? `@${siteConfig.twitter.replace('@', '')}` : undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body bg-background text-text-primary antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
