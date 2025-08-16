export function getInsights(entries) {
  if (entries.length < 7) return [];

  const hiSleep = entries.filter(e => e.sleepHours >= 8);
  const loSleep = entries.filter(e => e.sleepHours < 8);
  const avg = arr => arr.reduce((a,b)=>a+b,0)/(arr.length||1);

  const insights = [];

  if (avg(hiSleep.map(e=>e.focusLevel)) - avg(loSleep.map(e=>e.focusLevel)) > 0.5) {
    insights.push("You focus better after 8+ hours of sleep.");
  }

  const longBreak = entries.filter(e=>e.breakMinutes>=30);
  const shortBreak = entries.filter(e=>e.breakMinutes<30);
  if (avg(longBreak.map(e=>e.stressLevel)) < avg(shortBreak.map(e=>e.stressLevel))) {
    insights.push("Longer breaks seem to reduce stress levels.");
  }

  return insights;
}
