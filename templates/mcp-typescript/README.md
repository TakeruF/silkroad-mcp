# TypeScript MCP template

Use for a local/stdio MCP with a provider seam. Start with read-only tools, bounded Zod validation, structured errors, and fixture-backed tests. Add a catalog record before publishing.

```text
src/
  server.ts       tool registration and annotations
  provider.ts     provider interface
  index.ts        stdio startup
test/
  server.test.ts
```

Do not add remote authentication, secrets, or provider credentials to this template; use the remote template only when a deployment boundary is defined.
