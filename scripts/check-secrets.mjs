import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const ignored = new Set(['.git', 'node_modules']);
async function files(directory) { const out = []; for (const entry of await readdir(directory, { withFileTypes: true })) { if (ignored.has(entry.name)) continue; const full = path.join(directory, entry.name); if (entry.isDirectory()) out.push(...await files(full)); else out.push(full); } return out; }
const patterns = [/AKIA[0-9A-Z]{16}/, /ghp_[A-Za-z0-9]{36}/, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /(?:api[_-]?key|secret|token|password)\s*[:=]\s*["']?(?!your-|replace-|generate-|example|\$\{|<)[A-Za-z0-9_\-/+=]{12,}/i];
let failures = 0;
for (const file of await files(root)) { const content = await readFile(file, 'utf8'); for (const pattern of patterns) if (pattern.test(content)) { failures++; console.error(`possible secret: ${path.relative(root, file)} (${pattern})`); } }
if (failures) process.exit(1);
console.log('No basic secret patterns found.');
