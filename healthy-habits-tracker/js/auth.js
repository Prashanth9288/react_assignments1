// Auth logic

import { auth } from "./firebaseConfig.js";
import { showToast } from "./notify.js";

// ✅ Signup function
export function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      showToast("🎉 Signup successful!");
      window.location.href = "index.html"; // redirect to dashboard
    })
    .catch(error => {
      console.error(error);
      showToast("❌ Signup failed: " + error.message);
    });
}

// ✅ Login function
export function logIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      showToast("✅ Logged in!");
      window.location.href = "index.html"; // redirect to dashboard
    })
    .catch(error => {
      console.error(error);
      showToast("❌ Login failed: " + error.message);
    });
}

// ✅ Logout
export function logOut() {
  auth.signOut().then(() => {
    showToast("👋 Logged out");
    window.location.href = "login.html";
  });
}

// ✅ Auth State Change Listener (run on all pages)
export function monitorAuthState(onLogin, onLogout) {
  auth.onAuthStateChanged(user => {
    if (user) {
      onLogin(user);
    } else {
      onLogout();
    }
  });
}
