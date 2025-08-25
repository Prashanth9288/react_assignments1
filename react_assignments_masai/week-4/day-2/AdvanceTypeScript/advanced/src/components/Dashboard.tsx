import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const feedbacks = useSelector((state: RootState) => state.feedback.feedbacks);

  // Count feedback per rating
  const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  feedbacks.forEach((fb) => {
    ratingCounts[fb.rating] = (ratingCounts[fb.rating] || 0) + 1;
  });

  const chartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Feedback Count",
        data: Object.values(ratingCounts),
        backgroundColor: "rgba(56, 178, 172, 0.6)", // teal.400
        borderColor: "rgba(56, 178, 172, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Feedback Ratings Distribution",
      },
    },
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Dashboard
      </Heading>
      {feedbacks.length === 0 ? (
        <Text>No feedback available for analytics.</Text>
      ) : (
        <VStack spacing={6}>
          <Bar data={chartData} options={chartOptions} />
          <Text>Total Feedbacks: {feedbacks.length}</Text>
          <Text>
            Average Rating:{" "}
            {(
              feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length
            ).toFixed(2)}
          </Text>
        </VStack>
      )}
    </Box>
  );
}

export default Dashboard;
