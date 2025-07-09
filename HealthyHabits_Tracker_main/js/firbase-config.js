// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB77PbPjOUxaa96SpPT2mMRS8axSTuFxBg",
  authDomain: "healthhabit-4047b.firebaseapp.com",
  databaseURL: "https://healthhabit-4047b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "healthhabit-4047b",
  storageBucket: "healthhabit-4047b.firebasestorage.app",
  messagingSenderId: "337988168063",
  appId: "1:337988168063:web:9a808145701c449acb924a",
  measurementId: "G-35SF8Q4FT3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
export { app, db, auth };
