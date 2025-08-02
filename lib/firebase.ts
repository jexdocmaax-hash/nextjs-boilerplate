import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSTi4gS_N8KSw6-gVGq9iYwy3Wa1x_aS0",
  authDomain: "gudangku-app.firebaseapp.com",
  projectId: "gudangku-app",
  storageBucket: "gudangku-app.firebasestorage.app",
  messagingSenderId: "602010601332",
  appId: "1:602010601332:web:676ed8ab842b9ba8e50e21",
  measurementId: "G-034HGCBBPZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
