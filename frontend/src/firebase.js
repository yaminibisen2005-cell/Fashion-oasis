import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey && apiKey !== "undefined" ? apiKey : "AIzaSy_placeholder_key_fashion_oasis",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fashion-oasis.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fashion-oasis",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fashion-oasis.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:fashionoasis",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-FASHIONOASIS"
};

let app = null;
let auth = null;
let googleProvider = null;

try {
  if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("placeholder")) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.warn("Firebase API Key is missing in VITE_FIREBASE_API_KEY. Google authentication will require a valid API Key in .env");
  }
} catch (error) {
  console.warn("Firebase initialization failed:", error?.message || error);
}

export { auth, googleProvider, signInWithPopup };