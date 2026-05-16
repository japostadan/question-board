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
    { id: 1, title: "What is Node.js?", content: "I want to know more about Node.js.", votes: 0, },
    { id: 2, title: "How to use Express?", content: "Can someone explain how to use Express?", votes: 0, },
  ]

// Fetch the questions posted
app.get("/questions", (req, res) => {
  // In a real application, you would fetch questions from a database
  res.json(questions);
});

app.post("/question/vote", (req, res) => {
  const bodyBytes = [];

  req.on("data", (chunk) => bodyBytes.push(...chunk));
  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);
    let body;

    try {
      body = JSON.parse(bodyString);
    } catch (error) {
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`);
      res.status(400).send("Expected body to be JSON");
      return;
    }
    if (typeof body != "object" || !("id" in body) || !("value" in body)) {
      console.error(`Failed to extract id and value from post body: ${body}`);
      res
        .status(400)
        .send("Expected body to be a JSON object contains keys id and value");
      return;
    }
    const question = questions.find(q => q.id === body.id);
    question.votes += body.value;
    res.send("ok");
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.error(`Server listening on port ${process.env.PORT || 3001}`);
});
