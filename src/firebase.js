// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy4tJ1avMxkm0WwGgmc-xX5f3djdT-_do",
  authDomain: "my-new-app-5bc98.firebaseapp.com",
  projectId: "my-new-app-5bc98",
  storageBucket: "my-new-app-5bc98.appspot.com",
  messagingSenderId: "201274806649",
  appId: "1:201274806649:web:0d74ab90d963e857ee5fa8",
  measurementId: "G-5KWT6D4VDK",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

