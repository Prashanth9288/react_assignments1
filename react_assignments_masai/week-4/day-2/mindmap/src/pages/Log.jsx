import EntryForm from "../components/EntryForm";
import { useEntriesStore } from "../store/useEntries";

export default function Log() {
  const { addEntry } = useEntriesStore();
  return <div><h1>New Log</h1><EntryForm onSave={addEntry}/></div>;
}
