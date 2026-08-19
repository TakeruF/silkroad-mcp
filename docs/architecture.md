# Architecture

Silkroad MCP is a federation of repositories. A project implementation owns its release cycle, credentials, deployment, tests, and provider-specific behavior. This hub owns discoverability and the public layer that can safely be shared across projects.

```text
independent implementation repositories
        | catalog records and public boundaries
        v
Silkroad MCP: catalog + blueprints + proven shared packages + templates
        | reusable starting points, never production configuration
        v
new independently maintained MCP projects
```

`catalog/projects/*.json` is the source of truth for capability, risk, and visibility. The JSON Schema documents the full contract; the built-in validator enforces its essential constraints without a dependency bootstrap.

Packages have a high bar: shared code must be implemented and tested in at least two projects before it is extracted. Blueprints have a different role: they describe seams, constraints, and test strategy so a user can build an equivalent system without obtaining private code.

Device bridges form a separate category. Their public MCP endpoint is not a substitute for device pairing: the architecture needs a device-local permission gate, device-bound credential, authenticated relay, and offline failure semantics.
