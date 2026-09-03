import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const records = path.join(root, 'catalog/projects');
const projects = await Promise.all(
  (await readdir(records))
    .filter((name) => name.endsWith('.json'))
    .map(async (name) => JSON.parse(await readFile(path.join(records, name), 'utf8'))),
);

let failures = 0;
for (const project of projects) {
  for (const media of project.media ?? []) {
    const encodedPath = media.path.split('/').map(encodeURIComponent).join('/');
    const url = `https://raw.githubusercontent.com/${project.source.repository}/${media.commit}/${encodedPath}`;
    try {
      const response = await fetch(url, {
        headers: { Range: 'bytes=0-31', 'User-Agent': 'silkroad-mcp-media-check' },
        signal: AbortSignal.timeout(15_000),
      });
      const contentType = response.headers.get('content-type') ?? '';
      await response.body?.cancel();
      if (!response.ok || !contentType.startsWith('image/')) {
        failures++;
        console.error(`${project.id}/${media.id}: ${response.status} ${contentType || 'missing content-type'}`);
      }
    } catch (error) {
      failures++;
      console.error(`${project.id}/${media.id}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

if (failures) process.exit(1);
console.log('Pinned project media is reachable.');
