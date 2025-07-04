import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvy_Dc2bOSwiCrCk4QkXGtkxrT8VvGZws",
  authDomain: "tech-nexus-4c274.firebaseapp.com",
  projectId: "tech-nexus-4c274",
  storageBucket: "tech-nexus-4c274.appspot.com",  // fixed here
  messagingSenderId: "387304551832",
  appId: "1:387304551832:web:d9d6ae3e1083737507e7ed",
  measurementId: "G-H9J13B1SM2"
};


// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };



