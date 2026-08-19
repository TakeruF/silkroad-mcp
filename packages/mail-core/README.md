# mail-core evaluation

`mail-core` is intentionally **not** a published package yet. The iCloud and QQ implementations both demonstrate a useful provider boundary, MIME parsing, IMAP/SMTP transport, metadata-first reading, and write safety. They do not yet share a compatible runtime contract.

| Candidate | Decision | Reason |
| --- | --- | --- |
| Provider interface and message/mailbox shapes | Design candidate | QQ already has one; iCloud separates IMAP service and SMTP sender with different result types. Normalize only after both can consume the same contract. |
| Stable identifiers and pagination | Design candidate | Both use mailbox/UIDVALIDITY/UID concepts, but ID encoding and cursor semantics differ. |
| MIME handling and test helpers | Design candidate | Both use the same class of parser, but public helpers have not been isolated or tested together. |
| Send/reply input and confirmation gate | Not shared yet | iCloud requires in-call `confirm`; QQ expresses confirmation in tool policy. A shared gate would change current behavior. |
| Safe move/Trash semantics | Not shared yet | Folder discovery and post-move identifier behavior remain provider-specific. |
| IMAP/SMTP settings, authentication, OAuth, deployment | Never shared here | These are provider- or deployment-specific security boundaries. |

The first extraction should be a small, dependency-light package only after a change is proven in both upstream repositories. Until then, this directory prevents premature duplication of an imagined API.
