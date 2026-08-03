import fs from 'fs';
import path from 'path';

const cwd = process.cwd();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
