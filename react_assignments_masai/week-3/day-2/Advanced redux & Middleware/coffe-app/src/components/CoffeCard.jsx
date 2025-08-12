import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function CoffeeCard({ coffee }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Image src={coffee.image} alt={coffee.title} boxSize="150px" objectFit="cover" m="auto" />
      <Text mt="2" fontWeight="bold">{coffee.title}</Text>
      <Text>${coffee.price}</Text>
    </Box>
  );
}
