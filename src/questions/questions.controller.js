import * as questionsService from "./questions.service.js";

export async function list(req, res) {
  const questions = await questionsService.listQuestions();
  res.json(questions);
}

export async function create(req, res) {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text is required" });

  const question = await questionsService.createQuestion(text);
  res.status(201).json(question);
}
