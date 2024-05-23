import { Question } from "../types/quiz.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchQuestions = async (): Promise<Question[]> => {
  await delay(1000);

  const response = await fetch("/data.json");
  const data = await response.json();

  return data;
};
