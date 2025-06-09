import { auth, signOut } from "./firebase.js";

const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click',()=>{
   signOut(auth).then(() => {
   console.log(' Sign-out successful.')  
}).catch((error) => {
  console.log('  // An error happened.')
});
})
