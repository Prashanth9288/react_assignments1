import { Box } from "@chakra-ui/react";
import FeedbackForm from "../components/FeedbackForm";
import Filters from "../components/Filters";
import FeedbackList from "../components/FeedbackList";

const Home = () => {
  return (
    <Box>
      <FeedbackForm />
      <Filters />
      <FeedbackList />
    </Box>
  );
};

export default Home;
