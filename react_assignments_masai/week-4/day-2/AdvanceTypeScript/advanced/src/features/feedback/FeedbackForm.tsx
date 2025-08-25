import { useState } from "react";
import { Box, Button, VStack, Heading, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addFeedback } from "./feedbackSlice";

function FeedbackForm() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment || rating === 0) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(addFeedback({ name, comment, rating }));
    toast({
      title: "Feedback submitted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setName("");
    setComment("");
    setRating(0);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Heading size="md" textAlign="center" color="teal.500">
          Submit Your Feedback
        </Heading>

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Comment</FormLabel>
          <Textarea
            placeholder="Your feedback"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Rating</FormLabel>
          <Select
            placeholder="Select rating"
            value={rating || ""}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          Submit Feedback
        </Button>
      </VStack>
    </Box>
  );
}

export default FeedbackForm;
