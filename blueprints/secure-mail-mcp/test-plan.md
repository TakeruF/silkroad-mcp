# Test plan

- Validate malformed, stale, and cross-mailbox stable identifiers.
- Verify search pagination/filter cursor integrity and bounded preview/body/attachment limits.
- Verify read access does not set message flags.
- Verify `confirm: false` and omitted confirmation cannot call a mutation.
- Verify Trash/move recovery semantics, partial send-draft cleanup, and SMTP failure handling.
- Use synthetic fixtures in public tests; production mailbox smoke tests must be count-only or metadata-suppressed.
