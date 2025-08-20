import { VStack, Text, Button, HStack } from "@chakra-ui/react";
import { useAppSelector } from "../hooks/useFeedback";
import FeedbackItem from "./FeedbackItem";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

const FeedbackList = () => {
  const { items, filters } = useAppSelector((s) => s.feedback);
  const [page, setPage] = useState(1);

  const filtered = items.filter((f) => {
    if (filters.rating && f.rating !== filters.rating) return false;
    if (filters.date && !f.date.startsWith(filters.date)) return false;
    if (filters.search && !f.comment.toLowerCase().includes(filters.search.toLowerCase()))
      return false;
    if (filters.tag && (!f.tags || !f.tags.includes(filters.tag))) return false;
    return true;
  });

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <VStack spacing={4} align="stretch">
      {currentPageItems.length === 0 ? (
        <Text>No feedback yet.</Text>
      ) : (
        currentPageItems.map((f) => <FeedbackItem key={f.id} feedback={f} />)
      )}

      {totalPages > 1 && (
        <HStack justify="center" mt={4}>
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))} isDisabled={page === 1}>
            Prev
          </Button>
          <Text>
            Page {page} of {totalPages}
          </Text>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            isDisabled={page === totalPages}
          >
            Next
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default FeedbackList;
