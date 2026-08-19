# Security policy

Report a suspected vulnerability privately to the repository owner. Do not file public issues containing credentials, access tokens, message/calendar content, device identifiers, exploit details, or reproduction traffic against third-party services.

This hub must never contain production secrets. Examples use placeholders only. Before publishing a blueprint or template, run `npm run check:secrets` and manually inspect changes for URLs, OAuth redirect configuration, API keys, private infrastructure names, and real user data.

Each project record declares read/write and destructive capabilities. Implementations should be fail-closed, validate bounded input, use stable identifiers, and require an explicit per-operation confirmation for sends, deletions, moves, flag changes, and device mutations. More detailed design guidance is in [`docs/security.md`](docs/security.md).
