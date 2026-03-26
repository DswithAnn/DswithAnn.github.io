import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Code, Lightbulb, Users, Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { getFeaturedPosts, getRecentPosts, getAllTags } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import PostList from '@/components/PostList';
import TagFilter from '@/components/TagFilter';
import NewsletterForm from '@/components/NewsletterForm';

export default async function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const recentPosts = getRecentPosts(6);
  const tags = getAllTags();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Personal Branding Focus */}
      <section className="relative overflow-hidden bg-background-secondary border-b border-surface-border">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-500/30 text-primary-400 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Automation Expert & Technology Thought Leader
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-6 animate-slide-up leading-tight">
              Hi, I&apos;m{' '}
              <span className="gradient-text">Ann Naser Nabil</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl animate-slide-up text-balance leading-relaxed">
              Exploring the intersection of automation, software architecture, and emerging technologies.
              Sharing insights to help you build smarter systems.
            </p>

            {/* Description */}
            <p className="text-lg text-text-tertiary mb-10 max-w-2xl animate-slide-up text-balance">
              Welcome to my personal blog where I dive deep into automation strategies,
              development best practices, and the future of technology.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <Link href="/blog" className="btn-primary group">
                Explore Blog
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#services" className="btn-secondary">
                What I Do
              </Link>
              <Link href="#connect" className="btn-ghost">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-surface-border flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About / Expertise Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4 animate-slide-up">
              About Me
            </h2>
            <p className="text-text-secondary text-lg animate-slide-up text-balance">
              Passionate about building efficient systems and sharing knowledge with the developer community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Expertise Card 1 */}
            <div className="group p-6 rounded-2xl bg-surface border border-surface-border card-hover animate-slide-up">
              <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center mb-4 group-hover:bg-primary-600/20 transition-colors">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                Automation & DevOps
              </h3>
              <p className="text-text-secondary">
                Building streamlined workflows, CI/CD pipelines, and automated systems that save time and reduce errors.
              </p>
            </div>

            {/* Expertise Card 2 */}
            <div className="group p-6 rounded-2xl bg-surface border border-surface-border card-hover animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-xl bg-secondary-600/10 flex items-center justify-center mb-4 group-hover:bg-secondary-600/20 transition-colors">
                <Code className="w-6 h-6 text-secondary-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                Software Development
              </h3>
              <p className="text-text-secondary">
                Full-stack development with modern technologies, clean architecture, and scalable design patterns.
              </p>
            </div>

            {/* Expertise Card 3 */}
            <div className="group p-6 rounded-2xl bg-surface border border-surface-border card-hover animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center mb-4 group-hover:bg-primary-600/20 transition-colors">
                <Lightbulb className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                Tech Insights
              </h3>
              <p className="text-text-secondary">
                Exploring emerging technologies, AI/ML trends, and their practical applications in real-world scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-background-secondary border-y border-surface-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
                  Featured Articles
                </h2>
                <p className="text-text-secondary">
                  Handpicked content showcasing deep dives and comprehensive guides
                </p>
              </div>
              <Link href="/blog?featured=true" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <PostList posts={featuredPosts} variant="featured" />
          </div>
        </section>
      )}

      {/* Services / What I Offer Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              What I Offer
            </h2>
            <p className="text-text-secondary text-lg">
              Beyond writing, I collaborate with teams and individuals to drive technical excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Service 1 */}
            <div className="group p-8 rounded-2xl bg-surface border border-surface-border card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600/20 transition-colors">
                  <Users className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    Technical Consulting
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Helping teams design scalable architectures, optimize workflows, and implement automation strategies that deliver results.
                  </p>
                  <Link href="/about" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group p-8 rounded-2xl bg-surface border border-surface-border card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-600/20 transition-colors">
                  <Lightbulb className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    Speaking & Workshops
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Engaging talks and hands-on workshops on automation, DevOps, and modern development practices.
                  </p>
                  <Link href="/about" className="text-secondary-400 hover:text-secondary-300 font-medium inline-flex items-center gap-1 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group p-8 rounded-2xl bg-surface border border-surface-border card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600/20 transition-colors">
                  <Code className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    Content Creation
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Technical writing, tutorials, and documentation that makes complex topics accessible and actionable.
                  </p>
                  <Link href="/blog" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors">
                    View articles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="group p-8 rounded-2xl bg-surface border border-surface-border card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-600/20 transition-colors">
                  <Zap className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    Collaboration
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Open to partnerships, guest posts, and collaborative projects that push the boundaries of technology.
                  </p>
                  <Link href="#connect" className="text-secondary-400 hover:text-secondary-300 font-medium inline-flex items-center gap-1 transition-colors">
                    Get in touch
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      {tags.length > 0 && (
        <section className="py-16 bg-background-secondary border-y border-surface-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
                Browse by Topic
              </h2>
              <p className="text-text-secondary mb-8">
                Explore content organized by technology and subject area
              </p>
              <TagFilter tags={tags} variant="cloud" />
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
                Recent Articles
              </h2>
              <p className="text-text-secondary">
                Latest insights and tutorials from the blog
              </p>
            </div>
            <Link href="/blog" className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 transition-colors">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <PostList posts={recentPosts} />
        </div>
      </section>

      {/* Connect / Social Proof Section */}
      <section id="connect" className="py-16 md:py-24 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 border-t border-surface-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Interested in collaborating, speaking opportunities, or just want to say hello?
              I&apos;d love to hear from you.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 hover:bg-primary-600/10 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 hover:bg-primary-600/10 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 hover:bg-primary-600/10 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <Link
                href="/feed.xml"
                className="p-4 rounded-xl bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 hover:bg-primary-600/10 transition-all duration-200"
                aria-label="RSS Feed"
              >
                <Mail className="w-6 h-6" />
              </Link>
            </div>

            {/* Newsletter CTA */}
            <div className="max-w-md mx-auto">
              <p className="text-text-tertiary text-sm mb-4">
                Subscribe to get notified about new posts and exclusive content.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-background-secondary border-t border-surface-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
            Ready to dive deeper?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Explore the complete collection of articles, tutorials, and guides on automation and technology.
          </p>
          <Link href="/blog" className="btn-primary">
            View All Posts
          </Link>
        </div>
      </section>
    </div>
  );
}
