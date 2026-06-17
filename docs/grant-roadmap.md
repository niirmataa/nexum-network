# Grant Roadmap

## Milestone 0 - Public Project Hub

Goal: Make the project understandable to reviewers.

Deliverables:

- project hub repository,
- product brief,
- architecture overview,
- repository map,
- security model,
- demo plan.

Acceptance criteria:

- no secrets in repository,
- all linked repositories have clear status,
- risks are visible instead of hidden.

## Milestone 1 - iOS Vault MVP

Goal: Demonstrate QR challenge signing on a real iOS device.

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

Goal: Provide browser-side verification for demos and integrations.

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

Goal: Restore a coherent and testable Rust workspace.

Deliverables:

- full workspace membership restored or intentionally split,
- secure ping tests,
- responder implementation beyond stub behavior,
- transport authentication notes,
- CI test matrix.

Acceptance criteria:

- `cargo test` passes for intended workspace,
- responder behavior is documented,
- unsafe/FFI boundaries are explicit.

## Milestone 4 - Commerce Demo

Goal: Show a user approving a checkout/login challenge with the vault.

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

Goal: Prepare the project for external review.

Deliverables:

- threat model,
- key lifecycle document,
- protocol test vectors,
- dependency inventory,
- audit checklist.

Acceptance criteria:

- reviewers can reproduce builds,
- known risks are tracked,
- cryptographic assumptions are explicit.
