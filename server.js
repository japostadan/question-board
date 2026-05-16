import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors(
    process.env.CORS_ORIGIN ? { origin: process.env.CORS_ORIGIN } : undefined,
  ),
);
app.use(express.json());

// Define your API routes here
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
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
