import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  signOut,

  sendEmailVerification,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAm5XrCHtQe58dw0kcvkzOjShKzUgyH91o",
  authDomain: "login-register-5c41a.firebaseapp.com",
  projectId: "login-register-5c41a",
  storageBucket: "login-register-5c41a.appspot.com",
  messagingSenderId: "318105246333",
  appId: "1:318105246333:web:5b6cbda273d7efb871ef14",
  measurementId: "G-SP1C48511D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{
    auth,
    // signOut,
    sendEmailVerification,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
}