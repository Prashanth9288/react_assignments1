
import { db, auth } from './firbase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const habitList = document.getElementById("habitsDisplay");

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const habitRef = ref(db, `habits/${user.uid}`);
  onValue(habitRef, (snapshot) => {
    habitList.innerHTML = "";

    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        const habit = child.val();

        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${habit.name}</strong> (${habit.category}) - Goal: ${habit.goal} (${habit.goalType})
        `;
        habitList.appendChild(li);
      });
    } else {
      habitList.innerHTML = "<li>No habits found.</li>";
    }
  });
  // Mood selection behavior
  document.querySelectorAll(".mood-option").forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll(".mood-option").forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      document.getElementById("mood-message").textContent = opt.dataset.msg;
    });
  });

});

// Dark Mode Toggle
function setupDarkModeToggle() {
  const toggleBtn = document.getElementById("dark-mode-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      // Toggle dark-mode class on body and main elements
      document.body.classList.toggle("dark-mode");
      document.querySelector("header")?.classList.toggle("dark-mode");
      document.querySelector("aside")?.classList.toggle("dark-mode");
      document.querySelector("footer")?.classList.toggle("dark-mode");
    });
  }
}

auth.onAuthStateChanged(user => {
  if (!user) return;

  const bmiRef = ref(db, `habits/${user.uid}/bmi`);
  onValue(bmiRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      document.getElementById("bmi-summary").innerHTML = "<p>🧠 No BMI data yet. <a href='goals.html'>Calculate now</a></p>";
      return;
    }

    document.getElementById("bmi-summary").innerHTML = `
      <h3>💡 Your BMI</h3>
      <p><strong>${data.value}</strong> — ${data.category}</p>
      <small>Last Updated: ${new Date(data.lastUpdated).toLocaleDateString()}</small>
    `;
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("dark-mode-toggle");
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
  });

  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
  }
});


// Mood Emojis Click Logic
document.querySelectorAll(".emoji-moods span").forEach((emoji) => {
  emoji.addEventListener("click", () => {
    document.querySelectorAll(".emoji-moods span").forEach(e => e.classList.remove("selected"));
    emoji.classList.add("selected");

    const message = emoji.dataset.msg;
    document.getElementById("mood-message").textContent = message;
  });
});

const li = document.createElement("li");
li.innerHTML = `
  <div class="habit-card">
    <h4>${habit.name}</h4>
    <p>Category: ${habit.category}</p>
    <p>Goal: ${habit.goal} (${habit.goalType || 'Daily'})</p>
    <progress value="${habit.progress || 0}" max="100"></progress>
    <p>Progress: ${habit.progress || 0}%</p>
  </div>
`;
habitList.appendChild(li);









