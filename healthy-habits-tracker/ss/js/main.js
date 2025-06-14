// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Firebase Configuration
 const firebaseConfig = {
    apiKey: "AIzaSyD0JSNuQAZgPFxNx-MQ6THHGlRVSIwn9dc",
    authDomain: "healthyhabitstracker-45d61.firebaseapp.com",
    databaseURL: "https://healthyhabitstracker-45d61-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "healthyhabitstracker-45d61",
    storageBucket: "healthyhabitstracker-45d61.firebasestorage.app",
    messagingSenderId: "968531628490",
    appId: "1:968531628490:web:6af183ec3174472a253f33",
    measurementId: "G-0RR79KNJ7S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const habitsRef = ref(db, "habits");

// Expose setup function globally for inject.js
window.setupApp = function setupApp() {
  setupLogout();
  setupReminders();
  setupDarkModeToggle();
};

// Logout Functionality
function setupLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("You have been logged out.");
          window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
          console.error("Logout error:", error);
          alert("Failed to log out.");
        });
    });
  }
}

// Habit Reminder Notifications
function setupReminders() {
  const reminderBtn = document.getElementById("start-reminders");
  if (reminderBtn) {
    reminderBtn.addEventListener("click", () => {
      if (!("Notification" in window)) {
        alert("This browser does not support notifications.");
        return;
      }

      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          startHabitReminders();
          alert("Habit reminders activated!");
        } else {
          alert("Notifications not enabled.");
        }
      });
    });
  }
}

function startHabitReminders() {
  sendReminders(); // Initial call to send reminders immediately
  setInterval(sendReminders, 5 * 60 * 1000); // Repeat every 5 minutes
}

function sendReminders() {
  onValue(habitsRef, (snapshot) => {
    const habits = snapshot.val();
    if (!habits) return;

    // Loop through each habit and send reminder notification
    for (let id in habits) {
      const habit = habits[id];
      const habitName = habit.name || "Unnamed Habit";

      // Sending a notification for each habit
      new Notification("⏰ Habit Reminder", {
        body: `Don't forget to track: ${habitName}`,
        icon: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
      });
    }
  });
}

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