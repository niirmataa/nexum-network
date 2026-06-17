# Nexum Commerce Integration

Use this skill for storefront, checkout, account login, and API integration work involving Nexum challenge/response flows.

## When To Use

Use this skill when the task mentions:

- storefront integration,
- checkout approval,
- login with Nexum,
- API route handlers,
- verifier endpoints,
- Docker compose services,
- mTLS or shared API tokens between services.

## Inputs

Expected inputs:

- storefront repository path,
- protocol fixtures,
- API logs,
- Docker compose status,
- test output,
- environment variable names without secret values.

## Workflow

1. Identify whether the change is frontend, backend route, verifier, or infrastructure.
2. Confirm no production secrets are committed.
3. Validate challenge generation against protocol fixtures.
4. Validate response verification against protocol rules.
5. Ensure replay, nonce, expiry, and origin checks are explicit.
6. Keep Docker and local dev paths separate from production assumptions.
7. Run relevant unit tests and type checks.

## Output

Return:

- routes/components changed,
- protocol compatibility notes,
- test status,
- deployment risks,
- required environment variables by name only.

## Safety Notes

- Do not commit `.env` files.
- Do not deploy or migrate production systems without human review.
- Do not expose API tokens, mTLS private keys, or customer data.
- Do not weaken validation to make demos pass.
