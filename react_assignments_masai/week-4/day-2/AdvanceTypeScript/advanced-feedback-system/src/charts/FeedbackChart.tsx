import { Box } from "@chakra-ui/react";
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
import { useAppSelector } from "../hooks/useFeedback";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeedbackChart = () => {
  const { items } = useAppSelector((s) => s.feedback);

  const counts = [1, 2, 3, 4, 5].map(
    (r) => items.filter((f) => f.rating === r).length
  );

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Number of Feedbacks",
        data: counts,
        backgroundColor: "rgba(56, 178, 172, 0.7)", // teal.400
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Feedback Ratings Distribution",
      },
    },
  };

  return (
    <Box bg="white" p={4} rounded="md" shadow="md" mt={6}>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default FeedbackChart;
