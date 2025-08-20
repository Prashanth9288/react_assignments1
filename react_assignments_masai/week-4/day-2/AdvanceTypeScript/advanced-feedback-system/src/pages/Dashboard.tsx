import { Box, Heading, Text } from "@chakra-ui/react";
import FeedbackChart from "../components/FeedbackChart";
import FeedbackLineChart from "../components/FeedbackLineChart";
import { useAppSelector } from "../hooks/useFeedback";
import ExportCSV from "../components/ExportCSV";

const Dashboard = () => {
  const { items } = useAppSelector((s) => s.feedback);

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Dashboard
      </Heading>
      <Text>Total Feedbacks: {items.length}</Text>
      <ExportCSV />
      <FeedbackChart />
      <FeedbackLineChart />
    </Box>
  );
};

export default Dashboard;
