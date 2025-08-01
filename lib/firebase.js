// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSTi4gS_N8KSw6-gVGq9iYwy3Wa1x_aS0",
  authDomain: "gudangku-app.firebaseapp.com",
  projectId: "gudangku-app",
  storageBucket: "gudangku-app.firebasestorage.app",
  messagingSenderId: "602010601332",
  appId: "1:602010601332:web:676ed8ab842b9ba8e50e21",
  measurementId: "G-034HGCBBPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
