import { useEntriesStore } from "../store/useEntries";
import Heatmap from "../components/Heatmap";
import { getInsights } from "../utils/insights";

export default function Dashboard() {
  const { entries, streak } = useEntriesStore();
  const values = entries.map(e=>({ date:e.date, count: e.productive?2:1 }));
  const insights = getInsights(entries);

  return (
    <div>
      <h1>Dashboard</h1>
      <div> Streak: {streak} days</div>
      <Heatmap values={values}/>
      <h2>Insights</h2>
      <ul>
        {insights.length
          ? insights.map((i,idx)=><li key={idx}>{i}</li>)
          : <li>Log at least 7 days to see insights</li>}
      </ul>
    </div>
  );
}
