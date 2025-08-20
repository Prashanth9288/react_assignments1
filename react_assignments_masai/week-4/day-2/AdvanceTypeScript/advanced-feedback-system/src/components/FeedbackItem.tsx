import { Box, Flex, Text, IconButton, Badge } from "@chakra-ui/react";
import { useAppDispatch } from "../hooks/useFeedback";
import { removeFeedback } from "../store/feedbackSlice";
import { Feedback } from "../store/types";
import { DeleteIcon } from "@chakra-ui/icons";

const FeedbackItem = ({ feedback }: { feedback: Feedback }) => {
  const dispatch = useAppDispatch();

  return (
    <Box bg="white" p={4} rounded="md" shadow="sm" mb={3}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontWeight="bold">{feedback.name}</Text>
          <Text fontSize="sm" color="gray.600">
            {new Date(feedback.date).toLocaleString()}
          </Text>
          <Text mt={2}>{feedback.comment}</Text>
          <Badge colorScheme="purple" mt={2}>
            Rating: {feedback.rating}
          </Badge>
        </Box>
        <IconButton
          aria-label="Delete feedback"
          icon={<DeleteIcon />}
          colorScheme="red"
          variant="ghost"
          onClick={() => dispatch(removeFeedback(feedback.id))}
        />
      </Flex>
    </Box>
  );
};

export default FeedbackItem;
