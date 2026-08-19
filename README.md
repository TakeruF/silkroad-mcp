# Silkroad MCP

Silkroad MCP is a collection of MCP servers, reusable components, and implementation blueprints for connecting AI to services that lack first-party MCP integrations.

It focuses on practical interoperability: Asian services, device integrations, and standard protocols such as IMAP, SMTP, CalDAV, and Android `CalendarContract`. It is not limited to any region or provider.

This is a hub, not a forced monorepo. Production projects remain independently versioned repositories; this repository contains their machine-readable catalog, deliberately provider-neutral blueprints, small reusable components when evidence supports them, and templates for new work.

## Project catalog

The source of truth is [`catalog/projects/`](catalog/projects/), validated against [`catalog/schema/project.schema.json`](catalog/schema/project.schema.json). The table below is maintained alongside it; run `npm run validate:catalog` before changing either.

<!-- catalog:start -->
| Project | Source | Blueprint | Status | Read | Write |
| --- | --- | --- | --- | --- | --- |
| [China Rail MCP](catalog/projects/china-rail.json) | Public | No | Experimental | Yes | No |
| [ColorOS Calendar Bridge](catalog/projects/coloros-calendar.json) | Private | Yes | Experimental | Yes | Yes |
| [iCloud Mail MCP](catalog/projects/icloud-mail.json) | Private | Yes | Stable | Yes | Yes |
| [QQ Mail MCP](catalog/projects/qq-mail.json) | Private | Yes | Beta | Yes | Yes |
<!-- catalog:end -->

Statuses describe the currently inspected repositories, not a service-level guarantee. See [`docs/project-status.md`](docs/project-status.md) for the evidence and limits.

## Repository layout

- [`catalog/`](catalog/) — validated project metadata.
- [`blueprints/`](blueprints/) — public, provider-neutral designs extracted without production code or secrets.
- [`packages/`](packages/) — code only when two or more projects genuinely share it. `mail-core` is currently an evaluation boundary, not a runtime dependency.
- [`templates/`](templates/) — starting points for stdio MCPs, remote MCPs, and device bridges.
- [`docs/`](docs/) — architecture, publishing, security, and project status policy.

## Getting started

```bash
npm test
```

Use a template as a starting point; do not copy a blueprint's example environment file into production unchanged. Before publishing a project, follow [`docs/publishing.md`](docs/publishing.md) and the security checklist in [`SECURITY.md`](SECURITY.md).

## Scope and contribution

New entries should preserve the independence of their implementation repository and add a catalog record first. A blueprint is a reproducible public design, never a scrubbed dump of a private repository. See [`CONTRIBUTING.md`](CONTRIBUTING.md).
