// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiJMTQICGAK9MwyTP_3LbSEhv3_gFW8-Y",
  authDomain: "lifeos-dashboard-e4319.firebaseapp.com",
  projectId: "lifeos-dashboard-e4319",
  storageBucket: "lifeos-dashboard-e4319.firebasestorage.app",
  messagingSenderId: "163966255694",
  appId: "1:163966255694:web:73dff49d6325f31dbbf91f",
  measurementId: "G-GQ2E9HEZ9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);