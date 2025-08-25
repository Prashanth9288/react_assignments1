import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
   apiKey: "AIzaSyDfDb4D0QJmW3zbP4B10Uu2QxTU5I-mJJ4",
    authDomain: "trip-itenary-planner.firebaseapp.com",
    projectId: "trip-itenary-planner",
    storageBucket: "trip-itenary-planner.firebasestorage.app",
    messagingSenderId: "852985400101",
    appId: "1:852985400101:web:be5395269bb6b4cc8868cc",
    measurementId: "G-YPMP7KK1X6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
