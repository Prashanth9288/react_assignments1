import { Button } from "@chakra-ui/react";
import { useAppSelector } from "../hooks/useFeedback";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const ExportCSV = () => {
  const { items, filters } = useAppSelector((s) => s.feedback);

  const filtered = items.filter((f) => {
    if (filters.rating && f.rating !== filters.rating) return false;
    if (filters.date && !f.date.startsWith(filters.date)) return false;
    if (filters.search && !f.comment.toLowerCase().includes(filters.search.toLowerCase()))
      return false;
    if (filters.tag && (!f.tags || !f.tags.includes(filters.tag))) return false;
    return true;
  });

  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "feedback_export.csv");
  };

  return (
    <Button onClick={exportCSV} colorScheme="blue" mt={4}>
      Export CSV
    </Button>
  );
};

export default ExportCSV;
