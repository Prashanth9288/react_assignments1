import { Box, FormControl, FormLabel, Input, NumberInput, NumberInputField, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useFeedback";
import { setFilters, clearFilters } from "../store/feedbackSlice";

const Filters = () => {
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState<number | undefined>();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const applyFilters = () => {
    dispatch(setFilters({ rating, search, date }));
  };

  return (
    <Box bg="white" p={4} rounded="md" shadow="md" mb={4}>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Search</FormLabel>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Filter by Rating</FormLabel>
          <NumberInput min={1} max={5} value={rating ?? ""} onChange={(_, v) => setRating(v || undefined)}>
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Filter by Date</FormLabel>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </FormControl>

        <Stack direction="row" spacing={2}>
          <Button onClick={applyFilters} colorScheme="teal">Apply</Button>
          <Button onClick={() => dispatch(clearFilters())} variant="outline">Clear</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Filters;
