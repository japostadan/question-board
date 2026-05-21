# Question Board — Domain Context

## Glossary

### Question
A post submitted by a User containing a text prompt for the group to see.
- Fields: `id` (UUID), `text`, `votes` (count), `voterIds` (array of usernames), `createdAt` (ISO8601)
- A Question belongs to the shared board; there is no concept of sessions or rooms yet.
- Returned sorted by `votes` descending; ties broken by `createdAt` descending (newest first).

### Layer naming convention
The database stores fields in snake_case (`voter_ids`, `created_at`). The repository layer translates to camelCase before returning to the service. Service and controller layers never see DB column names.

### Vote
An upvote action by a User on a Question.
- One Vote per User per Question — enforced by checking `voterIds` before accepting an upvote.
- Votes are not retractable (no downvote, no undo).
- The duplicate-vote check and the vote increment happen in two queries: a `SELECT` to distinguish 404 (question missing) from 409 (already voted), then an atomic `UPDATE` that increments `votes` and appends the username to `voterIds` only if the user is not already present.

### Test Framework
Vitest. Same API as Jest but supports ESM natively — no config needed.
See ADR 0002.

### Database
Supabase (PostgreSQL). Used from day one — no intermediate SQLite phase.
See ADR 0001.
- Client wrapped in `src/db.js`. All repository modules import from there — no module constructs its own client.
- App fails fast on missing `SUPABASE_URL` or `SUPABASE_ANON_KEY` at module load time in `src/db.js`.
- Tests run against a real Supabase test project (separate from prod). No mocks of database behaviour. Each test cleans up rows it creates.

### User
A person who interacts with the board, identified by a self-reported username stored in localStorage.
- No password, no server-side session — identity is not verified.
- Risk acknowledged: usernames can be impersonated. Accepted for now; real auth is a future concern.
