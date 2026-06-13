// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC46bMt5FtongBCsY6f2662vcogqJ72hyU",
  authDomain: "ecommerce-trivio.firebaseapp.com",
  projectId: "ecommerce-trivio",
  storageBucket: "ecommerce-trivio.firebasestorage.app",
  messagingSenderId: "561637442520",
  appId: "1:561637442520:web:6fe36f185195c5faed68ad",
  measurementId: "G-JRJNDM06PE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export default auth