// Habit creation logic

import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { showToast } from './notify.js'; // assuming you have toast functionality

const db = getDatabase();
const userId = "user123"; // Replace when auth is ready

const habitForm = document.getElementById("habitForm");
const nameInput = document.getElementById("habitName");
const categoryInput = document.getElementById("habitCategory");
const frequencyInput = document.getElementById("habitFrequency");
const targetInput = document.getElementById("habitTarget");
const cancelBtn = document.getElementById("cancelBtn");

// Listen for form submit
habitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const category = categoryInput.value;
  const frequency = frequencyInput.value;
  const target = targetInput.value.trim();

  if (!name || !category || !frequency || !target) {
    showToast("⚠️ Please fill out all fields!");
    return;
  }

  const newHabit = {
    name,
    category,
    frequency,
    target,
    completions: [],
    streak: 0,
    completionRate: 0,
    lastCompleted: "",
    createdAt: new Date().toISOString(),
    userId
  };

  const habitsRef = ref(db, "habits/");
  push(habitsRef, newHabit)
    .then(() => {
      showToast("✅ Habit Created Successfully!");
      habitForm.reset();
      window.location.href = "index.html"; // Redirect to dashboard
    })
    .catch((error) => {
      console.error("Error adding habit:", error);
      showToast("❌ Failed to add habit. Try again!");
    });
});

// Cancel Button
cancelBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});


import { showToast, requestNotificationPermission, scheduleHabitReminder } from "./notify.js";

document.addEventListener("DOMContentLoaded", () => {
  requestNotificationPermission(); // ask once on load
});

// After adding a habit
showToast("💪 Habit added successfully!");
scheduleHabitReminder("Drink Water", 60000); // 1 min delay for demo
