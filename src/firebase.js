import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzMdtHvbuJC0WhEXaMmrqJeWoXxCSG7tk",
  authDomain: "bookstore-webengg.firebaseapp.com",
  projectId: "bookstore-webengg",
  storageBucket: "bookstore-webengg.firebasestorage.app",
  messagingSenderId: "1024848088535",
  appId: "1:1024848088535:web:1ab01c2959fe5531c04f92",
  measurementId: "G-15KVMXTFX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);