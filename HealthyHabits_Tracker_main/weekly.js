import { db, auth } from "./firbase-config.js";
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const today = new Date().toISOString().split("T")[0];
const thisWeek = [...Array(7)].map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return d.toISOString().split("T")[0];
});

auth.onAuthStateChanged(user => {
  if (!user) {
    alert("Login required");
    window.location.href = "../index.html";
    return;
  }

  const habitsRef = ref(db, `habits/${user.uid}`);
  onValue(habitsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    let dailyTotal = 0, dailyDone = 0, weeklySum = 0;
    const habitStats = {};
    const categoryStats = {};
    const weeklyByDay = {};

    thisWeek.forEach(date => weeklyByDay[date] = 0);

    Object.entries(data).forEach(([habitId, habit]) => {
      const { name, logs = {}, category } = habit;
      dailyTotal++;
      const todayValue = logs[today]?.value || 0;
      if (todayValue > 0) dailyDone++;

      let count = 0;
      thisWeek.forEach(date => {
        if (logs[date]?.value) {
          weeklySum++;
          count++;
          weeklyByDay[date]++;
        }
      });

      habitStats[name] = count;
      categoryStats[category] = (categoryStats[category] || 0) + count;
    });

    const dailyRate = Math.round((dailyDone / dailyTotal) * 100);
    const weeklyRate = Math.round((weeklySum / (dailyTotal * 7)) * 100);
    const bestHabit = Object.entries(habitStats).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
    const worstHabit = Object.entries(habitStats).sort((a, b) => a[1] - b[1])[0]?.[0] || "-";

    const trackedCategories = Object.keys(categoryStats).length;
    const wellnessScore = Math.round(
      Object.values(categoryStats).reduce((a, b) => a + b, 0) / (trackedCategories * 7) * 100
    );

    // Update DOM
    document.getElementById("daily-progress").textContent = `${dailyDone}/${dailyTotal}`;
    document.getElementById("weekly-rate").textContent = `${weeklyRate}%`;
    document.getElementById("best-habit").textContent = bestHabit;
    document.getElementById("worst-habit").textContent = worstHabit;
    document.getElementById("wellness-score").textContent = `${wellnessScore}/100`;

    const indicator = document.getElementById("score-indicator");
    indicator.style.width = `${wellnessScore}%`;
    indicator.style.background = wellnessScore < 60 ? "red" : wellnessScore < 80 ? "orange" : "green";

    if (wellnessScore < 50) {
      showReminder("⚠️ Your wellness score is low. Let’s get back on track!");
    }

    renderBarChart(Object.keys(weeklyByDay), Object.values(weeklyByDay));
    renderPieChart(Object.keys(categoryStats), Object.values(categoryStats));
  });
});

function renderBarChart(labels, data) {
  new Chart(document.getElementById("weeklyChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Habits Completed",
        data,
        backgroundColor: "#00c6ff"
      }]
    },
    options: { responsive: true }
  });
}

function renderPieChart(labels, data) {
  new Chart(document.getElementById("categoryPieChart"), {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ["#ff7b00", "#4caf50", "#a259ff", "#00a86b", "#2196f3", "#f44336"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

function showReminder(msg) {
  const toast = document.getElementById("reminder-toast");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 4000);
}
