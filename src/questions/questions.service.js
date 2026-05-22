import * as questionsRepository from "./questions.repository.js";

export async function listQuestions() {
  return questionsRepository.findAll();
}

export async function createQuestion(text) {
  return questionsRepository.save({ text });
}

export async function voteQuestion(id, username) {
  return questionsRepository.castVote(id, username);
}
