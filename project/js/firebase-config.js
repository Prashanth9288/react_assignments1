
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDyZt2GkKP-xZu1fnGfStPyWLvM5oWjm9Q",
    authDomain: "ecommerce-396a5.firebaseapp.com",
    projectId: "ecommerce-396a5",
    storageBucket: "ecommerce-396a5.appspot.com",
    messagingSenderId: "292220509400",
    appId: "1:292220509400:web:50a603a5f82f3402784bad",
    measurementId: "G-SBZ651M3GN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db=getFirestore(app);
