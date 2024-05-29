import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup,sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js';

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


// signup authentication here
let register = document.getElementById('register');
register.addEventListener("click", (event) => {
  event.preventDefault(); 

  const email = document.getElementById('email-signup').value;
  const pass = document.getElementById('pass-signup').value;
  const userName = document.getElementById('username-signup').value;

  console.log(email, pass, userName);

  
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {

      user.displayName = userName;
      const user = userCredential.user;
      console.log("user--->", user);
      user.sendEmailVerification()
                .then(() => {
                    alert('Verification email sent!');
                });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error-->", errorMessage);
      if(errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        alert("Password should be at least 6 characters")
      }
      else if(errorMessage === "Firebase: Error (auth/invalid-email)."){
        alert('Invalid Email')
      }else if(errorMessage==="Firebase: Error (auth/email-already-in-use)."){
        alert('Email alreay in use')
     }else if(errorMessage === "Firebase: Error (auth/missing-password)."){
      alert("Enter a password")
     }
    });

});




// login Authentication here
const loginBtn = document.getElementById('login')

loginBtn.addEventListener("click",()=>{

  const loginEmail = document.getElementById('login-email')
  const loginPass = document.getElementById('login-pass') 
  

const auth = getAuth(app);
signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value)
  .then((userCredential) => {
    const user = userCredential.user;
    if(user === user){
      alert("Login sucess")
    }
     location.href = "main.html"
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage)

    if(errorMessage==="Firebase: Error (auth/invalid-credential)."){
      alert("Enter valid password")
    }else if(errorMessage==="Firebase: Error (auth/invalid-email)."){
      alert("Enter a valid email")
    }
  });



})




const authGoogle = getAuth(app);
authGoogle.languageCode = 'it'
const provider = new GoogleAuthProvider()
const googleBtn = document.getElementById('google-btn')

googleBtn.addEventListener('click',()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    if(user === user){
      alert("Login sucess")
    }
     location.href = "main.html"
 
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)

  });
})




   // Profile Page Logic
if (window.location.pathname.includes('main.html')) {
  auth.onAuthStateChanged((user) => {
      if (user) {
          document.getElementById('userName').innerText = `Name: ${user.displayName || 'N/A'}`;
          document.getElementById('userEmail').innerText = `Email: ${user.email}`;
          document.getElementById('verificationStatus').innerText = `Email Verified: ${user.emailVerified}`;
          
          if (!user.emailVerified) {
              document.getElementById('verifyButton').style.display = 'block';
          }
      } else {
          window.location.href = 'login.html';
      }
  });

  document.getElementById('verifyButton').addEventListener('click', () => {
      const user = auth.currentUser;
      user.sendEmailVerification()
          .then(() => {
              alert('Verification email sent!');
          })
          .catch((error) => {
              console.error("Error sending verification email: ", error);
          });
  });
}