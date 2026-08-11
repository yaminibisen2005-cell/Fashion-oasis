import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app = null;
let auth = null;
let googleProvider = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.error("Firebase API Key is missing in VITE_FIREBASE_API_KEY. Google authentication will require a valid API Key in Vercel/environment variables.");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error?.message || error);
}

export { auth, googleProvider, signInWithPopup };