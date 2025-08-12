import { Box, Button, VStack } from "@chakra-ui/react";
import React from "react";

export default function Sidebar({ onSortChange }) {
  return (
    <Box p="4" borderRight="1px solid lightgray" height="100vh">
      <VStack spacing="4">
        <Button onClick={() => onSortChange("asc")} colorScheme="teal" w="100%">Sort by Price: Low → High</Button>
        <Button onClick={() => onSortChange("desc")} colorScheme="teal" w="100%">Sort by Price: High → Low</Button>
        <Button onClick={() => onSortChange("")} w="100%">Clear Sorting</Button>
      </VStack>
    </Box>
  );
}
