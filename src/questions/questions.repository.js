const questions = [
  { id: crypto.randomUUID(), text: "What is Node.js?", votes: 0 },
  { id: crypto.randomUUID(), text: "How to use Express?", votes: 0 },
];

export async function findAll() {
  return questions;
}

export async function save({ text }) {
  const question = { id: crypto.randomUUID(), text, votes: 0 };
  questions.push(question);
  return question;
}
