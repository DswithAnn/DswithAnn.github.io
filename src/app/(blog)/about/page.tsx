import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-background-secondary border-b border-surface-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              About AutoMation Services
            </h1>
            <p className="text-xl text-text-secondary">
              Insights on automation and technology by Ann Naser Nabil.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* About Author */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                About the Author
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Hi, I&apos;m Ann Naser Nabil. This blog is my platform for sharing knowledge,
                insights, and best practices in automation, software development, and technology.
                I believe in the power of continuous learning and making technical content
                accessible to everyone.
              </p>
            </div>

            {/* What I Cover */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
                What I Cover
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Automation & DevOps',
                  'Web Development',
                  'System Design',
                  'Cloud Infrastructure',
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
                Have questions, suggestions, or want to contribute? I&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:ann.n.nabil@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
                <a
                  href="https://github.com/AnnNaserNabil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href="https://x.com/ann_naser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary-500/30 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </a>
                <a
                  href="https://linkedin.com/in/ann-naser-nabil"
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
