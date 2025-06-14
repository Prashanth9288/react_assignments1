// Dark mode toggle

const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;
const header = document.querySelector("header");
const sidebar = document.querySelector(".sidebar");

// Load saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    enableDarkMode();
  }
});

// Toggle on button click
toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

function enableDarkMode() {
  body.classList.add("dark");
  if (header) header.classList.add("dark-header");
  if (sidebar) sidebar.classList.add("dark-sidebar");
  localStorage.setItem("theme", "dark");
  toggleBtn.innerText = "🌞 Light Mode";
}

function disableDarkMode() {
  body.classList.remove("dark");
  if (header) header.classList.remove("dark-header");
  if (sidebar) sidebar.classList.remove("dark-sidebar");
  localStorage.setItem("theme", "light");
  toggleBtn.innerText = "🌙 Dark Mode";
}
