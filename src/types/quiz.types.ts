import { QUIZ_STATUS, QUESTION_TYPE } from "../constants";

export interface Question {
  category: string;
  type: (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers?: string[];
}

export type QuizStatus = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];
