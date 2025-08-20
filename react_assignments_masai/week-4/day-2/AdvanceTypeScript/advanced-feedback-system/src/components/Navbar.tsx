import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useFeedback";
import { logout } from "../store/authSlice";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      p={4}
      bg="teal.500"
      color="white"
      justify="space-between"
      align="center"
    >
      <Heading size="md">Feedback System</Heading>
      <Flex gap={4} align="center">
        <Box as={NavLink} to="/" _hover={{ textDecoration: "underline" }}>
          Home
        </Box>
        <Box as={NavLink} to="/dashboard" _hover={{ textDecoration: "underline" }}>
          Dashboard
        </Box>
        <DarkModeToggle />
        {user ? (
          <>
            <Box>Hi, {user.username}</Box>
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
