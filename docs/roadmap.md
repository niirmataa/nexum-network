# Roadmap

## Milestone 0 - Public Project Hub

Goal: keep the project understandable, navigable, and technically honest.

Deliverables:

- project overview,
- product brief,
- architecture overview,
- repository map,
- security model,
- demo plan.

Acceptance criteria:

- no secrets in repository,
- linked repositories have clear status,
- known risks are visible instead of hidden.

## Milestone 1 - iOS Vault MVP

Goal: demonstrate QR challenge signing on a real iOS device.

Deliverables:

- iOS app builds in Xcode,
- challenge parser,
- canonical JSON signer,
- response QR/callback flow,
- local key storage design,
- test vectors.

Acceptance criteria:

- GitHub Actions passes,
- QR protocol is documented,
- private key is never serialized into a response,
- user can review challenge before signing.

## Milestone 2 - Falcon WASM Verifier

Goal: provide browser-side verification for demos and integrations.

Deliverables:

- standalone `free-falcon-wasm` repository or package,
- reproducible Docker build,
- browser and Node test harness,
- verifier API documentation.

Acceptance criteria:

- deterministic build instructions,
- tests for valid and tampered signatures,
- documented limitations of the Falcon variant.

## Milestone 3 - Rust Core Stabilization

Goal: restore a coherent and testable Rust workspace.

Deliverables:

- full workspace membership restored or intentionally split,
- secure ping tests,
- responder implementation beyond stub behavior,
- transport authentication notes,
- CI test matrix.

Acceptance criteria:

- `cargo test` passes for intended workspace,
- responder behavior is documented,
- unsafe and FFI boundaries are explicit.

## Milestone 4 - Commerce Demo

Goal: show a user approving a checkout or login challenge with the vault.

Deliverables:

- minimal public demo storefront,
- Nexum challenge generation endpoint,
- response verification endpoint,
- demo script and screenshots.

Acceptance criteria:

- demo runs from documented commands,
- no production shop secrets,
- failure modes are visible and testable.

## Milestone 5 - Security Review Readiness

Goal: prepare the project for external technical review.

Deliverables:

- threat model,
- key lifecycle document,
- protocol test vectors,
- dependency inventory,
- audit checklist.

Acceptance criteria:

- builds are reproducible,
- known risks are tracked,
- cryptographic assumptions are explicit.
