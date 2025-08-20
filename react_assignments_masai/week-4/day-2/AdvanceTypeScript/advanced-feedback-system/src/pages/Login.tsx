import { Box, Button, FormControl, FormLabel, Input, Select, Heading } from "@chakra-ui/react";
import { useAppDispatch } from "../hooks/useFeedback";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login({ username, role }));
      navigate("/");
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={20} p={6} bg="white" shadow="md" rounded="md">
      <Heading size="md" mb={4}>Login</Heading>
      <FormControl mb={4}>
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Role</FormLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value as "user" | "admin")}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin} w="full">
        Login
      </Button>
    </Box>
  );
};

export default Login;
