// Next.js configuration
// All Astro config has been removed — this project now runs entirely on Next.js 14
// MDX content is read via gray-matter (lib/markdown.ts)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;