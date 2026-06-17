# Nexum Network

Public project hub for the Nexum Network: post-quantum signing, local vaults, QR challenge flows, transport experiments, and commerce integration patterns.

This repository is a coordination and documentation layer. It keeps the system architecture, module status, security assumptions, and demo plan in one place without mixing unrelated implementation code into a single monorepo.

## Scope

Nexum Network explores a user-controlled signing model:

1. A service creates a structured challenge.
2. The user reviews the challenge on a trusted device.
3. The device signs canonical JSON locally.
4. The service verifies the response without receiving private key material.

The current work focuses on:

- an iOS vault for QR-based challenge signing,
- Falcon signing and verification experiments,
- browser/WASM verification,
- Rust transport and node handshake prototypes,
- storefront integration patterns.

## Current Modules

| Module | Repository | Status |
| --- | --- | --- |
| iOS Vault | https://github.com/lukasz82338233/nexum-vault-ios | Public, CI passing |
| Core / Transport | https://github.com/niirmataa/nexum-core | Public, experimental, needs history sync and audit |
| Falcon Research | https://github.com/niirmataa/free_falcon_sign | Public, research implementation |
| Commerce Integration | https://github.com/niirmataa/e-commerce_shop_v1 | Public, local changes pending commit |
| Falcon WASM | Local workspace only | Candidate standalone package |

## Architecture

```mermaid
flowchart LR
    Browser["Commerce / App Browser"]
    API["Nexum API Wrapper"]
    Vault["iOS Vault"]
    Core["Nexum Core Transport"]
    WASM["Falcon WASM Verifier"]
    Keys["Device-local Keys"]

    Browser -->|"challenge QR / callback"| Vault
    Vault -->|"biometric unlock"| Keys
    Vault -->|"signed response"| Browser
    Browser --> API
    API --> Core
    Browser --> WASM
```

## Engineering Principles

- Keep private keys device-local.
- Make high-value approvals human-reviewable.
- Sign deterministic canonical JSON, not ambiguous payloads.
- Treat all QR input as untrusted.
- Keep prototype, research, and production-ready labels explicit.
- Prefer small, reviewable repositories over one overloaded code dump.

## Repository Roles

This repository should answer:

- What is Nexum Network?
- Which modules exist?
- What is stable, experimental, or blocked?
- How does the signing flow work?
- What must be reviewed before production use?
- What demo should be built next?

Implementation belongs in focused module repositories.

## Near-Term Roadmap

1. Stabilize the public iOS vault repository and prepare a real device build.
2. Split Falcon WASM into a clean package with reproducible builds.
3. Restore and test the intended Rust workspace in `nexum-core`.
4. Convert storefront integration into a minimal public demo.
5. Write protocol test vectors for challenge and response verification.
6. Prepare an external security review checklist before production use.

## Status

This is not a production-audited cryptographic system yet. Falcon integration, QR payload validation, canonical JSON, key storage, and transport authentication require review before production deployment.

See:

- [Product Brief](docs/product-brief.md)
- [Roadmap](docs/roadmap.md)
- [Repository Map](docs/repository-map.md)
- [Security Model](docs/security-model.md)
- [Demo Plan](docs/demo-plan.md)
