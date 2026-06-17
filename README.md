# Nexum Network

Public project hub for the Nexum Network: post-quantum signing, local vaults, QR challenge flows, transport experiments, and commerce integration patterns.

This repository is a coordination layer and lightweight monorepo. It keeps shared protocol code, fixtures, demo tools, agent skills, system architecture, module status, and security assumptions in one place without dumping every implementation module into a single oversized repository.

## Quick Start

```bash
npm run verify
node apps/nexum-demo-cli/src/cli.js canonical packages/nexum-fixtures/fixtures/challenge.login.json
node apps/nexum-demo-cli/src/cli.js validate packages/nexum-fixtures/fixtures/response.login.json
```

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
| Protocol Package | `packages/nexum-protocol` | Local package, tested |
| Fixtures Package | `packages/nexum-fixtures` | Local package, checked in CI |
| Demo CLI | `apps/nexum-demo-cli` | Local app, validates/canonicalizes payloads |
| Agent Skills | `skills/*` | Project-local skills for agents |
| iOS Vault | https://github.com/lukasz82338233/nexum-vault-ios | Public, CI passing |
| Core / Transport | https://github.com/niirmataa/nexum-core | Public, experimental, needs history sync and audit |
| Falcon Research | https://github.com/niirmataa/free_falcon_sign | Public, research implementation |
| Commerce Integration | https://github.com/niirmataa/e-commerce_shop_v1 | Public, local changes pending commit |
| Falcon WASM | Local workspace only | Candidate standalone package |

## Monorepo Layout

```text
apps/
  nexum-demo-cli/          # payload validation/canonicalization helper
packages/
  nexum-protocol/          # canonical JSON and challenge/response validators
  nexum-fixtures/          # synthetic protocol fixtures
skills/
  nexum-protocol-review/   # agent workflow for protocol changes
  nexum-mobile-vault/      # agent workflow for iOS vault work
  nexum-commerce-integration/
  nexum-release-manager/
docs/
  agent-skills.md
  packages.md
  product-brief.md
  repository-map.md
  roadmap.md
  security-model.md
```

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
- [Packages](docs/packages.md)
- [Agent Skills](docs/agent-skills.md)
- [Roadmap](docs/roadmap.md)
- [Repository Map](docs/repository-map.md)
- [Security Model](docs/security-model.md)
- [Demo Plan](docs/demo-plan.md)
