// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUbNRqKDbS4mzzeWbj5dqB199-Y2XFx0Y",
  authDomain: "activants-react.firebaseapp.com",
  projectId: "activants-react",
  storageBucket: "activants-react.appspot.com",
  messagingSenderId: "387088011405",
  appId: "1:387088011405:web:c86a43fdfdcd01b16dd2c4",
  measurementId: "G-X6SMKL9R6W"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
