import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuV_kKgi14TDkyreIFhyJkMqf5JWo9MJg",
  authDomain: "notes-app-553cb.firebaseapp.com",
  projectId: "notes-app-553cb",
  storageBucket: "notes-app-553cb.firebasestorage.app",
  messagingSenderId: "24205376648",
  appId: "1:24205376648:web:fc0f82b2d0777a9953f33d",
  measurementId: "G-9D1VWB0X95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
