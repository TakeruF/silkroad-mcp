# Device bridge template

Use for an MCP that reaches a paired device through an authenticated relay. Begin with a mock `Bridge` implementation and contract tests; add a real relay only after device pairing, revocation, TLS, account-to-device authorization, and offline semantics are designed.

Keep platform access inside the native application. The MCP contract should not import Android/iOS APIs directly. Require runtime permission, a local kill switch, per-tool policy, bounded ranges, exact resource IDs, and confirmation for mutations.
