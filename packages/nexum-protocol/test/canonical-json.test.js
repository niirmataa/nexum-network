import assert from "node:assert/strict";
import { test } from "node:test";
import { canonicalize, NexumCanonicalizationError } from "../src/index.js";

test("canonicalize sorts object keys recursively", () => {
  assert.equal(
    canonicalize({ z: 1, a: { z: 2, a: 3 }, m: [3, 1, 2] }),
    "{\"a\":{\"a\":3,\"z\":2},\"m\":[3,1,2],\"z\":1}"
  );
});

test("canonicalize preserves array order", () => {
  assert.equal(canonicalize({ items: [3, 1, 2] }), "{\"items\":[3,1,2]}");
});

test("canonicalize rejects undefined fields", () => {
  assert.throws(
    () => canonicalize({ ok: true, bad: undefined }),
    NexumCanonicalizationError
  );
});

test("canonicalize rejects non-finite numbers", () => {
  assert.throws(() => canonicalize({ value: Infinity }), NexumCanonicalizationError);
});
