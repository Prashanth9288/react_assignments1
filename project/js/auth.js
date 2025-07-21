// js/auth.js
import { auth, db } from './firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

import {
  doc,
  setDoc,
  getDoc
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

const isRegister = location.pathname.includes("register");
const form = document.querySelector("form");
const errorMsg = document.querySelector(".error-msg");
let selectedRole = "customer";

// Toggle Role
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    selectedRole = tab.textContent.toLowerCase();
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.querySelector("#email").value;
  const password = form.querySelector("#password").value;

  try {
    if (isRegister) {
      const name = form.querySelector("#name").value;
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);

      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        role: selectedRole,
        createdAt: Date.now()
      });

      if (selectedRole === "vendor") {
        await setDoc(doc(db, "vendors", userCred.user.uid), {
          storeName: name + "'s Shop",
          isFeatured: false
        });
      }

      alert("Registration successful. Please check your email for verification.");
      location.href = "login.html";
    } else {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const docSnap = await getDoc(doc(db, "users", userCred.user.uid));
      const role = docSnap.exists() ? docSnap.data().role : "customer";

      if (!userCred.user.emailVerified) {
        errorMsg.textContent = "Please verify your email before logging in.";
        return;
      }

      if (role !== selectedRole) {
        errorMsg.textContent = `You're trying to login as a ${selectedRole}, but registered as ${role}.`;
        return;
      }

      location.href = role === "vendor" ? "dashboard.html" : "index.html";
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent = err.message;
  }
});
