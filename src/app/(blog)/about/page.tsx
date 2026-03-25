import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-background-secondary border-b border-surface-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              About DevBlog
            </h1>
            <p className="text-xl text-text-secondary">
              A modern blog platform for developers and tech enthusiasts.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Mission */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                Our Mission
              </h2>
              <p className="text-text-secondary leading-relaxed">
                DevBlog is dedicated to sharing knowledge, insights, and best practices 
                in software development and technology. We believe in the power of 
                community-driven learning and the importance of making technical content 
                accessible to everyone.
              </p>
            </div>

            {/* What We Cover */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                What We Cover
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Web Development',
                  'Mobile Development',
                  'System Design',
                  'DevOps & Infrastructure',
                  'Programming Languages',
                  'Software Architecture',
                  'Best Practices',
                  'Career Advice',
                ].map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-surface-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <span className="text-text-primary">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                Built With
              </h2>
              <p className="text-text-secondary mb-4">
                This blog is built using modern web technologies:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React', 'App Router'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-primary-600/10 border border-primary-500/30 text-primary-400 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                Get in Touch
              </h2>
              <p className="text-text-secondary mb-6">
                Have questions, suggestions, or want to contribute? We&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:hello@devblog.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
