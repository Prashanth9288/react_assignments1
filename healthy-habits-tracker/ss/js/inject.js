function loadHTML(id, file) {
  return fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadHTML("header-container", "header.html");
  await loadHTML("sidebar-container", "sidebar.html");
  await loadHTML("footer-container", "footer.html");

  // ✅ Call this AFTER components are injected
  if (typeof window.setupApp === "function") {
    window.setupApp();
  }
});