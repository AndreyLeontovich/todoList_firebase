

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXZuPqDmUvQ_uKXmnYja4_HMSVqgwPoug",
  authDomain: "todolistlogin-548f3.firebaseapp.com",
  projectId: "todolistlogin-548f3",
  storageBucket: "todolistlogin-548f3.firebasestorage.app",
  messagingSenderId: "13095715895",
  appId: "1:13095715895:web:66eccf1adcae20f12bebb2"
};

// Initialize Firebase
const APP = initializeApp(firebaseConfig);
const ANALYTICS = getAnalytics(APP);


export const DB = getFirestore(APP)
export const AUTH = getAuth(APP)