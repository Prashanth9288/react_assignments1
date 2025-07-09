// createhabit.js

import { db, auth } from './firbase-config.js';
import {
  ref,
  push
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

document.getElementById("habit-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value;
  const goal = document.getElementById("goal").value.trim();
  const goalType = document.getElementById("goalType").value;

  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to add a habit.");
    return;
  }

  const habitRef = ref(db, `habits/${user.uid}`);
  await push(habitRef, {
    name,
    category,
    goal: parseInt(goal),
    goalType,
    progress: 0,
    createdAt: Date.now()
  });

  document.getElementById("toast").innerText = "✅ Habit added!";
  document.getElementById("toast").classList.add("show");
  setTimeout(() => {
    document.getElementById("toast").classList.remove("show");
  }, 2000);

  document.getElementById("habit-form").reset();
});
