# Remote MCP template

Use when a stable HTTPS endpoint is required. Keep the MCP server transport-independent and put HTTP, OAuth discovery, session storage, origin allowlists, body limits, and rate limits in a deployment adapter.

Required deployment decisions: public origin, OAuth issuer/audience, redirect URIs, secret store, TLS termination, revocation, logging redaction, and health endpoint. The repository must provide placeholders only in `.env.example`.
