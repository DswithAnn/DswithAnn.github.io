import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
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
    default: 'AutoMation Services',
    template: '%s | AutoMation Services',
  },
  description: 'Insights on automation, software development, and technology by Ann Naser Nabil',
  keywords: ['automation', 'software development', 'technology', 'programming', 'tutorials', 'DevOps'],
  authors: [{ name: 'Ann Naser Nabil' }],
  creator: 'Ann Naser Nabil',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AutoMation Services',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AnnNaserNabil',
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
