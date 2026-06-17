import { NexumCanonicalizationError } from "./errors.js";

export function canonicalize(value) {
  return serialize(value);
}

export function canonicalizeToBytes(value) {
  return new TextEncoder().encode(canonicalize(value));
}

function serialize(value) {
  if (value === null) {
    return "null";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new NexumCanonicalizationError("Cannot canonicalize non-finite number");
    }
    return JSON.stringify(value);
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => serialize(item)).join(",")}]`;
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort();
    const fields = keys.map((key) => {
      const fieldValue = value[key];
      if (fieldValue === undefined) {
        throw new NexumCanonicalizationError("Cannot canonicalize undefined object field", { key });
      }
      return `${JSON.stringify(key)}:${serialize(fieldValue)}`;
    });
    return `{${fields.join(",")}}`;
  }

  throw new NexumCanonicalizationError("Unsupported JSON value", {
    type: typeof value
  });
}

function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
