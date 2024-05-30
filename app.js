
import{auth,onAuthStateChanged,sendEmailVerification} from "./firebase.js"


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.displayName);
        console.log(user.emailVerified);
        console.log(user.email);
        document.getElementById('userName').innerText = `Name: ${user.displayName || 'N/A'}`;
        document.getElementById('userEmail').innerText = `Email: ${user.email}`;
        document.getElementById('verificationStatus').innerText = `Email Verified: ${user.emailVerified}`;

        if (!user.emailVerified) {
            document.getElementById('verifyButton').style.display = 'block';
        }
    } else {
        window.location.href = 'index.html';
    }
});

document.getElementById('verifyButton').addEventListener('click', () => {
    const user = auth.currentUser;
    sendEmailVerification(user)
        .then(() => {
            alert('Verification email sent!');
        })
        .catch((error) => {
            console.error("Error sending verification email: ", error);
        });
});