import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhTJnEAouZ6aDUgz_ptD6iTdj-e953Spo",
  authDomain: "healthtrack-app-a38c3.firebaseapp.com",
  projectId: "healthtrack-app-a38c3",
  storageBucket: "healthtrack-app-a38c3.firebasestorage.app",
  messagingSenderId: "1019309207277",
  appId: "1:1019309207277:web:35a9a8332c91de6520e6e4",
  measurementId: "G-13XSZ4YWZG"
};


// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);

// Експортуємо автентифікацію та базу даних, щоб використовувати їх в інших файлах
export const auth = getAuth(app);
export const db = getFirestore(app);