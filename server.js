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

  // Check if title exists
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  // Check if content exists
  if (!content || content.trim() === "") {
    return res.status(400).json({
      error: "Content is required",
    });
  }

  // Check title length
  if (title.length < 5) {
    return res.status(400).json({
      error: "Title must be at least 5 characters long",
    });
  }

  // Check content length
  if (content.length < 10) {
    return res.status(400).json({
      error: "Content must be at least 10 characters long",
    });
  }

  next();
};

// Define your API routes here
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

//Validate question,post
app.post("/questions", validateQuestion, (req, res) => {
  const { title, content } = req.body;

  const newQuestion = {
    id: questions.length + 1,
    title,
    content,
  };

  questions.push(newQuestion);

  res.status(201).json({
    message: "Question created successfully",
    question: newQuestion,
  });
});

// Mock data
  const questions = [
    { id: 1, title: "What is Node.js?", content: "I want to know more about Node.js." },
    { id: 2, title: "How to use Express?", content: "Can someone explain how to use Express?" },
  ]

// Fetch the questions posted
app.get("/questions", (req, res) => {
  // In a real application, you would fetch questions from a database
  res.json(questions);
});

app.listen(process.env.PORT || 3001, () => {
  console.error(`Server listening on port ${process.env.PORT || 3001}`);
});
