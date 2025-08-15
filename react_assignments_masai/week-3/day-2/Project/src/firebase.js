// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCnBDBseQ-ldvlh13wFfSSdy1CRkTAn6N4",
  authDomain: "project-tracker-4351b.firebaseapp.com",
  projectId: "project-tracker-4351b",
  storageBucket: "project-tracker-4351b.firebasestorage.app",
  messagingSenderId: "1034737766814",
  appId: "1:1034737766814:web:e336a15ddef9723e71068f",
  measurementId: "G-PWSJ325FRQ",
  databaseURL: "https://project-tracker-4351b-default-rtdb.firebaseio.com" // ✅ Add Realtime DB URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
