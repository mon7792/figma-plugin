// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFHovM4TBfigIQwAVT1zV5NQlbPkx6__c",
  authDomain: "wf-figma.firebaseapp.com",
  projectId: "wf-figma",
  storageBucket: "wf-figma.appspot.com",
  messagingSenderId: "719754012116",
  appId: "1:719754012116:web:41279a37bf76946fec2241",
  measurementId: "G-K73K7WP2B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);