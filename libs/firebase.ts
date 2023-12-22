
import { initializeApp } from "firebase/app";
import { getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDAIn1cGnC4qyJEhAsRy6fou5I9FlrpDcw",
  authDomain: "todo-2b258.firebaseapp.com",
  projectId: "todo-2b258",
  storageBucket: "todo-2b258.appspot.com",
  messagingSenderId: "143249117792",
  appId: "1:143249117792:web:c879f5b42857a65691e905"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase app on the server (if needed)
export const customInitApp = () => {
  if (getApps().length <= 0) {
    initializeApp(firebaseConfig);
  }
};

export default firebase;