# Nexum Protocol Review

Use this skill to review or modify Nexum challenge/response payloads, canonical JSON behavior, protocol fixtures, and validation rules.

## When To Use

Use this skill when the task mentions:

- challenge JSON,
- response JSON,
- QR payload schema,
- canonical JSON,
- signing payloads,
- replay/nonce/expiry validation,
- protocol test vectors.

Do not use this skill to implement cryptographic primitives. It is for payload contracts and validation behavior.

## Inputs

Expected inputs:

- changed files under `packages/nexum-protocol`,
- fixtures under `packages/nexum-fixtures/fixtures`,
- related docs under `docs/`,
- error logs from CI or local tests.

## Workflow

1. Read `packages/nexum-protocol/README.md`.
2. Inspect changed validators and canonicalization code.
3. Check whether fixture examples still validate.
4. Confirm key order is deterministic in canonical JSON.
5. Confirm challenge signing payloads exclude display-only fields.
6. Add or update tests before changing behavior.
7. Run `npm run verify`.

## Output

Return:

- a short summary of protocol changes,
- whether fixtures still pass,
- test result,
- compatibility risks,
- any required downstream changes for vault, verifier, or commerce integration.

## Safety Notes

- Do not add private key material to fixtures.
- Do not relax HTTPS origin checks without explicit review.
- Do not treat experimental Falcon variants as production-audited.
- Do not silently change canonical JSON output; add fixtures and tests.
