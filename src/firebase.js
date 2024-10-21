// Import necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Optional if you're using Firestore
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1uYGCldbyVOA9I1TQcdT79CvhFN58IWg",
    authDomain: "doc-app-eab7f.firebaseapp.com",
    projectId: "doc-app-eab7f",
    storageBucket: "doc-app-eab7f.appspot.com",
    messagingSenderId: "1058955124787",
    appId: "1:1058955124787:web:56eab2fbfb28aedc1c4346",
    measurementId: "G-VP8LN9FTWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export 'auth'
export const db = getFirestore(app); // Optional: Firestore initialization
export const analytics = getAnalytics(app);
