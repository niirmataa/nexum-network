# Packages

## `@nexum-network/protocol`

Path: `packages/nexum-protocol`

Defines the stable JSON protocol layer:

- canonical JSON,
- challenge validation,
- response validation,
- signing payload helpers.

It does not implement cryptographic signing.

## `@nexum-network/fixtures`

Path: `packages/nexum-fixtures`

Contains synthetic challenge and response fixtures used by tests, demos, and agent workflows.

## `@nexum-network/demo-cli`

Path: `apps/nexum-demo-cli`

Small command-line tool for validating and canonicalizing payload fixtures.

## Future Packages

Planned but not yet included:

- `@nexum-network/falcon-wasm`
- `@nexum-network/commerce-demo`
- `@nexum-network/test-vectors`
- `@nexum-network/transport-spec`
