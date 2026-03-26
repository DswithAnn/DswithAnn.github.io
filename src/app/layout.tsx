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

export const metadata: Metadata = {
  title: {
    default: 'Ann Naser Nabil',
    template: '%s | Ann Naser Nabil',
  },
  description: 'Automation expert and technology thought leader. Discover insights on automation, software development, and emerging technologies by Ann Naser Nabil.',
  keywords: ['automation', 'software development', 'technology', 'programming', 'tutorials', 'DevOps', 'AI', 'machine learning', 'consulting'],
  authors: [{ name: 'Ann Naser Nabil' }],
  creator: 'Ann Naser Nabil',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ann Naser Nabil',
    description: 'Automation expert and technology thought leader. Discover insights on automation, software development, and emerging technologies.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AnnNaserNabil',
    creator: '@AnnNaserNabil',
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
