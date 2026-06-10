import fs from 'fs';
import path from 'path';

const cwd = process.cwd();

// 1. Move images to the public folder so they load properly
const srcAssets = path.join(cwd, 'src', 'assets');
const publicAssets = path.join(cwd, 'public', 'assets');
if (fs.existsSync(srcAssets) && !fs.existsSync(publicAssets)) {
  // Only copy once — don't delete source so images survive across builds
  fs.cpSync(srcAssets, publicAssets, { recursive: true });
}

// 2. Delete old Astro folders that cause routing conflicts in Next.js
const dirsToDelete = ['src/pages', 'src/components', 'src/layouts', 'src/styles', '.astro'];
for (const dir of dirsToDelete) {
  const fullPath = path.join(cwd, ...dir.split('/'));
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

// 3. Delete old Astro config files and conflicting Next.js sitemap.ts
const filesToDelete = [
  path.join(cwd, 'src', 'content', 'config.ts')
];

for (const file of filesToDelete) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
