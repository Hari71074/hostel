// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJEXY4O8Up1YxPyQqTqAn4xvoxhxOHZ3U",
  authDomain: "hostel-cee78.firebaseapp.com",
  projectId: "hostel-cee78",
  storageBucket: "hostel-cee78.firebasestorage.app",
  messagingSenderId: "403321330032",
  appId: "1:403321330032:web:8a2fbefc941a08693f17b5",
  measurementId: "G-N2QN2TG1DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);