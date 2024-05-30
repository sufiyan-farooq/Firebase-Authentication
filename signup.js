import{auth,createUserWithEmailAndPassword ,sendEmailVerification} from "./firebase.js"


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
// await  sendEmailVerification(auth.currentUser)
// .then(() => {
//  console.log('verification send')
// });
      

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
