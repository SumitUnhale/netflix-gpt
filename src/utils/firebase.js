// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR1pVHMkT7_SYy2IP_vRfpl32mSGWr4ow",
  authDomain: "netflixgpt-f47f9.firebaseapp.com",
  projectId: "netflixgpt-f47f9",
  storageBucket: "netflixgpt-f47f9.firebasestorage.app",
  messagingSenderId: "988112189247",
  appId: "1:988112189247:web:e6175c34dc58ca0c1f058a",
  measurementId: "G-KH3SMJVB4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();