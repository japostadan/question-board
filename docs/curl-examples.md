# Testing endpoints with curl

Make sure the server is running (`npm start`) before sending any requests.

Replace `alice` with your own username. Replace the question id with a real one from the GET response.

---

## Get all questions

```bash
curl http://localhost:3001/questions \
  -H "x-username: alice"
```

---

## Post a new question

```bash
curl -X POST http://localhost:3001/questions \
  -H "x-username: alice" \
  -H "Content-Type: application/json" \
  -d '{"text": "What is the difference between let and const?"}'
```

---

## Upvote a question

```bash
curl -X POST http://localhost:3001/questions/your-question-id-here/vote \
  -H "x-username: alice"
```

---

## Common errors

| Error | Cause | Fix |
|-------|-------|-----|
| `400 x-username header is required` | Missing `-H "x-username: ..."` | Add the header |
| `400 text is required` | Missing or empty `text` in body | Add `"text": "..."` to the JSON body |
| `404 Question not found` | Wrong question id | Copy the `id` from a GET response |
| `409 Already voted` | You already upvoted this question | Each user can only vote once per question |
