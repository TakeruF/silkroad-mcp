# Project status

The classifications below are conservative repository assessments. Each row records its own
inspection date; a status does not imply a continuously available live deployment.

| Project | Inspected | Assessment | Basis |
| --- | --- | --- | --- |
| iCloud Mail MCP | 2026-08-19 | Stable private implementation | TypeScript build/lint/test scripts, stdio and HTTP transports, Vercel/OAuth configuration, bounded IMAP identifiers and pagination tests are present. |
| QQ Mail MCP | 2026-08-19 | Beta private implementation | A provider interface, IMAP/SMTP implementation, HTTP/OAuth configuration, and unit tests are present; its release version remains 0.1.0. |
| China Rail MCP | 2026-09-03 | Experimental public implementation | Read-only public 12306 access, local stdio, OAuth-protected Streamable HTTP, fixtures, and tests are present. A fresh deployment smoke check confirmed health and OAuth discovery, plus the expected unauthenticated MCP rejection; it did not refresh an authenticated client tool call. |
| ColorOS Calendar Bridge | 2026-08-19 | Experimental private device bridge | Android CalendarContract app, CalDAV layer, MCP mock bridge, widget, and tests are present. The repository explicitly does not ship a production relay or OAuth issuer. |

The status is deliberately conservative. Update this record only with evidence from the independent project repository.
