import { createServer } from "node:http";
import { NexumValidationError } from "../../../packages/nexum-protocol/src/index.js";
import { createChallenge, verifyResponse } from "./challenge-service.js";

const MAX_BODY_BYTES = 16 * 1024;

export function createNexumApi(options = {}) {
  return createServer(async (req, res) => {
    try {
      await route(req, res, options);
    } catch (error) {
      writeError(res, error);
    }
  });
}

async function route(req, res, options) {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (req.method === "GET" && url.pathname === "/health") {
    return writeJson(res, 200, {
      status: "ok",
      service: "nexum-api"
    });
  }

  if (req.method === "POST" && url.pathname === "/v1/challenges") {
    const body = await readJson(req);
    return writeJson(res, 201, createChallenge(body, options));
  }

  if (req.method === "POST" && url.pathname === "/v1/responses/verify") {
    const body = await readJson(req);
    return writeJson(res, 200, await verifyResponse(body, options));
  }

  return writeJson(res, 404, {
    error: "not_found"
  });
}

async function readJson(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("Request body too large");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  if (raw.length === 0) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error("Invalid JSON body");
    error.statusCode = 400;
    throw error;
  }
}

function writeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(`${JSON.stringify(payload)}\n`);
}

function writeError(res, error) {
  const statusCode =
    error.statusCode ??
    (error instanceof NexumValidationError ? 400 : 500);

  writeJson(res, statusCode, {
    error: statusCode >= 500 ? "internal_error" : "bad_request",
    message: error.message
  });
}
