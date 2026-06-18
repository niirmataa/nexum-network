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

## `@nexum-network/api`

Path: `apps/nexum-api`

Minimal backend API for Nexum challenge/response flows.

Endpoints:

- `GET /health`
- `POST /v1/challenges`
- `POST /v1/responses/verify`

The verification endpoint currently performs structural checks and returns `accepted: false` until a cryptographic verifier is wired in.

## Future Packages

Planned but not yet included:

- `@nexum-network/falcon-wasm`
- `@nexum-network/commerce-demo`
- `@nexum-network/test-vectors`
- `@nexum-network/transport-spec`
