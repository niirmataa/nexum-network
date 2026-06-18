# Repository Map

Snapshot date: 2026-06-17

## Public Repositories

| Repository | Purpose | Current State | Next Action |
| --- | --- | --- | --- |
| `lukasz82338233/nexum-vault-ios` | iOS vault for QR challenge signing | Public, GitHub Actions passing | Prepare TestFlight build on macOS |
| `niirmataa/nexum-core` | Rust core, transport, CLI, secure ping experiments | Public, local branch ahead/behind remote | Sync history carefully before push |
| `niirmataa/free_falcon_sign` | Falcon research implementation | Public, clean local state | Keep as research reference |
| `niirmataa/e-commerce_shop_v1` | Storefront and Nexum API integration | Public, many local changes pending commit | Split into reviewable commits |
| `niirmataa/privAI` | Related project | Public, clean local state | Leave untouched unless needed |

## Packages In This Repository

| Package | Path | Purpose | Current State |
| --- | --- | --- | --- |
| `@nexum-network/protocol` | `packages/nexum-protocol` | Canonical JSON and payload validation | Implemented, tested |
| `@nexum-network/fixtures` | `packages/nexum-fixtures` | Synthetic challenge/response fixtures | Implemented |
| `@nexum-network/api` | `apps/nexum-api` | Challenge/response backend API | Implemented, tested |
| `@nexum-network/demo-cli` | `apps/nexum-demo-cli` | Demo payload validation/canonicalization CLI | Implemented |

## Agent Skill Packs

| Skill | Path | Purpose |
| --- | --- | --- |
| `nexum-protocol-review` | `skills/nexum-protocol-review` | Protocol review workflow |
| `nexum-mobile-vault` | `skills/nexum-mobile-vault` | Mobile vault workflow |
| `nexum-commerce-integration` | `skills/nexum-commerce-integration` | Storefront/API integration workflow |
| `nexum-release-manager` | `skills/nexum-release-manager` | Release and repo cleanup workflow |

## Local-Only Workspaces

| Path | Purpose | Current State | Recommendation |
| --- | --- | --- | --- |
| `free_falcon_wasm` | Falcon WASM build output and wrapper | Not a git repo | Turn into package or fold into commerce demo |

## Recommended Structure

The project should avoid one giant repository. Instead:

1. `nexum-network` - public project and protocol hub.
2. `nexum-vault-ios` - mobile vault implementation.
3. `nexum-core` - Rust protocol and transport.
4. `free-falcon-wasm` - reproducible Falcon WASM package.
5. `nexum-commerce-demo` - minimal demo storefront, separate from the larger shop.

## Publication Rules

- Never publish `.env`, private keys, certificates, provisioning profiles, or real customer data.
- Do not publish unfinished crypto changes as production-ready.
- Use clear labels: `prototype`, `experimental`, `audited`, `production-ready`.
- Prefer small, reviewable commits over large mixed commits.
