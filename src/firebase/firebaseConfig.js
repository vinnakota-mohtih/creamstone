// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6esBvMCDdgy0pLfl-PJELROhpb8j1eYI",
  authDomain: "cream-stone-m.firebaseapp.com",
  projectId: "cream-stone-m",
  storageBucket: "cream-stone-m.firebasestorage.app",
  messagingSenderId: "846707225323",
  appId: "1:846707225323:web:f4d7db300aa30ed18244ae",
  measurementId: "G-ZHC15ZHP9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;