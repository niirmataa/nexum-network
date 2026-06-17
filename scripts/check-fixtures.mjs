import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  canonicalize,
  validateChallenge,
  validateResponse
} from "../packages/nexum-protocol/src/index.js";

const fixturesDir = fileURLToPath(new URL("../packages/nexum-fixtures/fixtures/", import.meta.url));
const files = readdirSync(fixturesDir).filter((file) => file.endsWith(".json"));

let checked = 0;

for (const file of files) {
  const path = join(fixturesDir, file);
  const payload = JSON.parse(readFileSync(path, "utf8"));

  if (payload.type === "nexum.challenge") {
    validateChallenge(payload);
    canonicalize(payload);
    checked += 1;
    continue;
  }

  if (payload.type === "nexum.response") {
    validateResponse(payload);
    canonicalize(payload);
    checked += 1;
    continue;
  }

  throw new Error(`Unknown fixture type in ${file}: ${payload.type}`);
}

if (checked === 0) {
  throw new Error("No JSON fixtures checked");
}

console.log(`Checked ${checked} fixture(s)`);
