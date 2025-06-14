// Notification logic

// ✅ In-App Toast Notification
export function showToast(message, duration = 3000) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100); // small delay for animation

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

// ✅ Request permission for browser notifications
export function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        showToast("🔔 Notifications enabled");
      }
    });
  }
}

// ✅ Send browser notification
export function sendHabitNotification(title, message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: "./assets/icons/reminder.png", // optional
    });
  }
}

// ✅ Simulate habit reminders every few seconds (example)
export function scheduleHabitReminder(habitName, timeInMs = 5000) {
  setTimeout(() => {
    showToast(`Reminder: ${habitName} is due!`);
    sendHabitNotification("Habit Reminder", `Don't forget to: ${habitName}`);
  }, timeInMs);
}
