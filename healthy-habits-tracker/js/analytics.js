// Analytics logic

import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import Chart from "https://cdn.jsdelivr.net/npm/chart.js"; // Chart.js import
import { showToast } from './notify.js';

const db = getDatabase();
const habitsRef = ref(db, "habits/");
const userId = "user123"; // Replace with auth user ID

const wellnessScoreEl = document.getElementById("wellnessScore");
const bestHabitEl = document.getElementById("bestHabit");
const worstHabitEl = document.getElementById("worstHabit");
const categoryChartCanvas = document.getElementById("categoryChart");

let categoryTotals = {
  Fitness: 0,
  Sleep: 0,
  Hydration: 0,
  Meditation: 0
};

onValue(habitsRef, (snapshot) => {
  const habits = [];
  snapshot.forEach((childSnapshot) => {
    const habit = childSnapshot.val();
    if (habit.userId === userId) habits.push(habit);
  });

  if (habits.length === 0) {
    showToast("No habits to analyze.");
    return;
  }

  const score = calculateWellnessScore(habits);
  renderWellnessScore(score);
  renderCategoryChart(habits);
  highlightBestWorst(habits);
});

// 🧠 Wellness Score Calculation
function calculateWellnessScore(habits) {
  let totalRate = 0;
  let streakScore = 0;

  habits.forEach(habit => {
    totalRate += habit.completionRate || 0;
    streakScore += Math.min(habit.streak || 0, 10) * 2;
    if (categoryTotals[habit.category]) {
      categoryTotals[habit.category] += 1;
    }
  });

  const avgCompletion = totalRate / habits.length;
  const balanceScore = Object.values(categoryTotals).filter(val => val > 0).length / 4 * 20;

  const finalScore = Math.round((avgCompletion * 0.6) + (streakScore * 0.2) + (balanceScore * 0.2));
  return Math.min(finalScore, 100);
}

// 🔢 Show Wellness Score
function renderWellnessScore(score) {
  let current = 0;
  const interval = setInterval(() => {
    wellnessScoreEl.innerText = `${current}%`;
    if (current >= score) clearInterval(interval);
    current++;
  }, 20);

  if (score < 50) {
    wellnessScoreEl.classList.add("score-drop");
    showToast("⚠️ Your wellness score is dropping. Focus on consistency!");
  } else {
    wellnessScoreEl.classList.remove("score-drop");
  }
}

// 📊 Render Category Pie Chart
function renderCategoryChart(habits) {
  const categoryCounts = {
    Fitness: 0,
    Sleep: 0,
    Hydration: 0,
    Meditation: 0
  };

  habits.forEach(habit => {
    if (categoryCounts[habit.category] !== undefined) {
      categoryCounts[habit.category]++;
    }
  });

  new Chart(categoryChartCanvas, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categoryCounts),
      datasets: [{
        data: Object.values(categoryCounts),
        backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0', '#9966ff']
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// 🏆 Best/Worst Habit
function highlightBestWorst(habits) {
  const sorted = habits.sort((a, b) => b.completionRate - a.completionRate);
  bestHabitEl.innerText = `🏆 ${sorted[0].name} (${sorted[0].completionRate}%)`;
  worstHabitEl.innerText = `🔻 ${sorted[sorted.length - 1].name} (${sorted[sorted.length - 1].completionRate}%)`;
}


import { generateHabitSuggestions } from "./aiSuggestions.js";

document.addEventListener("DOMContentLoaded", () => {
  generateHabitSuggestions(); // Show suggestions on page load
});
