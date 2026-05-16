# Question Board — Domain Context

## Glossary

### Question
A post submitted by a User containing a text prompt for the group to see.
- Fields: `id` (UUID), `text`, `votes` (count), `voterIds` (array of usernames), `createdAt` (ISO8601)
- A Question belongs to the shared board; there is no concept of sessions or rooms yet.

### Vote
An upvote action by a User on a Question.
- One Vote per User per Question — enforced by checking `voterIds` before accepting an upvote.
- Votes are not retractable (no downvote, no undo).

### Test Framework
Vitest. Same API as Jest but supports ESM natively — no config needed.
See ADR 0002.

### Database
Supabase (PostgreSQL). Used from day one — no intermediate SQLite phase.
See ADR 0001.

### User
A person who interacts with the board, identified by a self-reported username stored in localStorage.
- No password, no server-side session — identity is not verified.
- Risk acknowledged: usernames can be impersonated. Accepted for now; real auth is a future concern.
