# Security design

`SECURITY.md` explains reporting and repository hygiene; this document defines implementation expectations.

Read tools should be bounded and avoid side effects such as marking mail read. Writes must require exact stable identifiers, validation, and a fresh explicit confirmation. Prefer recoverable actions such as Trash to permanent deletion; do not claim recovery where a provider does not guarantee it.

Credential handling is provider and deployment specific. Keep IMAP/SMTP hosts, app passwords, OAuth issuers, redirect URIs, device pairing secrets, and production domains outside shared packages and blueprints. Never turn a device bridge into an unauthenticated Internet relay or expose a device through NAT forwarding.

Unofficial APIs, reverse engineering, and scraping must be documented in the catalog risk notes. Do not add account login, anti-bot workarounds, or bypasses merely to make an integration work.
