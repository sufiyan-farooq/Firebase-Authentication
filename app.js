import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyAm5XrCHtQe58dw0kcvkzOjShKzUgyH91o",
  authDomain: "login-register-5c41a.firebaseapp.com",
  projectId: "login-register-5c41a",
  storageBucket: "login-register-5c41a.appspot.com",
  messagingSenderId: "318105246333",
  appId: "1:318105246333:web:5b6cbda273d7efb871ef14",
  measurementId: "G-SP1C48511D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let register = document.getElementById('register');

register.addEventListener("click", (event) => {
  event.preventDefault(); 

  const email = document.getElementById('email-signup').value;
  const pass = document.getElementById('pass-signup').value;
  const userName = document.getElementById('username-signup').value;

  console.log(email, pass, userName);

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user--->", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error-->", errorMessage);
      if(errorMessage === "Password should be at least 6 characters"){
        
      }
    });

  console.log('test');
});