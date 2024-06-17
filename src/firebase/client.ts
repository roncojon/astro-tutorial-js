// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCrop5w7VIGHvBjcLb-Qfvn-AUkttFsXY",
  authDomain: "astro-blog-73031.firebaseapp.com",
  projectId: "astro-blog-73031",
  storageBucket: "astro-blog-73031.appspot.com",
  messagingSenderId: "779607764983",
  appId: "1:779607764983:web:f7c9f39af5661b9d0748f2",
  measurementId: "G-34KVEC4ZPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);