/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath must match your GitHub Pages repo name (case-sensitive)
  // Set via env var: NEXT_PUBLIC_BASE_PATH=/YourRepoName
  // For local testing or root deployment: NEXT_PUBLIC_BASE_PATH="" npm run dev
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
