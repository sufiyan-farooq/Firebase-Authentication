import{auth, signInWithEmailAndPassword} from "./firebase.js"

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