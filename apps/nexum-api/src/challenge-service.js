import { randomBytes as nodeRandomBytes } from "node:crypto";
import {
  canonicalize,
  challengeSigningPayload,
  validateChallenge,
  validateResponse
} from "../../../packages/nexum-protocol/src/index.js";

const DEFAULT_TTL_SECONDS = 300;
const MAX_TTL_SECONDS = 900;

export function createChallenge(input, options = {}) {
  const now = options.now ?? new Date();
  const randomBytes = options.randomBytes ?? nodeRandomBytes;
  const ttlSeconds = normalizeTtl(input.ttlSeconds);
  const issuedAt = new Date(now);
  const expiresAt = new Date(issuedAt.getTime() + ttlSeconds * 1000);

  const challenge = {
    version: 1,
    type: "nexum.challenge",
    challengeId: `ch_${base64url(randomBytes(18))}`,
    purpose: input.purpose,
    nonce: base64url(randomBytes(24)),
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    origin: input.origin
  };

  if (input.display !== undefined) {
    challenge.display = input.display;
  }

  const validated = validateChallenge(challenge);
  return {
    challenge: validated,
    canonical: canonicalize(challengeSigningPayload(validated))
  };
}

export async function verifyResponse(input, options = {}) {
  const challenge = validateChallenge(input.challenge);
  const response = validateResponse(input.response);

  if (challenge.challengeId !== response.challengeId) {
    return {
      structuralValid: false,
      signatureVerified: false,
      accepted: false,
      reason: "challenge_id_mismatch"
    };
  }

  const issuedAt = Date.parse(challenge.issuedAt);
  const expiresAt = Date.parse(challenge.expiresAt);
  const signedAt = Date.parse(response.signedAt);

  if (signedAt < issuedAt || signedAt > expiresAt) {
    return {
      structuralValid: false,
      signatureVerified: false,
      accepted: false,
      reason: "response_outside_challenge_window"
    };
  }

  if (!options.cryptoVerifier) {
    return {
      structuralValid: true,
      signatureVerified: false,
      accepted: false,
      reason: "crypto_verifier_not_configured"
    };
  }

  const signingPayload = canonicalize(challengeSigningPayload(challenge));
  const signatureVerified = await options.cryptoVerifier({
    algorithm: response.algorithm,
    message: signingPayload,
    publicKey: response.publicKey,
    signature: response.signature,
    nonce: response.nonce
  });

  return {
    structuralValid: true,
    signatureVerified,
    accepted: signatureVerified,
    reason: signatureVerified ? "ok" : "signature_invalid"
  };
}

function normalizeTtl(value) {
  if (value === undefined) {
    return DEFAULT_TTL_SECONDS;
  }

  if (!Number.isInteger(value) || value < 1 || value > MAX_TTL_SECONDS) {
    throw new Error(`ttlSeconds must be an integer between 1 and ${MAX_TTL_SECONDS}`);
  }

  return value;
}

function base64url(buffer) {
  return Buffer.from(buffer)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}
