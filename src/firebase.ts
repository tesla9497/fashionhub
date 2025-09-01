import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAenoqvfoi85pr79JnKjRIekQFDdxckTQM",
  authDomain: "fashionhub-775c2.firebaseapp.com",
  projectId: "fashionhub-775c2",
  storageBucket: "fashionhub-775c2.firebasestorage.app",
  messagingSenderId: "961610655247",
  appId: "1:961610655247:web:3ca79004154c15b751257a",
  measurementId: "G-FK2WFDBJ6P",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, analytics, auth, db };
export default app;
