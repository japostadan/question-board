import * as questionsRepository from "./questions.repository.js";

export async function listQuestions() {
  return questionsRepository.findAll();
}

export async function createQuestion(text) {
  return questionsRepository.save({ text });
}

export async function voteQuestion(id, username) {
  const question = await questionsRepository.findById(id);
  if (!question) return "not_found";
  if (question.voterIds.includes(username)) return "already_voted";
  return questionsRepository.castVote(id, username, question.votes, question.voterIds);
}
