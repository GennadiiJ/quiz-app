import React, { useMemo } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Question as QuestionType } from "../../../../types/quiz.types";

interface SummaryProps {
  userAnswers: { question: QuestionType; answer: string }[];
  handleRestartQuiz: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  userAnswers,
  handleRestartQuiz,
}) => {
  const correctAnswers = useMemo(
    () =>
      userAnswers.filter(
        ({ question, answer }) => question.correct_answer === answer
      ).length,
    [userAnswers]
  );

  const incorrectAnswers = userAnswers.length - correctAnswers;

  const totalQuestions = userAnswers.length;

  const score = ((correctAnswers / totalQuestions) * 100).toFixed(0);

  return (
    <Grid container spacing={4} columns={1}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          SUMMARY
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Correct: <strong>{correctAnswers}</strong>
        </Typography>
        <Typography variant="body1">
          Incorrect: <strong>{incorrectAnswers}</strong>
        </Typography>
        <Typography variant="body1">
          Questions answered: <strong>{totalQuestions}</strong>
        </Typography>
        <Typography variant="body1">
          Final Score: <strong>{score}%</strong>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRestartQuiz}
          sx={{ p: 2 }}
          fullWidth
        >
          Restart Quiz
        </Button>
      </Grid>
    </Grid>
  );
};

export default Summary;
