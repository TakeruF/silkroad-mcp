# Project status

The classifications below are a repository-structure assessment as of 2026-08-19, not a live deployment audit.

| Project | Assessment | Basis |
| --- | --- | --- |
| iCloud Mail MCP | Stable private implementation | TypeScript build/lint/test scripts, stdio and HTTP transports, Vercel/OAuth configuration, bounded IMAP identifiers and pagination tests are present. |
| QQ Mail MCP | Beta private implementation | A provider interface, IMAP/SMTP implementation, HTTP/OAuth configuration, and unit tests are present; its release version remains 0.1.0. |
| China Rail MCP | Experimental public implementation | Read-only public 12306 access, fixtures, and tests are present; upstream data is unofficial and intentionally unauthenticated. |
| ColorOS Calendar Bridge | Experimental private device bridge | Android CalendarContract app, CalDAV layer, MCP mock bridge, widget, and tests are present. The repository explicitly does not ship a production relay or OAuth issuer. |

The status is deliberately conservative. Update this record only with evidence from the independent project repository.
