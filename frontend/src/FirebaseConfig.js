// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDJAHSkd_3-dqAVLqBZlAfcBy_eBuqOYQ",
    authDomain: "mentalhealthapp-c8505.firebaseapp.com",
    projectId: "mentalhealthapp-c8505",
    storageBucket: "mentalhealthapp-c8505.appspot.com",
    messagingSenderId: "687281007629",
    appId: "1:687281007629:web:76f8df25584b23cb15b944",
    measurementId: "G-DZZN6E5HDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// import { getAnalytics } from "firebase/analytics";


// const analytics = getAnalytics(app);
