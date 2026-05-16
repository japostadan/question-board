# Contributing

See [README.md](./README.md) for the full git workflow (branching, PRs, reviews).

---

## Testing endpoints manually

- **VS Code** — install the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and open [`docs/requests.http`](./docs/requests.http). Click "Send Request" above any request.
- **Terminal / other editors** — see [`docs/curl-examples.md`](./docs/curl-examples.md) for curl commands.

---

## Linter and formatter

We use ESLint to catch errors and Prettier to enforce consistent formatting. Run these before pushing:

```bash
npm run lint        # check for errors
npm run format      # auto-fix formatting
```

If `lint` reports errors that `format` didn't fix, you need to fix those manually — they are real code issues, not style.

---

## Conventions

### JavaScript

- Use `const` by default. Use `let` only when you need to reassign. Never use `var`.
- Use ES module syntax (`import`/`export`). Never use `require`.
- Use `async/await`. Avoid raw `.then()` chains.

### Naming

| Thing | Convention | Example |
|-------|-----------|---------|
| Variables and functions | camelCase | `voterIds`, `fetchQuestions` |
| Files | kebab-case | `username-middleware.js` |
| Test files | match the file + `.test.js` | `username-middleware.test.js` |

### API responses

Always return JSON. Never return a plain string.

```js
// error
res.status(400).json({ error: "text is required" });

// success
res.status(200).json(data);
```

Use the right status code:

| Code | When |
|------|------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (missing field, invalid input) |
| 404 | Resource not found |
| 409 | Conflict (e.g. already voted) |
| 500 | Unexpected server error |

### Tests

- Write the test first, then the implementation (see README for TDD steps).
- Test files go in the `tests/` directory.
- Only test external behavior (HTTP status codes, response shape) — not internal implementation details.
- Each test file covers one endpoint or one module.
