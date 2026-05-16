# ADR 0002 — Use Vitest instead of Jest

## Status
Accepted

## Context
The codebase uses ES module syntax (import/export). Jest does not support ESM natively and requires either Babel transforms or --experimental-vm-modules, both of which are non-trivial to configure — especially for beginner developers.

## Decision
Use Vitest. It has the same API as Jest (describe, it, expect, vi) so the mental model is identical, but it supports ESM out of the box with zero extra configuration.

## Consequences
- No Babel or experimental flags needed.
- Any Jest documentation the team finds online translates directly — the API is compatible.
- `vi.mock()` replaces `jest.mock()`, `vi.fn()` replaces `jest.fn()`.
