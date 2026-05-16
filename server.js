import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors(
    process.env.CORS_ORIGIN ? { origin: process.env.CORS_ORIGIN } : undefined,
  ),
);
app.use(express.json());

// Mock data
const questions = [
  { id: crypto.randomUUID(), text: "What is Node.js?", votes: 0 },
  { id: crypto.randomUUID(), text: "How to use Express?", votes: 0 },
];

app.get("/questions", (req, res) => {
  res.json(questions);
});

app.post("/questions", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text is required" });

  const newQuestion = { id: crypto.randomUUID(), text, votes: 0 };
  questions.push(newQuestion);
  res.status(201).json(newQuestion);
});

app.listen(process.env.PORT || 3001, () => {
  console.error(`Server listening on port ${process.env.PORT || 3001}`);
});
