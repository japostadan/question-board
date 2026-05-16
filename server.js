import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors(
    process.env.CORS_ORIGIN ? { origin: process.env.CORS_ORIGIN } : undefined,
  ),
);
app.use(express.json());

const validateQuestion = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required" });
  }

  if (title.length < 5) {
    return res.status(400).json({ error: "Title must be at least 5 characters long" });
  }

  if (content.length < 10) {
    return res.status(400).json({ error: "Content must be at least 10 characters long" });
  }

  next();
};

// Mock data
const questions = [
  { id: crypto.randomUUID(), question: "What is Node.js?", votes: 0 },
  { id: crypto.randomUUID(), question: "How to use Express?", votes: 0 },
];

// Fetch the questions posted
app.get("/questions", (req, res) => {
  res.json(questions);
});

app.post("/questions", validateQuestion, (req, res) => {
  const { title, content } = req.body;
  const newQuestion = { id: crypto.randomUUID(), title, content, votes: 0 };
  questions.push(newQuestion);
  res.status(201).json({ message: "Question created successfully", question: newQuestion });
});

app.listen(process.env.PORT || 3001, () => {
  console.error(`Server listening on port ${process.env.PORT || 3001}`);
});
