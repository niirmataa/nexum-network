# Security Model

## Security Goals

- Keep private keys device-local.
- Make signed payloads human-reviewable before approval.
- Use deterministic canonical JSON for signing.
- Treat QR payloads as untrusted input.
- Separate demo infrastructure from production secrets.

## Non-Goals For Current Prototype

- Claiming production-grade cryptographic assurance.
- Claiming audited post-quantum security.
- Supporting custody of third-party funds.
- Running unattended production deployment.

## Main Threats

| Threat | Risk | Mitigation Direction |
| --- | --- | --- |
| Malicious QR payload | User signs unintended action | Strict schema, visible review screen, origin checks |
| Canonicalization mismatch | Verifier signs/verifies different bytes | Shared test vectors and deterministic serializer |
| Private key export | Account takeover or forged approvals | Keychain/Secure Enclave review, no response leakage |
| Replay attack | Old response reused | Nonce, expiry, challenge ID, server-side replay cache |
| Fake origin | Phishing challenge | Known origin registry and display |
| Experimental crypto | Incorrect implementation assumptions | External cryptographic review |
| Transport impersonation | Node talks to wrong peer | Authenticated handshake, mTLS/shared trust root |

## Current Risk Labels

- `nexum-vault-ios`: prototype, CI passing, not audited.
- `nexum-core`: experimental, needs workspace sync and responder review.
- `free_falcon_sign`: research implementation.
- `free_falcon_wasm`: local build artifact, needs reproducibility.
- commerce integration: prototype integration, not production deployment.

## Required Before Production

1. Independent cryptographic review.
2. Mobile key storage review.
3. Protocol test vector suite.
4. Dependency and supply-chain review.
5. Server-side rate limiting and replay protection.
6. Documented recovery and revocation story.
