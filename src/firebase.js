// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS42H8E1Lorqtwp450xSUh-MsOQVcKoFc",
  authDomain: "little-lemon-d8a97.firebaseapp.com",
  projectId: "little-lemon-d8a97",
  storageBucket: "little-lemon-d8a97.appspot.com",
  messagingSenderId: "852480082043",
  appId: "1:852480082043:web:ab785c9f0d368c91c2e2de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);
