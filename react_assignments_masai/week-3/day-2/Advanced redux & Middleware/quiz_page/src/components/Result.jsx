import React from "react";
import { useSelector } from "react-redux";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Result() {
  const { score, questions } = useSelector((state) => state.quiz);
  return (
    <Box p="4" textAlign="center">
      <Heading>Quiz Completed!</Heading>
      <Text fontSize="lg">Your Score: {score} / {questions.length}</Text>
    </Box>
  );
}
