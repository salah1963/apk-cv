// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv57lpMPJQx_my8aL0NRh1xteaQZ0hVYE",
  authDomain: "cvgen-86a6b.firebaseapp.com",
  projectId: "cvgen-86a6b",
  storageBucket: "cvgen-86a6b.appspot.com",
  messagingSenderId: "516783990660",
  appId: "1:516783990660:web:5de606ac1862588235dfd1",
  measurementId: "G-27EBHKH5PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Validate Email Domain
function validateEmailDomain(email) {
  const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
}

// Sign-up button event listener
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  if (!validateEmailDomain(email)) {
    showMessage('Only Gmail, Yahoo, and Hotmail addresses are allowed.', 'signUpMessage');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          // Show success message
          showMessage('Account Created Successfully. Redirecting to Login...', 'signUpMessage');

          // Change to sign-in form after successful signup
          setTimeout(() => {
            document.getElementById('signInButton').click(); // This will click the button to show the sign-in form
          }, 2000); // Delay of 2 seconds before switching to the sign-in form
        })
        .catch((error) => {
          console.error("Error writing document", error);
          showMessage("Error writing document", 'signUpMessage');
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else if (errorCode === 'auth/weak-password') {
        showMessage('Weak Password! Please choose a stronger password.', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});

// Sign-in button event listener
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!validateEmailDomain(email)) {
    showMessage('Only Gmail, Yahoo, and Hotmail addresses are allowed.', 'signInMessage');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login is successful. Redirecting...', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);

      // Redirect to homepage after successful login
      setTimeout(() => {
        window.location.href = '../signin/resume.html';  // توجيه المستخدم بعد 1 ثانية
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else if (errorCode === 'auth/wrong-password') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else if (errorCode === 'auth/user-not-found') {
        showMessage('Account does not Exist', 'signInMessage');
      } else {
        showMessage('Error logging in: ' + error.message, 'signInMessage');
      }
    });
});
