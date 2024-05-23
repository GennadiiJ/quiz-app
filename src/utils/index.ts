import { Question } from "./../types/quiz.types";

export const getRandomQuestion = (questions: Question[]): Question => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};
