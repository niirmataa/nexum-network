import assert from "node:assert/strict";
import { test } from "node:test";
import {
  challengeSigningPayload,
  validateChallenge,
  validateResponse,
  NexumValidationError
} from "../src/index.js";

const validChallenge = {
  version: 1,
  type: "nexum.challenge",
  challengeId: "ch_login_01TEST",
  purpose: "login",
  nonce: "YWJjMTIz",
  issuedAt: "2026-06-17T10:30:00Z",
  expiresAt: "2026-06-17T10:35:00Z",
  origin: "https://example.com",
  display: {
    title: "Sign in",
    description: "Approve login to example.com"
  }
};

test("validates a challenge", () => {
  assert.equal(validateChallenge(validChallenge).challengeId, validChallenge.challengeId);
});

test("rejects insecure challenge origin", () => {
  assert.throws(
    () => validateChallenge({ ...validChallenge, origin: "http://example.com" }),
    NexumValidationError
  );
});

test("rejects invalid challenge time range", () => {
  assert.throws(
    () =>
      validateChallenge({
        ...validChallenge,
        expiresAt: "2026-06-17T10:29:00Z"
      }),
    NexumValidationError
  );
});

test("builds a minimal signing payload", () => {
  const payload = challengeSigningPayload(validChallenge);
  assert.deepEqual(Object.keys(payload), [
    "challengeId",
    "expiresAt",
    "issuedAt",
    "nonce",
    "origin",
    "purpose",
    "type",
    "version"
  ]);
  assert.equal(payload.display, undefined);
});

test("validates a response", () => {
  const response = {
    version: 1,
    type: "nexum.response",
    challengeId: "ch_login_01TEST",
    keyId: "vk_device_01TEST",
    algorithm: "Falcon-1024",
    publicKey: "cHVibGljLWtleQ",
    signature: "c2lnbmF0dXJl",
    nonce: "bm9uY2U",
    signedAt: "2026-06-17T10:31:00Z",
    device: {
      platform: "ios"
    }
  };

  assert.equal(validateResponse(response).keyId, response.keyId);
});

test("rejects private material in response", () => {
  assert.throws(
    () =>
      validateResponse({
        version: 1,
        type: "nexum.response",
        challengeId: "ch_login_01TEST",
        keyId: "vk_device_01TEST",
        algorithm: "Falcon-1024",
        publicKey: "cHVibGljLWtleQ",
        privateKey: "do-not-ever-send",
        signature: "c2lnbmF0dXJl",
        nonce: "bm9uY2U",
        signedAt: "2026-06-17T10:31:00Z"
      }),
    NexumValidationError
  );
});
