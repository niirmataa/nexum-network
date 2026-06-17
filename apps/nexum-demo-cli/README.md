# @nexum-network/demo-cli

Small CLI for validating and canonicalizing Nexum JSON payloads.

The CLI is intentionally tiny. It is useful for demos and CI smoke checks, not for private key operations.

## Usage

```bash
node apps/nexum-demo-cli/src/cli.js canonical packages/nexum-fixtures/fixtures/challenge.login.json
node apps/nexum-demo-cli/src/cli.js validate packages/nexum-fixtures/fixtures/response.login.json
```
