import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
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

export const metadata: Metadata = {
  title: {
    default: 'DevBlog',
    template: '%s | DevBlog',
  },
  description: 'A modern blog platform for developers and tech enthusiasts',
  keywords: ['blog', 'technology', 'development', 'programming', 'tutorial'],
  authors: [{ name: 'DevBlog Team' }],
  creator: 'DevBlog',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DevBlog',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@devblog',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`} suppressHydrationWarning>
      <body className="font-body bg-background text-text-primary antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
