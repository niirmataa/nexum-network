#!/usr/bin/env node
import { readFileSync } from "node:fs";
import {
  canonicalize,
  validateChallenge,
  validateResponse
} from "../../../packages/nexum-protocol/src/index.js";

const [, , command, file] = process.argv;

if (!command || !file || !["canonical", "validate"].includes(command)) {
  console.error("Usage: nexum-demo <canonical|validate> <payload.json>");
  process.exit(1);
}

const payload = JSON.parse(readFileSync(file, "utf8"));

if (command === "validate") {
  validateByType(payload);
  console.log("ok");
}

if (command === "canonical") {
  validateByType(payload);
  console.log(canonicalize(payload));
}

function validateByType(payload) {
  if (payload.type === "nexum.challenge") {
    return validateChallenge(payload);
  }
  if (payload.type === "nexum.response") {
    return validateResponse(payload);
  }
  throw new Error(`Unknown Nexum payload type: ${payload.type}`);
}
