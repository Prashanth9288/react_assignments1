import { Box, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { removeFeedback, clearFeedback } from "./feedbackSlice";
import FeedbackFilter from "./FeedbackFilter";
import { useState } from "react";

function FeedbackList() {
  const dispatch = useDispatch<AppDispatch>();
  const feedbacks = useSelector((state: RootState) => state.feedback.feedbacks);

  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [dateFilter, setDateFilter] = useState("");

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesRating = ratingFilter ? fb.rating === ratingFilter : true;
    const matchesDate = dateFilter
      ? fb.date.slice(0, 10) === dateFilter
      : true;
    return matchesRating && matchesDate;
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Feedback List</Heading>
        {feedbacks.length > 0 && (
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => dispatch(clearFeedback())}
          >
            Clear All
          </Button>
        )}
      </Flex>

      <FeedbackFilter
        rating={ratingFilter}
        setRating={setRatingFilter}
        date={dateFilter}
        setDate={setDateFilter}
      />

      {filteredFeedbacks.length === 0 ? (
        <Text>No feedback found for selected filters.</Text>
      ) : (
        <Stack spacing={4}>
          {filteredFeedbacks.map((fb) => (
            <Box
              key={fb.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              shadow="sm"
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold">{fb.name}</Text>
                  <Text>{fb.comment}</Text>
                  <Text color="gray.500" fontSize="sm">
                    Rating: {fb.rating} | {new Date(fb.date).toLocaleString()}
                  </Text>
                </Box>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => dispatch(removeFeedback(fb.id))}
                />
              </Flex>
            </Box>
          ))}
        </Stack>
      )}
      <Divider mt={6} />
    </Box>
  );
}

export default FeedbackList;
