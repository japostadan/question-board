# ADR 0004 — Use a Postgres RPC for atomic vote casting

## Status
Accepted

## Context
The original `castVote` repository function passed app-layer values (`currentVotes`, `currentVoterIds`) into a PostgREST UPDATE. Two concurrent votes from different users would both read stale state and overwrite each other's writes — lost updates and voter_ids corruption. Two concurrent votes from the same user would both pass the JS-side `voterIds.includes()` guard, then the second would hit PGRST116 from `.single()` and return 500 instead of 409.

Alternatives considered:
- **Optimistic locking with retries**: add a `version` column, retry on conflict. More complex, still multiple network round trips, doesn't simplify the service layer.
- **Fix the JS UPDATE**: PostgREST's table API does not support `SET votes = votes + 1` or `array_append` — literal values only. Not possible without dropping to raw SQL.
- **Two-query pattern with DB-side increment**: keep SELECT + UPDATE but use raw SQL for the UPDATE. Still two network calls; same-user race still produces a 500 on the second request.

## Decision
Introduce a `cast_vote(question_id uuid, username text)` Postgres function that performs the entire vote operation atomically in one DB-side statement. It returns a discriminated JSON object `{ outcome: 'voted' | 'not_found' | 'already_voted', question: {...} | null }`. The repository calls it via `supabase.rpc()` and normalises the returned row; the service layer is unchanged.

The function SQL lives in `docs/sql/cast_vote.sql` and is applied manually via the Supabase SQL Editor.

## Consequences
- No lost updates or voter_ids corruption under concurrent votes.
- Same-user race correctly returns `already_voted` (409) instead of a 500.
- `findById` is removed from the repository — it was only used by the vote flow.
- Business logic (duplicate check, existence check) moves into the DB. Future changes to vote rules require a function update in Supabase as well as app code.
- The `cast_vote` function must be created in both the prod and test Supabase projects.
