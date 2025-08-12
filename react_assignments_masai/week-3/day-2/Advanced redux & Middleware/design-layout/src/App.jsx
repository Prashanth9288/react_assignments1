import React from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  SimpleGrid,
  Image,
  Text
} from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex
      as="nav"
      bg="teal.500"
      p="4"
      align="center"
      direction={{ base: "column", md: "row" }} // stack on mobile, row on desktop
    >
      <Heading size="md" color="white">My Responsive App</Heading>
      <Spacer display={{ base: "none", md: "block" }} />
      <Flex gap="4" mt={{ base: 2, md: 0 }}>
        <Button colorScheme="teal" variant="outline" size={{ base: "sm", md: "md" }}>
          Home
        </Button>
        <Button colorScheme="teal" variant="outline" size={{ base: "sm", md: "md" }}>
          About
        </Button>
        <Button colorScheme="teal" variant="solid" size={{ base: "sm", md: "md" }}>
          Contact
        </Button>
      </Flex>
    </Flex>
  );
}

function Card({ title, image, description }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Image src={image} alt={title} borderRadius="md" mb="3" />
      <Heading size="md" mb="2">{title}</Heading>
      <Text>{description}</Text>
    </Box>
  );
}

export default function App() {
  const cards = [
    {
      title: "Card 1",
      image: "https://via.placeholder.com/300x200",
      description: "Responsive UI with Chakra is easy!"
    },
    {
      title: "Card 2",
      image: "https://via.placeholder.com/300x200",
      description: "This card adjusts size based on screen."
    },
    {
      title: "Card 3",
      image: "https://via.placeholder.com/300x200",
      description: "Stack on mobile, grid on desktop."
    }
  ];

  return (
    <Box>
      <Navbar />
      <Box p="6">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="6">
          {cards.map((c, idx) => (
            <Card key={idx} {...c} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
