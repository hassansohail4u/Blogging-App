import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


 
const firebaseConfig = {
    apiKey: "AIzaSyDIu7CFFeDXV3CvNHVm9AN_WNTZjLhoh-o",
    authDomain: "olx-clone-by-hassan-duroodwala.firebaseapp.com",
    projectId: "olx-clone-by-hassan-duroodwala",
    storageBucket: "olx-clone-by-hassan-duroodwala.firebasestorage.app",
    messagingSenderId: "739672176986",
    appId: "1:739672176986:web:5dceaa97c16049739f9b63",
    measurementId: "G-54DD6G7LBV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db }