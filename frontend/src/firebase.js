// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-task-manager-ee0bb.firebaseapp.com",
  projectId: "mern-task-manager-ee0bb",
  storageBucket: "mern-task-manager-ee0bb.firebasestorage.app",
  messagingSenderId: "510424503823",
  appId: "1:510424503823:web:21dceb84dd68c3b54ab57a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);