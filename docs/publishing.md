# Publishing a project

1. Keep the implementation repository independent and create or update its catalog record.
2. Classify source visibility honestly. `mixed` means only the documented public parts may be copied here.
3. State every read, write, and destructive action. Describe confirmation behavior and recovery semantics.
4. Create a blueprint only from generic interfaces, examples, and tests written for publication. Do not redact a production source dump.
5. Use a fresh `.env.example` containing placeholders, not names or values from a deployment.
6. Run `npm test`, inspect the diff for secrets and user data, then update the README table and project-status note.

For unofficial endpoints or scraping, record the mechanism and limits, avoid bypassing access controls, and make upstream changes a normal failure mode.
