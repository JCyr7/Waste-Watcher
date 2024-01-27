// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhuMafXA6R_oP1HAZLbOyadwyuiwr5pjM",
  authDomain: "waste-watcher-b0ea4.firebaseapp.com",
  projectId: "waste-watcher-b0ea4",
  storageBucket: "waste-watcher-b0ea4.appspot.com",
  messagingSenderId: "108888485056",
  appId: "1:108888485056:web:765723fce89a51fe961125",
  measurementId: "G-Q6WYJJ3QSY"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(app);