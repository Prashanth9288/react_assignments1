import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";
import { useAppDispatch } from "../hooks/useFeedback";
import { addFeedback } from "../store/feedbackSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
  rating: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((n) => n >= 1 && n <= 5, "Rating must be between 1 and 5"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const FeedbackForm = () => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = (data: FeedbackFormValues) => {
    dispatch(addFeedback({ ...data, tags }));
    reset();
    setTags([]);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Box bg="white" p={6} rounded="md" shadow="md" mb={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input {...register("name")} placeholder="Enter your name" />
          <Box color="red.500">{errors.name?.message}</Box>
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.comment}>
          <FormLabel>Comment</FormLabel>
          <Textarea {...register("comment")} placeholder="Write feedback..." />
          <Box color="red.500">{errors.comment?.message}</Box>
        </FormControl>

        <FormControl mb={4} isInvalid={!!errors.rating}>
          <FormLabel>Rating</FormLabel>
          <Select {...register("rating")}>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
          <Box color="red.500">{errors.rating?.message}</Box>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Tags</FormLabel>
          <HStack spacing={2} mb={2}>
            {tags.map((tag) => (
              <Tag key={tag} borderRadius="full" variant="solid" colorScheme="teal">
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => removeTag(tag)} />
              </Tag>
            ))}
          </HStack>
          <HStack>
            <Input
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Button onClick={addTag} type="button">
              Add
            </Button>
          </HStack>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Submit Feedback
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;
