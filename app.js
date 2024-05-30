import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
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

let register = document.getElementById("register");
register.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email-signup").value;
  const pass = document.getElementById("pass-signup").value;
  const userName = document.getElementById("username-signup").value;

  console.log(email, pass, userName);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: userName
    });
console.log("user--->", user);
await  sendEmailVerification(auth.currentUser)
.then(() => {
 console.log('verification send')
});
      

  } catch (error) {
    const errorMessage = error.message;
    console.log("error-->", errorMessage);
    if (errorMessage.includes("auth/weak-password")) {
      alert("Password should be at least 6 characters");
    } else if (errorMessage.includes("auth/invalid-email")) {
      alert("Invalid Email");
    } else if (errorMessage.includes("auth/email-already-in-use")) {
      alert("Email already in use");
    } else if (errorMessage.includes("auth/missing-password")) {
      alert("Enter a password");
    }
  }
});

// login Authentication here
const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", () => {
  const loginEmail = document.getElementById("login-email").value;
  const loginPass = document.getElementById("login-pass").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPass)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        alert("Login success");
        location.href = "main.html";
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);

      if (errorMessage.includes("auth/invalid-credential")) {
        alert("Enter valid password");
      } else if (errorMessage.includes("auth/invalid-email")) {
        alert("Enter a valid email");
      }
    });
});

const provider = new GoogleAuthProvider();
const googleBtn = document.getElementById("google-btn");

googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (user) {
        alert("Login success");
        location.href = "main.html";
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.displayName);
    console.log(user.emailVerified);
    console.log(user.email);
  }
});



















// auth.onAuthStateChanged((user) => {
//   if (user) {
    // document.getElementById("userName").innerText = `Name: ${
    //   user.displayName || "N/A"
    // }`;
    // console.log(user.displayName)
    // document.getElementById("userEmail").innerText = `Email: ${user.email}`;
    // document.getElementById(
    //   "verificationStatus"
    // ).innerText = `Email Verified: ${user.emailVerified}`;
      // console.log(user.emailVerified)
      // console.log(user.email)
  //   if (!user.emailVerified) {
  //     document.getElementById("verifyButton").style.display = "block";
  //   } 
  // } else {
  //   window.location.href = "index.html";
  // }
//    }
// });

// const verfiyBtn = document.getElementById("verifyButton")


// verfiyBtn.addEventListener("click", () => {
//   const user = auth.currentUser;
//   user
//     .sendEmailVerification()
//     .then(() => {
//       alert("Verification email sent!");
//     })
//     .catch((error) => {
//       console.error("Error sending verification email: ", error);
//     });
// });
