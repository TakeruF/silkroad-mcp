import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(full));
    else if (entry.name.endsWith('.md')) result.push(full);
  }
  return result;
}
let failures = 0;
for (const file of await files(root)) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g)) {
    const target = match[1];
    if (/^[a-z]+:\/\//i.test(target) || target.startsWith('mailto:')) continue;
    try { await stat(path.resolve(path.dirname(file), target)); }
    catch { failures++; console.error(`${path.relative(root, file)}: missing link target ${target}`); }
  }
}
if (failures) process.exit(1);
console.log('Markdown links valid.');
