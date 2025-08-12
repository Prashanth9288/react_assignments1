import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoffees } from "../redux/coffeeActions";
import { SimpleGrid, Spinner, Text, Box, Flex } from "@chakra-ui/react";
import CoffeeCard from "./CoffeeCard";
import Sidebar from "./Sidebar";

export default function CoffeeList() {
  const dispatch = useDispatch();
  const { loading, coffees, error } = useSelector((state) => state.coffee);

  useEffect(() => {
    dispatch(fetchCoffees());
  }, [dispatch]);

  const handleSortChange = (order) => {
    dispatch(fetchCoffees(order));
  };

  return (
    <Flex>
      <Sidebar onSortChange={handleSortChange} />
      <Box flex="1" p="4">
        {loading && <Spinner size="xl" />}
        {error && <Text color="red.500">{error}</Text>}
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
