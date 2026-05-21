import express from "express";
import cors from "cors";
import questionsRouter from "./questions/questions.router.js";
import { requireUsername } from "./middleware/username.js";

const app = express();

app.use(
  cors(
    process.env.CORS_ORIGIN ? { origin: process.env.CORS_ORIGIN } : undefined,
  ),
);
app.use(express.json());
app.use(requireUsername);

app.use("/questions", questionsRouter);

export default app;
