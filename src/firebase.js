// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArmcckyLY45AgkU2rLeW5gZx9G7EdOy78",
  authDomain: "keeps-80281.firebaseapp.com",
  projectId: "keeps-80281",
  storageBucket: "keeps-80281.firebasestorage.app",
  messagingSenderId: "1083238017479",
  appId: "1:1083238017479:web:4a269cd4177fe1fb9f51e2",
  measurementId: "G-FGWWMEFZR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };
