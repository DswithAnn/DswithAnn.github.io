/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath must match your GitHub Pages repo name (case-sensitive)
  // Set via env var: NEXT_PUBLIC_BASE_PATH=/YourRepoName
  // Default: /AutoMationServices - change if your repo has a different name
  // For local testing: NEXT_PUBLIC_BASE_PATH="" npm run build
  basePath: process.env.NEXT_PUBLIC_BASE_PATH !== undefined ? process.env.NEXT_PUBLIC_BASE_PATH : '/AutoMationServices',
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
