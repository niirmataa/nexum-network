# @nexum-network/api

Minimal HTTP API for Nexum challenge/response flows.

This service is intentionally small:

- no database yet,
- no production auth yet,
- no cryptographic verifier bundled yet,
- no framework dependency.

It provides the first backend seam for demos and CI:

- `GET /health`
- `POST /v1/challenges`
- `POST /v1/responses/verify`

## Run

```bash
node apps/nexum-api/src/server.js
```

## Create Challenge

```bash
curl -s http://localhost:8788/v1/challenges \
  -H 'content-type: application/json' \
  -d '{"purpose":"login","origin":"https://example.com"}'
```

## Verify Response

`/v1/responses/verify` currently performs structural verification and returns `accepted: false` unless a cryptographic verifier is injected.

That is deliberate. The backend must not pretend to verify Falcon signatures before the verifier package is wired in.
