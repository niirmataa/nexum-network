import assert from "node:assert/strict";
import { test } from "node:test";
import { createNexumApi } from "../src/http.js";

test("GET /health returns ok", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      status: "ok",
      service: "nexum-api"
    });
  });
});

test("POST /v1/challenges creates a valid challenge", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/v1/challenges`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        purpose: "login",
        origin: "https://example.com",
        ttlSeconds: 60
      })
    });

    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.challenge.type, "nexum.challenge");
    assert.equal(body.challenge.purpose, "login");
    assert.match(body.challenge.challengeId, /^ch_/);
    assert.match(body.canonical, /^\{"challengeId":/);
  });
});

test("POST /v1/challenges rejects insecure origins", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/v1/challenges`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        purpose: "login",
        origin: "http://example.com"
      })
    });

    assert.equal(response.status, 400);
  });
});

test("POST /v1/responses/verify is structural until crypto verifier is configured", async () => {
  await withServer(async (baseUrl) => {
    const challengeResponse = await fetch(`${baseUrl}/v1/challenges`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        purpose: "login",
        origin: "https://example.com"
      })
    });
    const { challenge } = await challengeResponse.json();

    const response = await fetch(`${baseUrl}/v1/responses/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        challenge,
        response: {
          version: 1,
          type: "nexum.response",
          challengeId: challenge.challengeId,
          keyId: "vk_device_01TEST",
          algorithm: "Falcon-1024",
          publicKey: "cHVibGljLWtleQ",
          signature: "c2lnbmF0dXJl",
          nonce: "bm9uY2U",
          signedAt: challenge.issuedAt
        }
      })
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      structuralValid: true,
      signatureVerified: false,
      accepted: false,
      reason: "crypto_verifier_not_configured"
    });
  });
});

test("POST /v1/responses/verify rejects challenge id mismatch", async () => {
  await withServer(async (baseUrl) => {
    const challengeResponse = await fetch(`${baseUrl}/v1/challenges`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        purpose: "login",
        origin: "https://example.com"
      })
    });
    const { challenge } = await challengeResponse.json();

    const response = await fetch(`${baseUrl}/v1/responses/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        challenge,
        response: {
          version: 1,
          type: "nexum.response",
          challengeId: "ch_other_01TEST",
          keyId: "vk_device_01TEST",
          algorithm: "Falcon-1024",
          publicKey: "cHVibGljLWtleQ",
          signature: "c2lnbmF0dXJl",
          nonce: "bm9uY2U",
          signedAt: challenge.issuedAt
        }
      })
    });

    assert.equal(response.status, 200);
    assert.equal((await response.json()).reason, "challenge_id_mismatch");
  });
});

async function withServer(callback) {
  const server = createNexumApi();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  try {
    await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}
