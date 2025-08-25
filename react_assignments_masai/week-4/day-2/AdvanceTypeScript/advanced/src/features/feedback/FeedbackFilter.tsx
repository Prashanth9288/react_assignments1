import { Box, Flex } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";

interface FeedbackFilterProps {
  rating: number | "";
  setRating: (rating: number | "") => void;
  date: string;
  setDate: (date: string) => void;
}

function FeedbackFilter({ rating, setRating, date, setDate }: FeedbackFilterProps) {
  return (
    <Box mb={4} p={4} borderWidth="1px" borderRadius="lg">
      <Flex gap={4} flexWrap="wrap">
        <FormControl w="150px">
          <FormLabel>Rating</FormLabel>
          <Select
            placeholder="All"
            value={rating}
            onChange={(e) => setRating(e.target.value ? Number(e.target.value) : "")}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl w="200px">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
      </Flex>
    </Box>
  );
}

export default FeedbackFilter;
