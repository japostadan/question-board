# Question Board

A shared board where team members can post questions and upvote the ones they care about most.

## Stack

- **Runtime**: Node.js with Express 5
- **Database**: Supabase (PostgreSQL)
- **Tests**: Vitest + supertest

---

See [CONTRIBUTING.md](./CONTRIBUTING.md) for coding conventions, linter usage, and API response rules.

---

## Working on an issue

### 1. Pick an issue

Go to the [GitHub issues](https://github.com/japostadan/question-board/issues). Check the "Blocked by" section — don't start an issue until its blockers are merged.

### 2. Create a branch

Never commit directly to `main`. Create a branch named `yourname/short-description`:

```bash
git checkout main
git pull
git checkout -b alice/username-middleware
```

### 3. Write your tests first (TDD)

Before writing any implementation code, write a failing test first. This is called **red-green-refactor**:

1. **Red** — write a test that describes the behavior you want. Run it and confirm it fails.
2. **Green** — write the minimum code to make the test pass.
3. **Refactor** — clean up the code without changing the behavior. Run the tests again to confirm they still pass.

```bash
npm test        # run tests in watch mode
npm run test:run   # run tests once
```

Each issue has acceptance criteria with specific test cases listed. Use those as your starting point.

### 4. Open a pull request

When your branch is ready:

```bash
git push -u origin alice/username-middleware
```

Then open a PR on GitHub. In the PR description, reference the issue it closes:

```
Closes #8
```

### 5. Get a review

At least one teammate must review and approve your PR before it can be merged. Review someone else's PR while you wait — the team moves faster when reviews are not a bottleneck.

### 6. Merge

Once approved, merge the PR into `main` on GitHub. Delete the branch after merging.

---

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the Supabase credentials (ask the person working on issue #6):
   ```bash
   cp .env.example .env
   ```

3. Start the server:
   ```bash
   npm start
   ```

---

## API

All requests require an `x-username` header.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/questions` | List all questions, sorted by votes |
| `POST` | `/questions` | Post a new question `{ text: string }` |
| `POST` | `/questions/:id/vote` | Upvote a question (once per user) |
