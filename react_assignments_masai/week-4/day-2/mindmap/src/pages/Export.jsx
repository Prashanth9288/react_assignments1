import { useEntriesStore } from "../store/useEntries";
import { exportPDF } from "../utils/pdf";
import { useState } from "react";

export default function Export() {
  const { entries } = useEntriesStore();
  const [month, setMonth] = useState("2025-08");

  return (
    <div>
      <h1>Export Journal</h1>
      <input value={month} onChange={e=>setMonth(e.target.value)} />
      <button onClick={()=>exportPDF(entries, month)}>Download PDF</button>
    </div>
  );
}
