# Project status

The classifications below are conservative repository assessments. Each row records its own
inspection date; a status does not imply a continuously available live deployment.

| Project | Inspected | Assessment | Basis |
| --- | --- | --- | --- |
| iCloud Mail MCP | 2026-09-04 | Stable private implementation | Version 0.7.0 provides the standalone stdio and OAuth-protected Streamable HTTP server. The repository also contains a synthetic, non-production multi-account adapter for the pinned `mcp-mail-core` 0.3.0 artifact; no live multi-account cutover is claimed. |
| QQ Mail MCP | 2026-09-04 | Beta private implementation | Release `v1.0.0` provides bounded multi-account IMAP/SMTP access and an OAuth-protected Streamable HTTP transport. The pinned `mcp-mail-core` 0.3.0 adapter has mocked contract coverage, but live QQ, deployed OAuth, deliverability, and production core-host cutover remain separate opt-in checks. |
| China Rail MCP | 2026-09-04 | Experimental public implementation | Read-only public 12306 access, local stdio, protected Streamable HTTP, reproducible self-hosting checks, fixtures, and tests are present. The source records a 2026-09-03 live upstream check; npm publication, MCP Registry registration, and a newly authenticated client tool call were not established by this inspection. |
| ColorOS Calendar Bridge | 2026-09-04 | Experimental private two-app bridge | The current default branch separates the Calendar Bridge sync APK from the optional MCP Companion APK and includes signature-protected device IPC, an EdgeOne relay, OAuth 2.1, encrypted transient storage, and tests. Device IPC has recorded hardware verification, while production deployment, live ChatGPT pairing, cleanup scheduling, and an end-to-end relay mutation remain deployment checks rather than repository-proven state. |

Local verification on 2026-09-04 passed for all four checkouts: iCloud Mail ran 113 tests plus
typecheck and build; QQ Mail ran 31 tests plus build; China Rail ran 40 tests plus typecheck and
build, with four live integration tests skipped by default; and ColorOS Calendar Bridge completed
the Android unit-test/debug-APK build plus MCP server lint, typecheck, 27 server tests, three widget
tests, and build. These checks are local and predominantly synthetic. They do not establish live
mail-provider behavior, current 12306 behavior beyond the dated upstream record, production cloud
deployment, a connected AI client, or a fresh physical-device end-to-end run.

The status is deliberately conservative. Update this record only with evidence from the independent project repository.
