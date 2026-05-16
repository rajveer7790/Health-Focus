import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const markerStarts = ['<'.repeat(7), '='.repeat(7), '>'.repeat(7)];
const conflictMarkerPattern = new RegExp(`^(${markerStarts.map(escapeRegExp).join('|')})(?:\\s|$)`, 'm');
const ignoredDirectories = new Set(['.git', '.astro', 'dist', 'node_modules']);
const ignoredFiles = new Set(['package-lock.json']);
const textFileExtensions = new Set([
  '.astro',
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mdx',
  '.mjs',
  '.ts',
  '.txt',
  '.xml',
  '.yaml',
  '.yml',
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    if (ignoredFiles.has(entry)) return [];

    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (ignoredDirectories.has(entry)) return [];
      return walk(fullPath);
    }

    return textFileExtensions.has(path.extname(entry)) ? [fullPath] : [];
  });
}

const conflicts = [];

for (const filePath of walk(repoRoot)) {
  const source = readFileSync(filePath, 'utf8');
  if (conflictMarkerPattern.test(source)) {
    conflicts.push(path.relative(repoRoot, filePath));
  }
}

if (conflicts.length > 0) {
  console.error('Unresolved merge conflict markers found:');
  for (const filePath of conflicts) console.error(`- ${filePath}`);
  process.exit(1);
}

console.log('No unresolved merge conflict markers found.');
