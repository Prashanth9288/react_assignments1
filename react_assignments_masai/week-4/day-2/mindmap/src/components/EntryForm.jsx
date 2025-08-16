import { useState } from "react";

export default function EntryForm({ onSave }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({
    date: today,
    studyHours: 0,
    breakMinutes: 0,
    sleepHours: 0,
    stressLevel: 3,
    focusLevel: 3,
    reflectionMd: "",
  });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
    alert("Entry saved!");
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <label>Date <input type="date" value={form.date}
        onChange={e=>setForm({...form, date:e.target.value})}/></label>
      <label>Study Hours <input type="number" value={form.studyHours}
        onChange={e=>setForm({...form, studyHours:+e.target.value})}/></label>
      <label>Break Minutes <input type="number" value={form.breakMinutes}
        onChange={e=>setForm({...form, breakMinutes:+e.target.value})}/></label>
      <label>Sleep Hours <input type="number" value={form.sleepHours}
        onChange={e=>setForm({...form, sleepHours:+e.target.value})}/></label>
      <label>Stress Level (1-5) <input type="number" min="1" max="5"
        value={form.stressLevel}
        onChange={e=>setForm({...form, stressLevel:+e.target.value})}/></label>
      <label>Focus Level (1-5) <input type="number" min="1" max="5"
        value={form.focusLevel}
        onChange={e=>setForm({...form, focusLevel:+e.target.value})}/></label>
      <textarea placeholder="Reflection (Markdown supported)"
        value={form.reflectionMd}
        onChange={e=>setForm({...form, reflectionMd:e.target.value})}/>
      <button type="submit">Save</button>
    </form>
  );
}
