import fs from 'fs';
import path from 'path';

console.log("=== Comprehensive search for any media file ===");

function deepSearch(dir: string, depth = 0) {
  if (depth > 8) return;
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // Skip known non-user directories to be fast
          if (['node_modules', '.git', 'proc', 'sys', 'dev', 'lib', 'lib32', 'lib64', 'libx32', 'bin', 'sbin', 'usr', 'etc', 'var', 'boot', 'run', 'dist', 'cache', '.npm', '.cache'].includes(file)) return;
          deepSearch(fullPath, depth + 1);
        } else {
          const lower = file.toLowerCase();
          if (
            lower.endsWith('.mp4') || 
            lower.endsWith('.mov') || 
            lower.endsWith('.webm') || 
            lower.endsWith('.avi') || 
            lower.endsWith('.m4v') ||
            lower.endsWith('.mov') ||
            lower.endsWith('.png') ||
            lower.endsWith('.jpg') ||
            lower.endsWith('.jpeg') ||
            stat.size > 2000000 // files larger than 2MB
          ) {
            console.log("FOUND FILE:", fullPath, "Size:", stat.size, "mtime:", stat.mtime);
          }
        }
      } catch (e) {}
    });
  } catch (e) {}
}

deepSearch('/');
console.log("Search completed!");
