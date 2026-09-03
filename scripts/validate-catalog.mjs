import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = new URL('..', import.meta.url);
const records = path.join(root.pathname, 'catalog/projects');
const clientCatalog = JSON.parse(await readFile(path.join(root.pathname, 'catalog/clients.json'), 'utf8'));
const required = ['name', 'id', 'category', 'status', 'source', 'implementation', 'protocol', 'service', 'auth', 'capabilities', 'risk', 'tools', 'i18n'];
const allowedCategories = new Set(['mail', 'public-data', 'device-bridge']);
const allowedStatuses = new Set(['stable', 'beta', 'experimental', 'planned', 'archived']);
const ids = new Set();
let failures = 0;
for (const file of (await readdir(records)).filter((name) => name.endsWith('.json'))) {
  const record = JSON.parse(await readFile(path.join(records, file), 'utf8'));
  const fail = (message) => { failures++; console.error(`${file}: ${message}`); };
  for (const key of required) if (!(key in record)) fail(`missing ${key}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id ?? '')) fail('invalid id');
  if (ids.has(record.id)) fail(`duplicate id ${record.id}`); ids.add(record.id);
  if (!allowedCategories.has(record.category)) fail('invalid category');
  if (!allowedStatuses.has(record.status)) fail('invalid status');
  if (!['public', 'private', 'mixed'].includes(record.source?.visibility)) fail('invalid source.visibility');
  if (typeof record.source?.repository !== 'string' || !record.source.repository.includes('/')) fail('invalid source.repository');
  if (record.source?.blueprint !== null && typeof record.source?.blueprint !== 'string') fail('invalid source.blueprint');
  if (typeof record.source?.repository !== 'string' || !/^[\w.-]+\/[\w.-]+$/.test(record.source.repository)) fail('source.repository must be an owner/repository identifier');
  if (record.source?.blueprint) {
    try { await access(path.join(root.pathname, record.source.blueprint, 'README.md')); } catch { fail('source.blueprint does not reference a blueprint README'); }
  }
  if (!Array.isArray(record.implementation?.language) || !record.implementation.language.length) fail('implementation.language is required');
  if (!Array.isArray(record.protocol?.transports) || !record.protocol.transports.length) fail('protocol.transports is required');
  if (typeof record.service?.official_api !== 'boolean') fail('service.official_api must be boolean');
  if (!Array.isArray(record.auth?.type) || !record.auth.type.length) fail('auth.type is required');
  for (const key of ['read', 'write', 'confirmation_required']) if (typeof record.capabilities?.[key] !== 'boolean') fail(`capabilities.${key} must be boolean`);
  if (!['low', 'medium', 'high'].includes(record.risk?.level)) fail('invalid risk.level');
  if (!Array.isArray(record.risk?.destructive_actions)) fail('risk.destructive_actions must be an array');
  if (!Array.isArray(record.tools) || record.tools.some((tool) => typeof tool !== 'string' || !/^[a-z][a-z0-9_]*$/.test(tool))) fail('tools must be snake_case names');
  if (record.media !== undefined) {
    if (!Array.isArray(record.media)) fail('media must be an array');
    else {
      const mediaIds = new Set();
      for (const media of record.media) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(media.id ?? '')) fail('media item has invalid id');
        if (mediaIds.has(media.id)) fail(`duplicate media id ${media.id}`); mediaIds.add(media.id);
        if (!['comparison', 'source-evidence', 'interface'].includes(media.kind)) fail(`invalid media kind for ${media.id}`);
        if (!/^[a-f0-9]{40}$/.test(media.commit ?? '')) fail(`invalid media commit for ${media.id}`);
        if (typeof media.path !== 'string' || media.path.startsWith('/') || media.path.split('/').includes('..')) fail(`invalid media path for ${media.id}`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(media.capturedAt ?? '')) fail(`invalid capturedAt for ${media.id}`);
        for (const locale of ['en', 'zh']) {
          for (const key of ['alt', 'caption']) if (typeof media.i18n?.[locale]?.[key] !== 'string' || !media.i18n[locale][key].trim()) fail(`missing media ${media.id} i18n.${locale}.${key}`);
        }
      }
    }
  }
  for (const locale of ['en', 'zh']) {
    const text = record.i18n?.[locale];
    for (const key of ['summary', 'description', 'limitations']) if (typeof text?.[key] !== 'string' || !text[key].trim()) fail(`missing i18n.${locale}.${key}`);
  }
}
const clientIds = new Set();
if (!/^\d{4}-\d{2}-\d{2}$/.test(clientCatalog.checkedAt ?? '')) {
  failures++;
  console.error('clients.json: checkedAt must be an ISO date');
}
if (!Array.isArray(clientCatalog.clients) || !clientCatalog.clients.length) {
  failures++;
  console.error('clients.json: clients must be a non-empty array');
} else {
  const statuses = new Set(['supported', 'supported-with-plan', 'not-documented', 'limited-preview']);
  const writeModes = new Set(['supported', 'workspace-only', 'confirmation-required', 'not-documented']);
  for (const client of clientCatalog.clients) {
    const fail = (message) => { failures++; console.error(`clients.json (${client.id ?? 'unknown'}): ${message}`); };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(client.id ?? '')) fail('invalid id');
    if (clientIds.has(client.id)) fail(`duplicate id ${client.id}`); clientIds.add(client.id);
    if (typeof client.name !== 'string' || !client.name.trim()) fail('name is required');
    if (!statuses.has(client.supportStatus)) fail('invalid supportStatus');
    if (!Array.isArray(client.transports)) fail('transports must be an array');
    if (client.localStdio !== null && typeof client.localStdio !== 'boolean') fail('localStdio must be boolean or null');
    if (client.remoteMcp !== null && typeof client.remoteMcp !== 'boolean') fail('remoteMcp must be boolean or null');
    if (!writeModes.has(client.writeTools)) fail('invalid writeTools');
    if (!Array.isArray(client.officialUrls) || client.officialUrls.some((url) => !/^https:\/\//.test(url))) fail('officialUrls must contain HTTPS URLs');
    for (const locale of ['en', 'zh']) {
      for (const key of ['account', 'recommended', 'limitations']) {
        if (typeof client.i18n?.[locale]?.[key] !== 'string' || !client.i18n[locale][key].trim()) fail(`missing i18n.${locale}.${key}`);
      }
    }
  }
}
if (failures) process.exit(1);
console.log(`Catalog valid: ${ids.size} project records and ${clientIds.size} client records.`);
