import fs from 'fs';
import path from 'path';

const cwd = process.cwd();

// Copy images from src/assets to public/assets (only if not already copied)
const srcAssets = path.join(cwd, 'src', 'assets');
const publicAssets = path.join(cwd, 'public', 'assets');
if (fs.existsSync(srcAssets) && !fs.existsSync(publicAssets)) {
  fs.cpSync(srcAssets, publicAssets, { recursive: true });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
