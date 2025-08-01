import { auth, db } from "../js/firebase-cofig.js";
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { doc, getDoc, setDoc, } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const signupForm = document.getElementById('signup-form');

  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        //Redirect the user to dashboard page.
        window.open("dashboard.html", "_blank");//open in new tab
      } catch (error) {
        document.getElementById('login-message').innerText = error.message;
      }
    });
  }
  if (signupBtn) {
    signupBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const signupForm = document.getElementById("signup-form")
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const role = document.getElementById("role").value;
      const messagePara = document.getElementById('signup-message')
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "users", userCredentials.user.uid), { email, role })
        window.location.href = "..\index.html";
      } catch (error) {
        document.getElementById('signup-message').innerText = error.message
      }
    })
  }
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await signOut(auth);
      window.location.href = '.\index.html'
    })
  }
})