# Product Brief

## One-Liner

Nexum Network is a post-quantum signing and vault system for user-approved digital actions.

## Problem

Modern web and commerce systems often collapse identity, approval, and custody into a single server-side account session. This creates weak points:

- users cannot clearly inspect what they are approving,
- private keys are often absent or hidden behind custodial infrastructure,
- signatures are difficult to use across devices,
- phishing resistance is weak when approvals happen inside the same browser session.

## Proposed Solution

Nexum separates the approval device from the requesting service.

A service creates a challenge. The user scans it with a vault app, reviews the payload, signs canonical JSON locally, and returns a response. The private key never leaves the device.

## Initial Use Cases

- passwordless login,
- high-value checkout approval,
- escrow or withdrawal authorization,
- node/operator handshake approval,
- offline recovery and audit flows.

## Why It Matters

This creates a practical user experience for strong signatures without forcing users to understand key files, command-line wallets, or raw cryptographic payloads.

## Current Prototype

The current prototype includes:

- iOS QR signing vault,
- Falcon signing mock/core interfaces,
- canonical JSON tests,
- storefront integration work,
- Rust secure ping/transport experiments,
- Falcon WASM verifier artifacts.

## Production Gap

Before production, the project needs:

- cryptographic review,
- canonicalization compatibility vectors,
- mobile keychain and biometric threat review,
- hardened API auth and rate limiting,
- reproducible builds,
- release signing,
- clear license and governance.
