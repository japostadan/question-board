# ADR 0001 — Use Supabase from day one

## Status
Accepted

## Context
The board needs persistence (data must survive server restarts) and user identity across sessions. Supabase was already the team's intended long-term database. The alternative was starting with SQLite and migrating later.

## Decision
Use Supabase directly, skipping an intermediate SQLite phase.

## Consequences
- No schema migration needed later — we build on the real target from the start.
- Team needs Supabase project credentials before the first DB-touching task can be tested.
- Free tier is sufficient for a team board at this scale.
