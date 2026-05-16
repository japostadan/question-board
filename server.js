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
    { id: crypto.randomUUID(),
      question: "What is Node.js?", 
      votes: 0, 
    },

    { id: crypto.randomUUID,
       question: "How to use Express?", 
       votes: 0,
       },
  ]

// Fetch the questions posted
app.get("/questions", (req, res) => {
  // In a real application, you would fetch questions from a database
  res.json(questions);
});

app.post("/questions", (req, res) => {
  const newQuestion = req.body.question
  questions.push({
    id: crypto.randomUUID(),
    question: newQuestion,
    votes: 0
  })

  res.json({ok: true})
}), 

app.listen(process.env.PORT || 3001, () => {
  console.error(`Server listening on port ${process.env.PORT || 3001}`);
});
 

