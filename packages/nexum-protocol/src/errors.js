export class NexumProtocolError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "NexumProtocolError";
    this.details = details;
  }
}

export class NexumValidationError extends NexumProtocolError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "NexumValidationError";
  }
}

export class NexumCanonicalizationError extends NexumProtocolError {
  constructor(message, details = {}) {
    super(message, details);
    this.name = "NexumCanonicalizationError";
  }
}
