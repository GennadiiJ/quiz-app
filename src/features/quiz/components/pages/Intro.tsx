import React from "react";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

interface IntroProps {
  numberOfQuestions: number | null;
  setNumberOfQuestions: (num: number) => void;
  handleStartQuiz: () => void;
}

const Intro: React.FC<IntroProps> = ({
  numberOfQuestions,
  setNumberOfQuestions,
  handleStartQuiz,
}) => {
  return (
    <Grid container spacing={4} columns={1}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Set number of questions
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            type="number"
            variant="outlined"
            label="Number of Questions"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartQuiz}
          sx={{ p: 2 }}
          fullWidth
        >
          Start Quiz
        </Button>
      </Grid>
    </Grid>
  );
};

export default Intro;
