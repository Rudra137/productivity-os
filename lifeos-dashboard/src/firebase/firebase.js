import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiJMTQICGAK9MwyTP_3LbSEhv3_gFW8-Y",
  authDomain: "lifeos-dashboard-e4319.firebaseapp.com",
  projectId: "lifeos-dashboard-e4319",
  storageBucket: "lifeos-dashboard-e4319.firebasestorage.app",
  messagingSenderId: "163966255694",
  appId: "1:163966255694:web:73dff49d6325f31dbbf91f",
  measurementId: "G-GQ2E9HEZ9H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
