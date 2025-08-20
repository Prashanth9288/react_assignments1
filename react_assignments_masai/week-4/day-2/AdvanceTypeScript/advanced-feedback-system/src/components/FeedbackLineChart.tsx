import { Box } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { useAppSelector } from "../hooks/useFeedback";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const FeedbackLineChart = () => {
  const { items } = useAppSelector((s) => s.feedback);

  // Sort by date
  const sorted = [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sorted.map((f) => f.date),
    datasets: [
      {
        label: "Rating over Time",
        data: sorted.map((f) => f.rating),
        borderColor: "rgba(56, 178, 172, 1)", // teal
        backgroundColor: "rgba(56, 178, 172, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Ratings Over Time" },
    },
    scales: {
      x: { type: "time", time: { unit: "day" } },
      y: { min: 1, max: 5, ticks: { stepSize: 1 } },
    },
  };

  return (
    <Box bg="white" p={4} rounded="md" shadow="md" mt={6}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default FeedbackLineChart;
