# Agent Skills

The `skills/` directory contains reusable agent instructions for working on Nexum modules.

These skills are project-local documentation, not installed global Codex skills. They can be copied into an agent environment or referenced by maintainers when assigning tasks.

## Skills

| Skill | Purpose |
| --- | --- |
| `nexum-protocol-review` | Review challenge/response schema changes and canonical JSON behavior |
| `nexum-mobile-vault` | Guide iOS vault work, QR flows, local keys, and user review screens |
| `nexum-commerce-integration` | Guide storefront integration work without leaking production secrets |
| `nexum-release-manager` | Prepare release checklists, CI checks, and module status updates |

## Rules

- Skills must not instruct agents to deploy production services without human review.
- Skills must not ask agents to paste secrets.
- Skills must clearly label experimental cryptography.
- Skills should prefer tests and fixtures before implementation changes.
