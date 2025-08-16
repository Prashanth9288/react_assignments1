import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCnBDBseQ-ldvlh13wFfSSdy1CRkTAn6N4",
  authDomain: "project-tracker-4351b.firebaseapp.com",
  databaseURL: "https://project-tracker-4351b-default-rtdb.firebaseio.com",
  projectId: "project-tracker-4351b",
  storageBucket: "project-tracker-4351b.firebasestorage.app",
  messagingSenderId: "1034737766814",
  appId: "1:1034737766814:web:e336a15ddef9723e71068f",
  measurementId: "G-PWSJ325FRQ",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
