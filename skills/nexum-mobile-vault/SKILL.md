# Nexum Mobile Vault

Use this skill for iOS vault work: QR scanning, local key storage, challenge review, signing response UX, and mobile security checks.

## When To Use

Use this skill when the task mentions:

- iOS vault,
- QR scanner,
- challenge review screen,
- biometric unlock,
- keychain storage,
- response QR,
- TestFlight or Xcode build.

## Inputs

Expected inputs:

- repository link or checkout for `nexum-vault-ios`,
- challenge/response fixtures,
- QR protocol docs,
- Xcode or GitHub Actions logs,
- screenshots or device behavior notes.

## Workflow

1. Confirm whether the work is UI, protocol, storage, or build-related.
2. For protocol changes, compare against `@nexum-network/protocol` fixtures.
3. Keep private keys device-local and never include them in responses.
4. Make challenge review screens explicit about origin, purpose, expiry, and amount/action.
5. Prefer real-device testing for camera, biometrics, and keychain behavior.
6. Run package tests and Xcode/CI checks when available.
7. Document unresolved security assumptions.

## Output

Return:

- changed vault behavior,
- user-visible flow summary,
- tests/build status,
- security risks,
- device testing notes.

## Safety Notes

- Do not ask users to paste private keys.
- Do not log private key material or raw secrets.
- Do not claim Secure Enclave support unless the implementation actually uses it.
- Keep simulator results separate from real-device security claims.
