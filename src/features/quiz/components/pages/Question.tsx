import React, { useState } from "react";
import {
  Button,
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { QUESTION_TYPE } from "../../../../constants";
import { Question as QuestionType } from "../../../../types/quiz.types";

interface QuestionProps {
  question: QuestionType;
  handleNext: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, handleNext }) => {
  const [answer, setAnswer] = useState<string>("");

  const handleClickNext = () => {
    handleNext(answer);
    setAnswer("");
  };

  return (
    <Grid container spacing={4} columns={1}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {question.question}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          {question.type === QUESTION_TYPE.multiple && (
            <RadioGroup
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              {question.incorrect_answers
                ?.concat(question.correct_answer)
                .sort()
                .map((answer) => (
                  <FormControlLabel
                    key={answer}
                    value={answer}
                    control={<Radio />}
                    label={answer}
                  />
                ))}
            </RadioGroup>
          )}
          {question.type === QUESTION_TYPE.boolean && (
            <RadioGroup
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              <FormControlLabel value="True" control={<Radio />} label="True" />
              <FormControlLabel
                value="False"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          )}
          {question.type === QUESTION_TYPE.text && (
            <TextField
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickNext}
          disabled={!answer}
          sx={{ p: 2 }}
          fullWidth
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Question;
