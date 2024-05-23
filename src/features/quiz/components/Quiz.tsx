import { useCallback, useEffect, useState } from "react";
import { CircularProgress, Container, Box } from "@mui/material";
import Intro from "./pages/Intro";
import Question from "./pages/Question";
import Summary from "./pages/Summary";
import {
  Question as QuestionType,
  QuizStatus,
} from "../../../types/quiz.types";
import { fetchQuestions } from "../../../mock-api";
import { getRandomQuestion } from "../../../utils";
import { QUIZ_STATUS } from "../../../constants";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const [numberOfQuestions, setNumberOfQuestions] = useState<number | null>(
    null
  );

  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
    {} as QuestionType
  );

  const [userAnswers, setUserAnswers] = useState<
    { question: QuestionType; answer: string }[]
  >([]);

  const [quizStatus, setQuizStatus] = useState<QuizStatus>(QUIZ_STATUS.intro);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!questions.length) {
      setLoading(true);
      fetchQuestions().then((data) => {
        setQuestions(data);
        setLoading(false);
      });
    }
  }, [questions]);

  const handleStartQuiz = useCallback(() => {
    if (numberOfQuestions && numberOfQuestions > 0 && numberOfQuestions <= 10) {
      setUserAnswers([]);
      setCurrentQuestion(getRandomQuestion(questions));
      setQuizStatus(QUIZ_STATUS.inProgress);
    }
  }, [numberOfQuestions, questions]);

  const handleNext = useCallback(
    (answer: string) => {
      setUserAnswers((prevUserAnswers) => [
        ...prevUserAnswers,
        { question: currentQuestion, answer },
      ]);

      if (numberOfQuestions && userAnswers.length + 1 < numberOfQuestions) {
        setCurrentQuestion(getRandomQuestion(questions));
      } else {
        setQuizStatus(QUIZ_STATUS.completed);
      }
    },
    [currentQuestion, numberOfQuestions, questions, userAnswers]
  );

  const handleRestartQuiz = useCallback(() => {
    setQuizStatus(QUIZ_STATUS.intro);
    setNumberOfQuestions(null);
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="sm">
      {quizStatus === QUIZ_STATUS.intro && (
        <Intro
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          handleStartQuiz={handleStartQuiz}
        />
      )}
      {quizStatus === QUIZ_STATUS.inProgress && (
        <Question question={currentQuestion} handleNext={handleNext} />
      )}
      {quizStatus === QUIZ_STATUS.completed && (
        <Summary
          userAnswers={userAnswers}
          handleRestartQuiz={handleRestartQuiz}
        />
      )}
    </Container>
  );
};

export default Quiz;
