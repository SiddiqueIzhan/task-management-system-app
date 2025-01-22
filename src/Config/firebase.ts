// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKVOtskLCNKXHsKD8LINmJH4B3F3mBi1U",
  authDomain: "task-management-app1-f6b3f.firebaseapp.com",
  projectId: "task-management-app1-f6b3f",
  storageBucket: "task-management-app1-f6b3f.firebasestorage.app",
  messagingSenderId: "744452578604",
  appId: "1:744452578604:web:c063827d35330d61ae6089",
  databaseURL: "https://task-management-app1-f6b3f-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export default app; // Export the app instance
