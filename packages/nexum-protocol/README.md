# @nexum-network/protocol

Zero-dependency protocol primitives for Nexum challenge and response payloads.

This package intentionally does not implement Falcon signing or verification. It defines the stable payload layer around signing:

- canonical JSON serialization,
- challenge validation,
- response validation,
- signing payload helpers,
- protocol errors.

## Example

```js
import {
  canonicalize,
  validateChallenge,
  challengeSigningPayload
} from "@nexum-network/protocol";

const challenge = validateChallenge(input);
const bytesToSign = challengeSigningPayload(challenge);
const canonical = canonicalize(challenge);
```
