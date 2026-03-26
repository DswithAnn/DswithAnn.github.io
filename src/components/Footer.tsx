'use client';

import Link from 'next/link';
import { Search, Github, Twitter, Linkedin, Rss } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-background-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold gradient-text">
                AutoMation Services
              </span>
            </Link>
            <p className="text-text-secondary mb-4 max-w-md">
              Insights on automation, software development, and technology.
              Sharing tutorials, best practices, and stories by Ann Naser Nabil.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <Link
                href="/feed.xml"
                className="text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Stay Updated
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Subscribe to get the latest posts delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field text-sm"
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-tertiary text-sm">
            © {currentYear} AutoMation Services by Ann Naser Nabil. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-text-tertiary hover:text-text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-text-tertiary hover:text-text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
