# E-Commerce Rewrite Plan

This plan tracks the clean rewrite path from the existing `e-commerce_shop_v1` workspace into focused Nexum packages and demo apps under the `lukasz82338233` GitHub account.

## Source Workspaces

| Source | Role | Current Use |
| --- | --- | --- |
| `e-commerce_shop_v1/storefront` | Existing Next.js storefront | Baseline UI and checkout/account integration |
| `e-commerce_shop_v1/packages/free-falcon-wasm` | Falcon C/WASM experiment | Source for future WASM package |
| `e-commerce_shop_v1/packages/nexum-cli` | Node HTTP wrapper around Nexum CLI | Source for service wrapper package |
| `e-commerce_shop_v1/storefront/src/lib/vault` | Browser/server vault prototype | Source for shared vault package |
| `e-commerce_shop_v1/storefront/src/app/api/nexum` | Next.js API routes | Source for demo integration |

## Target Repositories

Recommended ownership: `lukasz82338233`.

| Target | Visibility | Purpose |
| --- | --- | --- |
| `nexum-network` | Private during rewrite, public later if desired | Monorepo hub, protocol packages, skills, fixtures, demo CLI |
| `nexum-commerce-demo` | Private first | Minimal storefront demo, not full production shop |
| `nexum-falcon-wasm` | Private first | Reproducible Falcon WASM package and tests |
| `nexum-service-wrapper` | Private first | Hardened Nexum API wrapper around CLI/core |
| `nexum-vault-ios` | Already public | Mobile vault implementation |

## Target Package Layout

Inside `nexum-network`:

```text
packages/
  nexum-protocol/          # canonical JSON, challenge/response schema
  nexum-fixtures/          # synthetic fixtures and test vectors
  nexum-vault-core/        # vault data model, sharding, KDF interfaces
  nexum-falcon-types/      # algorithm IDs, key/signature envelope types
  nexum-commerce-contract/ # checkout/login challenge helpers
apps/
  nexum-demo-cli/
  commerce-demo/
skills/
  nexum-protocol-review/
  nexum-mobile-vault/
  nexum-commerce-integration/
  nexum-release-manager/
```

Outside `nexum-network`, once stable:

```text
nexum-falcon-wasm/
  packages/falcon-wasm/
  test/
  Dockerfile
  docs/reproducible-build.md

nexum-service-wrapper/
  packages/nexum-cli-server/
  docker/
  certs/
  test/
```

## Rewrite Order

### Step 1 - Protocol Contract

Status: started in `packages/nexum-protocol`.

Deliverables:

- canonical JSON,
- challenge validation,
- response validation,
- fixtures,
- demo CLI,
- CI.

Exit criteria:

- `npm run verify` passes,
- fixtures validate,
- agent skills exist.

### Step 2 - Commerce Contract

Move only shared checkout/login challenge helpers, not the whole storefront.

Deliverables:

- `packages/nexum-commerce-contract`,
- helpers for login challenge generation,
- helpers for checkout challenge generation,
- tests for origin, nonce, expiry, and purpose.

Exit criteria:

- no Next.js dependency,
- no Sylius dependency,
- no production env values,
- fixtures cover login and checkout flows.

### Step 3 - Vault Core

Extract reusable vault logic from `storefront/src/lib/vault`.

Deliverables:

- `packages/nexum-vault-core`,
- interfaces for storage, KDF, encryption, sharding,
- tests copied and cleaned from the storefront prototype.

Exit criteria:

- no `server-only` dependency,
- no browser global dependency unless injected,
- no private material in fixtures.

### Step 4 - Falcon WASM Package

Turn the current Falcon WASM experiment into a reproducible package.

Deliverables:

- `nexum-falcon-wasm` repository,
- source C files under explicit license notes,
- Docker build,
- Node and browser loaders,
- tamper tests.

Exit criteria:

- build is reproducible from documented command,
- generated `.wasm` is either committed intentionally or attached as release artifact,
- algorithm variant is labelled experimental.

### Step 5 - Service Wrapper

Move `packages/nexum-cli` into a standalone service wrapper repository.

Deliverables:

- HTTP server package,
- auth middleware,
- rate limit,
- mTLS option,
- Dockerfile,
- metrics endpoint,
- tests.

Exit criteria:

- no remote build dependency without pinning,
- no certificates committed,
- healthcheck and `/metrics` documented.

### Step 6 - Commerce Demo

Build a minimal demo app from scratch or from a small subset of storefront.

Deliverables:

- login challenge demo,
- checkout challenge demo,
- response verification route,
- screenshots or demo script.

Exit criteria:

- does not require production shop secrets,
- runs in CI,
- documented local commands.

## Commit Strategy

Use small commits:

1. `Add commerce challenge contract`
2. `Extract vault core interfaces`
3. `Add Falcon WASM package scaffold`
4. `Add reproducible Falcon WASM build`
5. `Add Nexum service wrapper scaffold`
6. `Add commerce demo login flow`
7. `Add commerce demo checkout flow`

Avoid mixed commits that combine cryptography, UI, Docker, and docs.

## CI Strategy

Every repository should start with:

- `npm run verify` or equivalent,
- fixture validation,
- no-secret scan,
- tests for tampered payloads,
- clear status badges after the first successful run.

## Safety Rules

- Treat `niirmataa` repositories as source/reference until the rewrite is clean.
- Do not copy production `.env` files.
- Do not publish private keys, mTLS keys, or provisioning profiles.
- Do not present experimental Falcon/FrodoKEM variants as audited.
- Keep demo code separate from production storefront code.
