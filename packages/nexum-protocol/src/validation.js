import { NexumValidationError } from "./errors.js";

const CHALLENGE_ID_RE = /^ch_[A-Za-z0-9_-]{6,80}$/;
const KEY_ID_RE = /^vk_[A-Za-z0-9_-]{6,80}$/;
const PURPOSE_RE = /^[a-z][a-z0-9._:-]{1,63}$/;
const BASE64URL_RE = /^[A-Za-z0-9_-]+$/;
const ALGORITHM_RE = /^(Falcon-(512|1024|1536)|FREE-Falcon-[A-Za-z0-9._-]+)$/;

export function validateChallenge(input) {
  const payload = requireObject(input, "challenge");

  requireExact(payload.version, 1, "version");
  requireExact(payload.type, "nexum.challenge", "type");
  requirePattern(payload.challengeId, CHALLENGE_ID_RE, "challengeId");
  requirePattern(payload.purpose, PURPOSE_RE, "purpose");
  requireBase64url(payload.nonce, "nonce");
  requireHttpsUrl(payload.origin, "origin");

  const issuedAt = requireIsoDate(payload.issuedAt, "issuedAt");
  const expiresAt = requireIsoDate(payload.expiresAt, "expiresAt");
  if (expiresAt <= issuedAt) {
    throw new NexumValidationError("expiresAt must be after issuedAt", {
      issuedAt: payload.issuedAt,
      expiresAt: payload.expiresAt
    });
  }

  if (payload.display !== undefined) {
    requireObject(payload.display, "display");
  }

  rejectDangerousFields(payload);
  return deepCloneJson(payload);
}

export function validateResponse(input) {
  const payload = requireObject(input, "response");

  requireExact(payload.version, 1, "version");
  requireExact(payload.type, "nexum.response", "type");
  requirePattern(payload.challengeId, CHALLENGE_ID_RE, "challengeId");
  requirePattern(payload.keyId, KEY_ID_RE, "keyId");
  requirePattern(payload.algorithm, ALGORITHM_RE, "algorithm");
  requireBase64url(payload.publicKey, "publicKey");
  requireBase64url(payload.signature, "signature");
  requireBase64url(payload.nonce, "nonce");
  requireIsoDate(payload.signedAt, "signedAt");

  if (payload.device !== undefined) {
    requireObject(payload.device, "device");
  }

  rejectDangerousFields(payload);
  return deepCloneJson(payload);
}

export function challengeSigningPayload(challenge) {
  const validated = validateChallenge(challenge);
  return {
    challengeId: validated.challengeId,
    expiresAt: validated.expiresAt,
    issuedAt: validated.issuedAt,
    nonce: validated.nonce,
    origin: validated.origin,
    purpose: validated.purpose,
    type: validated.type,
    version: validated.version
  };
}

function requireObject(value, field) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new NexumValidationError(`${field} must be an object`, { field });
  }
  return value;
}

function requireExact(value, expected, field) {
  if (value !== expected) {
    throw new NexumValidationError(`${field} must be ${JSON.stringify(expected)}`, {
      field,
      expected,
      actual: value
    });
  }
}

function requirePattern(value, pattern, field) {
  if (typeof value !== "string" || !pattern.test(value)) {
    throw new NexumValidationError(`${field} has invalid format`, { field });
  }
}

function requireBase64url(value, field) {
  requirePattern(value, BASE64URL_RE, field);
}

function requireHttpsUrl(value, field) {
  if (typeof value !== "string") {
    throw new NexumValidationError(`${field} must be a string`, { field });
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new NexumValidationError(`${field} must be a valid URL`, { field });
  }

  if (url.protocol !== "https:") {
    throw new NexumValidationError(`${field} must use https`, { field });
  }
}

function requireIsoDate(value, field) {
  if (typeof value !== "string") {
    throw new NexumValidationError(`${field} must be an ISO timestamp string`, { field });
  }

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    throw new NexumValidationError(`${field} must be a valid ISO timestamp`, { field });
  }

  return new Date(timestamp);
}

function rejectDangerousFields(payload) {
  for (const key of Object.keys(payload)) {
    const lower = key.toLowerCase();
    if (lower.includes("private") || lower.includes("secret") || lower.includes("password")) {
      throw new NexumValidationError("Payload must not include private or secret material", {
        field: key
      });
    }
  }
}

function deepCloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}
