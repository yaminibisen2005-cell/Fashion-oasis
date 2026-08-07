 import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyB304X43I42HdcN3F_sdkG2uau6Q2ttrG8",
  authDomain: "fashion-oasis.firebaseapp.com",
  projectId: "fashion-oasis",
  storageBucket: "fashion-oasis.firebasestorage.app",
  messagingSenderId: "785329050369",
  appId: "1:785329050369:web:7de9dfd24288ead723c100",
  measurementId: "G-E9B9Y92J4E"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };