import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz, updateScore } from "../redux/actions";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, loading, error, currentIndex, score } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) dispatch(updateScore(1));
    if (currentIndex + 1 < questions.length) {
      questions.currentIndex++;
    } else {
      navigate("/result");
    }
  };

  if (loading) return <Text>Loading quiz...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (questions.length === 0) return null;

  const question = questions[currentIndex];

  return (
    <Box p="4">
      <VStack spacing="4">
        <Text fontSize="xl">{question.question}</Text>
        {question.options.map((opt, i) => (
          <Button key={i} onClick={() => handleAnswer(opt === question.correct_answer)}>
            {opt}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}
