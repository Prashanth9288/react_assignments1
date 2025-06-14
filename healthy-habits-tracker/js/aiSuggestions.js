// AI suggestions

import { db, auth } from "./firebaseConfig.js";
import { showToast } from "./notify.js";

// 💡 Custom logic to analyze habits & suggest improvements
export async function generateHabitSuggestions() {
  const user = auth.currentUser;
  if (!user) return;

  const habitsRef = db.collection("habits").where("userId", "==", user.uid);
  const snapshot = await habitsRef.get();

  let categoryStats = {
    hydration: { total: 0, completed: 0 },
    sleep: { total: 0, completed: 0 },
    fitness: { total: 0, completed: 0 },
    mindfulness: { total: 0, completed: 0 }
  };

  snapshot.forEach(doc => {
    const habit = doc.data();
    const cat = habit.category || "other";

    if (categoryStats[cat]) {
      categoryStats[cat].total += 1;
      if (habit.isCompletedToday) categoryStats[cat].completed += 1;
    }
  });

  const suggestions = [];

  for (let cat in categoryStats) {
    const { total, completed } = categoryStats[cat];
    const rate = total ? (completed / total) : 0;

    if (rate < 0.5) {
      switch (cat) {
        case "hydration":
          suggestions.push("Try drinking 8 glasses of water daily 💧");
          break;
        case "sleep":
          suggestions.push("Aim for at least 7 hours of sleep each night 😴");
          break;
        case "fitness":
          suggestions.push("Include at least 20 min of activity per day 🏋️‍♂️");
          break;
        case "mindfulness":
          suggestions.push("Practice 10 mins of meditation or journaling 🧘");
          break;
      }
    }
  }

  displaySuggestions(suggestions);
}

// 📦 Inject suggestions into the page (can customize UI)
function displaySuggestions(suggestions) {
  const suggestionBox = document.getElementById("ai-suggestions");
  suggestionBox.innerHTML = "";

  if (suggestions.length === 0) {
    suggestionBox.innerHTML = `<p>You're doing great! Keep it up! 🎉</p>`;
    return;
  }

  suggestions.forEach(text => {
    const suggestion = document.createElement("div");
    suggestion.className = "suggestion-card";
    suggestion.textContent = text;
    suggestionBox.appendChild(suggestion);
  });

  showToast("🤖 New personalized suggestions generated!");
}
