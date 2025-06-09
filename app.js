
import{auth,onAuthStateChanged,sendEmailVerification} from "./firebase.js"


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        console.log(user.displayName);
        console.log(user.emailVerified);
        console.log(user.email);
        console.log(user.photoURL);

        console.log(user.metadata.createdAt);

        const createdDate = new Date(parseInt(user.metadata.createdAt));
        const formattedDate = createdDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        document.getElementById('userName').innerText = `Name: ${user.displayName || 'N/A'}`;
        document.getElementById('userEmail').innerText = `Email: ${user.email}`;
              document.getElementById('userLogo').src = user.photoURL || 'default-image.jpg';


        document.getElementById('verificationStatus').innerText = `Email Verified: ${user.emailVerified}`;
        document.getElementById('createdAt').innerText = `Account Created: ${formattedDate}`;

        if (!user.emailVerified) {
            document.getElementById('verifyButton').style.display = 'block';
        }
    } else {
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
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