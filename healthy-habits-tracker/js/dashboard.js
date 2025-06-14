// Dashboard logic

import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { showToast } from './notify.js'; // assuming toast logic in notify.js

const db = getDatabase();
const habitsRef = ref(db, "habits/");
const habitsContainer = document.getElementById("habitsContainer");

const userId = "user123"; // TODO: Replace with actual auth user ID when auth.js is done

// Render all habits from Firebase
onValue(habitsRef, (snapshot) => {
  habitsContainer.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const habit = childSnapshot.val();
    const habitId = childSnapshot.key;
    renderHabitCard(habit, habitId);
  });
});

// Create Habit Card UI
function renderHabitCard(habit, habitId) {
  const card = document.createElement("div");
  card.className = "habit-card";

  const streak = habit.streak || 0;
  const completionRate = habit.completionRate || 0;
  const isCompletedToday = habit.lastCompleted === getToday();

  card.innerHTML = `
    <div class="habit-header">
      <h3>${habit.name}</h3>
      <span class="category-label ${habit.category.toLowerCase()}">${habit.category}</span>
    </div>
    <p>Target: ${habit.target}</p>
    <div class="habit-meta">
      <span>🔥 ${streak} day streak</span>
      <span>❤️ ${completionRate}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress" style="width:${completionRate}%;"></div>
    </div>
    <button class="complete-btn" ${isCompletedToday ? 'disabled' : ''} onclick="markDone('${habitId}')">
      ${isCompletedToday ? '✔️ Completed' : 'Mark Done'}
    </button>
  `;

  habitsContainer.appendChild(card);
}

// Mark habit as complete
window.markDone = function (habitId) {
  const today = getToday();
  const habitRef = ref(db, `habits/${habitId}`);

  onValue(habitRef, (snapshot) => {
    const habit = snapshot.val();
    const completions = habit.completions || [];
    const lastCompleted = habit.lastCompleted || null;

    // Prevent duplicate marking
    if (lastCompleted === today) return;

    // Update streak
    const yesterday = getYesterday();
    const newStreak = lastCompleted === yesterday ? (habit.streak || 0) + 1 : 1;

    // Update completion rate
    const updatedCompletions = [...completions, today];
    const completionRate = Math.floor((updatedCompletions.length / 7) * 100);

    update(habitRef, {
      lastCompleted: today,
      completions: updatedCompletions,
      streak: newStreak,
      completionRate: completionRate
    });

    showToast(`🎉 Great job! You completed: ${habit.name}`);
  }, {
    onlyOnce: true
  });
};

// Helper Functions
function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}


import { generateHabitSuggestions } from "./aiSuggestions.js";

document.addEventListener("DOMContentLoaded", () => {
  generateHabitSuggestions(); // Show suggestions on page load
});

import { generateHabitSuggestions } from "./aiSuggestions.js";

document.addEventListener("DOMContentLoaded", () => {
  generateHabitSuggestions(); // Show suggestions on page load
});

import { logOut, monitorAuthState } from "./auth.js";

document.getElementById("logoutBtn").addEventListener("click", logOut);

monitorAuthState(
  user => {
    console.log("User logged in:", user.email);
    document.getElementById("userEmail").textContent = user.email;
    // continue loading habits...
  },
  () => {
    window.location.href = "login.html";
  }
);


