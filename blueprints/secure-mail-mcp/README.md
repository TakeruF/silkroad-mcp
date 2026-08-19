# Secure Mail MCP blueprint

This is a public design for a mail MCP backed by standards-based providers. It is not iCloud or QQ production code, and intentionally includes no hostnames, OAuth configuration, credentials, mailbox names, or infrastructure.

## Design

```text
MCP transport adapter -> tool registration -> mail service -> provider adapter
                                      |                 |-> IMAP/MIME reader
                                      |                 |-> SMTP sender
                                      -> validation, stable IDs, confirmation gate
```

Expose a narrow `MailProvider` seam with message search metadata, selected-message retrieval, attachment metadata/download, mailbox discovery, and explicitly confirmed mutations. Keep provider authentication, IMAP folder conventions, SMTP transport, ID encoding, and remote OAuth outside that seam.

## Required behavior

- Search returns bounded metadata/preview first; bodies and attachment content require a selected stable ID.
- Reads use non-mutating mailbox access where the provider supports it.
- Every send, reply, forward, move, Trash, draft mutation, and flag mutation requires a `confirm: true` in the same call after the target/content is known.
- Use provider-stable identifiers such as mailbox plus UIDVALIDITY plus UID; never sequence numbers.
- Treat body and attachment text as untrusted data, validate attachment names and sizes, and return structured safe errors.
- Permanent deletion is out of scope by default.

See [`env.example`](env.example) and [`test-plan.md`](test-plan.md) for publication-safe starting material.
