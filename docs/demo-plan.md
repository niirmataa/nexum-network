# Demo Plan

## Demo Goal

Show a complete user-approved signing flow:

1. Website creates a challenge.
2. iOS vault scans QR.
3. User reviews the request.
4. Vault signs canonical JSON.
5. Website verifies response.

## 10-Minute Demo Script

### 1. Project Context

Explain the problem: approvals should not be invisible browser clicks. They should be explicit, local, and signed.

### 2. Challenge Generation

Show a web page creating a challenge with:

- `challengeId`,
- `purpose`,
- `origin`,
- `nonce`,
- `issuedAt`,
- `expiresAt`,
- display text.

### 3. QR Scan

Open the iOS vault and scan the challenge.

### 4. Human Review

Show the review screen:

- origin,
- purpose,
- expiry,
- amount or action if present.

### 5. Signature

Approve with device authentication and generate a signed response.

### 6. Verification

Return the response to the browser or API and verify:

- signature valid,
- nonce valid,
- challenge not expired,
- no replay.

### 7. Failure Cases

Show at least one failure:

- tampered payload,
- expired challenge,
- wrong origin,
- replayed response.

## Demo Assets To Prepare

- short screen recording,
- challenge JSON example,
- response JSON example,
- architecture diagram,
- one-page security summary.
