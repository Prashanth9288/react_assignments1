import { useState, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";

export function useEntriesStore() {
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("entries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
    updateStreak();
  }, [entries]);

  const addEntry = (entry) => {
    const productive =
      entry.studyHours >= 2 && entry.focusLevel >= 3 && entry.stressLevel <= 3;
    const newEntry = { ...entry, productive };

    const filtered = entries.filter((e) => e.date !== entry.date);
    const updated = [...filtered, newEntry].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    setEntries(updated);
  };

  const updateStreak = () => {
    let streakCount = 0;
    for (let i = entries.length - 1; i >= 0; i--) {
      if (i === entries.length - 1) streakCount = 1;
      else {
        const diff = differenceInCalendarDays(
          new Date(entries[i + 1].date),
          new Date(entries[i].date)
        );
        if (diff === 1) streakCount++;
        else break;
      }
    }
    setStreak(streakCount);
  };

  return { entries, addEntry, streak };
}
