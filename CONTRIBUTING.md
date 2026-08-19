# Contributing

Start with a catalog record. The catalog names the implementation repository and its public boundary; it does not import, mirror, or relocate that repository.

## Contribution rules

1. Keep provider credentials, tokens, production URLs, client IDs, account identifiers, and fixture data out of this repository.
2. Add code to `packages/` only after demonstrating that it is shared by at least two projects without provider-specific configuration or deployment assumptions.
3. Make blueprints instructional and independently reproducible. Do not sanitize-and-copy private production source.
4. Declare write and destructive behavior precisely in the catalog. A move to Trash, flag change, sent message, or device mutation is a write even when recoverable.
5. Update the README table and [`docs/project-status.md`](docs/project-status.md) with the catalog change.

Run `npm test` before opening a pull request. See [`SECURITY.md`](SECURITY.md) for vulnerability reporting and secret handling.
