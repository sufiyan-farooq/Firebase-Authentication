
import{auth,GoogleAuthProvider,    signInWithPopup,
} from "./firebase.js"
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