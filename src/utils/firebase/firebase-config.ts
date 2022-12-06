// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtBlt5Xqsv5t2cDQj9kL3Uj3e_l9L4-1M",
    authDomain: "yifelegal-42.firebaseapp.com",
    projectId: "yifelegal-42",
    storageBucket: "yifelegal-42.appspot.com",
    messagingSenderId: "645475323462",
    appId: "1:645475323462:web:a67ae37ae8fe112131c447",
    measurementId: "G-7ZW8X3957J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app)