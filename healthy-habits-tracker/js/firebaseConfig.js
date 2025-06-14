// Firebase config module

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0JSNuQAZgPFxNx-MQ6THHGlRVSIwn9dc",
  authDomain: "healthyhabitstracker-45d61.firebaseapp.com",
  databaseURL: "https://healthyhabitstracker-45d61-default-rtdb.firebaseio.com",
  projectId: "healthyhabitstracker-45d61",
  storageBucket: "healthyhabitstracker-45d61.appspot.com",
  messagingSenderId: "968531628490",
  appId: "1:968531628490:web:6af183ec3174472a253f33",
  measurementId: "G-0RR79KNJ7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export Firebase services
export { db, auth, analytics };
