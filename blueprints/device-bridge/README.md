# Device bridge blueprint

Use this blueprint when an MCP exposes data that remains authoritative on a user device. It applies to calendar, notes, SMS, call-history, and similar future bridges.

```text
MCP client -> HTTPS MCP endpoint -> authenticated relay -> paired device adapter -> platform provider
                                                   |             |-> local permission / kill switch
                                                   |             |-> per-tool policy and audit metadata
                                                   -> DEVICE_OFFLINE when no fresh device response exists
```

The public server contract must depend on a `Bridge` interface rather than the platform SDK. The app owns runtime permissions and the local kill switch. A deployment owns OAuth, TLS, relay credential storage, pairing, revocation, rate limits, and device reachability. A mock bridge is useful for public contracts and tests but must never be presented as a real relay.

Destructive operations require exact returned IDs, explicit confirmation, least-privilege policy, and disabled-by-default delete/irreversible actions. Do not add accessibility automation, root, undocumented device APIs, NAT exposure, or port forwarding to make the bridge work.
