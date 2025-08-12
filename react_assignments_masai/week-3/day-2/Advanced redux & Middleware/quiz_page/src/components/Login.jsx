import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser(email, password));
  };

  if (isAuth) {
    navigate("/quiz");
  }

  return (
    <Box w="300px" m="auto" mt="100px" p="4" boxShadow="md" borderRadius="md">
      <VStack spacing="4">
        <Heading size="md">Login</Heading>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="teal" isLoading={loading} onClick={handleLogin}>
          Login
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
}
