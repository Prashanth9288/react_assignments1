import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function Heatmap({ values }) {
  const end = new Date();
  const start = new Date();
  start.setMonth(end.getMonth() - 6);

  return (
    <CalendarHeatmap
      startDate={start}
      endDate={end}
      values={values}
      classForValue={(v) => {
        if (!v) return "color-empty";
        return v.count === 2 ? "color-github-3" : "color-github-1";
      }}
    />
  );
}
