import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU2NgByRbJ2rIzifAUEUD091cXqOlkGTs",
  authDomain: "todo-app-69cd5.firebaseapp.com",
  databaseURL:
    "https://todo-app-69cd5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-69cd5",
  storageBucket: "todo-app-69cd5.appspot.com",
  messagingSenderId: "402420046305",
  appId: "1:402420046305:web:377e216baed49146af5aa0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// const db = getFirestore(app);

export { db, app };
