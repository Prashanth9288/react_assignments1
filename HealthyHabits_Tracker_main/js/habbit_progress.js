import { db, auth } from "./firbase-config.js";
import {
  ref,
  onValue,
  update,
  remove,
  set
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function renderHabits(userId) {
  const userHabitsRef = ref(db, `habits/${userId}`);

  onValue(userHabitsRef, (snapshot) => {
    const container = document.getElementById("habit-list");
    if (!container) return;

    container.innerHTML = "";
    const data = snapshot.val();

    if (!data) {
      container.innerHTML = "<p>No habits added yet.</p>";
      return;
    }

    Object.entries(data).forEach(([habitId, habit]) => {
      const today = getToday();
      const log = habit.logs?.[today]?.value || 0;
      const progress = Math.min((log / habit.goal) * 100, 100).toFixed(0);
      const completed = parseInt(progress) >= 100;

      const habitHTML = `
        <div class="habit-card ${habit.category}">
          <div class="habit-header">
            <h3>${habit.name}</h3>
            <span class="tag">${habit.category}</span>
          </div>
          <p>Goal: ${habit.goal} ${habit.goalType}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width:${progress}%">${progress}%</div>
          </div>
          <input type="number" id="log-${habitId}" placeholder="Enter progress" />
          <button onclick="logProgress('${userId}', '${habitId}')">Log</button>
          <button onclick="editHabit('${userId}', '${habitId}', '${habit.name}', '${habit.goal}')">Edit</button>
          <button onclick="deleteHabit('${userId}', '${habitId}')">Delete</button>
          ${completed ? `<div class="completed-badge">✔ Completed</div>` : ""}
        </div>
      `;

      container.innerHTML += habitHTML;
    });
  });
}

window.logProgress = async function (userId, habitId) {
  const input = document.getElementById(`log-${habitId}`);
  const value = parseInt(input.value);
  const today = getToday();

  if (!isNaN(value)) {
    const logRef = ref(db, `habits/${userId}/${habitId}/logs/${today}`);
    await set(logRef, { value });
    input.value = '';
    showToast("Progress logged");
  }
};

window.editHabit = async function (userId, habitId, oldName, oldGoal) {
  const name = prompt("Enter new name:", oldName);
  const goal = prompt("Enter new goal:", oldGoal);

  if (name && goal && !isNaN(parseInt(goal))) {
    const habitRef = ref(db, `habits/${userId}/${habitId}`);
    await update(habitRef, {
      name,
      goal: parseInt(goal)
    });
    showToast("Habit updated");
  }
};

window.deleteHabit = async function (userId, habitId) {
  if (confirm("Are you sure you want to delete this habit?")) {
    const habitRef = ref(db, `habits/${userId}/${habitId}`);
    await remove(habitRef);
    showToast("Habit deleted");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      alert("You must be logged in");
      window.location.href = "../index.html";
    } else {
      renderHabits(user.uid);
    }
  });
});
